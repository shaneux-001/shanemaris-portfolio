import { ReactNode } from 'react';

/**
 * Renders cyan + magenta duplicates of `children` stacked under the real
 * text. Combined with the `.pr-hoverable` class on an ancestor element,
 * hovering/focusing that ancestor flashes the duplicates offset and lets
 * them settle back into register (see .pr-ghost-c/.pr-ghost-m keyframes
 * in globals.css) — the misregistration effect from the Press Room mark
 * lab, applied to nav links and button labels.
 */
export default function Ghost({ children }: { children: ReactNode }) {
  return (
    <span className="pr-ghost">
      <span className="pr-ghost-c" aria-hidden="true">{children}</span>
      <span className="pr-ghost-m" aria-hidden="true">{children}</span>
      <span className="pr-ghost-real">{children}</span>
    </span>
  );
}
