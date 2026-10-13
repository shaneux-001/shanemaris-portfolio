'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Bell, CaretDown, Check, Eye, X } from '@phosphor-icons/react';
import { ROLES } from '@/lib/labs/dsManager/permissions';
import { DEMO_USER_ID, LAST_SPRINT_ID, CURRENT_SPRINT_ID } from '@/lib/labs/dsManager/seed';
import { useStore } from './Store';
import { cx, formatDate } from './ui';

const BASE = '/labs/ds-manager';

/** Popover shell: closes on outside click and Escape, returns focus to its trigger. */
function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return { open, setOpen, ref };
}

const panel = 'absolute right-0 top-full z-50 mt-1.5 rounded-lg border border-ks-border bg-ks-surface shadow-[var(--ks-shadow-pop)]';

export function RoleSwitcher() {
  const { role, setRole } = useStore();
  const { open, setOpen, ref } = usePopover();
  const current = ROLES.find((r) => r.id === role)!;
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-ks-border px-2.5 text-[12.5px] text-ks-fg hover:border-ks-border-strong"
      >
        <Eye size={14} className="text-ks-fg-subtle" />
        <span className="hidden text-ks-fg-subtle sm:inline">Viewing as</span>
        <span className="font-medium">{current.label}</span>
        <CaretDown size={12} />
      </button>
      {open && (
        <div className={cx(panel, 'w-[300px] p-1.5')} role="menu" aria-label="Switch role">
          <p className="m-0 px-2.5 pb-1.5 pt-1 text-[11.5px] text-ks-fg-subtle">Demo control: see the tool as each role sees it. Permissions are enforced in the data layer too.</p>
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              role="menuitemradio"
              aria-checked={r.id === role}
              onClick={() => {
                setRole(r.id);
                setOpen(false);
              }}
              className={cx('flex w-full gap-2 rounded-md px-2.5 py-2 text-left hover:bg-ks-surface-2', r.id === role && 'bg-ks-accent-soft')}
            >
              <Check size={14} className={cx('mt-0.5 shrink-0', r.id === role ? 'text-ks-accent-text' : 'invisible')} />
              <span>
                <span className="block text-[13px] font-medium">{r.label}</span>
                <span className="block text-[12px] text-ks-fg-muted">{r.description}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface Note {
  id: string;
  href: string;
  title: string;
  body: string;
  date: string;
}

export function NotificationBell() {
  const { db, item } = useStore();
  const { open, setOpen, ref } = usePopover();
  const watched = new Set(db.watches.filter((w) => w.personId === DEMO_USER_ID).map((w) => w.itemSlug));

  const notes: Note[] = [
    // Changes to components you watch, last sprint and this one
    ...db.changes
      .filter((c) => c.itemSlug && watched.has(c.itemSlug) && (c.sprintId === LAST_SPRINT_ID || c.sprintId === CURRENT_SPRINT_ID) && c.authorId !== DEMO_USER_ID)
      .map((c) => ({ id: c.id, href: `${BASE}/components/${c.itemSlug}?tab=history`, title: `${item(c.itemSlug!)?.name}${c.breaking ? ' · breaking' : ''}`, body: c.summary, date: c.date })),
    // Replies to your feedback
    ...db.feedback
      .filter((f) => f.authorId === DEMO_USER_ID && f.response && f.respondedBy !== DEMO_USER_ID)
      .map((f) => ({ id: f.id, href: `${BASE}/components/${f.itemSlug}`, title: `Reply on ${item(f.itemSlug)?.name}`, body: f.response!, date: f.createdAt })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-haspopup="true" aria-expanded={open} aria-label={`Notifications, ${notes.length}`} className="relative rounded-md p-2 text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg">
        <Bell size={18} />
        {notes.length > 0 && <span className="ks-tabular absolute right-1 top-1 min-w-[15px] rounded-full bg-ks-accent px-1 text-center text-[9.5px] font-semibold leading-[15px] text-ks-accent-fg">{notes.length}</span>}
      </button>
      {open && (
        <div className={cx(panel, 'w-[340px] max-w-[calc(100vw-24px)]')}>
          <div className="flex items-center justify-between border-b border-ks-border px-3.5 py-2.5">
            <span className="text-[13px] font-semibold">Notifications</span>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="rounded p-0.5 text-ks-fg-subtle hover:text-ks-fg">
              <X size={14} />
            </button>
          </div>
          {notes.length === 0 ? (
            <p className="m-0 px-3.5 py-6 text-center text-[12.5px] text-ks-fg-muted">Nothing new. Watch a component from its docs page to hear about changes.</p>
          ) : (
            <ul className="ks-scroll m-0 max-h-[360px] list-none overflow-y-auto p-1.5">
              {notes.map((n) => (
                <li key={n.id}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="block rounded-md px-2.5 py-2 hover:bg-ks-surface-2">
                    <span className="flex justify-between gap-2 text-[12.5px] font-medium">
                      {n.title}
                      <span className="shrink-0 font-normal text-ks-fg-subtle">{formatDate(n.date)}</span>
                    </span>
                    <span className="line-clamp-2 block text-[12.5px] text-ks-fg-muted">{n.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-ks-border px-3.5 py-2 text-[11.5px] text-ks-fg-subtle">Watching {watched.size} component{watched.size === 1 ? '' : 's'}</div>
        </div>
      )}
    </div>
  );
}

/** Transient message, e.g. a write the data layer refused. */
export function NoticeToast() {
  const { notice, dismissNotice } = useStore();
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(dismissNotice, 5000);
    return () => clearTimeout(t);
  }, [notice, dismissNotice]);
  if (!notice) return null;
  return (
    <div role="status" className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-lg bg-ks-fg px-4 py-2.5 text-[13px] text-ks-bg shadow-[var(--ks-shadow-pop)]">
      {notice}
      <button type="button" onClick={dismissNotice} aria-label="Dismiss" className="opacity-70 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
}
