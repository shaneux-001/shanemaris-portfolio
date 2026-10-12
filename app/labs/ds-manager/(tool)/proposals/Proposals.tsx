'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import type { Proposal, ProposalStatus } from '@/lib/labs/dsManager/types';
import { PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import { Button, ButtonLink, Drawer, EmptyState, LockedNote, PageHeader, PersonChip, ProposalStatusPill, Segmented, ScoreCell, cx, formatDate, inputClass } from '../../_components/ui';

type Filter = 'queue' | 'resolved' | 'all';

const KIND_LABEL = { 'new-component': 'New component', 'new-pattern': 'New pattern', enhancement: 'Enhancement' };

function TriagePanel({ p, onDone }: { p: Proposal; onDone: () => void }) {
  const { item, person, run, can } = useStore();
  const [note, setNote] = useState(p.triageNote ?? '');
  const match = p.closestMatch && item(p.closestMatch.slug);
  const target = p.targetSlug && item(p.targetSlug);
  const act = async (status: ProposalStatus) => {
    await run((r) => r.triageProposal(p.id, status, note.trim() || defaultNote(status, match?.name)));
    onDone();
  };
  return (
    <div className="flex flex-col gap-5 text-[13.5px]">
      <div className="flex flex-wrap items-center gap-2">
        <ProposalStatusPill status={p.status} />
        <span className="text-[12.5px] text-ks-fg-subtle">
          {KIND_LABEL[p.kind]} · submitted {formatDate(p.submittedAt)} by
        </span>
        <PersonChip person={person(p.submittedBy)} />
      </div>
      {target && (
        <p className="m-0 rounded-md bg-ks-sunken p-3">
          Enhancement to{' '}
          <Link href={`${BASE}/components/${target.slug}`} className="font-medium text-ks-accent-text hover:underline">
            {target.name}
          </Link>
        </p>
      )}
      <section>
        <h3 className="m-0 mb-1 text-[12.5px] font-medium text-ks-fg-subtle">Problem</h3>
        <p className="m-0 whitespace-pre-line">{p.problem}</p>
      </section>
      <section>
        <h3 className="m-0 mb-1 text-[12.5px] font-medium text-ks-fg-subtle">Use cases ({p.useCases.length})</h3>
        <ul className="m-0 list-disc pl-5 text-ks-fg-muted">
          {p.useCases.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </section>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-md bg-ks-sunken p-3">
          <div className="text-[11.5px] text-ks-fg-subtle">Quality</div>
          <ScoreCell value={p.qualityScore} />
        </div>
        <div className="rounded-md bg-ks-sunken p-3">
          <div className="text-[11.5px] text-ks-fg-subtle">Reach</div>
          <div className="font-medium capitalize">{p.reach}</div>
        </div>
        <div className="rounded-md bg-ks-sunken p-3">
          <div className="text-[11.5px] text-ks-fg-subtle">Platforms</div>
          <div className="font-medium">{p.platforms.map((x) => PLATFORM_LABEL[x]).join(', ')}</div>
        </div>
      </div>
      {match && p.kind !== 'enhancement' && (
        <div className="rounded-md border border-ks-border p-3">
          <div className="text-[12px] text-ks-fg-subtle">Closest existing match at submission</div>
          <Link href={`${BASE}/components/${match.slug}`} className="font-medium text-ks-accent-text hover:underline">
            {match.name}
          </Link>{' '}
          <span className="ks-tabular text-[12px] text-ks-fg-subtle">{Math.round(p.closestMatch!.score * 100)}% match</span>
        </div>
      )}
      {p.figmaLink && (
        <p className="m-0 text-[12.5px]">
          Design: <span className="font-ks-mono text-ks-fg-muted">{p.figmaLink}</span>
        </p>
      )}
      {!can('proposal.triage') ? (
        <div className="border-t border-ks-border pt-4">
          {p.triageNote && <p className="m-0 mb-2 rounded-md bg-ks-sunken p-3">{p.triageNote}</p>}
          <LockedNote>Triage is done by the DS team.</LockedNote>
        </div>
      ) : (
      <div className="border-t border-ks-border pt-4">
        <label htmlFor="triage-note" className="mb-1.5 block text-[13px] font-medium">
          Triage note
        </label>
        <textarea id="triage-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Visible to the requester." className={inputClass} />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="primary" size="sm" onClick={() => act('accepted')}>
            Accept
          </Button>
          <Button size="sm" onClick={() => act('needs-info')}>
            Ask for info
          </Button>
          {match && (
            <Button size="sm" onClick={() => act('redirected')}>
              Redirect to {match.name}
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => act('declined')}>
            Decline
          </Button>
        </div>
      </div>
      )}
    </div>
  );
}

function defaultNote(status: ProposalStatus, match?: string) {
  return {
    accepted: 'Accepted. We will add it to the roadmap with an owner.',
    'needs-info': 'Thanks — we need more evidence before we can prioritize this.',
    redirected: `Redirected: ${match ?? 'an existing component'} covers this.`,
    declined: 'Declined for now. Build it in the product; propose promotion if other teams adopt it.',
    submitted: '',
  }[status];
}

export default function Proposals() {
  const { db, person } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('queue');
  const open = params.get('open');
  const setOpen = (id: string | null) => router.replace(`${BASE}/proposals${id ? `?open=${id}` : ''}`, { scroll: false });

  const isQueue = (p: Proposal) => p.status === 'submitted' || p.status === 'needs-info';
  const list = db.proposals.filter((p) => (filter === 'queue' ? isQueue(p) : filter === 'resolved' ? !isQueue(p) : true)).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  const resolved = db.proposals.filter((p) => !isQueue(p));
  const redirected = resolved.filter((p) => p.status === 'redirected').length;
  const avgScore = db.proposals.length ? Math.round(db.proposals.reduce((s, p) => s + p.qualityScore, 0) / db.proposals.length) : 0;
  const current = db.proposals.find((p) => p.id === open);

  return (
    <>
      <PageHeader
        title="Proposals"
        description="Requests for new components, patterns and enhancements. Everything here already passed the intake check, so the DS team only spends triage time on clean requests."
        actions={
          <ButtonLink href={`${BASE}/proposals/new`} variant="primary">
            <Plus size={15} /> New request
          </ButtonLink>
        }
      />
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['Awaiting triage', db.proposals.filter((p) => p.status === 'submitted').length],
          ['Needs info', db.proposals.filter((p) => p.status === 'needs-info').length],
          ['Redirected to existing', `${redirected} of ${resolved.length}`],
          ['Avg request quality', avgScore],
        ].map(([l, v]) => (
          <div key={l as string} className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
            <div className="text-[12px] text-ks-fg-muted">{l}</div>
            <div className="ks-tabular mt-0.5 text-[22px] font-semibold">{v}</div>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <Segmented<Filter>
          label="Show"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'queue', label: 'Triage queue' },
            { value: 'resolved', label: 'Resolved' },
            { value: 'all', label: 'All' },
          ]}
        />
      </div>
      {list.length === 0 ? (
        <EmptyState title="Queue is clear">Nothing waiting on the DS team.</EmptyState>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {list.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => setOpen(p.id)} className={cx('grid w-full grid-cols-1 items-center gap-3 rounded-lg border bg-ks-surface px-4 py-3 text-left hover:border-ks-border-strong md:grid-cols-[1fr_140px_150px_160px]', open === p.id ? 'border-ks-accent' : 'border-ks-border')}>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{p.title}</span>
                    <ProposalStatusPill status={p.status} />
                  </div>
                  <div className="mt-0.5 truncate text-[12.5px] text-ks-fg-muted">
                    <span className="font-ks-mono text-[11.5px]">{p.id}</span> · {KIND_LABEL[p.kind]} · {p.problem.split('\n')[0]}
                  </div>
                </div>
                <ScoreCell value={p.qualityScore} />
                <PersonChip person={person(p.submittedBy)} />
                <span className="text-[12.5px] text-ks-fg-subtle">{formatDate(p.submittedAt, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <Drawer open={!!current} onClose={() => setOpen(null)} title={current?.title} width={560}>
        {current && <TriagePanel key={current.id} p={current} onDone={() => setOpen(null)} />}
      </Drawer>
    </>
  );
}
