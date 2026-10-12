'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowCounterClockwise, CheckCircle, GitPullRequest, Moon, SquaresFour, Sun, Warning, XCircle } from '@phosphor-icons/react';
import { completeness, driftFor, parityStatus } from '@/lib/labs/dsManager/metrics';
import { snippets } from '@/lib/labs/dsManager/codegen';
import { itemMarkdown } from '@/lib/labs/dsManager/exporters';
import { chain, resolve, type Mode } from '@/lib/labs/dsManager/tokens';
import { KIND_LABEL, PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from '../../../_components/Store';
import { BASE } from '../../../_components/Shell';
import MeridianScope from '../../../_components/meridian/MeridianScope';
import { DEMOS, defaultsFor, type Props } from '../../../_components/meridian/demos';
import CodeBlock, { CopyButton } from '../../../_components/CodeBlock';
import { CompletenessBreakdown, ItemEditor, PlatformTable } from '../../../_components/ItemQuickView';
import { ButtonLink, EmptyState, LifecyclePill, Panel, ParityPill, PersonChip, Pill, ProposalStatusPill, RoadmapStatusPill, Segmented, cx, formatDate, inputClass } from '../../../_components/ui';

type Tab = 'overview' | 'specs' | 'history' | 'health';

function Playground({ slug, values, setValues }: { slug: string; values: Props; setValues: (p: Props) => void }) {
  const demo = DEMOS[slug];
  const [mode, setMode] = useState<Mode>('light');
  if (!demo) {
    return <EmptyState title="No live demo yet">This item is documented in Figma only. Coded demos are added when an item reaches beta.</EmptyState>;
  }
  return (
    <div className="overflow-hidden rounded-lg border border-ks-border">
      <div className="flex items-center justify-between gap-2 border-b border-ks-border bg-ks-surface px-3 py-2">
        <span className="text-[12.5px] font-medium text-ks-fg-muted">Playground</span>
        <div className="flex items-center gap-1">
          <Segmented<Mode>
            label="Preview theme"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'light', label: <Sun size={14} aria-label="Light" /> },
              { value: 'dark', label: <Moon size={14} aria-label="Dark" /> },
            ]}
          />
          <button type="button" onClick={() => setValues(defaultsFor(demo))} aria-label="Reset controls" title="Reset controls" className="rounded-md p-1.5 text-ks-fg-subtle hover:bg-ks-surface-2 hover:text-ks-fg">
            <ArrowCounterClockwise size={15} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px]">
        <MeridianScope mode={mode} className={cx('flex min-h-[240px] p-8', demo.layout === 'stretch' ? 'items-center' : 'items-center justify-center')}>
          <div className={cx('flex w-full', demo.layout === 'stretch' ? 'justify-center' : 'justify-center')}>{demo.render(values)}</div>
        </MeridianScope>
        {demo.controls.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-ks-border bg-ks-surface p-4 md:border-l md:border-t-0">
            {demo.controls.map((c) => (
              <label key={c.name} className={cx('flex gap-1 text-[12px] text-ks-fg-muted', c.type === 'boolean' ? 'items-center justify-between' : 'flex-col')}>
                <span className="font-ks-mono">{c.label ?? c.name}</span>
                {c.type === 'select' && (
                  <select value={String(values[c.name])} onChange={(e) => setValues({ ...values, [c.name]: e.target.value })} className="h-8 rounded-md border border-ks-border bg-ks-surface px-2 text-[13px] text-ks-fg">
                    {c.options!.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                )}
                {c.type === 'text' && <input value={String(values[c.name])} onChange={(e) => setValues({ ...values, [c.name]: e.target.value })} className={cx(inputClass, 'h-8 py-0 text-[13px]')} />}
                {c.type === 'number' && <input type="number" value={Number(values[c.name])} onChange={(e) => setValues({ ...values, [c.name]: Number(e.target.value) })} className={cx(inputClass, 'h-8 py-0 text-[13px]')} />}
                {c.type === 'boolean' && <input type="checkbox" checked={values[c.name] === true} onChange={(e) => setValues({ ...values, [c.name]: e.target.checked })} className="h-4 w-4 accent-[var(--ks-accent)]" />}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Guidance({ title, items, tone }: { title: string; items: string[]; tone: 'do' | 'dont' | 'neutral' }) {
  if (!items.length) return null;
  const Icon = tone === 'do' ? CheckCircle : tone === 'dont' ? XCircle : null;
  return (
    <div className={cx('rounded-lg border p-4', tone === 'do' ? 'border-ks-success/40' : tone === 'dont' ? 'border-ks-danger/40' : 'border-ks-border')}>
      <h3 className={cx('m-0 mb-2 flex items-center gap-1.5 text-[13px] font-semibold', tone === 'do' ? 'text-ks-success' : tone === 'dont' ? 'text-ks-danger' : 'text-ks-fg')}>
        {Icon && <Icon size={16} weight="fill" />}
        {title}
      </h3>
      <ul className="m-0 flex list-disc flex-col gap-1 pl-4 text-[13px] text-ks-fg-muted">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ComponentDoc({ slug }: { slug: string }) {
  const { db, item, person } = useStore();
  const it = item(slug);
  const demo = DEMOS[slug];
  const [values, setValues] = useState<Props>(() => (demo ? defaultsFor(demo) : {}));
  const initialTab = useSearchParams().get('tab');
  const [tab, setTab] = useState<Tab>(['overview', 'specs', 'history', 'health'].includes(initialTab ?? '') ? (initialTab as Tab) : 'overview');

  const code = useMemo(() => (it && demo ? snippets(it, values, defaultsFor(demo), { childProp: demo.childProp, codeName: demo.codeName }) : null), [it, demo, values]);
  const tokenMap = useMemo(() => new Map(db.tokens.map((t) => [t.name, t])), [db.tokens]);

  if (!it) {
    return <EmptyState title="Not in the system" action={<ButtonLink href={`${BASE}/components`}>Back to the styleguide</ButtonLink>}>Nothing is documented at this address.</EmptyState>;
  }

  const drift = driftFor(it);
  const changes = db.changes.filter((c) => c.itemSlug === slug).sort((a, b) => b.date.localeCompare(a.date));
  const roadmap = db.roadmap.filter((r) => r.itemSlug === slug);
  const proposals = db.proposals.filter((p) => p.targetSlug === slug || p.closestMatch?.slug === slug);
  const dependents = db.items.filter((i) => i.dependencies.includes(slug));
  const owner = person(it.ownerId);

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-2 text-[12.5px] text-ks-fg-subtle">
        <Link href={`${BASE}/components`} className="hover:text-ks-fg">
          Styleguide
        </Link>{' '}
        / {it.category}
      </nav>
      <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="m-0 flex flex-wrap items-center gap-2 text-[26px] font-semibold tracking-[-0.02em]">
            {it.name}
            <span className="font-ks-mono text-[12px] font-normal text-ks-fg-subtle">{it.id}</span>
          </h1>
          <p className="m-0 mt-1 max-w-[70ch] text-[14px] text-ks-fg-muted">{it.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12.5px] text-ks-fg-muted">
            <LifecyclePill lifecycle={it.lifecycle} />
            <ParityPill status={parityStatus(it)} />
            <Pill>v{it.version}</Pill>
            <Pill>{KIND_LABEL[it.kind]}</Pill>
            <span className="mx-1 h-4 w-px bg-ks-border" />
            <PersonChip person={owner} />
            <span className="text-ks-fg-subtle">· Updated {formatDate(it.updatedAt, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={itemMarkdown(it, db)} label="Copy as Markdown" className="h-9 border border-ks-border-strong bg-ks-surface px-3" />
          <ButtonLink href={`${BASE}/sandbox?add=${slug}`}>
            <SquaresFour size={15} /> Sandbox
          </ButtonLink>
          <ButtonLink href={`${BASE}/proposals/new?enhance=${slug}`} variant="primary">
            <GitPullRequest size={15} /> Request a change
          </ButtonLink>
        </div>
      </header>

      {it.lifecycle === 'deprecated' && (
        <div role="alert" className="mb-5 flex items-start gap-2 rounded-lg bg-ks-danger-soft p-4 text-[13.5px] text-ks-danger">
          <Warning size={18} weight="fill" className="mt-0.5 shrink-0" />
          <div>
            <strong>Deprecated.</strong> {it.docs.summary}{' '}
            {it.replacedBy && (
              <Link href={`${BASE}/components/${it.replacedBy}`} className="font-medium underline">
                Go to {item(it.replacedBy)?.name}
              </Link>
            )}
          </div>
        </div>
      )}
      {it.lifecycle === 'experimental' && (
        <div className="mb-5 rounded-lg bg-ks-warning-soft p-3 text-[13px] text-ks-warning">Experimental: the API may change without a major version. Talk to the owner before using it in production.</div>
      )}

      <div role="tablist" aria-label="Documentation sections" className="ks-scroll mb-6 flex gap-1 overflow-x-auto border-b border-ks-border">
        {(
          [
            ['overview', 'Overview'],
            ['specs', 'Specs'],
            ['history', `History${changes.length ? ` (${changes.length})` : ''}`],
            ['health', 'Health'],
          ] as [Tab, string][]
        ).map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={cx('-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-[13.5px] font-medium', tab === k ? 'border-ks-accent text-ks-fg' : 'border-transparent text-ks-fg-subtle hover:text-ks-fg')}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="flex flex-col gap-6">
          <Playground slug={slug} values={values} setValues={setValues} />
          {code && (
            <CodeBlock
              tabs={[
                { id: 'web', label: 'React', code: code.web },
                { id: 'ios', label: 'SwiftUI', code: code.ios },
                { id: 'android', label: 'Compose', code: code.android },
                { id: 'figma', label: 'Figma', code: code.figma },
              ]}
            />
          )}
          <section className="ks-prose max-w-[78ch] text-[14px] leading-relaxed">
            <h2 className="m-0 mb-2 text-[16px] font-semibold">Usage</h2>
            <p className="text-ks-fg-muted">{it.docs.summary}</p>
          </section>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Guidance title="When to use" items={it.docs.whenToUse} tone="neutral" />
            <Guidance title="When not to use" items={it.docs.whenNotToUse} tone="neutral" />
            <Guidance title="Do" items={it.docs.dos} tone="do" />
            <Guidance title="Don't" items={it.docs.donts} tone="dont" />
            <Guidance title="Accessibility" items={it.docs.a11y} tone="neutral" />
            <Guidance title="Content" items={it.docs.content ?? []} tone="neutral" />
          </div>
          {it.related.length > 0 && (
            <section>
              <h2 className="m-0 mb-2 text-[14px] font-semibold">Related</h2>
              <div className="flex flex-wrap gap-2">
                {it.related.map((r) => {
                  const rel = item(r);
                  return rel ? (
                    <Link key={r} href={`${BASE}/components/${r}`} className="rounded-md border border-ks-border bg-ks-surface px-3 py-1.5 text-[13px] hover:border-ks-border-strong">
                      {rel.name} <span className="text-ks-fg-subtle">· {rel.lifecycle}</span>
                    </Link>
                  ) : null;
                })}
              </div>
            </section>
          )}
        </div>
      )}

      {tab === 'specs' && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Panel title="Props" className="lg:col-span-2" bodyClassName="p-0">
            {it.props.length ? (
              <div className="ks-scroll overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-ks-border text-left text-[11.5px] text-ks-fg-subtle">
                      <th className="px-4 py-2 font-medium">Prop</th>
                      <th className="px-4 py-2 font-medium">Type</th>
                      <th className="px-4 py-2 font-medium">Default</th>
                      <th className="px-4 py-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {it.props.map((p) => (
                      <tr key={p.name} className="border-b border-ks-border last:border-0">
                        <td className="px-4 py-2 font-ks-mono text-[12px] text-ks-accent-text">{p.name}</td>
                        <td className="px-4 py-2 font-ks-mono text-[12px] text-ks-fg-muted">{p.type}</td>
                        <td className="px-4 py-2 font-ks-mono text-[12px] text-ks-fg-muted">{p.default ?? '—'}</td>
                        <td className="px-4 py-2 text-ks-fg-muted">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="m-0 p-4 text-[13px] text-ks-fg-muted">Props haven&apos;t been documented for this item yet — it counts against its docs score.</p>
            )}
          </Panel>
          <Panel title="Platforms">
            <PlatformTable item={it} />
          </Panel>
          <Panel
            title="Tokens"
            actions={
              <Link href={`${BASE}/tokens`} className="text-[12px] text-ks-accent-text hover:underline">
                All tokens
              </Link>
            }
          >
            {it.tokens.length ? (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {it.tokens.map((t) => {
                  const light = resolve(tokenMap, t, 'light');
                  const dark = resolve(tokenMap, t, 'dark');
                  const isColor = light.startsWith('#');
                  return (
                    <li key={t} className="flex items-center gap-3 text-[12.5px]">
                      {isColor ? (
                        <span className="flex shrink-0 overflow-hidden rounded border border-ks-border">
                          <span className="h-6 w-4" style={{ background: light }} />
                          <span className="h-6 w-4" style={{ background: dark }} />
                        </span>
                      ) : (
                        <span className="w-8 shrink-0 text-right font-ks-mono text-[11px] text-ks-fg-subtle">{light}</span>
                      )}
                      <span className="min-w-0">
                        <span className="block font-ks-mono text-ks-fg">{t}</span>
                        <span className="block truncate font-ks-mono text-[11px] text-ks-fg-subtle">{chain(tokenMap, t, 'light').slice(1).join(' → ') || light}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="m-0 text-[13px] text-ks-fg-muted">No token mapping recorded.</p>
            )}
          </Panel>
          <Panel title="Variants">
            {it.variants.length ? (
              <div className="flex flex-wrap gap-1.5">
                {it.variants.map((v) => (
                  <Pill key={v}>{v}</Pill>
                ))}
              </div>
            ) : (
              <p className="m-0 text-[13px] text-ks-fg-muted">Single variant.</p>
            )}
          </Panel>
          <Panel title="Dependencies">
            <div className="flex flex-col gap-3 text-[13px]">
              <div>
                <div className="mb-1 text-[12px] text-ks-fg-subtle">Built from</div>
                {it.dependencies.length ? it.dependencies.map((d) => <DepLink key={d} slug={d} />) : <span className="text-ks-fg-muted">Nothing — a base component.</span>}
              </div>
              <div>
                <div className="mb-1 text-[12px] text-ks-fg-subtle">Used by ({dependents.length})</div>
                {dependents.length ? dependents.map((d) => <DepLink key={d.slug} slug={d.slug} />) : <span className="text-ks-fg-muted">No system items depend on this.</span>}
              </div>
            </div>
          </Panel>
        </div>
      )}

      {tab === 'history' && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
          <Panel title="Changelog">
            {changes.length ? (
              <ol className="m-0 flex list-none flex-col gap-4 p-0">
                {changes.map((c) => (
                  <li key={c.id} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ks-accent" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 text-[12px] text-ks-fg-subtle">
                        <span>{formatDate(c.date, { month: 'short', day: 'numeric', year: 'numeric' })}</span>·<span>Sprint {c.sprintId}</span>
                        {c.version && <Pill>v{c.version}</Pill>}
                        <Pill tone={c.type === 'fixed' ? 'success' : c.type === 'deprecated' ? 'danger' : c.type === 'added' ? 'accent' : 'neutral'}>{c.type}</Pill>
                        {c.breaking && <Pill tone="danger">Breaking</Pill>}
                        <span>{c.platforms.map((p) => PLATFORM_LABEL[p]).join(', ')}</span>
                      </div>
                      <p className="m-0 mt-1 text-[13.5px]">{c.summary}</p>
                      {c.details && <p className="m-0 mt-1 text-[12.5px] text-ks-fg-muted">{c.details}</p>}
                      <div className="mt-1 text-[12px] text-ks-fg-subtle">{person(c.authorId)?.name}</div>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="m-0 text-[13px] text-ks-fg-muted">No recorded changes in the tracked window.</p>
            )}
          </Panel>
          <div className="flex flex-col gap-5">
            <Panel title="On the roadmap">
              {roadmap.length ? (
                roadmap.map((r) => (
                  <Link key={r.id} href={`${BASE}/roadmap?item=${r.id}`} className="mb-2 block rounded-md border border-ks-border p-3 last:mb-0 hover:border-ks-border-strong">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="text-[13px] font-medium">{r.title}</span>
                      <RoadmapStatusPill status={r.status} />
                    </div>
                    <div className="text-[12px] text-ks-fg-subtle">
                      {r.pi}
                      {r.sprintId && ` · Sprint ${r.sprintId}`}
                    </div>
                  </Link>
                ))
              ) : (
                <p className="m-0 text-[13px] text-ks-fg-muted">Nothing planned.</p>
              )}
            </Panel>
            <Panel title="Proposals">
              {proposals.length ? (
                proposals.map((p) => (
                  <Link key={p.id} href={`${BASE}/proposals?open=${p.id}`} className="mb-2 block rounded-md border border-ks-border p-3 last:mb-0 hover:border-ks-border-strong">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="text-[13px] font-medium">{p.title}</span>
                      <ProposalStatusPill status={p.status} />
                    </div>
                    <div className="font-ks-mono text-[11.5px] text-ks-fg-subtle">{p.id}</div>
                  </Link>
                ))
              ) : (
                <p className="m-0 text-[13px] text-ks-fg-muted">No open requests.</p>
              )}
            </Panel>
          </div>
        </div>
      )}

      {tab === 'health' && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Panel title="Readiness">
            <CompletenessBreakdown item={it} />
          </Panel>
          <Panel title="Ownership & lifecycle">
            <p className="m-0 mb-3 text-[12.5px] text-ks-fg-muted">Changes here are written to the changelog and reflected on the dashboard.</p>
            <ItemEditor item={it} />
          </Panel>
          <Panel title="Adoption">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md bg-ks-sunken p-3">
                <div className="ks-tabular text-[22px] font-semibold">{it.adoption.products}</div>
                <div className="text-[12px] text-ks-fg-subtle">of 14 products</div>
              </div>
              <div className="rounded-md bg-ks-sunken p-3">
                <div className="ks-tabular text-[22px] font-semibold">{it.adoption.instances.toLocaleString()}</div>
                <div className="text-[12px] text-ks-fg-subtle">instances in code</div>
              </div>
            </div>
          </Panel>
          <Panel title={`Drift (${drift.length})`}>
            {drift.length ? (
              <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[13px]">
                {drift.map((d) => (
                  <li key={d.platform} className="rounded-md bg-ks-warning-soft p-3">
                    <strong className="text-ks-warning">{PLATFORM_LABEL[d.platform]}</strong> <span className="text-ks-fg-muted">— {d.reason}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="m-0 text-[13px] text-ks-fg-muted">All shipped platforms match the spec. Score: {completeness(it).score}%.</p>
            )}
          </Panel>
        </div>
      )}
    </>
  );
}

function DepLink({ slug }: { slug: string }) {
  const { item } = useStore();
  const d = item(slug);
  if (!d) return null;
  return (
    <Link href={`${BASE}/components/${slug}`} className="mb-1 mr-1 inline-flex rounded-md border border-ks-border px-2 py-0.5 text-[12.5px] hover:border-ks-border-strong">
      {d.name}
    </Link>
  );
}
