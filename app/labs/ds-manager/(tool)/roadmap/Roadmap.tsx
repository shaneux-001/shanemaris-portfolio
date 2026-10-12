'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Info, Warning } from '@phosphor-icons/react';
import { CURRENT_SPRINT_ID } from '@/lib/labs/dsManager/seed';
import type { Impact, Platform, RoadmapItem, RoadmapStatus, RoadmapType } from '@/lib/labs/dsManager/types';
import { IMPACT_DEFINITION, PLATFORMS, PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import { CompletenessBreakdown } from '../../_components/ItemQuickView';
import { Drawer, ImpactPill, Meter, PageHeader, PersonAvatar, Pill, RoadmapStatusPill, Segmented, SelectFilter, cx, formatDate } from '../../_components/ui';

type View = 'sprints' | 'horizon' | 'list';

const TYPE_LABEL: Record<RoadmapType, string> = { new: 'New', enhancement: 'Enhancement', refactor: 'Refactor', parity: 'Parity', deprecation: 'Deprecation', foundation: 'Foundation' };
const STATUSES: RoadmapStatus[] = ['proposed', 'planned', 'in-progress', 'blocked', 'complete'];

function Card({ r, onOpen }: { r: RoadmapItem; onOpen: () => void }) {
  const { person } = useStore();
  return (
    <button type="button" onClick={onOpen} className="flex w-full flex-col gap-2 rounded-lg border border-ks-border bg-ks-surface p-3 text-left hover:border-ks-border-strong">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[13.5px] font-medium leading-snug text-ks-fg">{r.title}</span>
        <span className="shrink-0 font-ks-mono text-[10.5px] text-ks-fg-subtle">{r.id}</span>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        <RoadmapStatusPill status={r.status} />
        <Pill>{TYPE_LABEL[r.type]}</Pill>
        {(r.impact === 'high' || r.impact === 'breaking') && <ImpactPill impact={r.impact} />}
      </div>
      <Meter value={r.progress} tone={r.status === 'blocked' ? 'danger' : 'accent'} label={`${r.title} progress`} />
      <div className="flex items-center justify-between gap-2 text-[11.5px] text-ks-fg-subtle">
        <span>{r.platforms.map((p) => PLATFORM_LABEL[p]).join(' · ')}</span>
        <span className="flex -space-x-1.5">
          {r.ownerIds.map((o) => (
            <PersonAvatar key={o} person={person(o)} size={20} />
          ))}
        </span>
      </div>
    </button>
  );
}

function Detail({ r }: { r: RoadmapItem }) {
  const { item, person, run, db, can } = useStore();
  const it = r.itemSlug ? item(r.itemSlug) : undefined;
  const proposal = r.proposalId ? db.proposals.find((p) => p.id === r.proposalId) : undefined;
  return (
    <div className="flex flex-col gap-5 text-[13.5px]">
      <div className="flex flex-wrap items-center gap-1.5">
        <Pill>{TYPE_LABEL[r.type]}</Pill>
        <ImpactPill impact={r.impact} />
        <Pill>{r.priority} priority</Pill>
        <span className="text-[12.5px] text-ks-fg-subtle">
          {r.pi}
          {r.sprintId && ` · Sprint ${r.sprintId}`}
        </span>
      </div>
      <p className="m-0">{r.description}</p>
      <section className="rounded-md bg-ks-sunken p-3">
        <h3 className="m-0 mb-1 text-[12.5px] font-medium text-ks-fg-subtle">Why this matters</h3>
        <p className="m-0">{r.why}</p>
      </section>
      <p className="m-0 flex gap-1.5 text-[12.5px] text-ks-fg-muted">
        <Info size={14} className="mt-0.5 shrink-0" /> {IMPACT_DEFINITION[r.impact]}
      </p>
      <label className="flex flex-col gap-1 text-[12px] text-ks-fg-muted">
        Status
        <select disabled={!can('roadmap.edit')} value={r.status} onChange={(e) => run((x) => x.updateRoadmapItem(r.id, { status: e.target.value as RoadmapStatus, progress: e.target.value === 'complete' ? 100 : r.progress }))} className="h-8 rounded-md border border-ks-border bg-ks-surface px-2 text-[13px] text-ks-fg disabled:cursor-not-allowed disabled:opacity-60">
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace('-', ' ')}
            </option>
          ))}
        </select>
      </label>
      <div>
        <div className="mb-1 flex justify-between text-[12.5px]">
          <span className="font-medium">Progress</span>
          <span className="ks-tabular text-ks-fg-muted">{r.progress}%</span>
        </div>
        <Meter value={r.progress} tone={r.status === 'blocked' ? 'danger' : 'accent'} />
      </div>
      {r.risks && (
        <div className="flex gap-2 rounded-md bg-ks-warning-soft p-3 text-ks-warning">
          <Warning size={16} weight="fill" className="mt-0.5 shrink-0" />
          <span>{r.risks}</span>
        </div>
      )}
      {r.dependencies.length > 0 && (
        <section>
          <h3 className="m-0 mb-1 text-[12.5px] font-medium text-ks-fg-subtle">Dependencies</h3>
          <ul className="m-0 list-disc pl-5 text-ks-fg-muted">
            {r.dependencies.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h3 className="m-0 mb-2 text-[12.5px] font-medium text-ks-fg-subtle">Owners</h3>
        <div className="flex flex-col gap-1.5">
          {r.ownerIds.map((o) => (
            <span key={o} className="flex items-center gap-2">
              <PersonAvatar person={person(o)} size={22} /> {person(o)?.name} <span className="text-[12px] text-ks-fg-subtle">{person(o)?.title}</span>
            </span>
          ))}
        </div>
      </section>
      {proposal && (
        <Link href={`${BASE}/proposals?open=${proposal.id}`} className="rounded-md border border-ks-border p-3 hover:border-ks-border-strong">
          <span className="text-[12px] text-ks-fg-subtle">From proposal {proposal.id}</span>
          <div className="font-medium">{proposal.title}</div>
        </Link>
      )}
      {it && (
        <section className="border-t border-ks-border pt-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium">{it.name}</span>
            <Link href={`${BASE}/components/${it.slug}`} className="text-[12.5px] text-ks-accent-text hover:underline">
              Open docs
            </Link>
          </div>
          <CompletenessBreakdown item={it} />
        </section>
      )}
    </div>
  );
}

export default function Roadmap() {
  const { db } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState<View>('sprints');
  const [platform, setPlatform] = useState<'all' | Platform>('all');
  const [type, setType] = useState<'all' | RoadmapType>('all');
  const [impact, setImpact] = useState<'all' | Impact>('all');
  const open = params.get('item');
  const setOpen = (id: string | null) => router.replace(`${BASE}/roadmap${id ? `?item=${id}` : ''}`, { scroll: false });

  const items = useMemo(() => db.roadmap.filter((r) => (platform === 'all' || r.platforms.includes(platform)) && (type === 'all' || r.type === type) && (impact === 'all' || r.impact === impact)), [db.roadmap, platform, type, impact]);
  const current = db.roadmap.find((r) => r.id === open);
  const pi = db.sprints.find((s) => s.id === CURRENT_SPRINT_ID)!.pi;
  const piSprints = db.sprints.filter((s) => s.pi === pi && s.id >= CURRENT_SPRINT_ID);
  const doneInPi = db.roadmap.filter((r) => r.pi === pi && r.status === 'complete').length;
  const totalInPi = db.roadmap.filter((r) => r.pi === pi).length;

  const column = (key: string, title: React.ReactNode, sub: React.ReactNode, list: RoadmapItem[], highlight = false) => (
    <section key={key} className={cx('flex min-w-[260px] flex-1 flex-col gap-2 rounded-lg p-2', highlight ? 'bg-ks-accent-soft/60' : 'bg-ks-sunken')}>
      <header className="flex items-baseline justify-between px-1 py-1">
        <h2 className="m-0 text-[13px] font-semibold">{title}</h2>
        <span className="text-[11.5px] text-ks-fg-subtle">{sub}</span>
      </header>
      {list.length ? list.map((r) => <Card key={r.id} r={r} onOpen={() => setOpen(r.id)} />) : <p className="m-0 px-1 py-4 text-center text-[12.5px] text-ks-fg-subtle">Nothing scheduled</p>}
    </section>
  );

  return (
    <>
      <PageHeader
        title="Roadmap"
        description={`What the design system team is working on now, next, and later. ${pi}: ${doneInPi} of ${totalInPi} items complete.`}
        actions={
          <Segmented<View>
            label="View"
            value={view}
            onChange={setView}
            options={[
              { value: 'sprints', label: 'Sprints' },
              { value: 'horizon', label: 'Now · Next · Later' },
              { value: 'list', label: 'List' },
            ]}
          />
        }
      />
      <div className="mb-5 flex flex-wrap gap-2">
        <SelectFilter<'all' | Platform> label="Platform" value={platform} onChange={setPlatform} options={[{ value: 'all', label: 'All platforms' }, ...PLATFORMS.map((p) => ({ value: p, label: PLATFORM_LABEL[p] }))]} />
        <SelectFilter<'all' | RoadmapType> label="Type" value={type} onChange={setType} options={[{ value: 'all', label: 'All types' }, ...(Object.keys(TYPE_LABEL) as RoadmapType[]).map((t) => ({ value: t, label: TYPE_LABEL[t] }))]} />
        <SelectFilter<'all' | Impact> label="Impact" value={impact} onChange={setImpact} options={[{ value: 'all', label: 'Any impact' }, { value: 'breaking', label: 'Breaking' }, { value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }]} />
      </div>

      {view === 'sprints' && (
        <div className="ks-scroll flex gap-3 overflow-x-auto pb-2">
          {piSprints.map((s) =>
            column(
              s.id,
              <>
                {s.name}
                {s.id === CURRENT_SPRINT_ID && <span className="ml-1.5 text-[11px] font-medium text-ks-accent-text">Current</span>}
              </>,
              `${formatDate(s.start)} – ${formatDate(s.end)}`,
              items.filter((r) => r.sprintId === s.id),
              s.id === CURRENT_SPRINT_ID,
            ),
          )}
          {column('backlog', `${pi} backlog`, 'not yet in a sprint', items.filter((r) => r.pi === pi && !r.sprintId))}
          {column('later', 'Later', 'next PI and beyond', items.filter((r) => r.pi !== pi))}
        </div>
      )}

      {view === 'horizon' && (
        <div className="ks-scroll flex gap-3 overflow-x-auto pb-2">
          {column('now', 'Now', 'this sprint', items.filter((r) => r.horizon === 'now'), true)}
          {column('next', 'Next', 'rest of the PI', items.filter((r) => r.horizon === 'next'))}
          {column('later', 'Later', 'future PIs', items.filter((r) => r.horizon === 'later'))}
        </div>
      )}

      {view === 'list' && (
        <div className="ks-scroll overflow-x-auto rounded-lg border border-ks-border bg-ks-surface">
          <table className="w-full min-w-[900px] border-collapse text-[13px]">
            <thead className="border-b border-ks-border bg-ks-surface-2/60 text-left text-[11.5px] text-ks-fg-subtle">
              <tr>
                {['Item', 'Type', 'Status', 'Impact', 'Platforms', 'When', 'Progress'].map((h) => (
                  <th key={h} className="px-3 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} onClick={() => setOpen(r.id)} className="cursor-pointer border-b border-ks-border last:border-0 hover:bg-ks-surface-2">
                  <td className="px-3 py-2.5">
                    <button type="button" className="text-left font-medium">
                      {r.title}
                    </button>
                    <div className="font-ks-mono text-[11px] text-ks-fg-subtle">{r.id}</div>
                  </td>
                  <td className="px-3 py-2.5 text-ks-fg-muted">{TYPE_LABEL[r.type]}</td>
                  <td className="px-3 py-2.5">
                    <RoadmapStatusPill status={r.status} />
                  </td>
                  <td className="px-3 py-2.5">
                    <ImpactPill impact={r.impact} />
                  </td>
                  <td className="px-3 py-2.5 text-ks-fg-muted">{r.platforms.map((p) => PLATFORM_LABEL[p]).join(', ')}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-ks-fg-muted">{r.sprintId ? `Sprint ${r.sprintId}` : r.pi}</td>
                  <td className="w-32 px-3 py-2.5">
                    <Meter value={r.progress} tone={r.status === 'blocked' ? 'danger' : 'accent'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Drawer open={!!current} onClose={() => setOpen(null)} title={current?.title}>
        {current && <Detail r={current} />}
      </Drawer>
    </>
  );
}
