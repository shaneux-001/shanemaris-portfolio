'use client';

import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowUp, Lightning, Sparkle, User } from '@phosphor-icons/react';
import { answer, SUGGESTED_QUESTIONS, type Answer } from '@/lib/labs/dsManager/assistant';
import { driftFor } from '@/lib/labs/dsManager/metrics';
import { PLATFORM_LABEL } from '@/lib/labs/dsManager/types';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import CodeBlock from '../../_components/CodeBlock';
import { LifecyclePill, PageHeader, Panel, PlatformStrip, Segmented, cx } from '../../_components/ui';

type Mode = 'instant' | 'live';
interface Msg {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  answer?: Answer;
  error?: 'locked' | string;
}

/** Inline Markdown subset: **bold**, `code`, _em_. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|_[^_]+_)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') ? (
          <strong key={i} className="font-semibold text-ks-fg">
            {p.slice(2, -2)}
          </strong>
        ) : p.startsWith('`') ? (
          <code key={i}>{p.slice(1, -1)}</code>
        ) : p.startsWith('_') && p.endsWith('_') && p.length > 2 ? (
          <em key={i}>{p.slice(1, -1)}</em>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Block-level: blank-line paragraphs, "- " bullets. */
function Prose({ text }: { text: string }) {
  return (
    <div className="ks-prose text-[14px] leading-relaxed text-ks-fg-muted">
      {text.split(/\n{2,}/).map((block, i) => {
        const lines = block.split('\n');
        const bullets = lines.filter((l) => /^\s*[-*] /.test(l));
        const lead = lines.filter((l) => !/^\s*[-*] /.test(l));
        return (
          <div key={i} className="mb-3 last:mb-0">
            {lead.length > 0 && (
              <p className="m-0">
                <Inline text={lead.join(' ')} />
              </p>
            )}
            {bullets.length > 0 && (
              <ul className="m-0 mt-1 list-disc pl-5">
                {bullets.map((b, j) => (
                  <li key={j}>
                    <Inline text={b.replace(/^\s*[-*] /, '')} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AnswerView({ a }: { a: Answer }) {
  const { item } = useStore();
  return (
    <div className="flex flex-col gap-3">
      <Prose text={a.text} />
      {a.code && <CodeBlock tabs={[{ id: a.code.platform, label: PLATFORM_LABEL[a.code.platform], code: a.code.code }]} />}
      {a.items.length > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {a.items.map((s) => {
            const it = item(s);
            if (!it) return null;
            return (
              <Link key={s} href={`${BASE}/components/${s}`} className="flex flex-col gap-1.5 rounded-lg border border-ks-border bg-ks-surface p-3 hover:border-ks-border-strong">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-[13.5px] font-medium text-ks-fg">{it.name}</span>
                  <LifecyclePill lifecycle={it.lifecycle} />
                </span>
                <span className="line-clamp-2 text-[12.5px] text-ks-fg-muted">{it.description}</span>
                <PlatformStrip platforms={it.platforms} drift={driftFor(it).map((d) => d.platform)} />
              </Link>
            );
          })}
        </div>
      )}
      {a.actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {a.actions.map((x) => (
            <Link key={x.href} href={`${BASE}${x.href}`} className="rounded-md border border-ks-border px-2.5 py-1 text-[12.5px] text-ks-accent-text hover:border-ks-border-strong">
              {x.label} →
            </Link>
          ))}
        </div>
      )}
      <span className="flex items-center gap-1 text-[11px] text-ks-fg-subtle">
        {a.source === 'claude' ? <Sparkle size={11} /> : <Lightning size={11} />}
        {a.source === 'claude' ? 'Live answer from Claude, grounded in the system guide' : 'Instant answer from the inventory — no AI call'}
      </span>
    </div>
  );
}

export default function Assistant() {
  const { db } = useStore();
  const [mode, setMode] = useState<Mode>('instant');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msgs]);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || busy) return;
    setQ('');
    const userMsg: Msg = { id: nextId.current++, role: 'user', text };
    setMsgs((m) => [...m, userMsg]);

    if (mode === 'instant') {
      const a = answer(text, db);
      setMsgs((m) => [...m, { id: nextId.current++, role: 'assistant', text: a.text, answer: a }]);
      return;
    }

    setBusy(true);
    try {
      const history = msgs.filter((m) => !m.error).map((m) => ({ role: m.role, text: m.text }));
      const res = await fetch('/api/labs/ds-manager/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: text, history }) });
      if (res.status === 401) {
        setMsgs((m) => [...m, { id: nextId.current++, role: 'assistant', text: '', error: 'locked' }]);
      } else if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Something went wrong.' }));
        setMsgs((m) => [...m, { id: nextId.current++, role: 'assistant', text: '', error }]);
      } else {
        const a: Answer = await res.json();
        setMsgs((m) => [...m, { id: nextId.current++, role: 'assistant', text: a.text, answer: a }]);
      }
    } catch {
      setMsgs((m) => [...m, { id: nextId.current++, role: 'assistant', text: '', error: 'Network error.' }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Ask the system"
        description={`Plain-language answers about ${SYSTEM.name}: does it exist, which one to use, how to implement it. Answers only recommend what's actually in the system.`}
        actions={
          <Segmented<Mode>
            label="Answer mode"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'instant', label: <><Lightning size={14} /> Instant</> },
              { value: 'live', label: <><Sparkle size={14} /> Live (Claude)</> },
            ]}
          />
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        <div className="flex min-h-[560px] flex-col rounded-lg border border-ks-border bg-ks-surface">
          <div className="ks-scroll flex-1 overflow-y-auto p-4 sm:p-6" aria-live="polite">
            {msgs.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ks-accent-soft text-ks-accent-text">
                  <Sparkle size={22} weight="fill" />
                </span>
                <div>
                  <p className="m-0 text-[15px] font-medium">What are you trying to build?</p>
                  <p className="m-0 mt-1 text-[13px] text-ks-fg-muted">Ask whether something exists before you design or build it.</p>
                </div>
                <div className="flex max-w-[560px] flex-wrap justify-center gap-2">
                  {SUGGESTED_QUESTIONS.slice(0, 4).map((s) => (
                    <button key={s} type="button" onClick={() => ask(s)} className="rounded-full border border-ks-border px-3 py-1.5 text-[12.5px] text-ks-fg-muted hover:border-ks-border-strong hover:text-ks-fg">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {msgs.map((m) => (
                  <div key={m.id} className="flex gap-3">
                    <span className={cx('flex h-7 w-7 shrink-0 items-center justify-center rounded-full', m.role === 'user' ? 'bg-ks-neutral-soft text-ks-fg-muted' : 'bg-ks-accent-soft text-ks-accent-text')}>
                      {m.role === 'user' ? <User size={14} /> : <Sparkle size={14} weight="fill" />}
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      {m.role === 'user' && <p className="m-0 text-[14px] font-medium text-ks-fg">{m.text}</p>}
                      {m.answer && <AnswerView a={m.answer} />}
                      {m.error === 'locked' && (
                        <div className="rounded-md bg-ks-warning-soft p-3 text-[13px] text-ks-fg">
                          Live answers call Claude, which costs real money, so they&apos;re limited to signed-in Labs sessions.{' '}
                          <button type="button" onClick={() => setMode('instant')} className="font-medium text-ks-accent-text underline">
                            Switch to Instant
                          </button>{' '}
                          — it answers from the same inventory, for free.
                        </div>
                      )}
                      {m.error && m.error !== 'locked' && <div className="rounded-md bg-ks-danger-soft p-3 text-[13px] text-ks-danger">{m.error}</div>}
                    </div>
                  </div>
                ))}
                {busy && (
                  <div className="flex items-center gap-3 text-[13px] text-ks-fg-subtle">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ks-accent-soft text-ks-accent-text">
                      <Sparkle size={14} weight="fill" className="animate-pulse" />
                    </span>
                    Checking the system…
                  </div>
                )}
                <div ref={endRef} />
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(q);
            }}
            className="flex items-end gap-2 border-t border-ks-border p-3"
          >
            <label htmlFor="ask" className="sr-only">
              Ask a question
            </label>
            <textarea
              id="ask"
              rows={1}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  ask(q);
                }
              }}
              placeholder='e.g. "Do we have a chip I can remove?"'
              className="max-h-40 min-h-[40px] flex-1 resize-none rounded-md border border-ks-border-input bg-ks-bg px-3 py-2 text-[14px] text-ks-fg placeholder:text-ks-fg-subtle focus:border-ks-accent focus:outline-none"
            />
            <button type="submit" disabled={!q.trim() || busy} aria-label="Send" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ks-accent text-ks-accent-fg disabled:opacity-40">
              <ArrowUp size={18} weight="bold" />
            </button>
          </form>
        </div>

        <aside className="flex flex-col gap-4">
          <Panel title="Try asking">
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {SUGGESTED_QUESTIONS.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => ask(s)} className="w-full rounded-md px-2 py-1.5 text-left text-[13px] text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="How it works">
            <div className="flex flex-col gap-3 text-[12.5px] text-ks-fg-muted">
              <p className="m-0">
                <strong className="text-ks-fg">Instant</strong> matches your question against names, aliases and usage docs for all {db.items.length} items, then answers from a template. Free, deterministic, can&apos;t make things up.
              </p>
              <p className="m-0">
                <strong className="text-ks-fg">Live</strong> sends your question to Claude with the generated{' '}
                <Link href={`${BASE}/tokens`} className="text-ks-accent-text hover:underline">
                  agent spec
                </Link>{' '}
                as its only source, for situational questions the templates can&apos;t handle.
              </p>
            </div>
          </Panel>
        </aside>
      </div>
    </>
  );
}
