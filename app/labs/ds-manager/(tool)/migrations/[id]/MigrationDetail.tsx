'use client';

import Link from 'next/link';
import { CheckCircle, Circle, CircleHalf, Terminal } from '@phosphor-icons/react';
import { adoptionSeries, daysBetween, migrationProgress } from '@/lib/labs/dsManager/metrics';
import type { MigrationStatus, Platform } from '@/lib/labs/dsManager/types';
import { PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../../_components/Store';
import { BASE } from '../../../_components/Shell';
import CodeBlock from '../../../_components/CodeBlock';
import MigrationBar from '../../../_components/MigrationBar';
import { LineChart } from '../../../_components/charts';
import { EmptyState, PageHeader, Panel, PersonChip, Pill, cx, formatDate } from '../../../_components/ui';

const STATUS: Record<MigrationStatus, { label: string; icon: typeof Circle; cls: string }> = {
  done: { label: 'Migrated', icon: CheckCircle, cls: 'text-ks-success' },
  'in-progress': { label: 'In progress', icon: CircleHalf, cls: 'text-ks-accent-text' },
  'not-started': { label: 'Not started', icon: Circle, cls: 'text-ks-fg-subtle' },
};

/** Inline `code` inside step text. */
function Step({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((p, i) =>
        p.startsWith('`') ? (
          <code key={i} className="rounded bg-ks-neutral-soft px-1 font-ks-mono text-[12px]">
            {p.slice(1, -1)}
          </code>
        ) : (
          p
        ),
      )}
    </>
  );
}

export default function MigrationDetail({ id }: { id: string }) {
  const { db, item, person } = useStore();
  const m = db.migrations.find((x) => x.id === id);
  if (!m) return <EmptyState title="No such migration guide" />;

  const from = item(m.itemSlug);
  const to = m.toSlug ? item(m.toSlug) : undefined;
  const p = migrationProgress(m);
  const daysLeft = daysBetween(m.deadline.slice(0, 10)) * -1;
  const series = m.kind === 'deprecation' ? adoptionSeries(db, m.itemSlug) : null;
  const platforms = Array.from(new Set([...Object.keys(m.before), ...Object.keys(m.after)])) as Platform[];
  const product = (pid: string) => db.products.find((x) => x.id === pid);
  const order: MigrationStatus[] = ['not-started', 'in-progress', 'done'];

  return (
    <>
      <PageHeader
        eyebrow={
          <Link href={`${BASE}/releases`} className="hover:text-ks-fg">
            ← Releases
          </Link>
        }
        title={m.title}
        description={
          <>
            {m.kind === 'deprecation' ? 'Deprecation' : 'Breaking change'} introduced in{' '}
            <Link href={`${BASE}/releases/${m.releasedIn}`} className="text-ks-accent-text hover:underline">
              {SYSTEM.name} {m.releasedIn}
            </Link>
            .
          </>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
          <div className="text-[12px] text-ks-fg-muted">Products migrated</div>
          <div className="ks-tabular text-[22px] font-semibold">
            {p.done} <span className="text-[14px] text-ks-fg-subtle">/ {p.total}</span>
          </div>
        </div>
        <div className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
          <div className="text-[12px] text-ks-fg-muted">Deadline</div>
          <div className="text-[15px] font-semibold">{formatDate(m.deadline, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          <div className={cx('text-[12px]', daysLeft < 30 && p.pct < 100 ? 'text-ks-warning' : 'text-ks-fg-subtle')}>{daysLeft >= 0 ? `${daysLeft} days left` : `${-daysLeft} days overdue`}</div>
        </div>
        {p.remainingInstances !== null && (
          <div className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
            <div className="text-[12px] text-ks-fg-muted">Usages left</div>
            <div className="ks-tabular text-[22px] font-semibold">{p.remainingInstances}</div>
          </div>
        )}
        <div className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
          <div className="text-[12px] text-ks-fg-muted">Migration owner</div>
          <div className="mt-1">
            <PersonChip person={person(m.ownerId)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <Panel title="Why this changed">
            <p className="m-0 text-[14px] leading-relaxed text-ks-fg-muted">{m.why}</p>
            {to && (
              <p className="m-0 mt-3 text-[13px]">
                Replacement:{' '}
                <Link href={`${BASE}/components/${to.slug}`} className="font-medium text-ks-accent-text hover:underline">
                  {to.name}
                </Link>
              </p>
            )}
          </Panel>

          <Panel title="How to migrate">
            {m.codemod && (
              <div className="mb-4">
                <div className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-medium">
                  <Terminal size={15} /> Codemod
                </div>
                <CodeBlock tabs={[{ id: 'sh', label: 'Terminal', code: m.codemod }]} />
              </div>
            )}
            <ol className="m-0 flex list-decimal flex-col gap-2 pl-5 text-[13.5px] leading-relaxed">
              {m.steps.map((s) => (
                <li key={s}>
                  <Step text={s} />
                </li>
              ))}
            </ol>
          </Panel>

          {platforms.length > 0 && (
            <section className="grid grid-cols-1 gap-3 xl:grid-cols-2">
              <div>
                <h3 className="m-0 mb-2 text-[13px] font-semibold text-ks-danger">Before</h3>
                <CodeBlock tabs={platforms.filter((x) => m.before[x]).map((x) => ({ id: x, label: PLATFORM_LABEL[x], code: m.before[x]! }))} />
              </div>
              <div>
                <h3 className="m-0 mb-2 text-[13px] font-semibold text-ks-success">After</h3>
                <CodeBlock tabs={platforms.filter((x) => m.after[x]).map((x) => ({ id: x, label: PLATFORM_LABEL[x], code: m.after[x]! }))} />
              </div>
            </section>
          )}

          {series && (
            <Panel title={`${from?.name} usages remaining`}>
              <LineChart values={series} labels={db.historySprints} label={`${from?.name} instances by sprint`} height={170} />
            </Panel>
          )}
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <Panel title="Progress by product">
            <MigrationBar m={m} />
            <ul className="m-0 mt-4 flex list-none flex-col p-0">
              {[...m.products]
                .sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status) || (b.remaining ?? 0) - (a.remaining ?? 0))
                .map((x) => {
                  const S = STATUS[x.status];
                  const prod = product(x.productId);
                  const team = db.teams.find((t) => t.id === prod?.teamId);
                  return (
                    <li key={x.productId} className="flex items-center gap-2.5 border-b border-ks-border py-2 text-[13px] last:border-0">
                      <S.icon size={16} weight={x.status === 'done' ? 'fill' : 'regular'} className={S.cls} aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{prod?.name}</span>
                        <span className="block text-[11.5px] text-ks-fg-subtle">{team?.name}</span>
                      </span>
                      {x.remaining !== undefined && <span className="ks-tabular text-[12px] text-ks-fg-muted">{x.remaining} left</span>}
                      <span className={cx('text-[12px]', S.cls)}>{S.label}</span>
                    </li>
                  );
                })}
            </ul>
          </Panel>
          {from && (
            <Panel title="Affected component">
              <Link href={`${BASE}/components/${from.slug}`} className="font-medium text-ks-accent-text hover:underline">
                {from.name}
              </Link>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <Pill>
                  {m.fromVersion} → {m.toVersion}
                </Pill>
                <Pill>{from.lifecycle}</Pill>
              </div>
            </Panel>
          )}
        </aside>
      </div>
    </>
  );
}
