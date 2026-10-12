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
  ...scale('neutral', { '0': '#ffffff', '50': '#f6f7f9', '100': '#eceef2', '200': '#d9dde4', '300': '#b8bfcb', '400': '#8c95a5', '500': '#646e80', '600': '#4a5363', '700': '#353c49', '800': '#222833', '900': '#151a22', '950': '#0c1016' }),
  ...scale('teal', { '50': '#e8f7f5', '100': '#c5ece6', '300': '#6fd0c1', '500': '#14a08c', '600': '#0b8574', '700': '#08695c', '800': '#064f46' }),
  ...scale('coral', { '50': '#fff0ec', '100': '#ffd9cf', '500': '#f2603f', '600': '#d6462a', '700': '#b03520' }),
  ...scale('amber', { '50': '#fff7e6', '100': '#ffe8b8', '500': '#e09a12', '700': '#94620a' }),
  ...scale('green', { '50': '#eaf8ee', '100': '#c9edd4', '500': '#2f9e57', '700': '#1d6b3a' }),
  ...scale('blue', { '50': '#ebf3ff', '100': '#cfe1ff', '500': '#3b7ddd', '700': '#2257a8' }),

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

  t('font.family.sans', 'primitive', 'fontFamily', "'Inter Tight', 'Segoe UI', system-ui, sans-serif"),
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
  t('color.text.link', 'semantic', 'color', { light: '{color.teal.700}', dark: '{color.teal.300}' }),
  t('color.icon.default', 'semantic', 'color', { light: '{color.neutral.600}', dark: '{color.neutral.300}' }),
  t('color.border.subtle', 'semantic', 'color', { light: '{color.neutral.100}', dark: '{color.neutral.700}' }),
  t('color.border.default', 'semantic', 'color', { light: '{color.neutral.300}', dark: '{color.neutral.600}' }),
  t('color.border.focus', 'semantic', 'color', { light: '{color.teal.600}', dark: '{color.teal.300}' }, 'Focus ring. Must meet 3:1 against adjacent colors.'),
  t('color.action.primary.bg', 'semantic', 'color', { light: '{color.teal.700}', dark: '{color.teal.300}' }),
  t('color.action.primary.bgHover', 'semantic', 'color', { light: '{color.teal.800}', dark: '{color.teal.100}' }),
  t('color.action.primary.fg', 'semantic', 'color', { light: '{color.neutral.0}', dark: '{color.neutral.950}' }),
  t('color.action.secondary.bg', 'semantic', 'color', { light: '{color.neutral.100}', dark: '{color.neutral.700}' }),
  t('color.action.secondary.fg', 'semantic', 'color', { light: '{color.neutral.900}', dark: '{color.neutral.50}' }),
  t('color.action.danger.bg', 'semantic', 'color', { light: '{color.coral.700}', dark: '{color.coral.500}' }),
  t('color.action.danger.fg', 'semantic', 'color', { light: '{color.neutral.0}', dark: '{color.neutral.950}' }),
  t('color.feedback.info.bg', 'semantic', 'color', { light: '{color.blue.50}', dark: '#16243a' }),
  t('color.feedback.info.fg', 'semantic', 'color', { light: '{color.blue.700}', dark: '{color.blue.100}' }),
  t('color.feedback.success.bg', 'semantic', 'color', { light: '{color.green.50}', dark: '#122a1c' }),
  t('color.feedback.success.fg', 'semantic', 'color', { light: '{color.green.700}', dark: '{color.green.100}' }),
  t('color.feedback.warning.bg', 'semantic', 'color', { light: '{color.amber.50}', dark: '#2e2410' }),
  t('color.feedback.warning.fg', 'semantic', 'color', { light: '{color.amber.700}', dark: '{color.amber.100}' }),
  t('color.feedback.danger.bg', 'semantic', 'color', { light: '{color.coral.50}', dark: '#33170f' }),
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
