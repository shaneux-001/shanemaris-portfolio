/**
 * Work index page — SERVER COMPONENT.
 * Reads taglines from content/work/*.md files via lib/parseProjectMd.ts.
 * Interactive card grid is delegated to components/ProjectCardGrid.tsx (client).
 */

import { portfolioProjects } from '@/lib/projects';
import { getProjectTaglines } from '@/lib/parseProjectMd';
import ProjectCardGrid from '@/components/ProjectCardGrid';
import HoverLink from '@/components/HoverLink';

const supportingProjects = portfolioProjects.filter(p => p.slug !== 'heart-design-system');

export default function WorkPage() {
  // Read taglines from MD files (server-side — fs is available here)
  const taglines = getProjectTaglines(supportingProjects.map(p => p.slug));

  const cardData = supportingProjects.map(p => ({
    slug: p.slug,
    title: p.title,
    tagline: taglines[p.slug] ?? '',
  }));

  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>

      {/* Featured Project: Heart DS */}
      <section style={{ padding: '0 4rem' }}>
        <div
          style={{
            marginBottom: '6rem',
            padding: '4rem',
            backgroundColor: 'rgba(123, 94, 167, 0.08)',
            borderRadius: '12px',
            border: '1px solid rgba(123, 94, 167, 0.15)',
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
            {/* Featured image placeholder */}
            <div
              style={{
                backgroundColor: 'rgba(123, 94, 167, 0.1)',
                borderRadius: '8px',
                aspectRatio: '1 / 0.85',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-muted)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Placeholder: Heart DS Hero Image
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
                }}
              >
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
                hoverOpacity={0.85}
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                  borderRadius: '6px',
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
