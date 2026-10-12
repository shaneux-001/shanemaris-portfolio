'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { DownloadSimple, X } from '@phosphor-icons/react';
import { LAST_SPRINT_ID } from '@/lib/labs/dsManager/seed';
import type { ChangeEntry, ChangeType, Platform } from '@/lib/labs/dsManager/types';
import { PLATFORMS, PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import { downloadText } from '../../_components/CodeBlock';
import { Button, EmptyState, PageHeader, PersonAvatar, Pill, Segmented, SelectFilter, cx, formatDate, type Tone } from '../../_components/ui';

const TYPE_TONE: Record<ChangeType, Tone> = { added: 'accent', changed: 'info', fixed: 'success', deprecated: 'danger', removed: 'danger', docs: 'neutral', tokens: 'neutral' };

export default function Changelog() {
  const { db, item, person } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const get = (k: string, d: string) => params.get(k) ?? d;
  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params.toString());
    next.set(k, v);
    router.replace(`${BASE}/changelog?${next}`, { scroll: false });
  };

  const platform = get('platform', 'all') as 'all' | Platform;
  const sprint = get('sprint', params.get('item') ? 'all' : LAST_SPRINT_ID);
  const type = get('type', 'all');
  const breaking = params.get('breaking') === '1';
  const itemSlug = params.get('item');
  const it = itemSlug ? item(itemSlug) : undefined;

  const entries = useMemo(
    () =>
      db.changes
        .filter((c) => (platform === 'all' || c.platforms.includes(platform)) && (sprint === 'all' || c.sprintId === sprint || (sprint === LAST_SPRINT_ID && c.id.startsWith('chg-local'))) && (type === 'all' || c.type === type) && (!breaking || c.breaking) && (!itemSlug || c.itemSlug === itemSlug))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [db.changes, platform, sprint, type, breaking, itemSlug],
  );

  const bySprint = useMemo(() => {
    const groups = new Map<string, ChangeEntry[]>();
    for (const e of entries) groups.set(e.sprintId, [...(groups.get(e.sprintId) ?? []), e]);
    return [...groups.entries()];
  }, [entries]);

  const sprintMeta = (id: string) => db.sprints.find((s) => s.id === id);
  const sprintsWithChanges = db.sprints.filter((s) => db.changes.some((c) => c.sprintId === s.id)).reverse();

  const markdown = () =>
    bySprint
      .map(([s, es]) => `## Sprint ${s}\n\n${es.map((e) => `- **${e.itemSlug ? item(e.itemSlug)?.name : 'Tokens'}** (${e.type}${e.breaking ? ', breaking' : ''}; ${e.platforms.map((p) => PLATFORM_LABEL[p]).join(', ')}): ${e.summary}`).join('\n')}`)
      .join('\n\n');

  return (
    <>
      <PageHeader
        title={it ? `${it.name} changelog` : 'Changelog'}
        description={it ? `Every recorded change to ${it.name} across platforms.` : 'What changed in the system, by sprint and platform. Edits made in Keystone (owner, lifecycle, tokens) are logged here too.'}
        actions={
          <Button size="sm" onClick={() => downloadText('meridian-changelog.md', markdown())}>
            <DownloadSimple size={15} /> Release notes (.md)
          </Button>
        }
      />
      {it && (
        <div className="mb-4 flex items-center gap-2">
          <Pill tone="accent">
            {it.name}
            <button type="button" aria-label="Clear component filter" onClick={() => router.replace(`${BASE}/changelog`, { scroll: false })}>
              <X size={12} />
            </button>
          </Pill>
          <Link href={`${BASE}/components/${it.slug}`} className="text-[12.5px] text-ks-accent-text hover:underline">
            Open docs
          </Link>
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Segmented<'all' | Platform> label="Platform" value={platform} onChange={(v) => set('platform', v)} options={[{ value: 'all', label: 'All platforms' }, ...PLATFORMS.map((p) => ({ value: p, label: PLATFORM_LABEL[p] }))]} />
        <SelectFilter label="Sprint" value={sprint} onChange={(v) => set('sprint', v)} options={[{ value: 'all', label: 'All sprints' }, ...sprintsWithChanges.map((s) => ({ value: s.id, label: `${s.name}${s.id === LAST_SPRINT_ID ? ' (last)' : ''}` }))]} />
        <SelectFilter label="Type" value={type} onChange={(v) => set('type', v)} options={[{ value: 'all', label: 'All types' }, ...(Object.keys(TYPE_TONE) as ChangeType[]).map((t) => ({ value: t, label: t[0].toUpperCase() + t.slice(1) }))]} />
        <label className="flex h-8 items-center gap-2 rounded-md border border-ks-border bg-ks-surface px-2.5 text-[12.5px]">
          <input type="checkbox" checked={breaking} onChange={(e) => set('breaking', e.target.checked ? '1' : '0')} className="accent-[var(--ks-accent)]" />
          Breaking only
        </label>
      </div>

      {sprint !== 'all' && !it && (
        <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {PLATFORMS.map((p) => {
            const n = db.changes.filter((c) => c.sprintId === sprint && c.platforms.includes(p)).length;
            return (
              <button key={p} type="button" onClick={() => set('platform', platform === p ? 'all' : p)} className={cx('rounded-lg border bg-ks-surface px-4 py-3 text-left', platform === p ? 'border-ks-accent' : 'border-ks-border hover:border-ks-border-strong')}>
                <div className="text-[12px] text-ks-fg-muted">{PLATFORM_LABEL[p]}</div>
                <div className="ks-tabular text-[22px] font-semibold">{n}</div>
                <div className="text-[11.5px] text-ks-fg-subtle">changes this sprint</div>
              </button>
            );
          })}
        </div>
      )}

      {entries.length === 0 ? (
        <EmptyState title="No changes match">Try another sprint or platform.</EmptyState>
      ) : (
        <div className="flex flex-col gap-8">
          {bySprint.map(([s, es]) => {
            const meta = sprintMeta(s);
            return (
              <section key={s}>
                <h2 className="m-0 mb-3 flex flex-wrap items-baseline gap-2 text-[15px] font-semibold">
                  {meta?.name ?? `Sprint ${s}`}
                  {meta && (
                    <span className="text-[12.5px] font-normal text-ks-fg-subtle">
                      {meta.pi} · {formatDate(meta.start)} – {formatDate(meta.end)}
                    </span>
                  )}
                </h2>
                <ol className="m-0 list-none overflow-hidden rounded-lg border border-ks-border bg-ks-surface p-0">
                  {es.map((e) => (
                    <li key={e.id} className="flex gap-3 border-b border-ks-border px-4 py-3 last:border-0">
                      <PersonAvatar person={person(e.authorId)} size={26} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {e.itemSlug ? (
                            <Link href={`${BASE}/changelog?item=${e.itemSlug}`} className="font-medium hover:underline">
                              {item(e.itemSlug)?.name}
                            </Link>
                          ) : (
                            <span className="font-medium">Tokens</span>
                          )}
                          <Pill tone={TYPE_TONE[e.type]}>{e.type}</Pill>
                          {e.version && <Pill>v{e.version}</Pill>}
                          {e.breaking && <Pill tone="danger">Breaking</Pill>}
                        </div>
                        <p className="m-0 mt-1 text-[13.5px]">{e.summary}</p>
                        {e.details && <p className="m-0 mt-1 text-[12.5px] text-ks-fg-muted">{e.details}</p>}
                        {(e.breaking || e.type === 'deprecated') &&
                          db.migrations
                            .filter((m) => m.itemSlug === e.itemSlug)
                            .map((m) => (
                              <Link key={m.id} href={`${BASE}/migrations/${m.id}`} className="mt-1 inline-block text-[12.5px] font-medium text-ks-accent-text hover:underline">
                                Migration guide: {m.title} →
                              </Link>
                            ))}
                        <div className="mt-1 text-[12px] text-ks-fg-subtle">
                          {formatDate(e.date, { month: 'short', day: 'numeric', year: 'numeric' })} · {person(e.authorId)?.name} · {e.platforms.map((p) => PLATFORM_LABEL[p]).join(', ')}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
