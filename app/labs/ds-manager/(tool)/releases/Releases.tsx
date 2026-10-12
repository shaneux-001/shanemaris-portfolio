'use client';

import Link from 'next/link';
import type { ChangeEntry, ChangeType, Release } from '@/lib/labs/dsManager/types';
import { PLATFORMS, PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import { CopyButton } from '../../_components/CodeBlock';
import MigrationBar from '../../_components/MigrationBar';
import { EmptyState, PageHeader, PersonAvatar, Pill, cx, formatDate, type Tone } from '../../_components/ui';

export const TYPE_ORDER: ChangeType[] = ['added', 'changed', 'fixed', 'tokens', 'docs', 'deprecated', 'removed'];
const TYPE_HEADING: Record<ChangeType, string> = { added: 'New', changed: 'Improved', fixed: 'Fixed', tokens: 'Tokens', docs: 'Documentation', deprecated: 'Deprecated', removed: 'Removed' };
const TYPE_TONE: Record<ChangeType, Tone> = { added: 'accent', changed: 'info', fixed: 'success', deprecated: 'danger', removed: 'danger', docs: 'neutral', tokens: 'neutral' };

export function releaseChanges(r: Release, changes: ChangeEntry[]) {
  return changes.filter((c) => c.sprintId === r.sprintId);
}

export function releaseMarkdown(r: Release, changes: ChangeEntry[], name: (slug?: string) => string) {
  const cs = releaseChanges(r, changes);
  const breaking = cs.filter((c) => c.breaking);
  const lines = [`# ${SYSTEM.name} ${r.version}`, '', `_${formatDate(r.date, { month: 'long', day: 'numeric', year: 'numeric' })} · Sprint ${r.sprintId}_`, '', r.summary, ''];
  lines.push('| Platform | Package |', '|---|---|', ...PLATFORMS.map((p) => `| ${PLATFORM_LABEL[p]} | \`${r.packages[p]}\` |`), '');
  if (breaking.length) lines.push('## ⚠ Breaking changes', '', ...breaking.map((c) => `- **${name(c.itemSlug)}**: ${c.summary}`), '');
  for (const t of TYPE_ORDER) {
    const group = cs.filter((c) => c.type === t && !c.breaking);
    if (group.length) lines.push(`## ${TYPE_HEADING[t]}`, '', ...group.map((c) => `- **${name(c.itemSlug)}** (${c.platforms.map((p) => PLATFORM_LABEL[p]).join(', ')}): ${c.summary}`), '');
  }
  return lines.join('\n');
}

function Entry({ c }: { c: ChangeEntry }) {
  const { item, person } = useStore();
  return (
    <li className="flex gap-3 py-2">
      <PersonAvatar person={person(c.authorId)} size={22} />
      <div className="min-w-0">
        <div className="text-[13.5px]">
          {c.itemSlug ? (
            <Link href={`${BASE}/components/${c.itemSlug}`} className="font-medium hover:underline">
              {item(c.itemSlug)?.name}
            </Link>
          ) : (
            <span className="font-medium">Tokens</span>
          )}
          {c.version && <span className="ml-1.5 font-ks-mono text-[11.5px] text-ks-fg-subtle">v{c.version}</span>} <span className="text-ks-fg-muted">— {c.summary}</span>
        </div>
        <div className="text-[11.5px] text-ks-fg-subtle">{c.platforms.map((p) => PLATFORM_LABEL[p]).join(', ')}</div>
      </div>
    </li>
  );
}

export function ReleaseNotes({ r }: { r: Release }) {
  const { db } = useStore();
  const cs = releaseChanges(r, db.changes);
  const breaking = cs.filter((c) => c.breaking);
  const migrations = db.migrations.filter((m) => r.migrationIds.includes(m.id));
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {PLATFORMS.map((p) => (
          <div key={p} className="rounded-md bg-ks-sunken px-3 py-2">
            <div className="text-[11.5px] text-ks-fg-subtle">{PLATFORM_LABEL[p]}</div>
            <div className={cx('truncate font-ks-mono text-[12px]', !r.packages[p].endsWith(r.version) && p !== 'figma' ? 'text-ks-warning' : 'text-ks-fg')}>{r.packages[p]}</div>
          </div>
        ))}
      </div>
      {breaking.length > 0 && (
        <section className="rounded-lg border border-ks-danger/40 bg-ks-danger-soft/40 p-4">
          <h3 className="m-0 mb-1 text-[13px] font-semibold text-ks-danger">Breaking changes</h3>
          <ul className="m-0 list-none p-0">
            {breaking.map((c) => (
              <Entry key={c.id} c={c} />
            ))}
          </ul>
          {migrations.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {migrations.map((m) => (
                <Link key={m.id} href={`${BASE}/migrations/${m.id}`} className="rounded-md bg-ks-surface px-3 py-1.5 text-[12.5px] font-medium text-ks-accent-text hover:underline">
                  Migration guide: {m.title} →
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
      {TYPE_ORDER.map((t) => {
        const group = cs.filter((c) => c.type === t && !c.breaking);
        if (!group.length) return null;
        return (
          <section key={t}>
            <h3 className="m-0 flex items-center gap-2 text-[13px] font-semibold">
              {TYPE_HEADING[t]} <Pill tone={TYPE_TONE[t]}>{group.length}</Pill>
            </h3>
            <ul className="m-0 list-none divide-y divide-ks-border p-0">
              {group.map((c) => (
                <Entry key={c.id} c={c} />
              ))}
            </ul>
          </section>
        );
      })}
      {!breaking.length && migrations.length > 0 && (
        <section>
          <h3 className="m-0 mb-2 text-[13px] font-semibold">Migration guides</h3>
          {migrations.map((m) => (
            <Link key={m.id} href={`${BASE}/migrations/${m.id}`} className="mb-1 block text-[13px] text-ks-accent-text hover:underline">
              {m.title} →
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}

export default function Releases() {
  const { db, item } = useStore();
  const name = (slug?: string) => (slug ? (item(slug)?.name ?? slug) : 'Tokens');
  const active = db.migrations.filter((m) => m.products.some((p) => p.status !== 'done'));
  return (
    <>
      <PageHeader title="Releases" description={`What shipped in each ${SYSTEM.name} release, which package versions it contains per platform, and what you need to do about it. Components version independently; a release bundles everything that shipped in its sprint.`} />

      {active.length > 0 && (
        <section className="mb-8">
          <h2 className="m-0 mb-3 text-[15px] font-semibold">Migrations in progress</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {active.map((m) => (
              <Link key={m.id} href={`${BASE}/migrations/${m.id}`} className="flex flex-col gap-3 rounded-lg border border-ks-border bg-ks-surface p-4 hover:border-ks-border-strong">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium">{m.title}</span>
                  <Pill tone={m.kind === 'deprecation' ? 'danger' : 'warning'}>{m.kind === 'deprecation' ? 'Deprecation' : 'Breaking'}</Pill>
                </div>
                <MigrationBar m={m} />
                <span className="text-[12px] text-ks-fg-subtle">Due {formatDate(m.deadline, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <h2 className="m-0 mb-3 text-[15px] font-semibold">Release history</h2>
      {db.releases.length === 0 ? (
        <EmptyState title="No releases yet" />
      ) : (
        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {db.releases.map((r, idx) => {
            const cs = releaseChanges(r, db.changes);
            const breaking = cs.some((c) => c.breaking) || r.version.endsWith('.0.0');
            return (
              <li key={r.version} className="rounded-lg border border-ks-border bg-ks-surface p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`${BASE}/releases/${r.version}`} className="text-[17px] font-semibold tracking-[-0.01em] hover:underline">
                        {SYSTEM.name} {r.version}
                      </Link>
                      {idx === 0 && <Pill tone="accent">Latest</Pill>}
                      {breaking && <Pill tone="danger">Contains breaking changes</Pill>}
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-ks-fg-subtle">
                      {formatDate(r.date, { month: 'long', day: 'numeric', year: 'numeric' })} · Sprint {r.sprintId} · {cs.length} change{cs.length === 1 ? '' : 's'}
                    </div>
                    <p className="m-0 mt-2 max-w-[80ch] text-[13.5px] text-ks-fg-muted">{r.summary}</p>
                  </div>
                  <div className="flex gap-1">
                    <CopyButton text={releaseMarkdown(r, db.changes, name)} label="Copy notes" />
                    <Link href={`${BASE}/releases/${r.version}`} className="inline-flex h-7 items-center rounded-md px-2 text-[12px] font-medium text-ks-accent-text hover:bg-ks-surface-2">
                      Release notes →
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
