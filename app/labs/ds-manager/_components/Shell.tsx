'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowCounterClockwise,
  ArrowLeft,
  BookOpenText,
  ChartLineUp,
  ClockCounterClockwise,
  Cube,
  List as ListIcon,
  MagnifyingGlass,
  Moon,
  Palette,
  PlusSquare,
  Sparkle,
  SquaresFour,
  Sun,
  Table,
  UsersThree,
  MapTrifold,
  ChatCircleText,
  FigmaLogo,
  Package,
  RocketLaunch,
  TrendUp,
} from '@phosphor-icons/react';
import { TOOL, SYSTEM } from '@/lib/labs/dsManager/brand';
import { findMatches } from '@/lib/labs/dsManager/match';
import { KEYSTONE_THEME_KEY } from '@/lib/labs/dsManager/theme';
import { useStore } from './Store';
import { cx, Kbd, LifecyclePill } from './ui';
import { NoticeToast, NotificationBell, RoleSwitcher } from './HeaderMenus';

export const BASE = '/labs/ds-manager';

const NAV = [
  {
    group: 'Overview',
    links: [
      { href: '/getting-started', label: 'Getting started', icon: RocketLaunch },
      { href: '/dashboard', label: 'Dashboard', icon: ChartLineUp },
      { href: '/adoption', label: 'Adoption', icon: TrendUp },
      { href: '/assistant', label: 'Ask the system', icon: Sparkle },
    ],
  },
  {
    group: 'System',
    links: [
      { href: '/inventory', label: 'Inventory', icon: Table },
      { href: '/components', label: 'Styleguide', icon: BookOpenText },
      { href: '/tokens', label: 'Tokens', icon: Palette },
      { href: '/figma', label: 'Figma ↔ code', icon: FigmaLogo },
    ],
  },
  {
    group: 'Planning',
    links: [
      { href: '/roadmap', label: 'Roadmap', icon: MapTrifold },
      { href: '/releases', label: 'Releases', icon: Package },
      { href: '/changelog', label: 'Changelog', icon: ClockCounterClockwise },
      { href: '/owners', label: 'Owners', icon: UsersThree },
    ],
  },
  {
    group: 'Contribute',
    links: [
      { href: '/sandbox', label: 'Sandbox', icon: SquaresFour },
      { href: '/proposals', label: 'Proposals', icon: PlusSquare },
      { href: '/feedback', label: 'Feedback', icon: ChatCircleText },
    ],
  },
];

// ── Theme ───────────────────────────────────────────────────────

function ThemeToggle() {
  // No React state: which icon shows is pure CSS (see .ks-when-dark in
  // keystone.css), so there's nothing to sync after hydration.
  const toggle = () => {
    const root = document.documentElement;
    const explicit = root.getAttribute('data-ks-theme');
    const dark = explicit ? explicit === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    root.setAttribute('data-ks-theme', next);
    try {
      localStorage.setItem(KEYSTONE_THEME_KEY, next);
    } catch {
      /* not persisted */
    }
  };
  return (
    <button type="button" onClick={toggle} aria-label="Toggle light and dark theme" className="rounded-md p-2 text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg">
      <Sun size={18} className="ks-when-dark" />
      <Moon size={18} className="ks-when-light" />
    </button>
  );
}

// ── Command palette ─────────────────────────────────────────────

function CommandPalette({ onClose }: { onClose: () => void }) {
  const { db } = useStore();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const views = NAV.flatMap((g) => g.links).filter((l) => !q || l.label.toLowerCase().includes(q.toLowerCase()));
    const items = q ? findMatches(q, db.items, { limit: 8, min: 0.15 }).map((m) => m.item) : db.items.filter((i) => i.kind === 'component').slice(0, 6);
    return [
      ...items.map((i) => ({ key: i.slug, label: i.name, hint: i.category, href: `/components/${i.slug}`, item: i })),
      ...views.map((v) => ({ key: v.href, label: v.label, hint: 'Go to', href: v.href, item: undefined })),
    ];
  }, [q, db.items]);

  const go = (href: string) => {
    onClose();
    router.push(BASE + href);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/30 px-4 pt-[12vh]" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Search the system" className="w-full max-w-[560px] overflow-hidden rounded-xl border border-ks-border bg-ks-surface shadow-[var(--ks-shadow-pop)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-ks-border px-4">
          <MagnifyingGlass size={16} className="text-ks-fg-subtle" />
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(results.length - 1, a + 1));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              }
              if (e.key === 'Enter' && results[active]) go(results[active].href);
            }}
            placeholder='Search components, or describe what you need ("popup", "chip")'
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="ks-cmd-list"
            aria-activedescendant={results[active] ? `ks-cmd-${results[active].key}` : undefined}
            className="h-12 w-full bg-transparent text-[14px] text-ks-fg placeholder:text-ks-fg-subtle focus:outline-none"
          />
        </div>
        <ul id="ks-cmd-list" role="listbox" className="ks-scroll m-0 max-h-[50vh] list-none overflow-y-auto p-1.5">
          {results.length === 0 && <li className="px-3 py-6 text-center text-ks-fg-muted">Nothing in the system matches. That might be worth a proposal.</li>}
          {results.map((r, i) => (
            <li
              key={r.key}
              id={`ks-cmd-${r.key}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.href)}
              className={cx('flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2', i === active && 'bg-ks-surface-2')}
            >
              <span className="flex min-w-0 items-center gap-2">
                {r.item ? <Cube size={15} className="shrink-0 text-ks-fg-subtle" /> : <ArrowLeft size={15} className="shrink-0 rotate-180 text-ks-fg-subtle" />}
                <span className="truncate text-ks-fg">{r.label}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-[12px] text-ks-fg-subtle">
                {r.item && <LifecyclePill lifecycle={r.item.lifecycle} />}
                {r.hint}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Shell ───────────────────────────────────────────────────────

function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { db, can } = useStore();
  const pending = db.proposals.filter((p) => p.status === 'submitted').length;
  const openFeedback = db.feedback.filter((f) => f.message && f.status === 'open').length;
  return (
    <nav aria-label="Keystone" className="flex flex-col gap-5 px-3 py-4">
      {NAV.map((g) => (
        <div key={g.group}>
          <div className="mb-1 px-2 text-[11px] font-medium uppercase tracking-[0.06em] text-ks-fg-subtle">{g.group}</div>
          <ul className="m-0 flex list-none flex-col gap-px p-0">
            {g.links.map(({ href, label, icon: Icon }) => {
              const full = BASE + href;
              const active = pathname === full || pathname?.startsWith(full + '/') || (href === '/components' && pathname?.startsWith(`${BASE}/foundations`)) || (href === '/releases' && pathname?.startsWith(`${BASE}/migrations`));
              return (
                <li key={href}>
                  <Link
                    href={full}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cx('flex h-8 items-center gap-2.5 rounded-md px-2 text-[13.5px]', active ? 'bg-ks-accent-soft font-medium text-ks-accent-text' : 'text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg')}
                  >
                    <Icon size={17} weight={active ? 'fill' : 'regular'} />
                    <span className="flex-1">{label}</span>
                    {href === '/proposals' && pending > 0 && can('proposal.triage') && <span className="ks-tabular rounded-full bg-ks-accent px-1.5 text-[11px] font-semibold text-ks-accent-fg">{pending}</span>}
                    {href === '/feedback' && openFeedback > 0 && can('feedback.resolve') && <span className="ks-tabular rounded-full bg-ks-accent px-1.5 text-[11px] font-semibold text-ks-accent-fg">{openFeedback}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <Link href={`${BASE}/dashboard`} className="flex items-center gap-2.5 px-5 py-4">
      <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-md bg-ks-fg text-ks-bg">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5 14 5v6l-6 3.5L2 11V5l6-3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 8v6.5M8 8l6-3M8 8 2 5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[14.5px] font-semibold tracking-[-0.01em] text-ks-fg">{TOOL.name}</span>
        <span className="text-[11.5px] text-ks-fg-subtle">{SYSTEM.name} Design System</span>
      </span>
    </Link>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const { run } = useStore();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const reset = useCallback(async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    await run((r) => r.reset());
    setConfirmReset(false);
  }, [confirmReset, run]);

  return (
    <div className="ks-root">
      <a href="#ks-main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded focus:bg-ks-surface focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="flex min-h-dvh">
        {/* Desktop sidebar */}
        <aside className="ks-scroll sticky top-0 hidden h-dvh w-[232px] shrink-0 flex-col overflow-y-auto border-r border-ks-border bg-ks-surface lg:flex">
          <Brand />
          <SideNav />
          <div className="mt-auto border-t border-ks-border px-5 py-3 text-[11.5px] leading-relaxed text-ks-fg-subtle">
            A prototype by Shane Maris. Fictional system, demo data.{' '}
            <Link href={BASE} className="text-ks-accent-text underline-offset-2 hover:underline">
              About this project
            </Link>
          </div>
        </aside>

        {/* Mobile drawer */}
        {navOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setNavOpen(false)} />
            <aside className="ks-scroll absolute left-0 top-0 h-full w-[260px] overflow-y-auto border-r border-ks-border bg-ks-surface">
              <Brand />
              <SideNav onNavigate={() => setNavOpen(false)} />
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-ks-border bg-ks-surface/90 px-3 backdrop-blur sm:px-5">
            <button type="button" onClick={() => setNavOpen(true)} aria-label="Open navigation" className="rounded-md p-2 text-ks-fg-muted hover:bg-ks-surface-2 lg:hidden">
              <ListIcon size={20} />
            </button>
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-ks-border bg-ks-bg px-3 text-left text-[13px] text-ks-fg-subtle hover:border-ks-border-strong sm:max-w-[420px]"
            >
              <MagnifyingGlass size={15} />
              <span className="flex-1 truncate">Search {SYSTEM.name}…</span>
              <span className="hidden sm:inline">
                <Kbd>⌘K</Kbd>
              </span>
            </button>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={reset}
                className={cx('hidden h-8 items-center gap-1.5 rounded-md px-2.5 text-[12.5px] sm:inline-flex', confirmReset ? 'bg-ks-danger-soft text-ks-danger' : 'text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg')}
              >
                <ArrowCounterClockwise size={15} />
                {confirmReset ? 'Click again to reset' : 'Reset demo'}
              </button>
              <RoleSwitcher />
              <NotificationBell />
              <ThemeToggle />
              <Link href="/labs" className="hidden h-8 items-center gap-1.5 rounded-md px-2.5 text-[12.5px] text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg md:inline-flex">
                <ArrowLeft size={15} />
                Labs
              </Link>
            </div>
          </header>
          <main id="ks-main" className="mx-auto w-full max-w-[1320px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
      {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} />}
      <NoticeToast />
    </div>
  );
}
