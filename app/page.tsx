'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { initKonamiCode } from '@/lib/konami';
import PressCta from '@/components/press/PressCta';
import Ghost from '@/components/press/Ghost';

export default function Home() {
  useEffect(() => {
    const cleanup = initKonamiCode(() => {
      window.location.href = '/labs';
    });
    return cleanup;
  }, []);

  return (
    <main className="pr-page">
      <div className="pr-main">
      <div className="relative overflow-hidden pt-[clamp(40px,6vw,68px)] pb-[clamp(40px,5vw,56px)]">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-6 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-r border-pr-grid-line" />
          ))}
          <div />
        </div>
        {/* Full-bleed wrapper: these two blobs need the full viewport width to
            fade out in, not .pr-main's padded content box — otherwise the
            gradient gets clipped by overflow-hidden before it reaches full
            transparency, producing a hard-edged seam instead of a soft bleed. */}
        <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none">
          <div
            className="absolute left-[60px] top-[30px] w-[470px] h-[210px] blur-[30px] will-change-transform [animation:pr-drift-a_14s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_42%_50%,var(--pr-glow-a),transparent_66%)]"
          />
          <div
            className="absolute left-[280px] top-[130px] w-[430px] h-[195px] blur-[30px] will-change-transform [animation:pr-drift-b_18s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_55%_50%,var(--pr-glow-b),transparent_66%)]"
          />
        </div>

        <div className="relative flex flex-col gap-[22px] max-w-[680px]">
          <div className="flex items-center gap-[10px] font-plex-mono text-[11px] tracking-[0.1em] text-pr-muted">
            <span className="w-3.5 h-px bg-pr-cyan" />
            <span>DESIGN OPS &amp; SYSTEMS · SOUTHWEST AIRLINES</span>
          </div>
          <h1 className="pr-hero-title m-0 font-archivo font-bold leading-[0.98] tracking-[-0.035em] text-pr-fg-strong">
            <Ghost trigger="load">I design systems that scale.</Ghost>
          </h1>
          <p className="pr-lede m-0 leading-[1.6] text-pr-lede max-w-[44ch]">
            Building the foundations product teams rely on at Southwest Airlines.
          </p>
          <div className="flex gap-[10px] items-center flex-wrap pt-1">
            <PressCta href="/resume">VIEW RESUME</PressCta>
            <PressCta href="/about" variant="secondary">ABOUT ME</PressCta>
          </div>
        </div>
      </div>

      <div className="border-t border-pr-rule pt-[clamp(32px,4vw,40px)] pb-[clamp(30px,4vw,36px)]">
        <div className="flex items-center gap-[10px] font-plex-mono text-[11px] tracking-[0.1em] text-pr-magenta mb-[18px]">
          <span className="w-3.5 h-px bg-pr-magenta" />
          <span>LEAD CASE STUDY</span>
        </div>
        <div className="pr-lead-grid">
          <div className="aspect-[4/3] min-w-0 flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            <span className="font-plex-mono text-[11px] text-pr-muted">heart-ds-hero.jpg</span>
          </div>
          <div className="flex flex-col gap-3.5 min-w-0">
            <h2 className="pr-lead-title m-0 font-archivo font-bold leading-[1.02] tracking-[-0.025em] text-pr-fg-strong">
              <Ghost trigger="load">Heart Design System</Ghost>
            </h2>
            <p className="m-0 text-[15px] leading-[1.7] text-pr-lede">
              From grassroots effort to enterprise-scale design infrastructure. How I built and scaled Heart across web, iOS, and Android platforms at Southwest Airlines.
            </p>
            <div className="flex gap-2 flex-wrap font-plex-mono text-[11px] tracking-[0.04em]">
              <span className="border border-pr-cyan text-pr-cyan px-2 py-1">WEB</span>
              <span className="border border-pr-rule-strong text-pr-muted px-2 py-1">iOS</span>
              <span className="border border-pr-rule-strong text-pr-muted px-2 py-1">ANDROID</span>
            </div>
            <Link
              href="/work/heart-design-system"
              className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text border-b border-pr-accent-text pb-[3px] self-start mt-1 no-underline"
            >
              <Ghost>READ FULL CASE STUDY</Ghost> <span className="pr-row-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
