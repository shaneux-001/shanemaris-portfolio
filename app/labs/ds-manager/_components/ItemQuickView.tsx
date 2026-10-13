'use client';

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { completeness, driftFor, parityStatus } from '@/lib/labs/dsManager/metrics';
import { lockedReason } from '@/lib/labs/dsManager/permissions';
import type { Lifecycle, SystemItem } from '@/lib/labs/dsManager/types';
import { KIND_LABEL, LIFECYCLES, PLATFORMS, PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from './Store';
import { BASE } from './Shell';
import { ButtonLink, Drawer, LifecyclePill, LockedNote, Meter, ParityPill, PersonChip, scoreTone, TONE_TEXT, cx } from './ui';

/** Completeness breakdown — the factors behind the score, not just the number. */
export function CompletenessBreakdown({ item }: { item: SystemItem }) {
  const { score, factors } = completeness(item);
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-[13px] font-medium">Completeness</span>
        <span className="ks-tabular text-[20px] font-semibold">{score}%</span>
      </div>
      <Meter value={score} label="Completeness" className="mb-3" />
      <ul className="m-0 grid list-none grid-cols-1 gap-1.5 p-0 text-[12.5px] sm:grid-cols-2">
        {factors.map((f) => (
          <li key={f.key} className="flex items-center justify-between gap-2 rounded-md bg-ks-sunken px-2.5 py-1.5">
            <span className={cx(f.met < 1 ? 'text-ks-fg' : 'text-ks-fg-muted')}>{f.label}</span>
            <span className={cx('ks-tabular text-[12px] font-medium', f.met >= 1 ? 'text-ks-success' : f.met > 0 ? 'text-ks-warning' : 'text-ks-danger')}>
              {f.met >= 1 ? `+${f.weight}` : f.met > 0 ? `+${Math.round(f.weight * f.met)} / ${f.weight}` : `0 / ${f.weight}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PlatformTable({ item }: { item: SystemItem }) {
  const drift = driftFor(item);
  return (
    <table className="w-full border-collapse text-[12.5px]">
      <tbody>
        {PLATFORMS.map((p) => {
          const impl = item.platforms[p];
          const d = drift.find((x) => x.platform === p);
          return (
            <tr key={p} className="border-b border-ks-border last:border-0">
              <td className="w-20 py-2 pr-3 font-medium">{PLATFORM_LABEL[p]}</td>
              <td className="py-2 pr-3">
                <span className={cx(impl.status === 'shipped' ? (d ? 'text-ks-warning' : 'text-ks-success') : impl.status === 'n/a' ? 'text-ks-fg-subtle' : impl.status === 'not-planned' ? 'text-ks-danger' : 'text-ks-fg-muted')}>
                  {impl.status === 'shipped' ? `Shipped ${impl.version ?? ''}` : impl.status === 'n/a' ? 'Not applicable' : impl.status.replace('-', ' ')}
                </span>
                {d && <div className="mt-0.5 text-ks-fg-muted">{d.reason}</div>}
              </td>
              <td className="py-2 text-right font-ks-mono text-[11px] text-ks-fg-subtle">{impl.ref}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Owner + lifecycle editing — exercises the repository's write path. */
export function ItemEditor({ item }: { item: SystemItem }) {
  const { db, run, person, can } = useStore();
  const owners = db.people.filter((p) => p.id !== 'p-you');
  const locked = !can('item.edit');
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {locked && (
        <div className="sm:col-span-2">
          <LockedNote>{lockedReason('item.edit')}</LockedNote>
        </div>
      )}
      <label className="flex flex-col gap-1 text-[12px] text-ks-fg-muted">
        Owner
        <select
          disabled={locked}
          value={item.ownerId ?? ''}
          onChange={(e) => {
            const id = e.target.value || undefined;
            run((r) => r.updateItem(item.slug, { ownerId: id }, id ? `Ownership assigned to ${person(id)?.name}.` : 'Owner removed.'));
          }}
          className="h-8 rounded-md border border-ks-border-input bg-ks-surface px-2 text-[13px] text-ks-fg disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">Unassigned</option>
          {owners.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-[12px] text-ks-fg-muted">
        Lifecycle
        <select
          disabled={locked}
          value={item.lifecycle}
          onChange={(e) => {
            const l = e.target.value as Lifecycle;
            run((r) => r.updateItem(item.slug, { lifecycle: l }, `Lifecycle changed from ${item.lifecycle} to ${l}.`));
          }}
          className="h-8 rounded-md border border-ks-border-input bg-ks-surface px-2 text-[13px] text-ks-fg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {LIFECYCLES.map((l) => (
            <option key={l} value={l}>
              {l[0].toUpperCase() + l.slice(1)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default function ItemQuickView({ slug, onClose }: { slug: string | null; onClose: () => void }) {
  const { item, person } = useStore();
  const it = slug ? item(slug) : undefined;
  return (
    <Drawer
      open={!!it}
      onClose={onClose}
      title={
        it && (
          <span className="flex items-center gap-2">
            {it.name}
            <span className="font-ks-mono text-[11.5px] font-normal text-ks-fg-subtle">{it.id}</span>
          </span>
        )
      }
    >
      {it && (
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              <LifecyclePill lifecycle={it.lifecycle} />
              <ParityPill status={parityStatus(it)} />
              <span className="text-[12px] text-ks-fg-subtle">
                {KIND_LABEL[it.kind]} · {it.category} · v{it.version}
              </span>
            </div>
            <p className="m-0 text-[13.5px] text-ks-fg-muted">{it.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              ['Products', it.adoption.products],
              ['Instances', it.adoption.instances.toLocaleString()],
              ['Completeness', `${completeness(it).score}%`],
            ].map(([l, v]) => (
              <div key={l as string} className="rounded-md bg-ks-sunken px-2 py-2.5">
                <div className={cx('ks-tabular text-[17px] font-semibold', l === 'Completeness' && TONE_TEXT[scoreTone(completeness(it).score)])}>{v}</div>
                <div className="text-[11.5px] text-ks-fg-subtle">{l}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-2 text-[13px] font-medium">Ownership & lifecycle</div>
            <div className="mb-3">
              <PersonChip person={person(it.ownerId)} />
            </div>
            <ItemEditor item={it} />
          </div>
          <CompletenessBreakdown item={it} />
          <div>
            <div className="mb-1 text-[13px] font-medium">Platforms</div>
            <PlatformTable item={it} />
          </div>
          <ButtonLink href={`${BASE}/components/${it.slug}`} variant="primary">
            Open documentation <ArrowRight size={15} />
          </ButtonLink>
          {it.replacedBy && (
            <p className="m-0 rounded-md bg-ks-danger-soft p-3 text-[12.5px] text-ks-danger">
              Deprecated. Use{' '}
              <Link className="font-medium underline" href={`${BASE}/components/${it.replacedBy}`}>
                {it.replacedBy}
              </Link>{' '}
              instead.
            </p>
          )}
        </div>
      )}
    </Drawer>
  );
}
