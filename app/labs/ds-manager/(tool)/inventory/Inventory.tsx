'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, BookOpenText, DownloadSimple, MagnifyingGlass, Plus } from '@phosphor-icons/react';
import { completeness, docsStale, driftFor, parityStatus, type ParityStatus } from '@/lib/labs/dsManager/metrics';
import { inventoryCSV } from '@/lib/labs/dsManager/exporters';
import type { ItemKind, Lifecycle, Platform, SystemItem } from '@/lib/labs/dsManager/types';
import { LIFECYCLES, PLATFORMS, PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import ItemQuickView from '../../_components/ItemQuickView';
import { downloadText } from '../../_components/CodeBlock';
import { Button, ButtonLink, EmptyState, LifecyclePill, PageHeader, ParityPill, PersonChip, PlatformStrip, ScoreCell, Segmented, SelectFilter, cx, formatDate, inputClass } from '../../_components/ui';

type KindFilter = 'all' | ItemKind;
type SortKey = 'name' | 'category' | 'version' | 'lifecycle' | 'completeness' | 'owner' | 'updatedAt' | 'adoption';

const LIFECYCLE_ORDER: Record<Lifecycle, number> = { stable: 0, beta: 1, experimental: 2, proposed: 3, deprecated: 4 };

type Sort = { key: SortKey; dir: 1 | -1 };

function Th({ k, children, className, sort, setSort }: { k?: SortKey; children: React.ReactNode; className?: string; sort: Sort; setSort: React.Dispatch<React.SetStateAction<Sort>> }) {
  return (
    <th scope="col" aria-sort={k && sort.key === k ? (sort.dir === 1 ? 'ascending' : 'descending') : undefined} className={cx('whitespace-nowrap px-3 py-2 text-left text-[11.5px] font-medium text-ks-fg-subtle', className)}>
      {k ? (
        <button type="button" onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? (-s.dir as 1 | -1) : 1 }))} className="inline-flex items-center gap-1 hover:text-ks-fg">
          {children}
          {sort.key === k && (sort.dir === 1 ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export default function Inventory() {
  const { db, person } = useStore();
  const params = useSearchParams();
  const router = useRouter();

  // Filters live in the URL so dashboard tiles and risks can deep-link here.
  const get = (k: string, d = 'all') => params.get(k) ?? d;
  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params.toString());
    if (v === 'all' || v === '') next.delete(k);
    else next.set(k, v);
    router.replace(`${BASE}/inventory${next.size ? `?${next}` : ''}`, { scroll: false });
  };

  const kind = get('kind') as KindFilter;
  const lifecycle = get('lifecycle');
  const category = get('category');
  const owner = get('owner');
  const parity = get('parity');
  const gap = get('gap');
  const q = params.get('q') ?? '';

  const [sort, setSort] = useState<Sort>({ key: 'name', dir: 1 });
  const [open, setOpen] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(db.items.map((i) => i.category))).sort(), [db.items]);

  const rows = useMemo(() => {
    const needle = q.toLowerCase();
    const filtered = db.items.filter((i) => {
      if (kind !== 'all' && i.kind !== kind) return false;
      if (lifecycle !== 'all' && i.lifecycle !== lifecycle) return false;
      if (category !== 'all' && i.category !== category) return false;
      if (owner === 'none' && i.ownerId) return false;
      if (owner !== 'all' && owner !== 'none' && i.ownerId !== owner) return false;
      if (parity === 'stale-docs' && !docsStale(i)) return false;
      if (parity !== 'all' && parity !== 'stale-docs' && parityStatus(i) !== (parity as ParityStatus)) return false;
      if (gap !== 'all') {
        const s = i.platforms[gap as Platform].status;
        if (s === 'shipped' || s === 'n/a') return false;
      }
      if (needle && ![i.name, i.id, i.category, ...i.aliases].some((t) => t.toLowerCase().includes(needle))) return false;
      return true;
    });
    const val = (i: SystemItem): string | number => {
      switch (sort.key) {
        case 'completeness':
          return completeness(i).score;
        case 'owner':
          return person(i.ownerId)?.name ?? '~';
        case 'lifecycle':
          return LIFECYCLE_ORDER[i.lifecycle];
        case 'adoption':
          return i.adoption.instances;
        default:
          return i[sort.key];
      }
    };
    return filtered.sort((a, b) => {
      const va = val(a);
      const vb = val(b);
      return (va < vb ? -1 : va > vb ? 1 : 0) * sort.dir;
    });
  }, [db.items, kind, lifecycle, category, owner, parity, gap, q, sort, person]);

  const counts = useMemo(
    () => ({
      all: db.items.length,
      component: db.items.filter((i) => i.kind === 'component').length,
      'product-component': db.items.filter((i) => i.kind === 'product-component').length,
      pattern: db.items.filter((i) => i.kind === 'pattern').length,
    }),
    [db.items],
  );

  const activeFilters = [lifecycle, category, owner, parity, gap].filter((v) => v !== 'all').length + (q ? 1 : 0);

  return (
    <>
      <PageHeader
        title="Inventory"
        description="Every system component, product component and pattern, with version, platform coverage, lifecycle and ownership. Click a row for a quick view."
        actions={
          <>
            <Button size="sm" onClick={() => downloadText('meridian-inventory.csv', inventoryCSV(db), 'text/csv')}>
              <DownloadSimple size={15} /> Export CSV
            </Button>
            <ButtonLink size="sm" variant="primary" href={`${BASE}/proposals/new`}>
              <Plus size={15} /> Propose
            </ButtonLink>
          </>
        }
      />

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Segmented<KindFilter>
          label="Item type"
          value={kind}
          onChange={(v) => set('kind', v)}
          options={[
            { value: 'all', label: <>All <span className="text-ks-fg-subtle">{counts.all}</span></> },
            { value: 'component', label: <>System <span className="text-ks-fg-subtle">{counts.component}</span></> },
            { value: 'product-component', label: <>Product <span className="text-ks-fg-subtle">{counts['product-component']}</span></> },
            { value: 'pattern', label: <>Patterns <span className="text-ks-fg-subtle">{counts.pattern}</span></> },
          ]}
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="relative min-w-[200px] flex-1 sm:max-w-[280px]">
          <span className="sr-only">Filter by name</span>
          <MagnifyingGlass size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ks-fg-subtle" />
          <input value={q} onChange={(e) => set('q', e.target.value)} placeholder="Filter by name, ID or alias" className={cx(inputClass, 'h-8 py-0 pl-8 text-[12.5px]')} />
        </label>
        <SelectFilter label="Lifecycle" value={lifecycle} onChange={(v) => set('lifecycle', v)} options={[{ value: 'all', label: 'Any lifecycle' }, ...LIFECYCLES.map((l) => ({ value: l, label: l[0].toUpperCase() + l.slice(1) }))]} />
        <SelectFilter label="Category" value={category} onChange={(v) => set('category', v)} options={[{ value: 'all', label: 'Any category' }, ...categories.map((c) => ({ value: c, label: c }))]} />
        <SelectFilter label="Health" value={parity} onChange={(v) => set('parity', v)} options={[{ value: 'all', label: 'Any health' }, { value: 'aligned', label: 'Aligned' }, { value: 'drift', label: 'Drifting' }, { value: 'gaps', label: 'Platform gaps' }, { value: 'stale-docs', label: 'Stale docs' }]} />
        <SelectFilter label="Missing on" value={gap} onChange={(v) => set('gap', v)} options={[{ value: 'all', label: 'Any platform' }, ...PLATFORMS.map((p) => ({ value: p, label: `Missing on ${PLATFORM_LABEL[p]}` }))]} />
        <SelectFilter
          label="Owner"
          value={owner}
          onChange={(v) => set('owner', v)}
          options={[{ value: 'all', label: 'Any owner' }, { value: 'none', label: 'Unassigned' }, ...db.people.filter((p) => p.id !== 'p-you').map((p) => ({ value: p.id, label: p.name }))]}
        />
        {activeFilters > 0 && (
          <Button size="sm" variant="ghost" onClick={() => router.replace(`${BASE}/inventory${kind !== 'all' ? `?kind=${kind}` : ''}`, { scroll: false })}>
            Clear {activeFilters} filter{activeFilters > 1 ? 's' : ''}
          </Button>
        )}
        <span className="ml-auto text-[12px] text-ks-fg-subtle" aria-live="polite">
          {rows.length} of {db.items.length}
        </span>
      </div>

      {rows.length === 0 ? (
        <EmptyState title="Nothing matches those filters" action={<ButtonLink href={`${BASE}/proposals/new`}>Can&apos;t find it? Propose it</ButtonLink>}>
          If you expected something here, it may exist under another name. Try search (⌘K), which also matches aliases.
        </EmptyState>
      ) : (
        <div className="ks-scroll relative overflow-x-auto rounded-lg border border-ks-border bg-ks-surface">
          <table className="w-full min-w-[1080px] border-collapse text-[13px]">
            <thead className="border-b border-ks-border bg-ks-surface-2/60">
              <tr>
                <Th sort={sort} setSort={setSort} k="name">Name</Th>
                <Th sort={sort} setSort={setSort} k="category">Category</Th>
                <Th sort={sort} setSort={setSort} k="version">Version</Th>
                <Th sort={sort} setSort={setSort} k="lifecycle">Lifecycle</Th>
                <Th sort={sort} setSort={setSort}>Platforms</Th>
                <Th sort={sort} setSort={setSort}>Parity</Th>
                <Th sort={sort} setSort={setSort} k="completeness">Complete</Th>
                <Th sort={sort} setSort={setSort} k="owner">Owner</Th>
                <Th sort={sort} setSort={setSort} k="adoption" className="text-right">Instances</Th>
                <Th sort={sort} setSort={setSort} k="updatedAt">Updated</Th>
                <Th sort={sort} setSort={setSort}>
                  <span className="sr-only">Docs</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.slug} onClick={() => setOpen(i.slug)} className="cursor-pointer border-b border-ks-border last:border-0 hover:bg-ks-surface-2">
                  <td className="px-3 py-2.5">
                    <button type="button" onClick={() => setOpen(i.slug)} className="text-left">
                      <span className="block whitespace-nowrap font-medium text-ks-fg">{i.name}</span>
                      <span className="block whitespace-nowrap font-ks-mono text-[11px] text-ks-fg-subtle">
                        {i.id}
                        {i.kind !== 'component' && ` · ${i.kind === 'pattern' ? 'Pattern' : 'Product'}`}
                        {i.promotionCandidate && ' · promote?'}
                      </span>
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-ks-fg-muted">{i.category}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-ks-mono text-[12px] text-ks-fg-muted">{i.version}</td>
                  <td className="px-3 py-2.5">
                    <LifecyclePill lifecycle={i.lifecycle} />
                  </td>
                  <td className="px-3 py-2.5">
                    <PlatformStrip platforms={i.platforms} drift={driftFor(i).map((d) => d.platform)} />
                  </td>
                  <td className="px-3 py-2.5">
                    <ParityPill status={parityStatus(i)} />
                  </td>
                  <td className="px-3 py-2.5">
                    <ScoreCell value={completeness(i).score} />
                  </td>
                  <td className="max-w-[160px] px-3 py-2.5">
                    <PersonChip person={person(i.ownerId)} />
                  </td>
                  <td className="ks-tabular px-3 py-2.5 text-right text-ks-fg-muted">{i.adoption.instances.toLocaleString()}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-ks-fg-muted">{formatDate(i.updatedAt, { month: 'short', day: 'numeric', year: '2-digit' })}</td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <Link href={`${BASE}/components/${i.slug}`} aria-label={`${i.name} documentation`} className="inline-flex rounded p-1 text-ks-fg-subtle hover:bg-ks-surface hover:text-ks-accent-text">
                      <BookOpenText size={17} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ItemQuickView slug={open} onClose={() => setOpen(null)} />
    </>
  );
}
