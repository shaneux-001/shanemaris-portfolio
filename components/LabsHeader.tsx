'use client';

/**
 * /labs' own header — same Press Room visual system as SiteHeader.tsx
 * (which opts out for /labs, see OLD_SYSTEM_PREFIXES there), but the
 * mark/wordmark link home to /labs instead of /, with a "(labs)" tag so
 * it's clear you've left the main site, plus an explicit way back.
 */

import Link from 'next/link';
import PressMark from '@/components/press/PressMark';
import PressNavLink from '@/components/press/PressNavLink';

export default function LabsHeader() {
  return (
    <header className="pr-header">
      <Link
        href="/labs"
        aria-label="Shane Maris Labs — home"
        className="pr-mark-btn flex items-center gap-3 p-1 -m-1 text-inherit"
      >
        <PressMark size={24} />
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-pr-fg-strong">
          Shane Maris <span className="font-normal text-pr-muted">(labs)</span>
        </span>
      </Link>
      <nav className="flex gap-1 items-center font-plex-mono text-xs tracking-[0.04em]">
        <PressNavLink href="/">Main Site</PressNavLink>
        <PressNavLink href="/work">Work</PressNavLink>
        <PressNavLink href="/contact">Contact</PressNavLink>
      </nav>
    </header>
  );
}
