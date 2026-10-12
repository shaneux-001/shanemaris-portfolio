'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ThumbsDown, ThumbsUp, X } from '@phosphor-icons/react';
import { helpfulness } from '@/lib/labs/dsManager/metrics';
import type { Feedback, FeedbackCategory } from '@/lib/labs/dsManager/types';
import { FEEDBACK_CATEGORY_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import { Button, ButtonLink, Drawer, EmptyState, LockedNote, Meter, PageHeader, Panel, PersonChip, Pill, Segmented, SelectFilter, formatDate, inputClass } from '../../_components/ui';

type StatusFilter = 'open' | 'closed' | 'all';

function Respond({ f, onDone }: { f: Feedback; onDone: () => void }) {
  const { item, person, run, can } = useStore();
  const [reply, setReply] = useState(f.response ?? '');
  const it = item(f.itemSlug);
  const act = async (status: Feedback['status']) => {
    const res = await run((r) => r.respondToFeedback(f.id, status, reply.trim()));
    if (res) onDone();
  };
  const toRequest = new URLSearchParams({ enhance: f.itemSlug, title: `${it?.name}: ${FEEDBACK_CATEGORY_LABEL[f.category ?? 'other'].toLowerCase()}`, problem: `From docs feedback (${person(f.authorId)?.name}): ${f.message ?? ''}` });
  return (
    <div className="flex flex-col gap-5 text-[13.5px]">
      <div className="flex flex-wrap items-center gap-2">
        <PersonChip person={person(f.authorId)} />
        <span className="text-[12.5px] text-ks-fg-subtle">· {formatDate(f.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        {f.category && <Pill>{FEEDBACK_CATEGORY_LABEL[f.category]}</Pill>}
        <Pill tone={f.helpful ? 'success' : 'danger'}>{f.helpful ? 'Found it helpful' : 'Not helpful'}</Pill>
      </div>
      <div className="rounded-md bg-ks-sunken p-3">
        <Link href={`${BASE}/components/${f.itemSlug}`} className="text-[12px] font-medium text-ks-accent-text hover:underline">
          {it?.name}
        </Link>
        <p className="m-0 mt-1">{f.message}</p>
      </div>
      {can('feedback.resolve') ? (
        <>
          <label className="flex flex-col gap-1.5 text-[13px] font-medium">
            Reply (shown on the docs page)
            <textarea rows={4} value={reply} onChange={(e) => setReply(e.target.value)} className={inputClass} />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="sm" onClick={() => act('resolved')}>
              Reply & resolve
            </Button>
            <Button size="sm" onClick={() => act('wont-fix')}>
              Won&apos;t fix
            </Button>
            <ButtonLink size="sm" variant="ghost" href={`${BASE}/proposals/new?${toRequest}`}>
              Turn into a request
            </ButtonLink>
          </div>
          <p className="m-0 text-[12px] text-ks-fg-subtle">Bugs and missing features usually belong in a request so they get an owner and a sprint. The request form is pre-filled from this comment.</p>
        </>
      ) : (
        <>
          {f.response && <p className="m-0 rounded-md border-l-2 border-ks-accent bg-ks-sunken px-3 py-2 text-ks-fg-muted">{f.response}</p>}
          <LockedNote>Replies come from the DS team.</LockedNote>
        </>
      )}
    </div>
  );
}

export default function FeedbackInbox() {
  const { db, item, person } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<StatusFilter>('open');
  const [category, setCategory] = useState<'all' | FeedbackCategory>('all');
  const itemSlug = params.get('item');
  const open = params.get('open');
  const setOpen = (id: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (id) next.set('open', id);
    else next.delete('open');
    router.replace(`${BASE}/feedback${next.size ? `?${next}` : ''}`, { scroll: false });
  };

  const comments = db.feedback.filter((f) => f.message);
  const list = comments
    .filter((f) => (status === 'all' ? true : status === 'open' ? f.status === 'open' : f.status !== 'open') && (category === 'all' || f.category === category) && (!itemSlug || f.itemSlug === itemSlug))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const current = db.feedback.find((f) => f.id === open);

  const rated = useMemo(
    () =>
      Array.from(new Set(db.feedback.map((f) => f.itemSlug)))
        .map((slug) => ({ slug, ...helpfulness(db, slug) }))
        .filter((h) => h.votes >= 5)
        .sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0)),
    [db],
  );
  const totalVotes = db.feedback.length;
  const overall = totalVotes ? Math.round((db.feedback.filter((f) => f.helpful).length / totalVotes) * 100) : 0;
  const it = itemSlug ? item(itemSlug) : undefined;

  return (
    <>
      <PageHeader title="Feedback" description="What people say about the docs, straight from the “Was this page helpful?” box on every component page. Reply here and the answer shows on the page." />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['Open comments', comments.filter((f) => f.status === 'open').length],
          ['Docs rated helpful', `${overall}%`],
          ['Ratings', totalVotes],
          ['Pages under 50%', rated.filter((r) => (r.pct ?? 100) < 50).length],
        ].map(([l, v]) => (
          <div key={l as string} className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
            <div className="text-[12px] text-ks-fg-muted">{l}</div>
            <div className="ks-tabular mt-0.5 text-[22px] font-semibold">{v}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Segmented<StatusFilter>
              label="Status"
              value={status}
              onChange={setStatus}
              options={[
                { value: 'open', label: 'Open' },
                { value: 'closed', label: 'Closed' },
                { value: 'all', label: 'All' },
              ]}
            />
            <SelectFilter<'all' | FeedbackCategory> label="Type" value={category} onChange={setCategory} options={[{ value: 'all', label: 'All types' }, ...(Object.keys(FEEDBACK_CATEGORY_LABEL) as FeedbackCategory[]).map((c) => ({ value: c, label: FEEDBACK_CATEGORY_LABEL[c] }))]} />
            {it && (
              <Pill tone="accent">
                {it.name}
                <button type="button" aria-label="Clear component filter" onClick={() => router.replace(`${BASE}/feedback`, { scroll: false })}>
                  <X size={12} />
                </button>
              </Pill>
            )}
          </div>
          {list.length === 0 ? (
            <EmptyState title={status === 'open' ? 'Inbox zero' : 'Nothing here'}>{status === 'open' ? 'Every comment has a reply.' : 'No feedback matches.'}</EmptyState>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {list.map((f) => (
                <li key={f.id}>
                  <button type="button" onClick={() => setOpen(f.id)} className="flex w-full gap-3 rounded-lg border border-ks-border bg-ks-surface p-3.5 text-left hover:border-ks-border-strong">
                    {f.helpful ? <ThumbsUp size={16} className="mt-0.5 shrink-0 text-ks-success" aria-label="Helpful" /> : <ThumbsDown size={16} className="mt-0.5 shrink-0 text-ks-danger" aria-label="Not helpful" />}
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-1.5 text-[12px] text-ks-fg-subtle">
                        <span className="font-medium text-ks-fg">{item(f.itemSlug)?.name}</span>· {person(f.authorId)?.name} · {formatDate(f.createdAt)}
                        {f.category && <Pill>{FEEDBACK_CATEGORY_LABEL[f.category]}</Pill>}
                        {f.status !== 'open' && <Pill tone={f.status === 'resolved' ? 'success' : 'neutral'}>{f.status === 'resolved' ? 'Resolved' : 'Won’t fix'}</Pill>}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-[13.5px]">{f.message}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <aside>
          <Panel title="Lowest-rated docs" bodyClassName="p-0">
            <ul className="m-0 list-none p-0">
              {rated.slice(0, 8).map((r) => (
                <li key={r.slug} className="border-b border-ks-border last:border-0">
                  <Link href={`${BASE}/components/${r.slug}`} className="block px-4 py-2.5 hover:bg-ks-surface-2">
                    <span className="flex justify-between gap-2 text-[13px]">
                      <span className="truncate font-medium">{item(r.slug)?.name}</span>
                      <span className="ks-tabular shrink-0 text-ks-fg-muted">
                        {r.pct}% <span className="text-ks-fg-subtle">of {r.votes}</span>
                      </span>
                    </span>
                    <Meter value={r.pct ?? 0} className="mt-1.5" label={`${item(r.slug)?.name} helpfulness`} />
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
          <p className="mt-2 text-[11.5px] text-ks-fg-subtle">Pages with at least 5 ratings, lowest first.</p>
        </aside>
      </div>

      <Drawer open={!!current} onClose={() => setOpen(null)} title={current ? `Feedback on ${item(current.itemSlug)?.name}` : ''}>
        {current && <Respond key={current.id} f={current} onDone={() => setOpen(null)} />}
      </Drawer>
    </>
  );
}
