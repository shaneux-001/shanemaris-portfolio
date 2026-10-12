import type { SystemItem } from './types';

/*
 * Lightweight retrieval over the inventory. One matcher powers four
 * features: global search, the assistant's free tier, the proposal flow's
 * "this already exists" pushback, and the sandbox's reuse nudges. In a real
 * build this is where an embeddings index would slot in — the call sites
 * only depend on `findMatches` returning ranked items with reasons.
 */

const STOP = new Set(
  'a an the and or of for to in on with without we our us i my me you your is are be do does have has need needs want wants that this it its can could should would how what which when where who why there any some new create build make use using like just show shows let lets component components pattern patterns something thing one way'.split(' '),
);

function stem(w: string): string {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 3 && w.endsWith('es') && /(ch|sh|x|ss)es$/.test(w)) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

const normalize = (s: string) => ` ${tokenize(s).join(' ')} `;

export interface Match {
  item: SystemItem;
  /** 0–1 */
  score: number;
  reasons: string[];
}

export function scoreItem(query: string, item: SystemItem): Match {
  const q = normalize(query);
  const qTokens = new Set(tokenize(query));
  const reasons: string[] = [];
  let score = 0;

  const name = normalize(item.name);
  if (name.trim() && q.includes(name)) {
    score += 1;
    reasons.push(`Named "${item.name}"`);
  }

  for (const alias of item.aliases) {
    const a = normalize(alias);
    if (a.trim() && q.includes(a)) {
      score += 0.8;
      reasons.push(`Also called "${alias}"`);
      break;
    }
  }

  const nameTokens = new Set([...tokenize(item.name), ...item.aliases.flatMap(tokenize)]);
  const nameHits = [...qTokens].filter((t) => nameTokens.has(t));
  if (nameHits.length && !reasons.length) {
    score += 0.35 * nameHits.length;
    reasons.push(`Matches "${nameHits.join('", "')}"`);
  }

  const descTokens = new Set([...tokenize(item.description), ...tokenize(item.docs.summary), ...item.docs.whenToUse.flatMap(tokenize)]);
  const descHits = [...qTokens].filter((t) => descTokens.has(t) && !nameTokens.has(t));
  if (descHits.length) {
    score += Math.min(0.45, 0.12 * descHits.length);
    if (!reasons.length) reasons.push(`Description mentions "${descHits.slice(0, 3).join('", "')}"`);
  }

  if (qTokens.has(stem(item.category.toLowerCase()))) score += 0.05;

  // Deprecated items still match (so we can say "use X instead"), but rank lower.
  if (item.lifecycle === 'deprecated') score *= 0.6;

  return { item, score: Math.min(1, score), reasons };
}

export function findMatches(query: string, items: SystemItem[], opts: { limit?: number; min?: number } = {}): Match[] {
  const { limit = 5, min = 0.2 } = opts;
  if (!tokenize(query).length) return [];
  return items
    .map((i) => scoreItem(query, i))
    .filter((m) => m.score >= min)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** How confident we are that a request duplicates something that already exists. */
export function duplicateVerdict(score: number): 'exists' | 'similar' | 'novel' {
  if (score >= 0.75) return 'exists';
  if (score >= 0.4) return 'similar';
  return 'novel';
}
