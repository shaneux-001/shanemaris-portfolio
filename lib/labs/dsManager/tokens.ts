import type { Token } from './types';

export type Mode = 'light' | 'dark';

const REF = /^\{([^}]+)\}$/;

export const isRef = (v: string) => REF.test(v);

/** The raw (possibly referencing) value of a token in a mode. */
export function rawValue(t: Token, mode: Mode): string {
  return typeof t.value === 'string' ? t.value : t.value[mode];
}

/** Follows `{references}` down to a literal. Cycles or dangling refs resolve to an empty string. */
export function resolve(byName: Map<string, Token>, name: string, mode: Mode, seen = new Set<string>()): string {
  const t = byName.get(name);
  if (!t || seen.has(name)) return '';
  seen.add(name);
  const v = rawValue(t, mode);
  const m = v.match(REF);
  return m ? resolve(byName, m[1], mode, seen) : v;
}

/** The chain a token resolves through, e.g. button.radius → radius.control → radius.md → 8px. */
export function chain(byName: Map<string, Token>, name: string, mode: Mode): string[] {
  const out = [name];
  let cur = byName.get(name);
  while (cur) {
    const m = rawValue(cur, mode).match(REF);
    if (!m || out.includes(m[1])) break;
    out.push(m[1]);
    cur = byName.get(m[1]);
  }
  return out;
}

export const cssVar = (name: string) => `--mer-${name.replace(/\./g, '-')}`;

export function toCssVars(tokens: Token[], mode: Mode): Record<string, string> {
  const byName = new Map(tokens.map((t) => [t.name, t]));
  return Object.fromEntries(tokens.map((t) => [cssVar(t.name), resolve(byName, t.name, mode)]));
}

/** Which tokens reference this one (one level) — used to show blast radius before editing. */
export function dependents(tokens: Token[], name: string): Token[] {
  return tokens.filter((t) => (['light', 'dark'] as Mode[]).some((m) => rawValue(t, m) === `{${name}}`));
}
