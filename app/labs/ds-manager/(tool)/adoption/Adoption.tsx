'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp } from '@phosphor-icons/react';
import { adoptionGrowth, adoptionSeries, migrationProgress, totalInstancesSeries } from '@/lib/labs/dsManager/metrics';
import type { ItemKind } from '@/lib/labs/dsManager/types';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../_components/Store';
import MigrationBar from '../../_components/MigrationBar';
import { BASE } from '../../_components/Shell';
import { Delta, LineChart, Sparkline } from '../../_components/charts';
import { LifecyclePill, PageHeader, Panel, Pill, Segmented, cx, formatDate } from '../../_components/ui';

type Kind = 'all' | ItemKind;
type Sort = 'instances' | 'growth';

const pctFmt = (g: number | null) => (g === null ? 'new' : `${g > 0 ? '+' : ''}${Math.round(g * 100)}%`);

type SortState = { key: Sort; dir: 1 | -1 };

function SortTh({ k, children, sort, setSort }: { k: Sort; children: React.ReactNode; sort: SortState; setSort: React.Dispatch<React.SetStateAction<SortState>> }) {
  return (
    <th scope="col" aria-sort={sort.key === k ? (sort.dir === 1 ? 'ascending' : 'descending') : undefined} className="px-3 py-2 text-right font-medium">
      <button type="button" onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? (-s.dir as 1 | -1) : -1 }))} className="inline-flex items-center gap-1 hover:text-ks-fg">
        {children}
        {sort.key === k && (sort.dir === 1 ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
      </button>
    </th>
  );
}

export default function Adoption() {
  const { db } = useStore();
  const [kind, setKind] = useState<Kind>('all');
  const [sort, setSort] = useState<SortState>({ key: 'instances', dir: -1 });

  const total = useMemo(() => totalInstancesSeries(db), [db]);
  const deprecatedSeries = useMemo(() => db.historySprints.map((_, i) => db.items.filter((it) => it.lifecycle === 'deprecated').reduce((s, it) => s + (adoptionSeries(db, it.slug)[i] ?? 0), 0)), [db]);

  const rows = useMemo(() => {
    const list = db.items
      .filter((i) => i.kind !== 'pattern' && i.lifecycle !== 'proposed' && (kind === 'all' || i.kind === kind))
      .map((i) => {
        const series = adoptionSeries(db, i.slug);
        return { i, series, growth: adoptionGrowth(series) };
      });
    return list.sort((a, b) => {
      const va = sort.key === 'instances' ? a.i.adoption.instances : (a.growth ?? 99);
      const vb = sort.key === 'instances' ? b.i.adoption.instances : (b.growth ?? 99);
      return (va - vb) * sort.dir;
    });
  }, [db, kind, sort]);

  // A minimum starting base, or 2 → 7 instances "wins" at +250%.
  const MIN_BASE = 15;
  const growing = rows.filter((r) => r.i.lifecycle !== 'deprecated' && r.growth !== null && r.growth > 0 && (r.series.find((v) => v > 0) ?? 0) >= MIN_BASE).sort((a, b) => (b.growth ?? 0) - (a.growth ?? 0)).slice(0, 5);
  const productsOnSystem = db.products.length;

  return (
    <>
      <PageHeader title="Adoption" description={`How much of the product estate is built on the system, what's growing, and how migrations off deprecated components are going. Instance counts come from code scans across ${productsOnSystem} products, per sprint.`} />

      <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr]">
        <Panel title="System instances in code">
          <div className="mb-2 flex items-baseline gap-3">
            <span className="ks-tabular text-[28px] font-semibold tracking-[-0.02em]">{total[total.length - 1].toLocaleString()}</span>
            <Delta values={total} />
          </div>
          <LineChart values={total} labels={db.historySprints} label="System component instances in code by sprint" zeroBased={false} />
        </Panel>
        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3.5">
            <div className="flex items-start justify-between">
              <div className="text-[12.5px] text-ks-fg-muted">Deprecated usages left</div>
              <Sparkline values={deprecatedSeries} width={64} height={22} />
            </div>
            <div className="ks-tabular mt-1 text-[26px] font-semibold">{deprecatedSeries[deprecatedSeries.length - 1]}</div>
            <Delta values={deprecatedSeries} goodWhen="down" />
          </div>
          <div className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3.5">
            <div className="text-[12.5px] text-ks-fg-muted">Products on {SYSTEM.name}</div>
            <div className="ks-tabular mt-1 text-[26px] font-semibold">
              {productsOnSystem}
              <span className="text-[15px] text-ks-fg-subtle"> / {productsOnSystem}</span>
            </div>
            <div className="text-[12px] text-ks-fg-subtle">every product ships at least one system component</div>
          </div>
          <div className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3.5">
            <div className="mb-2 text-[12.5px] text-ks-fg-muted">Fastest growing</div>
            <div className="-mt-1.5 mb-2 text-[11.5px] text-ks-fg-subtle">over 6 sprints, from at least 15 instances</div>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[13px]">
              {growing.map((g) => (
                <li key={g.i.slug} className="flex items-center justify-between gap-2">
                  <Link href={`${BASE}/components/${g.i.slug}?tab=health`} className="truncate hover:underline">
                    {g.i.name}
                  </Link>
                  <span className="ks-tabular shrink-0 text-ks-fg-muted">{pctFmt(g.growth)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="m-0 text-[15px] font-semibold">Migrations</h2>
          <Link href={`${BASE}/releases`} className="text-[12.5px] text-ks-accent-text hover:underline">
            All releases →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {db.migrations.map((m) => {
            const p = migrationProgress(m);
            const series = m.kind === 'deprecation' ? adoptionSeries(db, m.itemSlug) : null;
            return (
              <Link key={m.id} href={`${BASE}/migrations/${m.id}`} className="flex flex-col gap-3 rounded-lg border border-ks-border bg-ks-surface p-4 hover:border-ks-border-strong">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium">{m.title}</div>
                    <div className="text-[12px] text-ks-fg-subtle">
                      {m.kind === 'deprecation' ? 'Deprecation' : 'Breaking change'} · due {formatDate(m.deadline, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  {series && <Sparkline values={series} />}
                </div>
                <MigrationBar m={m} />
                {p.remainingInstances !== null && <div className="text-[12.5px] text-ks-fg-muted">{p.remainingInstances} usages left to migrate</div>}
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="m-0 text-[15px] font-semibold">By component</h2>
          <Segmented<Kind>
            label="Item type"
            value={kind}
            onChange={setKind}
            options={[
              { value: 'all', label: 'All' },
              { value: 'component', label: 'System' },
              { value: 'product-component', label: 'Product' },
            ]}
          />
        </div>
        <div className="ks-scroll relative overflow-x-auto rounded-lg border border-ks-border bg-ks-surface">
          <table className="w-full min-w-[640px] border-collapse text-[13px]">
            <thead className="border-b border-ks-border bg-ks-surface-2/60 text-left text-[11.5px] text-ks-fg-subtle">
              <tr>
                <th className="px-3 py-2 font-medium">Component</th>
                <th className="px-3 py-2 font-medium">Products</th>
                <th className="px-3 py-2 font-medium">Last 6 sprints</th>
                <SortTh sort={sort} setSort={setSort} k="growth">Growth</SortTh>
                <SortTh sort={sort} setSort={setSort} k="instances">Instances</SortTh>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ i, series, growth }) => (
                <tr key={i.slug} className="border-b border-ks-border last:border-0 hover:bg-ks-surface-2">
                  <td className="px-3 py-2">
                    <Link href={`${BASE}/components/${i.slug}?tab=health`} className="mr-2 font-medium hover:underline">
                      {i.name}
                    </Link>
                    {i.lifecycle !== 'stable' && <LifecyclePill lifecycle={i.lifecycle} />}
                    {i.promotionCandidate && <Pill tone="accent" className="ml-1">promote?</Pill>}
                  </td>
                  <td className="ks-tabular px-3 py-2 text-ks-fg-muted">
                    {i.adoption.products} / {productsOnSystem}
                  </td>
                  <td className="px-3 py-2">
                    <Sparkline values={series} />
                  </td>
                  <td className={cx('ks-tabular px-3 py-2 text-right', growth !== null && growth < 0 && i.lifecycle !== 'deprecated' ? 'text-ks-danger' : 'text-ks-fg-muted')}>{pctFmt(growth)}</td>
                  <td className="ks-tabular px-3 py-2 text-right font-medium">{i.adoption.instances.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
