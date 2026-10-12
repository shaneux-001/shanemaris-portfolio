import { resolve, type Mode } from './tokens';
import type { Token } from './types';

/*
 * Foundations are views over the token store, not separate data. Type
 * roles reference size/weight/line-height tokens by name, and the contrast
 * checks resolve real token values, so a token edit re-scores everything.
 */

export interface FoundationMeta {
  slug: string;
  name: string;
  description: string;
}

export const FOUNDATIONS: FoundationMeta[] = [
  { slug: 'color', name: 'Color', description: 'Palette ramps, semantic roles for both themes, and live contrast checks.' },
  { slug: 'typography', name: 'Typography', description: 'Typeface, type scale and the roles components use.' },
  { slug: 'spacing', name: 'Spacing', description: 'The 4px-based spacing scale and control sizing.' },
  { slug: 'radius', name: 'Radius', description: 'Corner radius scale and which components use which step.' },
  { slug: 'elevation', name: 'Elevation', description: 'Shadow levels for raised surfaces and overlays.' },
  { slug: 'motion', name: 'Motion', description: 'Durations and when to animate — and when not to.' },
  { slug: 'iconography', name: 'Iconography', description: 'Icon grid, sizes and labelling rules.' },
];

export interface TypeRole {
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
  usage: string;
  sample: string;
}

export const TYPE_ROLES: TypeRole[] = [
  { name: 'Display', size: 'font.size.xl', weight: 'font.weight.bold', lineHeight: 'font.lineHeight.tight', usage: 'Page titles and hero moments. One per screen.', sample: 'Book trusted help at home' },
  { name: 'Title', size: 'font.size.lg', weight: 'font.weight.bold', lineHeight: 'font.lineHeight.tight', usage: 'Section headings, modal and sheet titles.', sample: 'Upcoming bookings' },
  { name: 'Body', size: 'font.size.md', weight: 'font.weight.regular', lineHeight: 'font.lineHeight.body', usage: 'Default reading text and form input.', sample: 'Your provider will arrive between 9 and 10 AM. You can reschedule up to 24 hours before.' },
  { name: 'Label', size: 'font.size.sm', weight: 'font.weight.medium', lineHeight: 'font.lineHeight.body', usage: 'Form labels, buttons, tabs, list metadata.', sample: 'Email address' },
  { name: 'Caption', size: 'font.size.xs', weight: 'font.weight.regular', lineHeight: 'font.lineHeight.body', usage: 'Helper text, timestamps, counts. Never for essential information.', sample: 'Updated 2 minutes ago' },
];

// ── WCAG contrast ───────────────────────────────────────────────

function luminance(hex: string): number | null {
  const m = hex.trim().match(/^#([0-9a-f]{6})$/i);
  if (!m) return null;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number | null {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export interface ContrastPair {
  label: string;
  fg: string;
  bg: string;
  /** 4.5 for text, 3 for large text / UI components (WCAG 2.2 AA). */
  min: number;
}

export const CONTRAST_PAIRS: ContrastPair[] = [
  { label: 'Primary text on page', fg: 'color.text.primary', bg: 'color.surface.default', min: 4.5 },
  { label: 'Secondary text on page', fg: 'color.text.secondary', bg: 'color.surface.default', min: 4.5 },
  { label: 'Secondary text on subtle surface', fg: 'color.text.secondary', bg: 'color.surface.subtle', min: 4.5 },
  { label: 'Link on page', fg: 'color.text.link', bg: 'color.surface.default', min: 4.5 },
  { label: 'Primary button label', fg: 'color.action.primary.fg', bg: 'color.action.primary.bg', min: 4.5 },
  { label: 'Secondary button label', fg: 'color.action.secondary.fg', bg: 'color.action.secondary.bg', min: 4.5 },
  { label: 'Danger button label', fg: 'color.action.danger.fg', bg: 'color.action.danger.bg', min: 4.5 },
  { label: 'Toast text', fg: 'color.text.inverse', bg: 'color.surface.inverse', min: 4.5 },
  { label: 'Info message', fg: 'color.feedback.info.fg', bg: 'color.feedback.info.bg', min: 4.5 },
  { label: 'Success message', fg: 'color.feedback.success.fg', bg: 'color.feedback.success.bg', min: 4.5 },
  { label: 'Warning message', fg: 'color.feedback.warning.fg', bg: 'color.feedback.warning.bg', min: 4.5 },
  { label: 'Danger message', fg: 'color.feedback.danger.fg', bg: 'color.feedback.danger.bg', min: 4.5 },
  { label: 'Input border on page', fg: 'color.border.default', bg: 'color.surface.default', min: 3 },
  { label: 'Focus ring on page', fg: 'color.border.focus', bg: 'color.surface.default', min: 3 },
];

export interface ContrastResult extends ContrastPair {
  mode: Mode;
  fgValue: string;
  bgValue: string;
  ratio: number | null;
  pass: boolean;
}

export function contrastChecks(tokens: Token[]): ContrastResult[] {
  const map = new Map(tokens.map((t) => [t.name, t]));
  return (['light', 'dark'] as Mode[]).flatMap((mode) =>
    CONTRAST_PAIRS.map((p) => {
      const fgValue = resolve(map, p.fg, mode);
      const bgValue = resolve(map, p.bg, mode);
      const ratio = contrastRatio(fgValue, bgValue);
      return { ...p, mode, fgValue, bgValue, ratio, pass: ratio !== null && ratio >= p.min };
    }),
  );
}
