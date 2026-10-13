'use client';

import { useState } from 'react';
import { CheckCircle, Eye, EyeSlash, ThumbsDown, ThumbsUp } from '@phosphor-icons/react';
import { helpfulness } from '@/lib/labs/dsManager/metrics';
import { DEMO_USER_ID } from '@/lib/labs/dsManager/seed';
import type { FeedbackCategory } from '@/lib/labs/dsManager/types';
import { FEEDBACK_CATEGORY_LABEL } from '@/lib/labs/dsManager/types';
import { useStore } from './Store';
import { Button, PersonAvatar, Pill, cx, formatDate, inputClass } from './ui';

export function WatchButton({ slug }: { slug: string }) {
  const { db, run } = useStore();
  const watching = db.watches.some((w) => w.personId === DEMO_USER_ID && w.itemSlug === slug);
  return (
    <Button onClick={() => run((r) => r.toggleWatch(slug))} aria-pressed={watching} title={watching ? 'You’ll be notified when this changes' : 'Get notified when this changes'}>
      {watching ? <EyeSlash size={15} /> : <Eye size={15} />}
      {watching ? 'Watching' : 'Watch'}
    </Button>
  );
}

export function HelpfulnessSummary({ slug }: { slug: string }) {
  const { db } = useStore();
  const h = helpfulness(db, slug);
  if (h.pct === null) return <span className="text-[12.5px] text-ks-fg-subtle">No ratings yet</span>;
  return (
    <span className="text-[12.5px] text-ks-fg-muted">
      <strong className={cx('ks-tabular', h.pct >= 75 ? 'text-ks-success' : h.pct >= 50 ? 'text-ks-fg' : 'text-ks-danger')}>{h.pct}%</strong> of {h.votes} readers found this helpful
    </span>
  );
}

/** "Was this helpful?" plus the page's public feedback thread. */
export default function DocFeedback({ slug, name }: { slug: string; name: string }) {
  const { db, person, run } = useStore();
  const [vote, setVote] = useState<boolean | null>(null);
  const [category, setCategory] = useState<FeedbackCategory>('unclear-docs');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const thread = db.feedback.filter((f) => f.itemSlug === slug && f.message).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const send = async () => {
    if (vote === null) return;
    const res = await run((r) => r.submitFeedback({ itemSlug: slug, helpful: vote, category: message.trim() ? category : undefined, message }));
    if (res) setSent(true);
  };

  return (
    <section className="rounded-lg border border-ks-border bg-ks-surface p-5">
      {sent ? (
        <p className="m-0 flex items-center gap-2 text-[13.5px]">
          <CheckCircle size={18} weight="fill" className="text-ks-success" />
          Thanks. {message.trim() ? 'The DS team reads every comment and replies here.' : 'Your rating is in.'}
        </p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="m-0 text-[14px] font-semibold">Was this page helpful?</h2>
              <HelpfulnessSummary slug={slug} />
            </div>
            <div className="flex gap-2" role="radiogroup" aria-label="Was this page helpful?">
              {[
                [true, ThumbsUp, 'Yes'],
                [false, ThumbsDown, 'No'],
              ].map(([v, Icon, label]) => {
                const I = Icon as typeof ThumbsUp;
                return (
                  <button
                    key={label as string}
                    type="button"
                    role="radio"
                    aria-checked={vote === v}
                    onClick={() => setVote(v as boolean)}
                    className={cx('inline-flex h-9 items-center gap-1.5 rounded-md border px-3.5 text-[13px] font-medium', vote === v ? 'border-ks-accent bg-ks-accent-soft text-ks-accent-text' : 'border-ks-border-strong hover:bg-ks-surface-2')}
                  >
                    <I size={15} weight={vote === v ? 'fill' : 'regular'} /> {label as string}
                  </button>
                );
              })}
            </div>
          </div>
          {vote !== null && (
            <div className="mt-4 flex flex-col gap-3 border-t border-ks-border pt-4">
              <label className="flex flex-col gap-1 text-[12.5px] text-ks-fg-muted">
                {vote ? 'Anything we could make even clearer? (optional)' : `What was missing or wrong on the ${name} page? (optional)`}
                <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={inputClass} />
              </label>
              {message.trim() && (
                <label className="flex flex-col gap-1 text-[12.5px] text-ks-fg-muted sm:max-w-[240px]">
                  Type
                  <select value={category} onChange={(e) => setCategory(e.target.value as FeedbackCategory)} className="h-8 rounded-md border border-ks-border-input bg-ks-surface px-2 text-[13px] text-ks-fg">
                    {(Object.keys(FEEDBACK_CATEGORY_LABEL) as FeedbackCategory[]).map((c) => (
                      <option key={c} value={c}>
                        {FEEDBACK_CATEGORY_LABEL[c]}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={send}>
                  {message.trim() ? 'Send feedback' : 'Just the rating'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setVote(null)}>
                  Cancel
                </Button>
              </div>
              <p className="m-0 text-[11.5px] text-ks-fg-subtle">Found a bug in the component itself? Same box — pick “Bug” and the owner sees it.</p>
            </div>
          )}
        </>
      )}

      {thread.length > 0 && (
        <div className="mt-5 border-t border-ks-border pt-4">
          <h3 className="m-0 mb-3 text-[13px] font-semibold">Recent feedback ({thread.length})</h3>
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {thread.slice(0, 5).map((f) => (
              <li key={f.id} className="flex gap-3">
                <PersonAvatar person={person(f.authorId)} size={24} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 text-[12px] text-ks-fg-subtle">
                    <span className="font-medium text-ks-fg">{person(f.authorId)?.name}</span>· {formatDate(f.createdAt)}
                    {f.category && <Pill>{FEEDBACK_CATEGORY_LABEL[f.category]}</Pill>}
                    {f.status === 'open' ? <Pill tone="accent">Open</Pill> : <Pill tone={f.status === 'resolved' ? 'success' : 'neutral'}>{f.status === 'resolved' ? 'Resolved' : 'Won’t fix'}</Pill>}
                  </div>
                  <p className="m-0 mt-1 text-[13.5px]">{f.message}</p>
                  {f.response && (
                    <div className="mt-2 rounded-md border-l-2 border-ks-accent bg-ks-sunken px-3 py-2 text-[13px]">
                      <span className="text-[12px] font-medium text-ks-accent-text">{person(f.respondedBy)?.name ?? 'DS team'}</span>
                      <p className="m-0 mt-0.5 text-ks-fg-muted">{f.response}</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
