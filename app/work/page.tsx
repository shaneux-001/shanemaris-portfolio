/**
 * Work index — SERVER COMPONENT. Typographic index, not a card grid:
 * every project (including the featured Heart DS) is a row with title,
 * tag metadata, and an arrow. The "editorial lead treatment" for Heart
 * DS lives on the home page's Lead Case Study section instead — see
 * app/page.tsx. Do NOT add 'use client' here (fs is used at request time
 * elsewhere in this file's siblings); this page itself only reads from
 * lib/projects.ts, but keep the server-component convention per HANDOFF.
 */

import type { Metadata } from "next";
import Link from 'next/link';
import { portfolioProjects } from '@/lib/projects';

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

const visibleProjects = portfolioProjects.filter(p => !p.hidden);

export default function WorkPage() {
  return (
    <main className="pr-page">
    <div className="pr-main" style={{ paddingTop: 'clamp(36px, 5vw, 56px)' }}>
      <h1 className="pr-page-title" style={{ margin: '0 0 14px', fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--pr-fg-strong)' }}>
        Work
      </h1>
      <p className="pr-page-lede" style={{ margin: '0 0 36px', lineHeight: 1.65, color: 'var(--pr-lede)', maxWidth: '52ch' }}>
        Systems and product work at Southwest Airlines.
      </p>

      {visibleProjects.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 13, color: 'var(--pr-muted)', borderTop: '1px solid var(--pr-rule)', paddingTop: 24 }}>
          More case studies in progress.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {visibleProjects.map((p) => {
            const meta = (p.tags ?? []).slice(0, 3).join(' · ').toUpperCase();
            return (
              <Link key={p.slug} href={`/work/${p.slug}`} className="pr-arrow-link pr-hoverable">
                {/* Wide row */}
                <span
                  className="pr-row-link pr-row-wide"
                  style={{ gridTemplateColumns: 'minmax(0,1fr) 220px 24px' }}
                >
                  <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--pr-fg-strong)' }}>{p.title}</span>
                  <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-muted)', letterSpacing: '0.04em', textAlign: 'right' }}>{meta}</span>
                  <span className="pr-row-arrow" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 13, color: 'var(--pr-accent-text)', textAlign: 'right' }} aria-hidden="true">→</span>
                </span>
                {/* Narrow row */}
                <span className="pr-row-link pr-row-narrow" style={{ flexDirection: 'column', gap: 6, padding: '16px 10px 16px 0' }}>
                  <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14 }}>
                    <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--pr-fg-strong)', minWidth: 0 }}>{p.title}</span>
                    <span className="pr-row-arrow" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 13, color: 'var(--pr-accent-text)' }} aria-hidden="true">→</span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: '10.5px', color: 'var(--pr-muted)', letterSpacing: '0.04em', minWidth: 0 }}>{meta}</span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
    </main>
  );
}
