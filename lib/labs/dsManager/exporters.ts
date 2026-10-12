import { SYSTEM, SNAPSHOT_DATE } from './brand';
import { completeness, driftFor, parityStatus } from './metrics';
import { TYPE_ROLES } from './foundations';
import { rawValue, resolve, type Mode } from './tokens';
import type { Database, SystemItem, Token } from './types';
import { PLATFORMS, PLATFORM_LABEL, KIND_LABEL } from './types';

/*
 * Everything Keystone can hand off: docs as Markdown, tokens in the formats
 * each platform consumes, and a single agent-ready spec an AI coding tool
 * can build prototypes from. All generated from the same store.
 */

// ── Component docs ──────────────────────────────────────────────

export function itemMarkdown(item: SystemItem, db: Database): string {
  const owner = db.people.find((p) => p.id === item.ownerId);
  const { score } = completeness(item);
  const drift = driftFor(item);
  const lines = [
    `# ${item.name}`,
    '',
    `> ${item.description}`,
    '',
    `| | |`,
    `|---|---|`,
    `| ID | ${item.id} |`,
    `| Type | ${KIND_LABEL[item.kind]} |`,
    `| Lifecycle | ${item.lifecycle} |`,
    `| Version | ${item.version} |`,
    `| Owner | ${owner?.name ?? 'Unassigned'} |`,
    `| Completeness | ${score}% |`,
    `| Parity | ${parityStatus(item)} |`,
    '',
    '## Platforms',
    '',
    ...PLATFORMS.map((p) => {
      const impl = item.platforms[p];
      return `- **${PLATFORM_LABEL[p]}**: ${impl.status}${impl.version ? ` (${impl.version})` : ''}${impl.ref ? ` — \`${impl.ref}\`` : ''}${impl.drift ? ` ⚠ ${impl.drift}` : ''}`;
    }),
    '',
    `## Overview`,
    '',
    item.docs.summary,
  ];
  const section = (title: string, list: string[]) => (list.length ? ['', `## ${title}`, '', ...list.map((l) => `- ${l}`)] : []);
  lines.push(
    ...section('When to use', item.docs.whenToUse),
    ...section('When not to use', item.docs.whenNotToUse),
    ...section('Do', item.docs.dos),
    ...section("Don't", item.docs.donts),
    ...section('Accessibility', item.docs.a11y),
    ...section('Content', item.docs.content ?? []),
  );
  if (item.props.length) {
    lines.push('', '## Props', '', '| Prop | Type | Default | Description |', '|---|---|---|---|', ...item.props.map((p) => `| \`${p.name}\` | \`${p.type.replace(/\|/g, '\\|')}\` | ${p.default ? `\`${p.default}\`` : '—'} | ${p.description} |`));
  }
  if (item.tokens.length) lines.push(...section('Tokens', item.tokens.map((t) => `\`${t}\``)));
  if (drift.length) lines.push(...section('Known drift', drift.map((d) => `${PLATFORM_LABEL[d.platform]}: ${d.reason}`)));
  if (item.replacedBy) lines.push('', `**Deprecated.** Use \`${item.replacedBy}\` instead.`);
  return lines.join('\n') + '\n';
}

// ── Tokens ──────────────────────────────────────────────────────

const byName = (tokens: Token[]) => new Map(tokens.map((t) => [t.name, t]));

/** W3C Design Tokens Community Group format, references preserved. Themed tokens use $extensions modes. */
export function toDTCG(tokens: Token[]): string {
  const root: Record<string, unknown> = {};
  const typeMap: Record<string, string> = { color: 'color', dimension: 'dimension', fontFamily: 'fontFamily', fontWeight: 'fontWeight', fontSize: 'dimension', lineHeight: 'number', duration: 'duration', shadow: 'shadow' };
  for (const t of tokens) {
    const path = t.name.split('.');
    let node = root;
    for (const seg of path.slice(0, -1)) node = (node[seg] ??= {}) as Record<string, unknown>;
    const leaf: Record<string, unknown> = { $type: typeMap[t.type], $value: rawValue(t, 'light') };
    if (t.description) leaf.$description = t.description;
    if (typeof t.value !== 'string') leaf.$extensions = { 'com.keystone.modes': { light: t.value.light, dark: t.value.dark } };
    node[path[path.length - 1]] = leaf;
  }
  return JSON.stringify(root, null, 2);
}

/**
 * Figma Variables import shape: one collection per tier, Light/Dark modes
 * on the semantic collection, references emitted as VARIABLE_ALIAS.
 */
export function toFigmaVariables(tokens: Token[]): string {
  const figmaType = (t: Token) => (t.type === 'color' ? 'COLOR' : t.type === 'fontFamily' ? 'STRING' : t.type === 'shadow' ? 'STRING' : 'FLOAT');
  const val = (v: string) => {
    const m = v.match(/^\{(.+)\}$/);
    if (m) return { type: 'VARIABLE_ALIAS', name: m[1].replace(/\./g, '/') };
    const n = parseFloat(v);
    return /^[\d.]+(px|ms)?$/.test(v) ? n : v;
  };
  const collections = (['primitive', 'semantic', 'component'] as const).map((tier) => {
    const inTier = tokens.filter((t) => t.tier === tier);
    const themed = inTier.some((t) => typeof t.value !== 'string');
    const modes = themed ? ['Light', 'Dark'] : ['Default'];
    return {
      name: `${SYSTEM.name} / ${tier[0].toUpperCase() + tier.slice(1)}`,
      modes,
      variables: inTier.map((t) => ({
        name: t.name.replace(/\./g, '/'),
        resolvedType: figmaType(t),
        description: t.description ?? '',
        valuesByMode: themed
          ? { Light: val(rawValue(t, 'light')), Dark: val(rawValue(t, 'dark')) }
          : { Default: val(rawValue(t, 'light')) },
        scopes: t.type === 'color' ? ['ALL_FILLS', 'STROKE_COLOR'] : t.type === 'dimension' ? ['GAP', 'WIDTH_HEIGHT', 'CORNER_RADIUS'] : ['ALL_SCOPES'],
      })),
    };
  });
  return JSON.stringify({ version: 1, generatedAt: SNAPSHOT_DATE, collections }, null, 2);
}

const kebab = (n: string) => n.replace(/\./g, '-');

export function toCSS(tokens: Token[]): string {
  const ref = (v: string) => v.replace(/^\{(.+)\}$/, (_, r: string) => `var(--mer-${kebab(r)})`);
  const light = tokens.map((t) => `  --mer-${kebab(t.name)}: ${ref(rawValue(t, 'light'))};`);
  const dark = tokens.filter((t) => typeof t.value !== 'string').map((t) => `  --mer-${kebab(t.name)}: ${ref(rawValue(t, 'dark'))};`);
  return `/* ${SYSTEM.name} tokens — generated ${SNAPSHOT_DATE}. Do not edit by hand. */\n:root {\n${light.join('\n')}\n}\n\n[data-theme='dark'] {\n${dark.join('\n')}\n}\n`;
}

export function toSCSS(tokens: Token[]): string {
  const map = byName(tokens);
  return `// ${SYSTEM.name} tokens — generated ${SNAPSHOT_DATE}. Light-mode resolved values.\n` + tokens.map((t) => `$mer-${kebab(t.name)}: ${resolve(map, t.name, 'light')};`).join('\n') + '\n';
}

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
};

const swiftName = (n: string) => n.split('.').map((s, i) => (i ? s[0].toUpperCase() + s.slice(1) : s)).join('');

export function toSwift(tokens: Token[]): string {
  const map = byName(tokens);
  const colors = tokens.filter((t) => t.type === 'color' && t.tier !== 'primitive');
  const dims = tokens.filter((t) => t.type === 'dimension' && /px$/.test(resolve(map, t.name, 'light')));
  const c = (hex: string) => {
    if (!hex.startsWith('#')) return 'Color.clear';
    const [r, g, b] = hexToRgb(hex).map((x) => x.toFixed(3));
    return `Color(red: ${r}, green: ${g}, blue: ${b})`;
  };
  return [
    `// ${SYSTEM.name} tokens — generated ${SNAPSHOT_DATE}. Do not edit by hand.`,
    'import SwiftUI',
    '// Color(light:dark:) is provided by MeridianUI and resolves against the trait collection.',
    '',
    'public enum MeridianColor {',
    ...colors.map((t) => `    public static let ${swiftName(t.name.replace(/^color\./, ''))} = Color(light: ${c(resolve(map, t.name, 'light'))}, dark: ${c(resolve(map, t.name, 'dark'))})`),
    '}',
    '',
    'public enum MeridianSpacing {',
    ...dims.map((t) => `    public static let ${swiftName(t.name)}: CGFloat = ${parseFloat(resolve(map, t.name, 'light'))}`),
    '}',
    '',
  ].join('\n');
}

export function toKotlin(tokens: Token[]): string {
  const map = byName(tokens);
  const colors = tokens.filter((t) => t.type === 'color' && t.tier !== 'primitive');
  const dims = tokens.filter((t) => t.type === 'dimension' && /px$/.test(resolve(map, t.name, 'light')));
  const k = (hex: string) => (hex.startsWith('#') ? `Color(0xFF${hex.slice(1).toUpperCase()})` : 'Color.Unspecified');
  return [
    `// ${SYSTEM.name} tokens — generated ${SNAPSHOT_DATE}. Do not edit by hand.`,
    'package meridian.tokens',
    '',
    'import androidx.compose.ui.graphics.Color',
    'import androidx.compose.ui.unit.dp',
    '',
    'object MeridianLightColors {',
    ...colors.map((t) => `    val ${swiftName(t.name.replace(/^color\./, ''))} = ${k(resolve(map, t.name, 'light'))}`),
    '}',
    '',
    'object MeridianDarkColors {',
    ...colors.map((t) => `    val ${swiftName(t.name.replace(/^color\./, ''))} = ${k(resolve(map, t.name, 'dark'))}`),
    '}',
    '',
    'object MeridianSpacing {',
    ...dims.map((t) => `    val ${swiftName(t.name)} = ${parseFloat(resolve(map, t.name, 'light'))}.dp`),
    '}',
    '',
  ].join('\n');
}

// ── Agent spec ──────────────────────────────────────────────────

/**
 * One Markdown file that lets an AI coding agent build on-system
 * prototypes: rules first, then the inventory with what to use when,
 * then resolved tokens. Deprecated items are listed only as "don't use".
 */
export function toAgentSpec(db: Database, mode: Mode = 'light'): string {
  const map = byName(db.tokens);
  const active = db.items.filter((i) => i.lifecycle !== 'deprecated' && i.lifecycle !== 'proposed');
  const deprecated = db.items.filter((i) => i.lifecycle === 'deprecated');
  const semantic = db.tokens.filter((t) => t.tier !== 'primitive');
  const lines = [
    `# ${SYSTEM.name} Design System — agent guide`,
    '',
    `Generated by Keystone on ${SNAPSHOT_DATE}. This file is the contract for building UI with ${SYSTEM.name}. Follow it over your own defaults.`,
    '',
    '## Rules',
    '',
    `1. Use ${SYSTEM.name} components from \`@meridian/react\` (web), \`MeridianUI\` (iOS) or \`meridian.compose\` (Android). Never hand-roll an equivalent.`,
    '2. Style only with semantic tokens (`color.*`, `space.control.*`, `radius.control`). Never use raw hex values or primitive tokens directly.',
    '3. Prefer `stable` components. `beta` is fine with a note. Avoid `experimental` unless asked.',
    '4. One primary Button per view. Destructive actions follow the Destructive Confirmation pattern.',
    '5. Every input has a visible label. Errors say how to fix the problem.',
    '6. If nothing here fits, say so and stop. Do not invent a component; it needs a proposal.',
    '',
    '## Components',
    '',
  ];
  for (const i of active.filter((x) => x.kind !== 'pattern')) {
    lines.push(`### ${i.name} (${i.lifecycle}, v${i.version})`, '', i.docs.summary || i.description);
    if (i.aliases.length) lines.push(`Also called: ${i.aliases.join(', ')}.`);
    if (i.docs.whenToUse.length) lines.push(`Use for: ${i.docs.whenToUse.join(' ')}`);
    if (i.docs.whenNotToUse.length) lines.push(`Not for: ${i.docs.whenNotToUse.join(' ')}`);
    if (i.props.length) lines.push(`Props: ${i.props.map((p) => `\`${p.name}: ${p.type}\``).join(', ')}`);
    const na = PLATFORMS.filter((p) => p !== 'figma' && i.platforms[p].status !== 'shipped');
    if (na.length) lines.push(`Not available on: ${na.map((p) => PLATFORM_LABEL[p]).join(', ')}.`);
    lines.push('');
  }
  lines.push('## Patterns', '');
  for (const i of active.filter((x) => x.kind === 'pattern')) lines.push(`- **${i.name}**: ${i.docs.summary}`);
  lines.push('', '## Do not use', '');
  for (const i of deprecated) lines.push(`- ~~${i.name}~~ → use ${db.items.find((x) => x.slug === i.replacedBy)?.name ?? 'the replacement noted in docs'}.`);
  lines.push('', '## Typography roles', '', '| Role | Size / line height / weight | Use for |', '|---|---|---|');
  for (const r of TYPE_ROLES) lines.push(`| ${r.name} | ${resolve(map, r.size, mode)} / ${resolve(map, r.lineHeight, mode)} / ${resolve(map, r.weight, mode)} | ${r.usage} |`);
  lines.push('', `## Tokens (${mode} mode, resolved)`, '', '| Token | Value |', '|---|---|');
  for (const t of semantic) lines.push(`| \`${t.name}\` | \`${resolve(map, t.name, mode)}\` |`);
  return lines.join('\n') + '\n';
}

export function inventoryCSV(db: Database): string {
  const head = ['id', 'name', 'type', 'category', 'lifecycle', 'version', 'owner', 'completeness', 'parity', ...PLATFORMS];
  const esc = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  const rows = db.items.map((i) => [
    i.id,
    i.name,
    KIND_LABEL[i.kind],
    i.category,
    i.lifecycle,
    i.version,
    db.people.find((p) => p.id === i.ownerId)?.name ?? '',
    String(completeness(i).score),
    parityStatus(i),
    ...PLATFORMS.map((p) => i.platforms[p].status + (i.platforms[p].version ? ` ${i.platforms[p].version}` : '')),
  ]);
  return [head, ...rows].map((r) => r.map(esc).join(',')).join('\n') + '\n';
}
