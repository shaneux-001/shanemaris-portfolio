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
      <footer style={{ borderTop: '1px solid var(--pr-rule)', background: 'var(--pr-bg)' }}>
        <div
          style={{
            maxWidth: 1040,
            margin: '0 auto',
            padding: '24px 2rem 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              className="pr-footer-title"
              style={{ fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--pr-fg-strong)', maxWidth: '22ch', lineHeight: 1.05, marginBottom: 8 }}
            >
              Want to work together?
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-muted)' }}>
              © 2026 Shane Maris
            </p>
          </div>
          <PressCta href="/contact" style={{ whiteSpace: 'nowrap' }}>GET IN TOUCH</PressCta>
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
