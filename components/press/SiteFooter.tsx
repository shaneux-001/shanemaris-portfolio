'use client';

/**
 * The footer differs by design system. As of Phase 6 (2026-09-05), Press
 * Room covers everything except the /labs experiments (Konami-gated, not
 * aligned to the design kit, low priority) — so this is an EXCLUDE list now,
 * not an include list. Anything not matched here gets the old plain
 * copyright + dark-mode toggle footer.
 */

import { usePathname } from 'next/navigation';
import PressCta from './PressCta';
import ThemeToggle from '@/components/ThemeToggle';

const OLD_SYSTEM_PREFIXES = ['/labs', '/particle-demo', '/particle-test'];

export default function SiteFooter() {
  const pathname = usePathname();
  const isPressRoom = !OLD_SYSTEM_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

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
