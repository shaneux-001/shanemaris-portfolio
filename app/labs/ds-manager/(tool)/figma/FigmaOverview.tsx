'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowsClockwise, Warning } from '@phosphor-icons/react';
import { figmaHealth, figmaSummary, rowStatus, type ConnectStatus } from '@/lib/labs/dsManager/figma';
import { lockedReason } from '@/lib/labs/dsManager/permissions';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import { Button, LockedNote, PageHeader, Pill, Segmented, cx, formatDate, type Tone } from '../../_components/ui';

type Filter = 'all' | ConnectStatus;
type SortKey = 'name' | 'detach' | 'issues' | 'instances';

const STATUS: Record<ConnectStatus, [Tone, string]> = { connected: ['success', 'Connected'], issues: ['warning', 'Mismatches'], 'not-connected': ['neutral', 'Not connected'] };

export default function FigmaOverview() {
  const { db, can } = useStore();
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'detach', dir: -1 });
  const [syncNote, setSyncNote] = useState(false);
  const s = useMemo(() => figmaSummary(db), [db]);
  const rows = useMemo(() => {
    const val = (h: ReturnType<typeof figmaHealth>[number]) =>
      sort.key === 'name' ? h.item.name : sort.key === 'detach' ? (h.mapping?.detachRate ?? -1) : sort.key === 'issues' ? h.issues : (h.mapping?.figmaInstances ?? -1);
    return figmaHealth(db)
      .filter((h) => filter === 'all' || h.status === filter)
      .sort((a, b) => {
        const va = val(a);
        const vb = val(b);
        return (va < vb ? -1 : va > vb ? 1 : 0) * sort.dir;
      });
  }, [db, filter, sort]);

  const th = (k: SortKey, label: string, right = false) => (
    <th scope="col" aria-sort={sort.key === k ? (sort.dir === 1 ? 'ascending' : 'descending') : undefined} className={cx('px-3 py-2 font-medium', right && 'text-right')}>
      <button type="button" onClick={() => setSort((x) => ({ key: k, dir: x.key === k ? (-x.dir as 1 | -1) : k === 'name' ? 1 : -1 }))} className="inline-flex items-center gap-1 hover:text-ks-fg">
        {label}
        {sort.key === k && (sort.dir === 1 ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
      </button>
    </th>
  );

  return (
    <>
      <PageHeader
        title="Figma ↔ code"
        description={`How the ${SYSTEM.name} Figma library lines up with the coded components: which are connected through Code Connect, where properties disagree, and where designers are detaching instances to work around the library.`}
        actions={
          can('item.edit') ? (
            <Button size="sm" onClick={() => setSyncNote(true)}>
              <ArrowsClockwise size={15} /> Re-scan library
            </Button>
          ) : (
            <LockedNote>{lockedReason('item.edit')}</LockedNote>
          )
        }
      />
      {syncNote && (
        <div role="status" className="mb-5 rounded-lg bg-ks-accent-soft p-3 text-[13px]">
          <strong className="text-ks-accent-text">Figma isn&apos;t connected in this demo.</strong> A re-scan would pull component properties and instance and detach counts from Figma&apos;s library analytics, then re-check every mapping. The data here is from the last scan.
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['Components connected', `${s.connected} / ${s.total}`, `${s.clean} with no mismatches`],
          ['Properties aligned', `${Math.round((s.propsMapped / s.propsTotal) * 100)}%`, `${s.propsMapped} of ${s.propsTotal} across connected components`],
          ['Mismatches', String(s.issues), 'Figma-only, code-only or missing values'],
          ['Detach rate', `${(s.detachRate * 100).toFixed(1)}%`, `of ${s.instances.toLocaleString()} instances in design files`],
        ].map(([l, v, sub]) => (
          <div key={l} className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
            <div className="text-[12px] text-ks-fg-muted">{l}</div>
            <div className="ks-tabular mt-0.5 text-[22px] font-semibold">{v}</div>
            <div className="text-[11.5px] text-ks-fg-subtle">{sub}</div>
          </div>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <Segmented<Filter>
          label="Status"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'All' },
            { value: 'issues', label: 'Mismatches' },
            { value: 'connected', label: 'Connected' },
            { value: 'not-connected', label: 'Not connected' },
          ]}
        />
        <span className="text-[12px] text-ks-fg-subtle">A detach rate over 10% means designers are routinely working around the component.</span>
      </div>

      <div className="ks-scroll relative overflow-x-auto rounded-lg border border-ks-border bg-ks-surface">
        <table className="w-full min-w-[860px] border-collapse text-[13px]">
          <thead className="border-b border-ks-border bg-ks-surface-2/60 text-left text-[11.5px] text-ks-fg-subtle">
            <tr>
              {th('name', 'Component')}
              <th className="px-3 py-2 font-medium">Status</th>
              {th('issues', 'Mismatches')}
              <th className="px-3 py-2 font-medium">Biggest gap</th>
              {th('instances', 'Instances', true)}
              {th('detach', 'Detached', true)}
              <th className="px-3 py-2 font-medium">Synced</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((h) => {
              const [tone, label] = STATUS[h.status];
              const gap = h.mapping?.props.find((r) => !r.intentional && rowStatus(r) !== 'mapped');
              const d = h.mapping?.detachRate;
              return (
                <tr key={h.item.slug} className="border-b border-ks-border last:border-0 hover:bg-ks-surface-2">
                  <td className="px-3 py-2.5">
                    <Link href={`${BASE}/components/${h.item.slug}?tab=figma`} className="font-medium hover:underline">
                      {h.item.name}
                    </Link>
                    {h.mapping && <div className="truncate text-[11.5px] text-ks-fg-subtle">{h.mapping.nodeName}</div>}
                  </td>
                  <td className="px-3 py-2.5">
                    <Pill tone={tone}>{label}</Pill>
                  </td>
                  <td className="ks-tabular px-3 py-2.5 text-ks-fg-muted">{h.mapping ? h.issues : '—'}</td>
                  <td className="max-w-[280px] px-3 py-2.5 text-[12.5px] text-ks-fg-muted">
                    <span className="line-clamp-2">{gap ? `${gap.figmaProp ?? gap.codeProp}: ${gap.note ?? ''}` : h.mapping ? '—' : h.item.kind === 'product-component' ? 'Mapped by the product team' : 'No mapping yet'}</span>
                  </td>
                  <td className="ks-tabular px-3 py-2.5 text-right text-ks-fg-muted">{h.mapping ? h.mapping.figmaInstances.toLocaleString() : '—'}</td>
                  <td className="px-3 py-2.5 text-right">
                    {d !== undefined ? (
                      <span className={cx('ks-tabular inline-flex items-center gap-1', d > 0.1 ? 'font-medium text-ks-danger' : 'text-ks-fg-muted')}>
                        {d > 0.1 && <Warning size={13} weight="fill" aria-label="High" />}
                        {(d * 100).toFixed(1)}%
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-[12.5px]">
                    {h.mapping ? <span className={h.stale ? 'font-medium text-ks-warning' : 'text-ks-fg-muted'}>{formatDate(h.mapping.lastSynced)}{h.stale && ' · stale'}</span> : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
