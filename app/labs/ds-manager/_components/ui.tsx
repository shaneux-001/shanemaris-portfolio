'use client';

/*
 * The management tool's own small UI kit — its chrome, not the Daedalus
 * components it documents (those live in daedalus/).
 */

import Link from 'next/link';
import { forwardRef, useEffect, useRef } from 'react';
import { LockSimple, X } from '@phosphor-icons/react';
import type { Lifecycle, Person, Platform, PlatformImpl, Impact, RoadmapStatus, ProposalStatus } from '@/lib/labs/dsManager/types';
import { PLATFORM_LABEL, PLATFORMS } from '@/lib/labs/dsManager/types';
import type { ParityStatus } from '@/lib/labs/dsManager/metrics';

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

// ── Tone pills ──────────────────────────────────────────────────

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

const TONE: Record<Tone, string> = {
  neutral: 'bg-ks-neutral-soft text-ks-fg-muted',
  accent: 'bg-ks-accent-soft text-ks-accent-text',
  success: 'bg-ks-success-soft text-ks-success',
  warning: 'bg-ks-warning-soft text-ks-warning',
  danger: 'bg-ks-danger-soft text-ks-danger',
  info: 'bg-ks-info-soft text-ks-info',
};

export function Pill({ tone = 'neutral', children, className, title }: { tone?: Tone; children: React.ReactNode; className?: string; title?: string }) {
  return (
    <span title={title} className={cx('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-medium leading-[18px] whitespace-nowrap', TONE[tone], className)}>
      {children}
    </span>
  );
}

const LIFECYCLE_TONE: Record<Lifecycle, Tone> = { proposed: 'neutral', experimental: 'warning', beta: 'info', stable: 'success', deprecated: 'danger' };
export function LifecyclePill({ lifecycle }: { lifecycle: Lifecycle }) {
  return <Pill tone={LIFECYCLE_TONE[lifecycle]}>{lifecycle[0].toUpperCase() + lifecycle.slice(1)}</Pill>;
}

const PARITY: Record<ParityStatus, [Tone, string]> = { aligned: ['success', 'Aligned'], drift: ['warning', 'Drift'], gaps: ['neutral', 'Gaps'] };
export function ParityPill({ status }: { status: ParityStatus }) {
  const [tone, label] = PARITY[status];
  return <Pill tone={tone}>{label}</Pill>;
}

const IMPACT: Record<Impact, [Tone, string]> = { low: ['neutral', 'Low impact'], medium: ['info', 'Medium impact'], high: ['accent', 'High impact'], breaking: ['danger', 'Breaking'] };
export function ImpactPill({ impact }: { impact: Impact }) {
  const [tone, label] = IMPACT[impact];
  return <Pill tone={tone}>{label}</Pill>;
}

const RSTATUS: Record<RoadmapStatus, [Tone, string]> = { proposed: ['neutral', 'Proposed'], planned: ['info', 'Planned'], 'in-progress': ['accent', 'In progress'], blocked: ['danger', 'Blocked'], complete: ['success', 'Complete'] };
export function RoadmapStatusPill({ status }: { status: RoadmapStatus }) {
  const [tone, label] = RSTATUS[status];
  return <Pill tone={tone}>{label}</Pill>;
}

const PSTATUS: Record<ProposalStatus, [Tone, string]> = { submitted: ['accent', 'Awaiting triage'], 'needs-info': ['warning', 'Needs info'], redirected: ['neutral', 'Redirected'], accepted: ['success', 'Accepted'], declined: ['danger', 'Declined'] };
export function ProposalStatusPill({ status }: { status: ProposalStatus }) {
  const [tone, label] = PSTATUS[status];
  return <Pill tone={tone}>{label}</Pill>;
}

// ── Platform coverage ───────────────────────────────────────────

const PLATFORM_SHORT: Record<Platform, string> = { web: 'Web', ios: 'iOS', android: 'And', figma: 'Fig' };

/** Compact four-up coverage strip. Shape + label carry status, not just color. */
export function PlatformStrip({ platforms, drift = [] }: { platforms: Record<Platform, PlatformImpl>; drift?: Platform[] }) {
  return (
    <span className="inline-flex gap-1">
      {PLATFORMS.map((p) => {
        const s = platforms[p].status;
        const d = drift.includes(p);
        const label = `${PLATFORM_LABEL[p]}: ${s === 'shipped' ? `shipped ${platforms[p].version ?? ''}` : s}${d ? ' (drift)' : ''}`;
        return (
          <span
            key={p}
            title={label}
            aria-label={label}
            className={cx(
              'inline-flex h-5 min-w-[30px] items-center justify-center rounded px-1 font-ks-mono text-[10px] font-medium',
              s === 'shipped' && !d && 'bg-ks-success-soft text-ks-success',
              s === 'shipped' && d && 'bg-ks-warning-soft text-ks-warning',
              (s === 'in-progress' || s === 'planned') && 'border border-dashed border-ks-border-strong text-ks-fg-subtle',
              s === 'not-planned' && 'bg-ks-danger-soft text-ks-danger line-through',
              s === 'n/a' && 'text-ks-fg-subtle opacity-50',
            )}
          >
            {s === 'n/a' ? '—' : PLATFORM_SHORT[p]}
          </span>
        );
      })}
    </span>
  );
}

// ── People ──────────────────────────────────────────────────────

export function PersonAvatar({ person, size = 24 }: { person?: Person; size?: number }) {
  if (!person) {
    return (
      <span aria-label="Unassigned" style={{ width: size, height: size }} className="inline-flex shrink-0 items-center justify-center rounded-full border border-dashed border-ks-danger text-[10px] text-ks-danger">
        ?
      </span>
    );
  }
  const initials = person.name.split(' ').map((n) => n[0]).slice(0, 2).join('');
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.4, background: `hsl(${person.hue} 55% 88%)`, color: `hsl(${person.hue} 45% 28%)` }}
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
    >
      {initials}
    </span>
  );
}

export function PersonChip({ person }: { person?: Person }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <PersonAvatar person={person} size={20} />
      <span className={cx('truncate', !person && 'text-ks-danger')}>{person?.name ?? 'Unassigned'}</span>
    </span>
  );
}

// ── Meters ──────────────────────────────────────────────────────

export function scoreTone(score: number): Tone {
  return score >= 85 ? 'success' : score >= 70 ? 'info' : score >= 50 ? 'warning' : 'danger';
}

export const TONE_TEXT: Record<Tone, string> = { neutral: 'text-ks-fg-muted', accent: 'text-ks-accent-text', success: 'text-ks-success', warning: 'text-ks-warning', danger: 'text-ks-danger', info: 'text-ks-info' };

const BAR: Record<Tone, string> = { neutral: 'bg-ks-fg-subtle', accent: 'bg-ks-accent', success: 'bg-ks-success', warning: 'bg-ks-warning', danger: 'bg-ks-danger', info: 'bg-ks-info' };

export function Meter({ value, tone, className, label }: { value: number; tone?: Tone; className?: string; label?: string }) {
  const t = tone ?? scoreTone(value);
  return (
    <span role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label} className={cx('block h-1.5 w-full overflow-hidden rounded-full bg-ks-neutral-soft', className)}>
      <span className={cx('block h-full rounded-full', BAR[t])} style={{ width: `${Math.max(2, Math.min(100, value))}%` }} />
    </span>
  );
}

export function ScoreCell({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-2">
      <Meter value={value} className="w-14" />
      <span className="ks-tabular w-7 text-right text-[12.5px] text-ks-fg-muted">{value}</span>
    </span>
  );
}

// ── Controls ────────────────────────────────────────────────────

type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
const BTN: Record<BtnVariant, string> = {
  primary: 'bg-ks-accent text-ks-accent-fg hover:bg-ks-accent-hover',
  secondary: 'bg-ks-surface text-ks-fg border border-ks-border-strong hover:bg-ks-surface-2',
  ghost: 'text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg',
  danger: 'bg-ks-danger text-white hover:opacity-90',
};

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: 'sm' | 'md' };

export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button({ variant = 'secondary', size = 'md', className, ...rest }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'h-7 px-2.5 text-[12.5px]' : 'h-9 px-3.5 text-[13.5px]',
        BTN[variant],
        className,
      )}
      {...rest}
    />
  );
});

export function ButtonLink({ href, variant = 'secondary', size = 'md', className, children }: { href: string; variant?: BtnVariant; size?: 'sm' | 'md'; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cx('inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors', size === 'sm' ? 'h-7 px-2.5 text-[12.5px]' : 'h-9 px-3.5 text-[13.5px]', BTN[variant], className)}
    >
      {children}
    </Link>
  );
}

export function Segmented<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: { value: T; label: React.ReactNode }[]; label: string }) {
  return (
    // Scrolls inside itself on narrow screens rather than widening the page.
    <div role="radiogroup" aria-label={label} className="ks-scroll inline-flex max-w-full overflow-x-auto rounded-md border border-ks-border bg-ks-sunken p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cx('inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded px-2.5 text-[12.5px] font-medium', value === o.value ? 'bg-ks-surface text-ks-fg shadow-sm' : 'text-ks-fg-muted hover:text-ks-fg')}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SelectFilter<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; label: string }) {
  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-8 rounded-md border border-ks-border bg-ks-surface pl-2.5 pr-7 text-[12.5px] text-ks-fg hover:border-ks-border-strong"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export const inputClass =
  'w-full rounded-md border border-ks-border bg-ks-surface px-3 py-2 text-[13.5px] text-ks-fg placeholder:text-ks-fg-subtle hover:border-ks-border-strong focus:border-ks-accent focus:outline-none';

// ── Layout ──────────────────────────────────────────────────────

export function PageHeader({ title, description, actions, eyebrow }: { title: string; description?: React.ReactNode; actions?: React.ReactNode; eyebrow?: React.ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <div className="mb-1 text-[12px] text-ks-fg-subtle">{eyebrow}</div>}
        <h1 className="m-0 text-[22px] font-semibold tracking-[-0.015em] text-ks-fg">{title}</h1>
        {description && <p className="m-0 mt-1 max-w-[70ch] text-[13.5px] text-ks-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function Panel({ title, actions, children, className, bodyClassName }: { title?: React.ReactNode; actions?: React.ReactNode; children: React.ReactNode; className?: string; bodyClassName?: string }) {
  return (
    <section className={cx('rounded-lg border border-ks-border bg-ks-surface', className)}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 border-b border-ks-border px-4 py-2.5">
          <h2 className="m-0 text-[13px] font-semibold text-ks-fg">{title}</h2>
          {actions}
        </header>
      )}
      {/* Default padding only when the caller didn't set its own — two padding utilities would fight on CSS order. */}
      <div className={cx(!/(^|\s)p[xytrbl]?-/.test(bodyClassName ?? '') && 'p-4', bodyClassName)}>{children}</div>
    </section>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ks-border-strong px-6 py-12 text-center">
      <p className="m-0 font-semibold text-ks-fg">{title}</p>
      {children && <p className="m-0 max-w-[48ch] text-[13px] text-ks-fg-muted">{children}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/** Right-hand slide-over. Focus moves in on open and Escape closes. */
export function Drawer({ open, onClose, title, children, width = 520 }: { open: boolean; onClose: () => void; title: React.ReactNode; children: React.ReactNode; width?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        style={{ maxWidth: width }}
        className="ks-scroll absolute right-0 top-0 flex h-full w-full flex-col overflow-y-auto border-l border-ks-border bg-ks-surface shadow-[var(--ks-shadow-pop)] focus:outline-none"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-ks-border bg-ks-surface px-5 py-3">
          <div className="min-w-0 text-[15px] font-semibold">{title}</div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded p-1 text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/** Explains a disabled control. Pair with `disabled` on the control itself. */
export function LockedNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 flex items-center gap-1.5 text-[12px] text-ks-fg-subtle">
      <LockSimple size={13} aria-hidden="true" />
      {children}
    </p>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-ks-border-strong bg-ks-surface px-1 font-ks-mono text-[10.5px] text-ks-fg-subtle">{children}</kbd>;
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', opts);
}
