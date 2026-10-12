'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { WarningOctagon } from '@phosphor-icons/react';
import { completeness, driftFor, docsStale, isActive } from '@/lib/labs/dsManager/metrics';
import type { Person, Role } from '@/lib/labs/dsManager/types';
import { PLATFORM_LABEL, ROLE_LABEL } from '@/lib/labs/dsManager/types';
import { DEMO_USER_ID } from '@/lib/labs/dsManager/seed';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import { Drawer, LifecyclePill, PageHeader, Panel, PersonAvatar, Pill, ScoreCell, SelectFilter, cx } from '../../_components/ui';

export default function Owners() {
  const { db, run, team, person, can } = useStore();
  const [teamFilter, setTeamFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all');
  const [open, setOpen] = useState<string | null>(null);

  const people = db.people.filter((p) => p.id !== DEMO_USER_ID);
  const stats = useMemo(
    () =>
      new Map(
        people.map((p) => {
          const owned = db.items.filter((i) => i.ownerId === p.id);
          const act = owned.filter(isActive);
          const scores = act.map((i) => completeness(i).score);
          return [
            p.id,
            {
              owned,
              components: owned.filter((i) => i.kind !== 'pattern').length,
              patterns: owned.filter((i) => i.kind === 'pattern').length,
              avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
              issues: act.filter((i) => driftFor(i).length || docsStale(i)).length,
              roadmap: db.roadmap.filter((r) => r.ownerIds.includes(p.id) && r.status !== 'complete').length,
            },
          ];
        }),
      ),
    [db, people],
  );

  const unowned = db.items.filter((i) => isActive(i) && !i.ownerId);
  const shown = people.filter((p) => (teamFilter === 'all' || p.teamId === teamFilter) && (roleFilter === 'all' || p.role === roleFilter)).sort((a, b) => stats.get(b.id)!.owned.length - stats.get(a.id)!.owned.length);
  const current = open ? person(open) : undefined;
  const maxOwned = Math.max(...people.map((p) => stats.get(p.id)!.owned.length), 1);

  return (
    <>
      <PageHeader title="Owners" description="Who is accountable for what. Every system item should have exactly one owner; load and health per person show where the team is stretched." />

      {unowned.length > 0 && (
        <Panel
          className="mb-5 border-ks-danger/40"
          title={
            <span className="flex items-center gap-1.5 text-ks-danger">
              <WarningOctagon size={15} weight="fill" /> {unowned.length} items have no owner
            </span>
          }
          bodyClassName="p-0"
        >
          <ul className="m-0 list-none p-0">
            {unowned.map((i) => (
              <li key={i.slug} className="flex flex-wrap items-center gap-3 border-b border-ks-border px-4 py-2.5 last:border-0">
                <Link href={`${BASE}/components/${i.slug}`} className="min-w-[160px] flex-1 font-medium hover:underline">
                  {i.name}
                </Link>
                <span className="text-[12.5px] text-ks-fg-subtle">
                  {i.adoption.instances.toLocaleString()} instances · {i.adoption.products} products
                </span>
                <label className="flex items-center gap-2 text-[12.5px] text-ks-fg-muted">
                  Assign
                  <select
                    disabled={!can('item.edit')}
                    title={can('item.edit') ? undefined : 'Only the DS team can assign owners.'}
                    defaultValue=""
                    onChange={(e) => e.target.value && run((r) => r.updateItem(i.slug, { ownerId: e.target.value }, `Ownership assigned to ${person(e.target.value)?.name}.`))}
                    className="h-7 rounded-md border border-ks-border bg-ks-surface px-2 text-[12.5px] text-ks-fg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">Choose…</option>
                    {people.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <SelectFilter label="Team" value={teamFilter} onChange={setTeamFilter} options={[{ value: 'all', label: 'All teams' }, ...db.teams.map((t) => ({ value: t.id, label: t.name }))]} />
        <SelectFilter<'all' | Role> label="Role" value={roleFilter} onChange={setRoleFilter} options={[{ value: 'all', label: 'All roles' }, ...(Object.keys(ROLE_LABEL) as Role[]).map((r) => ({ value: r, label: ROLE_LABEL[r] }))]} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((p) => {
          const s = stats.get(p.id)!;
          const t = team(p.teamId);
          return (
            <button key={p.id} type="button" onClick={() => setOpen(p.id)} className="flex flex-col gap-3 rounded-lg border border-ks-border bg-ks-surface p-4 text-left hover:border-ks-border-strong">
              <div className="flex items-center gap-3">
                <PersonAvatar person={p} size={40} />
                <div className="min-w-0">
                  <div className="truncate font-medium">{p.name}</div>
                  <div className="truncate text-[12.5px] text-ks-fg-muted">{p.title}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Pill tone={t?.type === 'system' ? 'accent' : 'neutral'}>{t?.name}</Pill>
                <Pill>{ROLE_LABEL[p.role]}</Pill>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-[12px] text-ks-fg-subtle">
                  <span>
                    Owns {s.components} component{s.components === 1 ? '' : 's'}
                    {s.patterns ? `, ${s.patterns} pattern${s.patterns === 1 ? '' : 's'}` : ''}
                  </span>
                  <span>{s.roadmap} on roadmap</span>
                </div>
                <span className="block h-1.5 rounded-full bg-ks-neutral-soft">
                  <span className="block h-full rounded-full bg-ks-accent" style={{ width: `${(s.owned.length / maxOwned) * 100}%` }} />
                </span>
              </div>
              {s.owned.length > 0 ? (
                <div className="flex items-center justify-between text-[12.5px]">
                  <ScoreCell value={s.avg} />
                  {s.issues > 0 ? <span className="text-ks-warning">{s.issues} need attention</span> : <span className="text-ks-fg-subtle">All healthy</span>}
                </div>
              ) : (
                <div className="text-[12.5px] text-ks-fg-subtle">Contributor — owns nothing directly</div>
              )}
            </button>
          );
        })}
      </div>

      <Drawer open={!!current} onClose={() => setOpen(null)} title={current?.name}>
        {current && <PersonDetail p={current} />}
      </Drawer>
    </>
  );
}

function PersonDetail({ p }: { p: Person }) {
  const { db, team } = useStore();
  const owned = db.items.filter((i) => i.ownerId === p.id);
  const work = db.roadmap.filter((r) => r.ownerIds.includes(p.id));
  const changes = db.changes.filter((c) => c.authorId === p.id).slice(0, 6);
  return (
    <div className="flex flex-col gap-6 text-[13.5px]">
      <div className="flex items-center gap-3">
        <PersonAvatar person={p} size={48} />
        <div>
          <div className="font-medium">{p.title}</div>
          <div className="text-[12.5px] text-ks-fg-muted">
            {team(p.teamId)?.name} · {p.platforms.map((x) => PLATFORM_LABEL[x]).join(', ')}
          </div>
        </div>
      </div>
      <section>
        <h3 className="m-0 mb-2 text-[13px] font-semibold">Owns ({owned.length})</h3>
        {owned.length ? (
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {owned.map((i) => (
              <li key={i.slug}>
                <Link href={`${BASE}/components/${i.slug}`} className="-mx-2 flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-ks-surface-2">
                  <span className="min-w-0 flex-1 truncate">{i.name}</span>
                  {driftFor(i).length > 0 && <span className="text-[11.5px] text-ks-warning">drift</span>}
                  <LifecyclePill lifecycle={i.lifecycle} />
                  <ScoreCell value={completeness(i).score} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="m-0 text-ks-fg-muted">Nothing owned directly.</p>
        )}
      </section>
      <section>
        <h3 className="m-0 mb-2 text-[13px] font-semibold">Roadmap work ({work.length})</h3>
        {work.map((r) => (
          <Link key={r.id} href={`${BASE}/roadmap?item=${r.id}`} className={cx('-mx-2 block rounded-md px-2 py-1.5 hover:bg-ks-surface-2')}>
            {r.title} <span className="text-[12px] text-ks-fg-subtle">· {r.status.replace('-', ' ')}</span>
          </Link>
        ))}
      </section>
      <section>
        <h3 className="m-0 mb-2 text-[13px] font-semibold">Recent changes</h3>
        {changes.length ? (
          changes.map((c) => (
            <div key={c.id} className="mb-1.5 text-ks-fg-muted">
              <span className="text-ks-fg">{db.items.find((i) => i.slug === c.itemSlug)?.name ?? 'Tokens'}</span> — {c.summary}
            </div>
          ))
        ) : (
          <p className="m-0 text-ks-fg-muted">None in the tracked window.</p>
        )}
      </section>
    </div>
  );
}
