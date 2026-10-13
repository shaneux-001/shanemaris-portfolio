import type { Token, TokenTier, TokenType } from '../types';

/*
 * Three tiers: primitives (raw palette/scale) → semantic (intent, themed)
 * → component (scoped overrides). Components only ever reference semantic
 * or component tokens; that rule is what makes theming and density work.
 */

const t = (name: string, tier: TokenTier, type: TokenType, value: Token['value'], description?: string): Token => ({ name, tier, type, value, description });

const scale = (hue: string, stops: Record<string, string>): Token[] =>
  Object.entries(stops).map(([k, v]) => t(`color.${hue}.${k}`, 'primitive', 'color', v));

export const tokens: Token[] = [
  // ── Primitives ─────────────────────────────────────────────
  // Daedalus palette. Each brand hue is a 50–950 ramp built in OKLCH: even
  // perceptual lightness steps, chroma tapering toward the ends, and the
  // chosen brand color kept exact at its natural step (indigo 800 —
  // #4B2FA4, Shane's #2F39A9 nudged 15° toward purple — steel
  // 600, lagoon 500, mint 300). Neutral is tinted with the original, bluer indigo ("cool"), with
  // lightness matched to the previous grays so text contrast carries over.
  // Coral and amber cover the danger/warning roles the palette doesn't.
  ...scale('neutral', { '0': '#ffffff', '50': '#f6f8fd', '100': '#edeff6', '200': '#dbdee8', '300': '#bcc0ce', '400': '#8f95a6', '500': '#666b7c', '600': '#4f5362', '700': '#3a3e4a', '800': '#272a33', '900': '#191b21', '950': '#0f1013' }),
  ...scale('indigo', { '50': '#f6f6ff', '100': '#ecebf9', '200': '#d8d7f4', '300': '#c1beed', '400': '#a39fe1', '500': '#887fd3', '600': '#6e60c3', '700': '#5943b2', '800': '#4b2fa4', '900': '#311774', '950': '#1f1348' }),
  ...scale('steel', { '50': '#f2f7fc', '100': '#e6eef5', '200': '#ccddec', '300': '#acc8e0', '400': '#84adcf', '500': '#5e92bc', '600': '#2e6fa0', '700': '#1e5f8e', '800': '#0e4971', '900': '#0a3350', '950': '#0b2132' }),
  ...scale('lagoon', { '50': '#f2f8fa', '100': '#e1f0f4', '200': '#c1e1ea', '300': '#9acedd', '400': '#67b5c9', '500': '#49a4bb', '600': '#247e93', '700': '#126578', '800': '#094d5c', '900': '#093641', '950': '#0b2329' }),
  ...scale('mint', { '50': '#eefaf6', '100': '#d2f6eb', '200': '#9ceed6', '300': '#15d8b3', '400': '#04c3a1', '500': '#0ba387', '600': '#02856d', '700': '#016b57', '800': '#015242', '900': '#003a2e', '950': '#00261e' }),
  ...scale('coral', { '50': '#fef4f2', '100': '#fee7e1', '200': '#ffcec2', '300': '#fcad9c', '400': '#f2846d', '500': '#e25b40', '600': '#d6462a', '700': '#a52103', '800': '#811500', '900': '#5c0f02', '950': '#3a0f07' }),
  ...scale('amber', { '50': '#fcf6ee', '100': '#fbead4', '200': '#f7d5a5', '300': '#f0b96a', '400': '#e09a12', '500': '#ba7f04', '600': '#986602', '700': '#7a5202', '800': '#5e3e01', '900': '#432b00', '950': '#2c1b01' }),

  t('space.0', 'primitive', 'dimension', '0px'),
  t('space.1', 'primitive', 'dimension', '4px'),
  t('space.2', 'primitive', 'dimension', '8px'),
  t('space.3', 'primitive', 'dimension', '12px'),
  t('space.4', 'primitive', 'dimension', '16px'),
  t('space.5', 'primitive', 'dimension', '20px'),
  t('space.6', 'primitive', 'dimension', '24px'),
  t('space.8', 'primitive', 'dimension', '32px'),
  t('space.12', 'primitive', 'dimension', '48px'),

  t('radius.sm', 'primitive', 'dimension', '4px'),
  t('radius.md', 'primitive', 'dimension', '8px'),
  t('radius.lg', 'primitive', 'dimension', '12px'),
  t('radius.full', 'primitive', 'dimension', '999px'),

  t('font.family.sans', 'primitive', 'fontFamily', "Figtree, 'Segoe UI', system-ui, sans-serif"),
  t('font.family.mono', 'primitive', 'fontFamily', "'JetBrains Mono', ui-monospace, monospace"),
  t('font.weight.regular', 'primitive', 'fontWeight', '400'),
  t('font.weight.medium', 'primitive', 'fontWeight', '500'),
  t('font.weight.bold', 'primitive', 'fontWeight', '650'),
  t('font.size.xs', 'primitive', 'fontSize', '12px'),
  t('font.size.sm', 'primitive', 'fontSize', '14px'),
  t('font.size.md', 'primitive', 'fontSize', '16px'),
  t('font.size.lg', 'primitive', 'fontSize', '20px'),
  t('font.size.xl', 'primitive', 'fontSize', '28px'),
  t('font.lineHeight.tight', 'primitive', 'lineHeight', '1.25'),
  t('font.lineHeight.body', 'primitive', 'lineHeight', '1.5'),

  t('duration.fast', 'primitive', 'duration', '120ms'),
  t('duration.base', 'primitive', 'duration', '200ms'),
  t('duration.toast', 'primitive', 'duration', '6000ms', 'How long a Toast stays visible.'),

  // ── Semantic (themed) ──────────────────────────────────────
  t('color.surface.default', 'semantic', 'color', { light: '{color.neutral.0}', dark: '{color.neutral.900}' }, 'Page background.'),
  t('color.surface.subtle', 'semantic', 'color', { light: '{color.neutral.50}', dark: '{color.neutral.950}' }, 'Recessed areas, wells.'),
  t('color.surface.raised', 'semantic', 'color', { light: '{color.neutral.0}', dark: '{color.neutral.800}' }, 'Cards, modals, menus.'),
  t('color.surface.inverse', 'semantic', 'color', { light: '{color.neutral.900}', dark: '{color.neutral.50}' }, 'Toasts and tooltips.'),
  t('color.text.primary', 'semantic', 'color', { light: '{color.neutral.900}', dark: '{color.neutral.50}' }),
  t('color.text.secondary', 'semantic', 'color', { light: '{color.neutral.600}', dark: '{color.neutral.300}' }),
  t('color.text.inverse', 'semantic', 'color', { light: '{color.neutral.0}', dark: '{color.neutral.900}' }),
  t('color.text.link', 'semantic', 'color', { light: '{color.indigo.700}', dark: '{color.indigo.300}' }),
  t('color.icon.default', 'semantic', 'color', { light: '{color.neutral.600}', dark: '{color.neutral.300}' }),
  t('color.border.subtle', 'semantic', 'color', { light: '{color.neutral.100}', dark: '{color.neutral.700}' }),
  t('color.border.default', 'semantic', 'color', { light: '{color.neutral.300}', dark: '{color.neutral.600}' }),
  t('color.border.focus', 'semantic', 'color', { light: '{color.lagoon.600}', dark: '{color.lagoon.300}' }, 'Focus ring. Lagoon, so focus never reads as a selected primary. Must meet 3:1 against adjacent colors.'),
  t('color.action.primary.bg', 'semantic', 'color', { light: '{color.indigo.800}', dark: '{color.indigo.300}' }, 'Daedalus indigo.'),
  t('color.action.primary.bgHover', 'semantic', 'color', { light: '{color.indigo.900}', dark: '{color.indigo.200}' }),
  t('color.action.primary.fg', 'semantic', 'color', { light: '{color.neutral.0}', dark: '{color.neutral.950}' }),
  t('color.action.secondary.bg', 'semantic', 'color', { light: '{color.neutral.100}', dark: '{color.neutral.700}' }),
  t('color.action.secondary.fg', 'semantic', 'color', { light: '{color.neutral.900}', dark: '{color.neutral.50}' }),
  t('color.action.danger.bg', 'semantic', 'color', { light: '{color.coral.700}', dark: '{color.coral.500}' }),
  t('color.action.danger.fg', 'semantic', 'color', { light: '{color.neutral.0}', dark: '{color.neutral.950}' }),
  t('color.feedback.info.bg', 'semantic', 'color', { light: '{color.steel.50}', dark: '{color.steel.950}' }),
  t('color.feedback.info.fg', 'semantic', 'color', { light: '{color.steel.700}', dark: '{color.steel.100}' }),
  t('color.feedback.success.bg', 'semantic', 'color', { light: '{color.mint.50}', dark: '{color.mint.950}' }),
  t('color.feedback.success.fg', 'semantic', 'color', { light: '{color.mint.800}', dark: '{color.mint.200}' }),
  t('color.feedback.warning.bg', 'semantic', 'color', { light: '{color.amber.50}', dark: '{color.amber.950}' }),
  t('color.feedback.warning.fg', 'semantic', 'color', { light: '{color.amber.700}', dark: '{color.amber.100}' }),
  t('color.feedback.danger.bg', 'semantic', 'color', { light: '{color.coral.50}', dark: '{color.coral.950}' }),
  t('color.feedback.danger.fg', 'semantic', 'color', { light: '{color.coral.700}', dark: '{color.coral.100}' }),

  t('shadow.card', 'semantic', 'shadow', { light: '0 1px 2px rgba(21,26,34,.06), 0 2px 8px rgba(21,26,34,.06)', dark: '0 1px 2px rgba(0,0,0,.4)' }),
  t('shadow.overlay', 'semantic', 'shadow', { light: '0 12px 40px rgba(21,26,34,.18)', dark: '0 12px 40px rgba(0,0,0,.6)' }),

  t('radius.control', 'semantic', 'dimension', '{radius.md}', 'Buttons, inputs, selects.'),
  t('space.control.x', 'semantic', 'dimension', '{space.4}', 'Horizontal padding inside controls.'),
  t('space.control.height', 'semantic', 'dimension', '40px', 'Default control height (md).'),
  t('font.size.body', 'semantic', 'fontSize', '{font.size.md}'),
  t('font.size.label', 'semantic', 'fontSize', '{font.size.sm}'),

  // ── Component ──────────────────────────────────────────────
  t('button.radius', 'component', 'dimension', '{radius.control}'),
  t('button.height.sm', 'component', 'dimension', '32px'),
  t('button.height.lg', 'component', 'dimension', '48px'),
  t('card.radius', 'component', 'dimension', '{radius.lg}'),
  t('card.padding', 'component', 'dimension', '{space.5}'),
  t('badge.radius', 'component', 'dimension', '{radius.full}'),
  t('toast.radius', 'component', 'dimension', '{radius.md}'),
  t('modal.radius', 'component', 'dimension', '{radius.lg}'),
];
