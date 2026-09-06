'use client';

/**
 * Extracted from app/layout.tsx (2026-09-06) so it can opt out per-route —
 * mirrors SiteFooter.tsx's OLD_SYSTEM_PREFIXES pattern. /labs gets its own
 * header (LabsHeader.tsx, same visual system, different wordmark/links)
 * instead of this one; previously both rendered at once and collided.
 */

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PressMark from './PressMark';
import PressNavLink from './PressNavLink';
import PressThemeToggle from './PressThemeToggle';

const OLD_SYSTEM_PREFIXES = ['/labs', '/particle-demo', '/particle-test'];

export default function SiteHeader() {
  const pathname = usePathname();
  const isPressRoom = !OLD_SYSTEM_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  if (!isPressRoom) return null;

  return (
    <header className="pr-header">
      <Link
        href="/"
        aria-label="Shane Maris — home"
        className="pr-mark-btn flex items-center gap-3 p-1 -m-1 text-inherit"
      >
        <PressMark size={24} />
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-pr-fg-strong">
          Shane Maris
        </span>
      </Link>
      <nav className="flex gap-1 items-center font-plex-mono text-xs tracking-[0.04em]">
        <PressNavLink href="/work">Work</PressNavLink>
        <PressNavLink href="/about">About</PressNavLink>
        <PressNavLink href="/contact">Contact</PressNavLink>
        <PressThemeToggle />
      </nav>
    </header>
  );
}
