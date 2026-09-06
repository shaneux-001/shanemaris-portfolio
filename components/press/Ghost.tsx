import { ReactNode } from 'react';

/**
 * Renders cyan + magenta duplicates of `children` stacked under the real
 * text — the misregistration effect from the Press Room mark lab.
 *
 * trigger="hover" (default): combined with `.pr-hoverable` on an ancestor,
 * hovering/focusing that ancestor flashes the duplicates offset and lets
 * them settle back into register. Used on nav links and button labels.
 *
 * trigger="load": flashes once automatically on paint via `.pr-ghost-onload`
 * instead of a hover/focus gate — no client component needed, pure CSS.
 * Used on H1–H3 headings so the glitch reads as a one-time "print registration
 * settling" moment when the page loads, not something you have to hover to see.
 */
export default function Ghost({ children, trigger = 'hover' }: { children: ReactNode; trigger?: 'hover' | 'load' }) {
  return (
    <span className={trigger === 'load' ? 'pr-ghost pr-ghost-onload' : 'pr-ghost'}>
      <span className="pr-ghost-c" aria-hidden="true">{children}</span>
      <span className="pr-ghost-m" aria-hidden="true">{children}</span>
      <span className="pr-ghost-real">{children}</span>
    </span>
  );
}
