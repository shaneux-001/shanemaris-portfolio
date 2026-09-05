'use client';

/**
 * The footer differs by design system: Press Room pages (Home, Work index,
 * About, Contact, Resume, Proof Before Progress + its chapters) get the new
 * "Want to work together?" CTA band. Every other route — /work/[slug], the
 * Heart DS chapter pages, /labs — keeps the original plain copyright +
 * dark-mode toggle footer, since their content still uses the pre-redesign
 * token system and already carries its own CTA where relevant. Stacking the
 * new CTA band under those would just duplicate it.
 */

import { usePathname } from 'next/navigation';
import PressCta from './PressCta';
import ThemeToggle from '@/components/ThemeToggle';

const PRESS_ROOM_ROUTES = new Set(['/', '/work', '/about', '/contact', '/resume']);
const PRESS_ROOM_PREFIXES = ['/work/proof-before-progress'];

export default function SiteFooter() {
  const pathname = usePathname();
  const isPressRoom =
    PRESS_ROOM_ROUTES.has(pathname ?? '') ||
    PRESS_ROOM_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  if (isPressRoom) {
    return (
      <footer className="border-t border-pr-rule bg-pr-bg">
        <div className="max-w-[1040px] mx-auto pt-6 px-8 pb-8 flex justify-between items-end gap-6 flex-wrap">
          <div>
            <div className="pr-footer-title font-bold tracking-[-0.025em] text-pr-fg-strong max-w-[22ch] leading-[1.05] mb-2">
              Want to work together?
            </div>
            <p className="m-0 font-plex-mono text-[11px] text-pr-muted">
              © 2026 Shane Maris
            </p>
          </div>
          <PressCta href="/contact" className="whitespace-nowrap">GET IN TOUCH</PressCta>
        </div>
      </footer>
    );
  }

  return (
    <footer
      style={{
        padding: '1.5rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--color-muted)', margin: 0 }}>
        © 2026 Shane Maris
      </p>
      <ThemeToggle />
    </footer>
  );
}
