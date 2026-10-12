'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Plus, Trash, WarningOctagon, X } from '@phosphor-icons/react';
import { assess, emptyDraft, similarOpenProposals, SUBMIT_THRESHOLD, type IntakeDraft } from '@/lib/labs/dsManager/intake';
import type { Platform, Proposal, ProposalKind } from '@/lib/labs/dsManager/types';
import { PLATFORMS, PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from '../../../_components/Store';
import { BASE } from '../../../_components/Shell';
import { Button, ButtonLink, LifecyclePill, Meter, PageHeader, Panel, Segmented, cx, inputClass, scoreTone, TONE_TEXT } from '../../../_components/ui';

const STEPS = ['The need', 'Evidence', 'Design & accessibility'];

function Field({ label, hint, children, htmlFor }: { label: string; hint?: string; children: React.ReactNode; htmlFor?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[13px] font-medium text-ks-fg">
        {label}
      </label>
      {hint && <p className="m-0 -mt-1 text-[12.5px] text-ks-fg-subtle">{hint}</p>}
      {children}
    </div>
  );
}

export default function ProposalFlow() {
  const { db, item, run, can, setRole } = useStore();
  const params = useSearchParams();
  const enhance = params.get('enhance');

  const [d, setD] = useState<IntakeDraft>(() => ({
    ...emptyDraft,
    kind: enhance ? 'enhancement' : ((params.get('kind') as ProposalKind) ?? 'new-component'),
    targetSlug: enhance ?? undefined,
    title: params.get('title') ?? '',
    problem: params.get('problem') ?? '',
  }));
  const [step, setStep] = useState(0);
  const [showWhyNot, setShowWhyNot] = useState(false);
  const [outcome, setOutcome] = useState<{ kind: 'submitted'; proposal: Proposal } | { kind: 'reused'; slug: string } | null>(null);

  const a = useMemo(() => assess(d, db.items), [d, db.items]);
  const top = a.matches[0];
  const openDupes = useMemo(() => similarOpenProposals(d.title, db.proposals), [d.title, db.proposals]);
  const set = <K extends keyof IntakeDraft>(k: K, v: IntakeDraft[K]) => setD((x) => ({ ...x, [k]: v }));
  const fromSandbox = params.get('from') === 'sandbox';

  if (outcome?.kind === 'reused') {
    const it = item(outcome.slug)!;
    return (
      <div className="mx-auto max-w-[560px] py-10 text-center">
        <CheckCircle size={44} weight="fill" className="mx-auto mb-3 text-ks-success" />
        <h1 className="m-0 text-[22px] font-semibold">No request needed</h1>
        <p className="mx-auto mt-2 max-w-[44ch] text-ks-fg-muted">
          {it.name} covers this. That&apos;s a sprint of design and engineering time saved, and one less thing to maintain.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <ButtonLink href={`${BASE}/components/${it.slug}`} variant="primary">
            Open {it.name} docs
          </ButtonLink>
          <ButtonLink href={`${BASE}/sandbox?add=${it.slug}`}>Try it in the sandbox</ButtonLink>
        </div>
      </div>
    );
  }

  if (outcome?.kind === 'submitted') {
    const p = outcome.proposal;
    return (
      <div className="mx-auto max-w-[600px] py-10">
        <div className="text-center">
          <CheckCircle size={44} weight="fill" className="mx-auto mb-3 text-ks-success" />
          <h1 className="m-0 text-[22px] font-semibold">Request submitted</h1>
          <p className="m-0 mt-1 font-ks-mono text-[13px] text-ks-fg-subtle">{p.id}</p>
        </div>
        <Panel className="mt-6" title="What happens next">
          <ol className="m-0 flex list-decimal flex-col gap-2 pl-5 text-[13.5px] text-ks-fg-muted">
            <li>Core Systems triages new requests every sprint, usually within five working days.</li>
            <li>They&apos;ll accept it, ask for more information, or point you to something that already exists.</li>
            <li>Accepted requests go on the roadmap with an owner and a target PI, and you&apos;ll be tagged on the roadmap item.</li>
          </ol>
          <div className="mt-4 flex items-center gap-3 rounded-md bg-ks-sunken p-3 text-[13px]">
            <span className={cx('ks-tabular text-[20px] font-semibold', TONE_TEXT[scoreTone(p.qualityScore)])}>{p.qualityScore}</span>
            <span className="text-ks-fg-muted">Request quality. Requests over 75 are usually accepted on first review.</span>
          </div>
        </Panel>
        <div className="mt-6 flex justify-center gap-2">
          <ButtonLink href={`${BASE}/proposals?open=${p.id}`} variant="primary">
            View in the triage queue
          </ButtonLink>
          <ButtonLink href={`${BASE}/dashboard`}>Back to dashboard</ButtonLink>
        </div>
      </div>
    );
  }

  const submit = async () => {
    const res = await run(
      (r) =>
        r.submitProposal({
          title: d.title.trim(),
          kind: d.kind,
          targetSlug: d.kind === 'enhancement' ? d.targetSlug : undefined,
          problem: d.problem.trim() + (d.notThatReason ? `\n\nWhy not ${top?.item.name}: ${d.notThatReason.trim()}` : ''),
          useCases: d.useCases.map((u) => u.trim()).filter(Boolean),
          platforms: d.platforms,
          reach: (d.reach || 'single') as Proposal['reach'],
          figmaLink: d.figmaLink || undefined,
          qualityScore: a.score,
          closestMatch: top ? { slug: top.item.slug, score: Math.round(top.score * 100) / 100 } : undefined,
        }),
      (r) => r.db,
    );
    if (res) setOutcome({ kind: 'submitted', proposal: res.proposal });
  };

  const stepValid = [d.title.trim() && d.problem.trim().length >= 20 && (d.kind !== 'enhancement' || d.targetSlug), d.reach && d.platforms.length, true][step];

  return (
    <>
      <PageHeader
        eyebrow={
          <Link href={`${BASE}/proposals`} className="hover:text-ks-fg">
            ← Proposals
          </Link>
        }
        title={d.kind === 'enhancement' ? 'Request an enhancement' : 'Propose something new'}
        description="Requests that reach the DS team are clear, evidenced, and not already solved. This form checks as you go so you don't wait a sprint to hear “we already have that.”"
      />
      {!can('proposal.submit') && (
        <div role="status" className="mb-4 rounded-lg border border-ks-border bg-ks-warning-soft px-4 py-3 text-[13px] text-ks-fg">
          You&apos;re viewing as a <strong>Viewer</strong>. Viewers can explore this form and see what the check says, but submitting needs Contributor access.{' '}
          <button type="button" onClick={() => setRole('contributor')} className="font-medium text-ks-accent-text underline">
            Switch to Contributor
          </button>
        </div>
      )}
      {fromSandbox && <div className="mb-4 rounded-lg bg-ks-accent-soft px-4 py-3 text-[13px] text-ks-accent-text">Prefilled from your sandbox exploration{params.get('with') ? `, built alongside ${params.get('with')}` : ''}. Edit anything that isn&apos;t right.</div>}

      <ol className="m-0 mb-6 flex list-none flex-wrap gap-2 p-0" aria-label="Steps">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button
              type="button"
              disabled={i > step && !stepValid}
              onClick={() => i <= step && setStep(i)}
              aria-current={i === step ? 'step' : undefined}
              className={cx('flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] font-medium', i === step ? 'bg-ks-accent text-ks-accent-fg' : i < step ? 'bg-ks-accent-soft text-ks-accent-text' : 'bg-ks-neutral-soft text-ks-fg-subtle')}
            >
              <span className="ks-tabular">{i + 1}</span> {s}
            </button>
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-5">
          {step === 0 && (
            <>
              <Field label="What kind of request is this?">
                <Segmented<ProposalKind>
                  label="Request type"
                  value={d.kind}
                  onChange={(k) => set('kind', k)}
                  options={[
                    { value: 'new-component', label: 'New component' },
                    { value: 'new-pattern', label: 'New pattern' },
                    { value: 'enhancement', label: 'Enhance existing' },
                  ]}
                />
              </Field>
              {d.kind === 'enhancement' && (
                <Field label="Which component?" htmlFor="target">
                  <select id="target" value={d.targetSlug ?? ''} onChange={(e) => set('targetSlug', e.target.value || undefined)} className={cx(inputClass, 'h-9 py-0')}>
                    <option value="">Choose…</option>
                    {db.items
                      .filter((i) => i.lifecycle !== 'deprecated')
                      .map((i) => (
                        <option key={i.slug} value={i.slug}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </Field>
              )}
              <Field label="Title" hint="Name the need, e.g. “Searchable select for long lists”." htmlFor="title">
                <input id="title" value={d.title} onChange={(e) => set('title', e.target.value)} className={inputClass} />
              </Field>
              <Field label="What problem does this solve?" hint="Who is stuck, where, and what happens today. Describe the problem, not the solution." htmlFor="problem">
                <textarea id="problem" rows={5} value={d.problem} onChange={(e) => set('problem', e.target.value)} className={inputClass} />
              </Field>

              {openDupes.length > 0 && (
                <div role="status" className="rounded-lg border border-ks-border bg-ks-info-soft p-4 text-[13px]">
                  <div className="font-semibold text-ks-fg">Someone has already asked for this</div>
                  <p className="m-0 mt-1 text-ks-fg-muted">Adding your use case to an open request moves it up faster than a second request does.</p>
                  <ul className="m-0 mt-2 flex list-none flex-col gap-1 p-0">
                    {openDupes.map((p) => (
                      <li key={p.id}>
                        <Link href={`${BASE}/proposals?open=${p.id}`} className="font-medium text-ks-accent-text hover:underline">
                          {p.id}: {p.title}
                        </Link>{' '}
                        <span className="text-ks-fg-subtle">· {p.status === 'needs-info' ? 'needs info' : 'awaiting triage'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {top && a.verdict !== 'novel' && (
                <div role="status" className={cx('rounded-lg border p-4', a.verdict === 'exists' ? 'border-ks-warning bg-ks-warning-soft' : 'border-ks-border bg-ks-surface')}>
                  <div className="mb-3 flex items-start gap-2">
                    <Lightbulb size={18} weight="fill" className={cx('mt-0.5 shrink-0', a.verdict === 'exists' ? 'text-ks-warning' : 'text-ks-accent-text')} />
                    <div>
                      <div className="text-[14px] font-semibold text-ks-fg">{a.verdict === 'exists' ? `${top.item.name} already does this` : 'Similar things already exist'}</div>
                      <div className="text-[12.5px] text-ks-fg-muted">
                        {a.verdict === 'exists' ? 'Using it is faster than waiting for a new component, and it’s already accessible and supported on every platform it ships on.' : 'Check these before going further.'}
                      </div>
                    </div>
                  </div>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {a.matches.slice(0, 3).map((m) => (
                      <li key={m.item.slug} className="flex flex-wrap items-center gap-2 rounded-md border border-ks-border bg-ks-surface px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-[13px] font-medium">
                            {m.item.name} <LifecyclePill lifecycle={m.item.lifecycle} />
                            <span className="ks-tabular text-[11.5px] font-normal text-ks-fg-subtle">{Math.round(m.score * 100)}% match</span>
                          </div>
                          <div className="truncate text-[12px] text-ks-fg-muted">
                            {m.reasons[0]} · {m.item.description}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="primary" onClick={() => setOutcome({ kind: 'reused', slug: m.item.replacedBy ?? m.item.slug })}>
                            Use this
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setD((x) => ({ ...x, kind: 'enhancement', targetSlug: m.item.slug }));
                              setShowWhyNot(false);
                            }}
                          >
                            Enhance it
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {!showWhyNot ? (
                    <button type="button" onClick={() => setShowWhyNot(true)} className="mt-3 text-[12.5px] text-ks-fg-muted underline underline-offset-2 hover:text-ks-fg">
                      None of these fit
                    </button>
                  ) : (
                    <div className="mt-3">
                      <Field label={`Why won't ${top.item.name} work?`} hint={a.verdict === 'exists' ? 'Be specific — at least a sentence or two. Triage reads this first.' : undefined} htmlFor="whynot">
                        <textarea id="whynot" rows={3} value={d.notThatReason} onChange={(e) => set('notThatReason', e.target.value)} className={inputClass} />
                      </Field>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <Field label="Use cases" hint="Real places this would be used. Name the product and screen.">
                <div className="flex flex-col gap-2">
                  {d.useCases.map((u, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        aria-label={`Use case ${i + 1}`}
                        // A freshly added row takes focus so you can keep typing.
                        autoFocus={i > 0 && i === d.useCases.length - 1 && u === ''}
                        value={u}
                        onChange={(e) => set('useCases', d.useCases.map((x, j) => (j === i ? e.target.value : x)))}
                        placeholder={['Bookings: reschedule flow', 'Billing: invoice filters', 'Marketplace: provider search'][i] ?? ''}
                        className={inputClass}
                      />
                      {d.useCases.length > 1 && (
                        <button type="button" aria-label={`Remove use case ${i + 1}`} onClick={() => set('useCases', d.useCases.filter((_, j) => j !== i))} className="rounded-md px-2 text-ks-fg-subtle hover:bg-ks-surface-2 hover:text-ks-fg">
                          <Trash size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button size="sm" variant="ghost" className="self-start" onClick={() => set('useCases', [...d.useCases, ''])}>
                    <Plus size={14} /> Add use case
                  </Button>
                </div>
              </Field>
              <Field label="How many teams need this?">
                <div role="radiogroup" aria-label="Reach" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {(
                    [
                      ['single', 'Just my team', 'One product, one flow'],
                      ['few', '2–3 teams', 'A handful of products'],
                      ['many', '4+ teams', 'Broadly reusable'],
                    ] as const
                  ).map(([v, l, sub]) => (
                    <button key={v} type="button" role="radio" aria-checked={d.reach === v} onClick={() => set('reach', v)} className={cx('rounded-lg border p-3 text-left', d.reach === v ? 'border-ks-accent bg-ks-accent-soft' : 'border-ks-border bg-ks-surface hover:border-ks-border-strong')}>
                      <div className="text-[13px] font-medium">{l}</div>
                      <div className="text-[12px] text-ks-fg-subtle">{sub}</div>
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Platforms">
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.filter((p) => p !== 'figma').map((p) => (
                    <label key={p} className={cx('flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-[13px]', d.platforms.includes(p) ? 'border-ks-accent bg-ks-accent-soft' : 'border-ks-border bg-ks-surface')}>
                      <input type="checkbox" checked={d.platforms.includes(p)} onChange={() => set('platforms', d.platforms.includes(p) ? d.platforms.filter((x) => x !== p) : ([...d.platforms, p] as Platform[]))} className="accent-[var(--ks-accent)]" />
                      {PLATFORM_LABEL[p]}
                    </label>
                  ))}
                </div>
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <Field label="Figma exploration" hint="Optional, but it helps. Link to a frame, not a whole file." htmlFor="figma">
                <input id="figma" value={d.figmaLink} onChange={(e) => set('figmaLink', e.target.value)} placeholder="https://www.figma.com/design/…" className={inputClass} />
              </Field>
              <Field label="Accessibility considerations" hint="Keyboard behavior, screen reader announcements, touch targets, motion." htmlFor="a11y">
                <textarea id="a11y" rows={4} value={d.a11y} onChange={(e) => set('a11y', e.target.value)} className={inputClass} />
              </Field>
              <Panel title="Summary">
                <dl className="m-0 grid grid-cols-[120px_1fr] gap-x-4 gap-y-2 text-[13px]">
                  <dt className="text-ks-fg-subtle">Title</dt>
                  <dd className="m-0">{d.title || '—'}</dd>
                  <dt className="text-ks-fg-subtle">Type</dt>
                  <dd className="m-0">{d.kind === 'enhancement' ? `Enhancement to ${item(d.targetSlug ?? '')?.name ?? '—'}` : d.kind === 'new-pattern' ? 'New pattern' : 'New component'}</dd>
                  <dt className="text-ks-fg-subtle">Use cases</dt>
                  <dd className="m-0">{d.useCases.filter(Boolean).join('; ') || '—'}</dd>
                  <dt className="text-ks-fg-subtle">Reach</dt>
                  <dd className="m-0">{d.reach || '—'}</dd>
                  <dt className="text-ks-fg-subtle">Platforms</dt>
                  <dd className="m-0">{d.platforms.map((p) => PLATFORM_LABEL[p]).join(', ') || '—'}</dd>
                </dl>
              </Panel>
            </>
          )}

          <div className="flex items-center justify-between border-t border-ks-border pt-4">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
              <ArrowLeft size={15} /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button variant="primary" disabled={!stepValid} onClick={() => setStep(step + 1)}>
                Continue <ArrowRight size={15} />
              </Button>
            ) : (
              <Button variant="primary" disabled={!a.canSubmit || !can('proposal.submit')} onClick={submit}>
                Submit for triage
              </Button>
            )}
          </div>
        </div>

        {/* Live request check */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <Panel title="Request check">
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] text-ks-fg-muted">Quality</span>
              <span className={cx('ks-tabular text-[24px] font-semibold', TONE_TEXT[scoreTone(a.score)])}>{a.score}</span>
            </div>
            <Meter value={a.score} label="Request quality" />
            <div className="mt-1 text-[11.5px] text-ks-fg-subtle">{SUBMIT_THRESHOLD} needed to submit</div>
            <ul className="m-0 mt-4 flex list-none flex-col gap-1.5 p-0 text-[12.5px]">
              {a.factors.map((f) => (
                <li key={f.label} className="flex items-start justify-between gap-2">
                  <span className="text-ks-fg-muted">
                    {f.label}
                    {f.note && <span className="block text-[11.5px] text-ks-fg-subtle">{f.note}</span>}
                  </span>
                  <span className={cx('ks-tabular shrink-0 font-medium', f.points >= f.max ? 'text-ks-success' : f.points < 0 ? 'text-ks-danger' : 'text-ks-fg')}>
                    {f.points > 0 ? '+' : ''}
                    {f.points}
                    <span className="text-ks-fg-subtle">/{f.max}</span>
                  </span>
                </li>
              ))}
            </ul>
            {a.blockers.length > 0 && (
              <div className="mt-4 flex flex-col gap-1.5">
                {a.blockers.map((b) => (
                  <div key={b} className="flex gap-2 rounded-md bg-ks-danger-soft p-2.5 text-[12.5px] text-ks-danger">
                    <WarningOctagon size={15} weight="fill" className="mt-0.5 shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
            )}
            {a.pushback.length > 0 && (
              <div className="mt-4">
                <div className="mb-1.5 text-[12px] font-medium text-ks-fg">To strengthen this</div>
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[12.5px] text-ks-fg-muted">
                  {a.pushback.map((p) => (
                    <li key={p} className="flex gap-2">
                      <X size={13} className="mt-1 shrink-0 text-ks-fg-subtle" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Panel>
        </aside>
      </div>
    </>
  );
}
