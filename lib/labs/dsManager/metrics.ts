import { SNAPSHOT_DATE } from './brand';
import { contrastChecks } from './foundations';
import type { Category, Database, Platform, RoadmapItem, SystemItem } from './types';
import { PLATFORMS, PLATFORM_LABEL } from './types';

/*
 * Every health number in the tool is derived here from the inventory —
 * nothing on the dashboard is typed in by hand. Change an item's lifecycle,
 * owner or platform status and every view that reads these updates.
 */

/** Docs are stale when they lag the code by this much… */
export const DOCS_LAG_DAYS = 60;
/** …or simply haven't been touched in a year. */
export const DOCS_MAX_AGE_DAYS = 365;

export function daysBetween(from: string, to: string = SNAPSHOT_DATE): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
}

export const isActive = (i: SystemItem) => i.lifecycle !== 'deprecated' && i.lifecycle !== 'proposed';

export function applicablePlatforms(i: SystemItem): Platform[] {
  return PLATFORMS.filter((p) => i.platforms[p].status !== 'n/a');
}

export function shippedPlatforms(i: SystemItem): Platform[] {
  return PLATFORMS.filter((p) => i.platforms[p].status === 'shipped');
}

const majorMinor = (v?: string) => (v ?? '').split('-')[0].split('.').slice(0, 2).join('.');

export interface Drift {
  platform: Platform;
  reason: string;
}

/** Drift = a shipped platform that diverges from spec, either declared or by version. */
export function driftFor(i: SystemItem): Drift[] {
  const out: Drift[] = [];
  for (const p of PLATFORMS) {
    const impl = i.platforms[p];
    if (impl.status !== 'shipped') continue;
    if (impl.drift) out.push({ platform: p, reason: impl.drift });
    else if (impl.version && majorMinor(impl.version) !== majorMinor(i.version)) {
      out.push({ platform: p, reason: `${PLATFORM_LABEL[p]} is on ${impl.version}; spec is ${i.version}.` });
    }
  }
  return out;
}

export type ParityStatus = 'aligned' | 'drift' | 'gaps';

export function parityStatus(i: SystemItem): ParityStatus {
  if (driftFor(i).length) return 'drift';
  const applicable = applicablePlatforms(i);
  return applicable.every((p) => i.platforms[p].status === 'shipped') ? 'aligned' : 'gaps';
}

export function coverage(i: SystemItem): number {
  const applicable = applicablePlatforms(i);
  return applicable.length ? shippedPlatforms(i).length / applicable.length : 0;
}

export interface CompletenessFactor {
  key: string;
  label: string;
  weight: number;
  /** 0–1 */
  met: number;
}

/** Weighted readiness score, 0–100. The breakdown is what the UI shows when you expand it. */
export function completeness(i: SystemItem): { score: number; factors: CompletenessFactor[] } {
  const r = i.readiness;
  const factors: CompletenessFactor[] = [
    { key: 'design', label: 'Design ready', weight: 15, met: +r.design },
    { key: 'code', label: 'Code ready', weight: 15, met: +r.code },
    { key: 'docs', label: 'Documentation', weight: 15, met: r.docs && !docsStale(i) ? 1 : r.docs ? 0.5 : 0 },
    { key: 'a11y', label: 'Accessibility reviewed', weight: 15, met: +r.a11y },
    { key: 'tokens', label: 'Tokenized', weight: 10, met: +r.tokens },
    { key: 'tests', label: 'Tests', weight: 10, met: +r.tests },
    { key: 'owner', label: 'Owner assigned', weight: 10, met: i.ownerId ? 1 : 0 },
    { key: 'coverage', label: 'Platform coverage', weight: 10, met: coverage(i) },
  ];
  const score = Math.round(factors.reduce((s, f) => s + f.weight * f.met, 0));
  return { score, factors };
}

export function docsStale(i: SystemItem): boolean {
  return daysBetween(i.docsUpdatedAt, i.updatedAt) > DOCS_LAG_DAYS || daysBetween(i.docsUpdatedAt) > DOCS_MAX_AGE_DAYS;
}

const avg = (ns: number[]) => (ns.length ? Math.round(ns.reduce((a, b) => a + b, 0) / ns.length) : 0);
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

export interface Risk {
  id: string;
  severity: 'high' | 'medium' | 'low';
  kind: 'unowned' | 'drift' | 'stale-docs' | 'deprecated-in-use' | 'blocked' | 'a11y' | 'duplicate' | 'contrast' | 'feedback' | 'figma';
  title: string;
  detail: string;
  itemSlug?: string;
}

export function risksFor(db: Database): Risk[] {
  const risks: Risk[] = [];
  for (const i of db.items) {
    if (isActive(i) && !i.ownerId) {
      risks.push({ id: `unowned-${i.slug}`, severity: i.adoption.instances > 100 ? 'high' : 'medium', kind: 'unowned', title: `${i.name} has no owner`, detail: `${i.adoption.instances.toLocaleString()} instances across ${i.adoption.products} products with nobody accountable.`, itemSlug: i.slug });
    }
    if (isActive(i)) {
      const d = driftFor(i);
      if (d.length) {
        risks.push({ id: `drift-${i.slug}`, severity: i.adoption.instances > 500 ? 'high' : 'medium', kind: 'drift', title: `${i.name} drifts on ${d.map((x) => PLATFORM_LABEL[x.platform]).join(', ')}`, detail: d[0].reason, itemSlug: i.slug });
      }
      if (docsStale(i) && i.lifecycle !== 'experimental') {
        risks.push({ id: `stale-${i.slug}`, severity: 'low', kind: 'stale-docs', title: `${i.name} docs are out of date`, detail: daysBetween(i.docsUpdatedAt, i.updatedAt) > DOCS_LAG_DAYS ? `Code changed ${daysBetween(i.docsUpdatedAt, i.updatedAt)} days after the docs were last updated.` : 'Not reviewed in over a year.', itemSlug: i.slug });
      }
      if (i.lifecycle === 'stable' && (i.a11yLevel === 'partial' || i.a11yLevel === 'unverified')) {
        risks.push({ id: `a11y-${i.slug}`, severity: 'high', kind: 'a11y', title: `${i.name} is stable without an a11y sign-off`, detail: `Accessibility: ${i.a11yLevel}.`, itemSlug: i.slug });
      }
    }
    if (i.lifecycle === 'deprecated' && i.adoption.instances > 0) {
      risks.push({ id: `dep-${i.slug}`, severity: 'medium', kind: 'deprecated-in-use', title: `${i.name} is deprecated but still used`, detail: `${i.adoption.instances} instances in ${i.adoption.products} products still need to migrate.`, itemSlug: i.slug });
    }
  }
  for (const r of db.roadmap.filter((r) => r.status === 'blocked')) {
    risks.push({ id: `blocked-${r.id}`, severity: r.impact === 'high' || r.impact === 'breaking' ? 'high' : 'medium', kind: 'blocked', title: `Blocked: ${r.title}`, detail: r.risks ?? 'Blocked.', itemSlug: r.itemSlug });
  }
  // Docs people say aren't helping them.
  for (const i of db.items) {
    const h = helpfulness(db, i.slug);
    if (h.votes >= 5 && h.pct !== null && h.pct < 50) {
      risks.push({ id: `fb-${i.slug}`, severity: 'medium', kind: 'feedback', title: `${i.name} docs rated unhelpful`, detail: `${h.pct}% of ${h.votes} readers found them helpful; ${h.open} open comment${h.open === 1 ? '' : 's'}.`, itemSlug: i.slug });
    }
  }

  // Designers working around a component in Figma.
  for (const m of db.figma.filter((m) => m.detachRate > 0.1)) {
    const i = db.items.find((x) => x.slug === m.itemSlug);
    const why = m.props.find((r) => r.note && !r.intentional && (!r.codeProp || !r.figmaProp || r.values?.some(([, c]) => c === null)));
    risks.push({ id: `figma-${m.itemSlug}`, severity: 'medium', kind: 'figma', title: `${i?.name} is detached ${Math.round(m.detachRate * 100)}% of the time in Figma`, detail: why?.note ?? 'Designers are working around the library component.', itemSlug: m.itemSlug });
  }

  // Token pairs that fail WCAG contrast, grouped across themes.
  const failing = new Map<string, string[]>();
  for (const c of contrastChecks(db.tokens).filter((c) => !c.pass)) failing.set(c.label, [...(failing.get(c.label) ?? []), `${c.mode} ${c.ratio?.toFixed(2)}:1`]);
  for (const [label, where] of failing) {
    const pair = contrastChecks(db.tokens).find((c) => c.label === label)!;
    risks.push({ id: `contrast-${label}`, severity: 'high', kind: 'contrast', title: `${label} fails contrast`, detail: `${pair.fg} on ${pair.bg} needs ${pair.min}:1 — ${where.join(', ')}.` });
  }

  const order = { high: 0, medium: 1, low: 2 };
  return risks.sort((a, b) => order[a.severity] - order[b.severity]);
}

export const isHighImpactWip = (r: RoadmapItem) => r.status === 'in-progress' && (r.impact === 'high' || r.impact === 'breaking');

export interface SystemMetrics {
  components: number;
  productComponents: number;
  patterns: number;
  deprecated: number;
  avgCompleteness: number;
  parity: number;
  stableRatio: number;
  driftCount: number;
  unowned: number;
  staleDocs: number;
  highImpactWip: number;
  belowThreshold: number;
  promotionCandidates: number;
}

export function systemMetrics(db: Database): SystemMetrics {
  const active = db.items.filter(isActive);
  const multi = active.filter((i) => applicablePlatforms(i).length > 1);
  return {
    components: active.filter((i) => i.kind === 'component').length,
    productComponents: active.filter((i) => i.kind === 'product-component').length,
    patterns: active.filter((i) => i.kind === 'pattern').length,
    deprecated: db.items.filter((i) => i.lifecycle === 'deprecated').length,
    avgCompleteness: avg(active.map((i) => completeness(i).score)),
    parity: pct(multi.filter((i) => parityStatus(i) === 'aligned').length, multi.length),
    stableRatio: pct(active.filter((i) => i.lifecycle === 'stable').length, active.length),
    driftCount: active.filter((i) => driftFor(i).length > 0).length,
    unowned: active.filter((i) => !i.ownerId).length,
    staleDocs: active.filter((i) => docsStale(i) && i.lifecycle !== 'experimental').length,
    highImpactWip: db.roadmap.filter(isHighImpactWip).length,
    belowThreshold: active.filter((i) => completeness(i).score < 70).length,
    promotionCandidates: active.filter((i) => i.promotionCandidate).length,
  };
}

export interface CategoryReadiness {
  category: Category;
  count: number;
  stable: number;
  avgCompleteness: number;
  aligned: number;
}

export function categoryReadiness(db: Database): CategoryReadiness[] {
  const active = db.items.filter(isActive);
  const cats = Array.from(new Set(active.map((i) => i.category)));
  return cats
    .map((category) => {
      const inCat = active.filter((i) => i.category === category);
      return {
        category,
        count: inCat.length,
        stable: inCat.filter((i) => i.lifecycle === 'stable').length,
        avgCompleteness: avg(inCat.map((i) => completeness(i).score)),
        aligned: pct(inCat.filter((i) => parityStatus(i) === 'aligned').length, inCat.length),
      };
    })
    .sort((a, b) => b.avgCompleteness - a.avgCompleteness);
}

export function platformCoverage(db: Database): { platform: Platform; shipped: number; applicable: number; pct: number; drift: number }[] {
  const active = db.items.filter(isActive);
  return PLATFORMS.map((platform) => {
    const applicable = active.filter((i) => i.platforms[platform].status !== 'n/a');
    const shipped = applicable.filter((i) => i.platforms[platform].status === 'shipped');
    const drift = active.filter((i) => driftFor(i).some((d) => d.platform === platform)).length;
    return { platform, shipped: shipped.length, applicable: applicable.length, pct: pct(shipped.length, applicable.length), drift };
  });
}

// ── Trends & adoption ───────────────────────────────────────────

export type TrendKey = keyof Database['healthHistory'];

/** Past sprints from history plus today's live value, so edits move the last point. */
export function healthSeries(db: Database): Record<TrendKey, number[]> {
  const m = systemMetrics(db);
  const live: Record<TrendKey, number> = { avgCompleteness: m.avgCompleteness, parity: m.parity, stableRatio: m.stableRatio, driftCount: m.driftCount, unowned: m.unowned };
  return Object.fromEntries((Object.keys(live) as TrendKey[]).map((k) => [k, [...db.healthHistory[k], live[k]]])) as Record<TrendKey, number[]>;
}

export function adoptionSeries(db: Database, slug: string): number[] {
  return db.adoptionHistory[slug] ?? db.historySprints.map(() => 0);
}

/** Growth across the history window, as a fraction; null when the item didn't exist at the start. */
export function adoptionGrowth(series: number[]): number | null {
  const first = series.find((v) => v > 0);
  const last = series[series.length - 1];
  if (!first || first === last) return first ? 0 : null;
  return (last - first) / first;
}

export function totalInstancesSeries(db: Database): number[] {
  return db.historySprints.map((_, i) => db.items.filter((it) => it.lifecycle !== 'deprecated').reduce((s, it) => s + (adoptionSeries(db, it.slug)[i] ?? 0), 0));
}

export interface MigrationProgress {
  done: number;
  inProgress: number;
  notStarted: number;
  total: number;
  pct: number;
  remainingInstances: number | null;
}

export function migrationProgress(m: Database['migrations'][number]): MigrationProgress {
  const done = m.products.filter((p) => p.status === 'done').length;
  const inProgress = m.products.filter((p) => p.status === 'in-progress').length;
  const total = m.products.length;
  const remaining = m.products.some((p) => p.remaining !== undefined) ? m.products.reduce((s, p) => s + (p.remaining ?? 0), 0) : null;
  return { done, inProgress, notStarted: total - done - inProgress, total, pct: total ? Math.round((done / total) * 100) : 0, remainingInstances: remaining };
}

// ── Feedback ────────────────────────────────────────────────────

export function helpfulness(db: Database, slug: string): { votes: number; helpful: number; pct: number | null; open: number } {
  const fb = db.feedback.filter((f) => f.itemSlug === slug);
  const helpful = fb.filter((f) => f.helpful).length;
  return { votes: fb.length, helpful, pct: fb.length ? Math.round((helpful / fb.length) * 100) : null, open: fb.filter((f) => f.message && f.status === 'open').length };
}
