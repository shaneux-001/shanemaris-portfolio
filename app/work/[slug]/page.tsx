/**
 * Case study detail page — SERVER COMPONENT. Press Room theme (converted
 * 2026-09-05 — was the pre-redesign plum/Playfair system before this).
 * Reads content from content/work/[slug].md via lib/parseProjectMd.ts.
 *
 * Image wiring: fs.existsSync checks public/work/[slug]/ at request time.
 * Drop hero.jpg or section-N.jpg into the folder and refresh — no restart needed.
 */

import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Clock, CalendarBlank, Monitor } from '@phosphor-icons/react/dist/ssr';
import { portfolioProjects } from '@/lib/projects';
import { getProjectMd } from '@/lib/parseProjectMd';
import PressCta from '@/components/press/PressCta';
import Ghost from '@/components/press/Ghost';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Case Study" };

  const md = getProjectMd(slug);
  const description = md?.tagline ?? `A case study by Shane Maris — ${project.title}`;

  return {
    title: project.title,
    description,
    openGraph: {
      title: `${project.title} · Shane Maris`,
      description,
      url: `https://shanemaris.com/work/${slug}`,
    },
    twitter: {
      title: `${project.title} · Shane Maris`,
      description,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="pr-page">
        <div className="pr-main pt-[clamp(36px,5vw,56px)]">
          <h1 className="font-archivo text-3xl font-bold text-pr-fg-strong mb-4">Project not found</h1>
          <Link href="/work" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline">
            <Ghost>← BACK TO WORK</Ghost>
          </Link>
        </div>
      </main>
    );
  }

  const content = getProjectMd(slug);

  // Image existence checks — evaluated at request time; no dev-server restart needed.
  const workDir = path.join(process.cwd(), 'public', 'work', slug);
  const hasHeroImg = fs.existsSync(path.join(workDir, 'hero.jpg'));
  const sectionImgExists: boolean[] = content?.sections.map((_, i) =>
    fs.existsSync(path.join(workDir, `section-${i + 1}.jpg`))
  ) ?? [];

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">

        {/* ── Header ── */}
        <Link href="/work" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO WORK</Ghost>
        </Link>

        {content?.eyebrow && (
          <p className="font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5 mt-0 uppercase">
            {content.eyebrow}
          </p>
        )}

        <h1 className="pr-page-title font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong mb-2 mt-0 max-w-[26ch]">
          {project.title}
        </h1>

        {/* Meta row */}
        <div className="font-plex-mono text-[12.5px] text-pr-muted mb-0 mt-3 flex flex-wrap gap-5 items-center">
          {content ? (
            <>
              {content.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} color="var(--pr-muted)" />
                  {content.readTime} read
                </span>
              )}
              {content.timeline && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlank size={14} color="var(--pr-muted)" />
                  {content.timeline}
                </span>
              )}
              {content.platform && (
                <span className="inline-flex items-center gap-1.5">
                  <Monitor size={14} color="var(--pr-muted)" />
                  {content.platform}
                </span>
              )}
              {content.role && (
                <span className="opacity-85">{content.role}</span>
              )}
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} color="var(--pr-muted)" />
              3 minutes read
            </span>
          )}
        </div>

        {/* ── Hero image ── */}
        <div className="aspect-[1/0.56] mt-8 mb-14 overflow-hidden relative flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
          {hasHeroImg ? (
            <img
              src={`/work/${slug}/hero.jpg`}
              alt={`${project.title} — Hero`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">hero.jpg</span>
          )}
        </div>

        {/* ── Case study body ── */}
        <div className="max-w-[62ch]">
          {content ? (
            <>
              {/* Summary */}
              <p className="leading-[1.8] mt-0 mb-10 text-[17px] text-pr-lede">
                {content.summary}
              </p>

              {/* Sections */}
              {content.sections.map((section, i) => (
                <div key={section.heading}>
                  <h2 className="font-archivo text-2xl font-bold text-pr-fg-strong mb-4 mt-0 tracking-[-0.02em]">
                    {section.heading}
                  </h2>

                  <p className="leading-[1.8] mt-0 mb-0 text-[15.5px] text-pr-lede break-words">
                    {section.body}
                  </p>

                  {/* Image between sections (not after the last) */}
                  {i < content.sections.length - 1 && (
                    <div className="aspect-[1.5/1] my-12 overflow-hidden relative flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
                      {sectionImgExists[i] ? (
                        <img
                          src={`/work/${slug}/section-${i + 1}.jpg`}
                          alt={`${section.heading} — image`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-plex-mono text-[11px] text-pr-muted">section-{i + 1}.jpg</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            /* Fallback for slugs without a content file yet */
            <p className="text-pr-lede">Case study coming soon.</p>
          )}
        </div>

        {/* ── Footer link ── */}
        <div className="mt-16 pt-6 border-t border-pr-rule">
          <PressCta href="/work">BACK TO WORK</PressCta>
        </div>

      </div>
    </main>
  );
}
