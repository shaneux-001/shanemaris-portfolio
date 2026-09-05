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
    <div className="pr-main pt-[clamp(36px,5vw,56px)]">
      <h1 className="pr-page-title m-0 mb-[14px] font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong">
        Work
      </h1>
      <p className="pr-page-lede m-0 mb-9 leading-[1.65] text-pr-lede max-w-[52ch]">
        Systems and product work at Southwest Airlines.
      </p>

      {visibleProjects.length === 0 ? (
        <p className="font-plex-mono text-[13px] text-pr-muted border-t border-pr-rule pt-6">
          More case studies in progress.
        </p>
      ) : (
        <div className="flex flex-col">
          {visibleProjects.map((p) => {
            const meta = (p.tags ?? []).slice(0, 3).join(' · ').toUpperCase();
            return (
              <Link key={p.slug} href={`/work/${p.slug}`} className="pr-arrow-link pr-hoverable">
                {/* Wide row */}
                <span className="pr-row-link pr-row-wide grid-cols-[minmax(0,1fr)_220px_24px]">
                  <span className="text-2xl font-semibold tracking-[-0.02em] text-pr-fg-strong">{p.title}</span>
                  <span className="font-plex-mono text-[11px] text-pr-muted tracking-[0.04em] text-right">{meta}</span>
                  <span className="pr-row-arrow font-plex-mono text-[13px] text-pr-accent-text text-right" aria-hidden="true">→</span>
                </span>
                {/* Narrow row */}
                <span className="pr-row-link pr-row-narrow flex-col gap-1.5 py-4 pr-2.5">
                  <span className="flex items-baseline justify-between gap-3.5">
                    <span className="text-xl font-semibold tracking-[-0.02em] text-pr-fg-strong min-w-0">{p.title}</span>
                    <span className="pr-row-arrow font-plex-mono text-[13px] text-pr-accent-text" aria-hidden="true">→</span>
                  </span>
                  <span className="font-plex-mono text-[10.5px] text-pr-muted tracking-[0.04em] min-w-0">{meta}</span>
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
