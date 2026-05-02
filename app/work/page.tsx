/**
 * Work index page — SERVER COMPONENT.
 * Reads taglines from content/work/*.md files via lib/parseProjectMd.ts.
 * Interactive card grid is delegated to components/ProjectCardGrid.tsx (client).
 */

import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { Briefcase } from '@phosphor-icons/react/dist/ssr';
import { portfolioProjects } from '@/lib/projects';
import { getProjectTaglines } from '@/lib/parseProjectMd';
import ProjectCardGrid from '@/components/ProjectCardGrid';

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies from 14+ years designing and building at Southwest Airlines — design systems, design ops, and product UX.",
  openGraph: {
    title: "Work · Shane Maris",
    description: "Case studies from 14+ years designing and building at Southwest Airlines — design systems, design ops, and product UX.",
    url: "https://shanemaris.com/work",
  },
  twitter: {
    title: "Work · Shane Maris",
    description: "Case studies — design systems, design ops, and product UX at Southwest Airlines.",
  },
};
import HoverLink from '@/components/HoverLink';

const supportingProjects = portfolioProjects.filter(p => p.slug !== 'heart-design-system' && !p.hidden);

export default function WorkPage() {
  // Read taglines from MD files (server-side — fs is available here)
  const taglines = getProjectTaglines(supportingProjects.map(p => p.slug));

  // Featured image existence check
  const hasFeaturedImg = fs.existsSync(
    path.join(process.cwd(), 'public', 'work', 'heart-design-system', 'featured.jpg')
  );

  const cardData = supportingProjects.map(p => ({
    slug: p.slug,
    title: p.title,
    tagline: taglines[p.slug] ?? '',
    tags: p.tags,
    imageSrc: fs.existsSync(
      path.join(process.cwd(), 'public', 'work', p.slug, 'thumbnail.jpg')
    ) ? `/work/${p.slug}/thumbnail.jpg` : undefined,
  }));

  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>

      {/* Featured Project: Heart DS */}
      <section style={{ padding: '0 4rem' }}>
        <div
          style={{
            marginBottom: '6rem',
            padding: '4rem',
            backgroundColor: 'var(--accent-tint-08)',
            borderRadius: '12px',
            border: '1px solid var(--accent-tint-15)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            {/* Featured image */}
            <div
              style={{
                borderRadius: '8px',
                aspectRatio: '1 / 0.85',
                overflow: 'hidden',
                ...(hasFeaturedImg
                  ? {}
                  : {
                      backgroundColor: 'var(--accent-tint-10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-muted)',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-inter)',
                    }),
              }}
            >
              {hasFeaturedImg ? (
                <img
                  src="/work/heart-design-system/featured.jpg"
                  alt="Heart Design System — Featured"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                'Heart DS — Featured Image'
              )}
            </div>

            {/* Featured content */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: '1rem',
                  marginTop: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  width: 'fit-content',
                }}
              >
                <Briefcase size={14} weight="duotone" />
                Featured Case Study
              </p>

              <h2
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '3rem',
                  color: 'var(--color-ink)',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                  marginTop: 0,
                }}
              >
                Heart Design System
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '1.125rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                  maxWidth: '28rem',
                }}
              >
                From grassroots effort to enterprise-scale design infrastructure. How I built and scaled Heart across web, iOS, and Android platforms at Southwest Airlines.
              </p>

              <HoverLink
                href="/work/heart-design-system"
                hoverEffect="underglow"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Read Full Case Study
              </HoverLink>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting projects grid */}
      <section style={{ padding: '0 4rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '1.5rem',
            color: 'var(--color-ink)',
            marginBottom: '3rem',
            marginTop: 0,
          }}
        >
          Other Work
        </h3>

        <ProjectCardGrid projects={cardData} />
      </section>
    </main>
  );
}
