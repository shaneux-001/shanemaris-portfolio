/**
 * Mark — the 3×3 plum-gradient grid logo.
 *
 * Uses currentColor + fill-opacity so the mark inherits whatever color is
 * set on the parent. This lets the same component render as the brand
 * accent in the header, as muted in a footer, or as a duotone duo across
 * the kit's identity demos — without editing the SVG.
 *
 * The favicon SVGs in /public/ are kept hardcoded per the handoff
 * (don't touch favicons unless asked); this component is the in-page
 * version that participates in the design system.
 */

import { CSSProperties } from 'react';

interface MarkProps {
  size?: number;
  color?: string;          // CSS color — defaults to inheriting via currentColor
  ariaLabel?: string;
  style?: CSSProperties;
}

export default function Mark({
  size = 32,
  color,
  ariaLabel,
  style,
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      style={{
        color: color ?? 'var(--color-accent)',
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Row 1 */}
      <rect x="6"  y="6"  width="34" height="34" rx="12" ry="12" fill="currentColor" fillOpacity="0.30" />
      <rect x="47" y="6"  width="34" height="34" rx="12" ry="12" fill="currentColor" fillOpacity="0.45" />
      <rect x="88" y="6"  width="34" height="34" rx="12" ry="12" fill="currentColor" fillOpacity="0.60" />
      {/* Row 2 */}
      <rect x="6"  y="47" width="34" height="34" rx="12" ry="12" fill="currentColor" fillOpacity="0.45" />
      <rect x="47" y="47" width="34" height="34" rx="12" ry="12" fill="currentColor" fillOpacity="0.60" />
      <rect x="88" y="47" width="34" height="34" rx="12" ry="12" fill="currentColor" fillOpacity="0.75" />
      {/* Row 3 */}
      <rect x="6"  y="88" width="34" height="34" rx="12" ry="12" fill="currentColor" fillOpacity="0.60" />
      <rect x="47" y="88" width="34" height="34" rx="12" ry="12" fill="currentColor" fillOpacity="0.75" />
      <rect x="88" y="88" width="34" height="34" rx="12" ry="12" fill="currentColor" fillOpacity="0.90" />
    </svg>
  );
}
