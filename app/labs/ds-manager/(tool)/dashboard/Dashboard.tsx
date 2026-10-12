'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Info, Warning, WarningOctagon } from '@phosphor-icons/react';
import { categoryReadiness, healthSeries, isActive, isHighImpactWip, platformCoverage, risksFor, systemMetrics, type Risk } from '@/lib/labs/dsManager/metrics';
import { Delta, Sparkline } from '../../_components/charts';
import { LAST_SPRINT_ID } from '@/lib/labs/dsManager/seed';
import { SYSTEM, SNAPSHOT_DATE } from '@/lib/labs/dsManager/brand';
import type { Lifecycle } from '@/lib/labs/dsManager/types';
import { PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import { ImpactPill, PageHeader, Panel, PersonAvatar, Pill, RoadmapStatusPill, cx, formatDate } from '../../_components/ui';

/*
 * Every figure here is computed from the inventory (lib/labs/dsManager/
 * metrics.ts). Charts follow one rule set: magnitude = one hue, ordered
 * part-to-whole = steps of one ramp, status = icon + label + color.
 */

// ── Hover/focus tooltip for chart marks ─────────────────────────

function Tip({ label, children, className, style }: { label: React.ReactNode; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [show, setShow] = useState(false);
  return (
    <span style={style} className={cx('relative', className)} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      {show && (
        <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-ks-border bg-ks-surface px-2.5 py-1.5 text-[12px] text-ks-fg shadow-[var(--ks-shadow-pop)]">
          {label}
        </span>
      )}
    </span>
  );
}

// ── Stat tiles ──────────────────────────────────────────────────

function Stat({ label, value, sub, href, tone, trend, goodWhen = 'up', suffix }: { label: string; value: React.ReactNode; sub?: React.ReactNode; href?: string; tone?: 'warning' | 'danger'; trend?: number[]; goodWhen?: 'up' | 'down'; suffix?: string }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="text-[12.5px] text-ks-fg-muted">{label}</div>
        {trend && <Sparkline values={trend} width={64} height={22} />}
      </div>
      <div className="ks-tabular mt-1 flex items-center gap-1.5 text-[26px] font-semibold leading-tight tracking-[-0.02em] text-ks-fg">
        {tone && (tone === 'danger' ? <WarningOctagon size={18} weight="fill" className="text-ks-danger" aria-label="Needs attention" /> : <Warning size={18} weight="fill" className="text-ks-warning" aria-label="Watch" />)}
        {value}
      </div>
      {trend ? <Delta values={trend} goodWhen={goodWhen} suffix={suffix} /> : sub && <div className="mt-0.5 text-[12px] text-ks-fg-subtle">{sub}</div>}
    </>
  );
  const cls = 'block rounded-lg border border-ks-border bg-ks-surface px-4 py-3.5';
  return href ? (
    <Link href={href} className={cx(cls, 'transition-colors hover:border-ks-border-strong')}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

// ── Bars ────────────────────────────────────────────────────────

/** Horizontal magnitude bar: one hue, ≤12px thick, rounded data end, square baseline, value at the tip. */
function HBar({ label, value, tip, href, max = 100, suffix = '%' }: { label: string; value: number; tip: React.ReactNode; href?: string; max?: number; suffix?: string }) {
  const pct = (value / max) * 100;
  const row = (
    <div className="grid grid-cols-[108px_1fr_44px] items-center gap-3 py-1.5">
      <span className="truncate text-[13px] text-ks-fg">{label}</span>
      <Tip label={tip} className="block">
        <span tabIndex={0} aria-label={`${label}: ${value}${suffix}`} className="relative block h-3 rounded-r-[4px] bg-ks-neutral-soft focus:outline-none">
          <span className="block h-3 rounded-r-[4px] bg-ks-accent" style={{ width: `${pct}%` }} />
        </span>
      </Tip>
      <span className="ks-tabular text-right text-[12.5px] text-ks-fg-muted">
        {value}
        {suffix}
      </span>
    </div>
  );
  return href ? (
    <Link href={href} className="-mx-2 block rounded-md px-2 hover:bg-ks-surface-2">
      {row}
    </Link>
  ) : (
    row
  );
}

const LIFECYCLE_STEPS: { key: Lifecycle; label: string; fill: string }[] = [
  { key: 'stable', label: 'Stable', fill: 'var(--ks-accent)' },
  { key: 'beta', label: 'Beta', fill: 'color-mix(in oklab, var(--ks-accent) 62%, var(--ks-surface))' },
  { key: 'experimental', label: 'Experimental', fill: 'color-mix(in oklab, var(--ks-accent) 32%, var(--ks-surface))' },
  { key: 'deprecated', label: 'Deprecated', fill: 'var(--ks-fg-subtle)' },
];

/** Ordered part-to-whole: steps of one ramp, 2px surface gaps between segments, legend always present. */
function LifecycleBar() {
  const { db } = useStore();
  const total = db.items.filter((i) => i.lifecycle !== 'proposed').length;
  const segs = LIFECYCLE_STEPS.map((s) => ({ ...s, n: db.items.filter((i) => i.lifecycle === s.key).length })).filter((s) => s.n > 0);
  return (
    <div>
      <div className="flex h-6 w-full gap-[2px]">
        {segs.map((s, i) => (
          <Tip key={s.key} label={`${s.label}: ${s.n} of ${total} (${Math.round((s.n / total) * 100)}%)`} className="block h-full min-w-[6px]" style={{ flex: `${s.n} 1 0` }}>
            <Link
              href={`${BASE}/inventory?lifecycle=${s.key}`}
              aria-label={`${s.label}: ${s.n} items`}
              className={cx('block h-full w-full', i === 0 && 'rounded-l-[4px]', i === segs.length - 1 && 'rounded-r-[4px]')}
              style={{ background: s.fill }}
            />
          </Tip>
        ))}
      </div>
      <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-[12px] text-ks-fg-muted">
        {segs.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.fill }} />
            {s.label} <span className="ks-tabular text-ks-fg">{s.n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Risks ───────────────────────────────────────────────────────

const RISK_KIND: Record<Risk['kind'], string> = {
  unowned: 'Ownership',
  drift: 'Drift',
  'stale-docs': 'Docs',
  'deprecated-in-use': 'Migration',
  blocked: 'Blocked',
  a11y: 'Accessibility',
  duplicate: 'Duplicate',
  contrast: 'Contrast',
};

function RiskRow({ r }: { r: Risk }) {
  const Icon = r.severity === 'high' ? WarningOctagon : r.severity === 'medium' ? Warning : Info;
  const color = r.severity === 'high' ? 'text-ks-danger' : r.severity === 'medium' ? 'text-ks-warning' : 'text-ks-fg-subtle';
  const inner = (
    <>
      <Icon size={16} weight="fill" className={cx('mt-0.5 shrink-0', color)} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 text-[13px] font-medium text-ks-fg">
          {r.title}
          <span className="text-[11.5px] font-normal text-ks-fg-subtle">
            {r.severity === 'high' ? 'High' : r.severity === 'medium' ? 'Medium' : 'Low'} · {RISK_KIND[r.kind]}
          </span>
        </div>
        <div className="truncate text-[12.5px] text-ks-fg-muted">{r.detail}</div>
      </div>
    </>
  );
  const href = r.itemSlug ? `${BASE}/components/${r.itemSlug}?tab=health` : r.kind === 'contrast' ? `${BASE}/foundations/color#contrast` : null;
  return href ? (
    <Link href={href} className="-mx-2 flex items-start gap-2.5 rounded-md px-2 py-2 hover:bg-ks-surface-2">
      {inner}
    </Link>
  ) : (
    <div className="flex items-start gap-2.5 py-2">{inner}</div>
  );
}

// ── Page ────────────────────────────────────────────────────────

export default function Dashboard() {
  const { db, item, person } = useStore();
  const m = useMemo(() => systemMetrics(db), [db]);
  const cats = useMemo(() => categoryReadiness(db), [db]);
  const plats = useMemo(() => platformCoverage(db), [db]);
  const risks = useMemo(() => risksFor(db), [db]);
  const trends = useMemo(() => healthSeries(db), [db]);
  const [riskFilter, setRiskFilter] = useState<'all' | Risk['kind']>('all');
  const sprintChanges = db.changes.filter((c) => c.sprintId === LAST_SPRINT_ID || c.id.startsWith('chg-local'));
  const wip = db.roadmap.filter((r) => r.horizon === 'now' && r.status !== 'complete').sort((a, b) => +isHighImpactWip(b) - +isHighImpactWip(a));
  const active = db.items.filter(isActive);
  const shownRisks = riskFilter === 'all' ? risks : risks.filter((r) => r.kind === riskFilter);
  const riskKinds = Array.from(new Set(risks.map((r) => r.kind)));

  return (
    <>
      <PageHeader
        title="System health"
        eyebrow={`${SYSTEM.name} · snapshot ${formatDate(SNAPSHOT_DATE, { month: 'long', day: 'numeric', year: 'numeric' })}`}
        description="Where the system is strong, where it's drifting, and what needs an owner. Every number is computed from the inventory — click through to the items behind it."
      />

      {/* Hero + KPI row */}
      <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(240px,1fr)_3fr]">
        <div className="flex flex-col justify-between rounded-lg border border-ks-border bg-ks-surface p-5">
          <div className="text-[13px] text-ks-fg-muted">Average completeness</div>
          <div className="ks-tabular my-2 text-[56px] font-semibold leading-none tracking-[-0.03em]">
            {m.avgCompleteness}
            <span className="text-[28px] text-ks-fg-subtle">%</span>
          </div>
          <div className="mb-3 flex items-center gap-3">
            <Sparkline values={trends.avgCompleteness} width={120} height={30} />
            <Delta values={trends.avgCompleteness} suffix=" pts" />
          </div>
          <div className="text-[12.5px] text-ks-fg-subtle">
            Across {active.length} active items. {m.belowThreshold} are below 70%.{' '}
            <Link href={`${BASE}/inventory`} className="text-ks-accent-text hover:underline">
              See all
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Platform parity" value={`${m.parity}%`} trend={trends.parity} suffix=" pts" href={`${BASE}/inventory?parity=aligned`} />
          <Stat label="Stable ratio" value={`${m.stableRatio}%`} trend={trends.stableRatio} suffix=" pts" href={`${BASE}/inventory?lifecycle=stable`} />
          <Stat label="High-impact work in progress" value={m.highImpactWip} sub="on the roadmap now" href={`${BASE}/roadmap`} />
          <Stat label="Drifting items" value={m.driftCount} trend={trends.driftCount} goodWhen="down" href={`${BASE}/inventory?parity=drift`} tone={m.driftCount > 8 ? 'warning' : undefined} />
          <Stat label="Components" value={m.components} sub={`${m.deprecated} deprecated, not counted`} href={`${BASE}/inventory?kind=component`} />
          <Stat label="Patterns" value={m.patterns} href={`${BASE}/inventory?kind=pattern`} />
          <Stat label="Product components" value={m.productComponents} sub={`${m.promotionCandidates} ready to promote`} href={`${BASE}/inventory?kind=product-component`} />
          <Stat label="Unowned" value={m.unowned} trend={trends.unowned} goodWhen="down" href={`${BASE}/inventory?owner=none`} tone={m.unowned > 0 ? 'danger' : undefined} />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel title="Platform coverage" actions={<span className="text-[11.5px] text-ks-fg-subtle">% of applicable items shipped</span>}>
          {plats.map((p) => (
            <HBar
              key={p.platform}
              label={PLATFORM_LABEL[p.platform]}
              value={p.pct}
              href={`${BASE}/inventory?gap=${p.platform}`}
              tip={
                <>
                  <strong>{PLATFORM_LABEL[p.platform]}</strong> · {p.shipped} of {p.applicable} shipped · {p.drift} drifting
                </>
              }
            />
          ))}
          <p className="m-0 mt-2 text-[12px] text-ks-fg-subtle">Click a platform to see what&apos;s missing on it.</p>
        </Panel>
        <Panel title="Category readiness" actions={<span className="text-[11.5px] text-ks-fg-subtle">avg completeness</span>}>
          {cats.map((c) => (
            <HBar
              key={c.category}
              label={c.category}
              value={c.avgCompleteness}
              href={`${BASE}/inventory?category=${encodeURIComponent(c.category)}`}
              tip={
                <>
                  <strong>{c.category}</strong> · {c.count} items · {c.stable} stable · {c.aligned}% aligned
                </>
              }
            />
          ))}
        </Panel>
        <Panel title="Lifecycle">
          <LifecycleBar />
          <div className="mt-5 border-t border-ks-border pt-4">
            <div className="mb-2 text-[12.5px] font-medium">Promotion candidates</div>
            {db.items
              .filter((i) => i.promotionCandidate)
              .map((i) => (
                <Link key={i.slug} href={`${BASE}/components/${i.slug}`} className="-mx-2 flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] hover:bg-ks-surface-2">
                  <span>{i.name}</span>
                  <span className="text-[12px] text-ks-fg-subtle">{i.adoption.products} teams use it</span>
                </Link>
              ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[3fr_2fr]">
        {/* Fills the row height set by the right-hand column and scrolls
            inside it, instead of a fixed max-height that stops short. The
            list is absolutely positioned so its length never stretches the row. */}
        <Panel
          className="flex flex-col"
          title={`Risks (${shownRisks.length})`}
          actions={
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value as typeof riskFilter)} aria-label="Filter risks" className="h-7 rounded-md border border-ks-border bg-ks-surface px-2 text-[12px]">
              <option value="all">All risks</option>
              {riskKinds.map((k) => (
                <option key={k} value={k}>
                  {RISK_KIND[k]} ({risks.filter((r) => r.kind === k).length})
                </option>
              ))}
            </select>
          }
          bodyClassName="relative min-h-[380px] flex-1 p-0"
        >
          <div className="ks-scroll ks-fade-bottom absolute inset-0 overflow-y-auto px-4 pb-6 pt-2">
            {shownRisks.map((r) => (
              <RiskRow key={r.id} r={r} />
            ))}
          </div>
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel
            title="In flight this sprint"
            actions={
              <Link href={`${BASE}/roadmap`} className="inline-flex items-center gap-1 text-[12px] text-ks-accent-text hover:underline">
                Roadmap <ArrowRight size={12} />
              </Link>
            }
            bodyClassName="px-4 py-2"
          >
            {wip.map((r) => (
              <Link key={r.id} href={`${BASE}/roadmap?item=${r.id}`} className="-mx-2 flex items-center gap-3 rounded-md px-2 py-2 hover:bg-ks-surface-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">{r.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <RoadmapStatusPill status={r.status} />
                    {(r.impact === 'high' || r.impact === 'breaking') && <ImpactPill impact={r.impact} />}
                  </div>
                </div>
                <div className="flex -space-x-1.5">
                  {r.ownerIds.map((o) => (
                    <PersonAvatar key={o} person={person(o)} size={22} />
                  ))}
                </div>
              </Link>
            ))}
          </Panel>

          <Panel
            title={`Shipped in Sprint ${LAST_SPRINT_ID}`}
            actions={
              <Link href={`${BASE}/changelog`} className="inline-flex items-center gap-1 text-[12px] text-ks-accent-text hover:underline">
                Changelog <ArrowRight size={12} />
              </Link>
            }
            bodyClassName="ks-scroll max-h-[300px] overflow-y-auto px-4 py-2"
          >
            {sprintChanges.map((c) => (
              <div key={c.id} className="flex gap-2.5 py-2">
                <PersonAvatar person={person(c.authorId)} size={22} />
                <div className="min-w-0">
                  <div className="text-[13px]">
                    {c.itemSlug ? (
                      <Link href={`${BASE}/components/${c.itemSlug}`} className="font-medium hover:underline">
                        {item(c.itemSlug)?.name}
                      </Link>
                    ) : (
                      <span className="font-medium">Tokens</span>
                    )}{' '}
                    <span className="text-ks-fg-muted">{c.summary}</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11.5px] text-ks-fg-subtle">
                    {formatDate(c.date)} · {c.platforms.map((p) => PLATFORM_LABEL[p]).join(', ')}
                    {c.breaking && <Pill tone="danger">Breaking</Pill>}
                  </div>
                </div>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </>
  );
}
