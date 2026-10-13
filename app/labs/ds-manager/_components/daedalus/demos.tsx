'use client';

/*
 * Live demos for the Daedalus styleguide. Each entry declares its
 * playground controls, a render function, and enough metadata to generate
 * per-platform code from the current control values — so the snippet you
 * copy always matches the preview you're looking at.
 */

import { useState } from 'react';
import {
  ArrowLeft,
  CalendarBlank,
  CaretDown,
  CaretLeft,
  CaretRight,
  DotsThreeVertical,
  House,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Star,
  Trash,
  User,
  X,
  Bell,
  Info,
  CheckCircle,
  Warning,
  WarningOctagon,
  Heart,
  ShareNetwork,
} from '@phosphor-icons/react';

export type ControlValue = string | boolean | number;
export type Props = Record<string, ControlValue>;

export interface Control {
  name: string;
  label?: string;
  type: 'select' | 'boolean' | 'text' | 'number';
  options?: string[];
  default: ControlValue;
}

export interface Demo {
  controls: Control[];
  render: (p: Props) => React.ReactNode;
  /** Prop rendered as children / the leading label argument in generated code. */
  childProp?: string;
  /** Code-side component name, if different from the item name. */
  codeName?: string;
  /** Preview canvas hint: center small things, stretch layout things. */
  layout?: 'center' | 'stretch';
}

const s = (v: ControlValue) => String(v);
const b = (v: ControlValue) => v === true;

// ── Stateful helpers ────────────────────────────────────────────

function SwitchDemo({ label, initial, disabled }: { label: string; initial: boolean; disabled: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <label className="dae-switch" style={{ opacity: disabled ? 0.5 : 1 }}>
      <button type="button" role="switch" aria-checked={on} disabled={disabled} onClick={() => setOn(!on)} aria-label={label} />
      <span>{label}</span>
    </label>
  );
}

function TabsDemo({ style, count }: { style: string; count: number }) {
  const labels = ['Upcoming', 'Past', 'Cancelled', 'Drafts', 'Archived'].slice(0, count);
  const [active, setActive] = useState(0);
  return (
    <div role="tablist" className={style === 'segmented' ? 'dae-segmented' : 'dae-tabs'} style={{ width: style === 'segmented' ? undefined : '100%' }}>
      {labels.map((l, i) => (
        <button key={l} role="tab" aria-selected={i === active} className="dae-tab" onClick={() => setActive(i)} type="button">
          {l}
          {i === 0 && <span className="dae-badge" data-tone="neutral">3</span>}
        </button>
      ))}
    </div>
  );
}

function RadioDemo({ label, disabled }: { label: string; disabled: boolean }) {
  const [v, setV] = useState('standard');
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }} disabled={disabled}>
      <legend className="dae-label" style={{ marginBottom: 8 }}>{label}</legend>
      {['Standard', 'Express', 'Same day'].map((o) => (
        <label key={o} className="dae-check">
          <input type="radio" name="dae-radio-demo" checked={v === o.toLowerCase()} onChange={() => setV(o.toLowerCase())} />
          {o}
        </label>
      ))}
    </fieldset>
  );
}

function AccordionDemo({ multiple }: { multiple: boolean }) {
  const items = [
    ['Can I reschedule?', 'Yes — up to 24 hours before your appointment, from the booking card.'],
    ['What is the cancellation fee?', 'Free until 24 hours before. After that, 50% of the booking.'],
    ['Do providers carry insurance?', 'Every verified provider has insurance on file.'],
  ];
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : multiple ? [...o, i] : [i]));
  return (
    <div className="dae-accordion" style={{ maxWidth: 440 }}>
      {items.map(([q, a], i) => (
        <div key={q}>
          <button type="button" aria-expanded={open.includes(i)} onClick={() => toggle(i)}>
            {q}
            <CaretDown size={16} />
          </button>
          {open.includes(i) && <div className="dae-acc-panel">{a}</div>}
        </div>
      ))}
    </div>
  );
}

function TagDemo({ kind }: { kind: string }) {
  const [sel, setSel] = useState<string[]>(['Available today']);
  const [list, setList] = useState(['Plumbing', 'Electrical', 'Painting']);
  if (kind === 'removable') {
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {list.map((t) => (
          <span key={t} className="dae-tag" style={{ cursor: 'default' }}>
            {t}
            <button type="button" className="dae-tag-x" aria-label={`Remove ${t}`} onClick={() => setList(list.filter((x) => x !== t))}>
              <X size={14} />
            </button>
          </span>
        ))}
        {list.length === 0 && <button type="button" className="dae-btn" data-variant="tertiary" data-size="sm" onClick={() => setList(['Plumbing', 'Electrical', 'Painting'])}>Reset</button>}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {['Available today', 'Top rated', 'Under $100', 'Verified'].map((t) => (
        <button key={t} type="button" className="dae-tag" aria-pressed={sel.includes(t)} onClick={() => setSel(sel.includes(t) ? sel.filter((x) => x !== t) : [...sel, t])}>
          {t}
        </button>
      ))}
    </div>
  );
}

function TableDemo({ selectable }: { selectable: boolean }) {
  const rows = [
    ['INV-1042', 'Oct 2', 'Paid', 128],
    ['INV-1043', 'Oct 4', 'Due', 64],
    ['INV-1044', 'Oct 7', 'Overdue', 212],
    ['INV-1045', 'Oct 9', 'Paid', 96],
  ] as const;
  const [asc, setAsc] = useState(true);
  const [sel, setSel] = useState<string[]>([]);
  const sorted = [...rows].sort((a, b) => (asc ? a[3] - b[3] : b[3] - a[3]));
  const tone = { Paid: 'success', Due: 'info', Overdue: 'danger' } as const;
  return (
    <table className="dae-table">
      <thead>
        <tr>
          {selectable && <th style={{ width: 32 }} />}
          <th>Invoice</th>
          <th>Date</th>
          <th>Status</th>
          <th onClick={() => setAsc(!asc)} aria-sort={asc ? 'ascending' : 'descending'} style={{ textAlign: 'right' }}>
            Amount {asc ? '↑' : '↓'}
          </th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(([id, d, st, amt]) => (
          <tr key={id} aria-selected={sel.includes(id)}>
            {selectable && (
              <td>
                <label className="dae-check">
                  <input type="checkbox" aria-label={`Select ${id}`} checked={sel.includes(id)} onChange={() => setSel(sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id])} />
                </label>
              </td>
            )}
            <td>{id}</td>
            <td>{d}</td>
            <td>
              <span className="dae-badge" data-tone={tone[st]}>{st}</span>
            </td>
            <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>${amt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StarsDemo({ readOnly, value }: { readOnly: boolean; value: number }) {
  const [v, setV] = useState(value);
  return (
    <span className="dae-stars" role={readOnly ? 'img' : 'radiogroup'} aria-label={`Rating: ${readOnly ? value : v} of 5`}>
      {[1, 2, 3, 4, 5].map((n) =>
        readOnly ? (
          <Star key={n} size={22} weight={n <= value ? 'fill' : 'regular'} />
        ) : (
          <button key={n} type="button" role="radio" aria-checked={v === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} onClick={() => setV(n)}>
            <Star size={26} weight={n <= v ? 'fill' : 'regular'} />
          </button>
        ),
      )}
    </span>
  );
}

function DateDemo({ range }: { range: boolean }) {
  const [start, setStart] = useState(14);
  const [end, setEnd] = useState<number | null>(range ? 17 : null);
  const pick = (d: number) => {
    if (!range) return setStart(d);
    if (end !== null || d < start) {
      setStart(d);
      setEnd(null);
    } else setEnd(d);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button type="button" className="dae-icon-btn" aria-label="Previous month"><CaretLeft size={16} /></button>
        <strong>October 2026</strong>
        <button type="button" className="dae-icon-btn" aria-label="Next month"><CaretRight size={16} /></button>
      </div>
      <div className="dae-cal">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i}>{d}</span>)}
        {[0, 1, 2, 3].map((i) => <span key={`b${i}`} />)}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
          <button
            key={d}
            type="button"
            disabled={d < 11}
            aria-pressed={d === start || d === end}
            data-range={range && end !== null && d > start && d < end}
            onClick={() => pick(d)}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToastDemo({ message, action }: { message: string; action: boolean }) {
  const [shown, setShown] = useState(true);
  return shown ? (
    <div className="dae-toast" role="status">
      <span>{message}</span>
      {action && (
        <button type="button" onClick={() => setShown(false)}>
          Undo
        </button>
      )}
    </div>
  ) : (
    <button type="button" className="dae-btn" data-variant="secondary" data-size="sm" onClick={() => setShown(true)}>
      Show toast again
    </button>
  );
}

const ALERT_ICON = { info: Info, success: CheckCircle, warning: Warning, danger: WarningOctagon };

// ── Registry ────────────────────────────────────────────────────

export const DEMOS: Record<string, Demo> = {
  button: {
    childProp: 'label',
    controls: [
      { name: 'label', type: 'text', default: 'Save changes' },
      { name: 'variant', type: 'select', options: ['primary', 'secondary', 'tertiary', 'danger'], default: 'primary' },
      { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
      { name: 'loading', type: 'boolean', default: false },
      { name: 'disabled', type: 'boolean', default: false },
      { name: 'iconStart', label: 'icon', type: 'select', options: ['none', 'plus', 'pencil', 'trash'], default: 'none' },
    ],
    render: (p) => {
      const Icon = { plus: Plus, pencil: PencilSimple, trash: Trash }[s(p.iconStart)];
      return (
        <button type="button" className="dae-btn" data-variant={s(p.variant)} data-size={s(p.size)} disabled={b(p.disabled)} aria-busy={b(p.loading)}>
          {b(p.loading) ? <span className="dae-spinner" aria-hidden="true" /> : Icon ? <Icon size={16} /> : null}
          {s(p.label)}
        </button>
      );
    },
  },
  'icon-button': {
    controls: [
      { name: 'variant', type: 'select', options: ['standard', 'filled', 'outlined'], default: 'standard' },
      { name: 'icon', type: 'select', options: ['more', 'edit', 'share', 'heart'], default: 'more' },
    ],
    render: (p) => {
      const [Icon, label] = ({ more: [DotsThreeVertical, 'More actions'], edit: [PencilSimple, 'Edit'], share: [ShareNetwork, 'Share'], heart: [Heart, 'Save'] } as const)[s(p.icon) as 'more'];
      return (
        <button type="button" className="dae-icon-btn" data-variant={s(p.variant)} aria-label={label}>
          <Icon size={20} />
        </button>
      );
    },
  },
  link: {
    childProp: 'label',
    controls: [
      { name: 'label', type: 'text', default: 'View booking details' },
      { name: 'variant', type: 'select', options: ['inline', 'standalone'], default: 'inline' },
    ],
    render: (p) =>
      s(p.variant) === 'inline' ? (
        <p style={{ margin: 0, maxWidth: 360 }}>
          Your appointment is confirmed. <a className="dae-link" data-variant="inline">{s(p.label)}</a> or add it to your calendar.
        </p>
      ) : (
        <a className="dae-link" data-variant="standalone">
          {s(p.label)} →
        </a>
      ),
  },
  'text-field': {
    codeName: 'TextField',
    controls: [
      { name: 'label', type: 'text', default: 'Email address' },
      { name: 'helperText', type: 'text', default: "We'll send your receipt here." },
      { name: 'error', type: 'text', default: '' },
      { name: 'prefix', type: 'select', options: ['none', '$', '@'], default: 'none' },
      { name: 'required', type: 'boolean', default: true },
      { name: 'disabled', type: 'boolean', default: false },
    ],
    layout: 'stretch',
    render: (p) => (
      <div className="dae-field" style={{ maxWidth: 340, width: '100%' }}>
        <label className="dae-label" htmlFor="dae-tf">
          {s(p.label)} {b(p.required) && <span className="dae-req">(required)</span>}
        </label>
        <div className="dae-control" data-invalid={!!p.error} data-disabled={b(p.disabled)}>
          {s(p.prefix) !== 'none' && <span className="dae-affix">{s(p.prefix)}</span>}
          <input id="dae-tf" defaultValue={p.error ? 'jamie@' : ''} disabled={b(p.disabled)} aria-invalid={!!p.error} aria-describedby="dae-tf-help" placeholder="" />
        </div>
        <span id="dae-tf-help" className={p.error ? 'dae-error' : 'dae-help'}>
          {s(p.error) || s(p.helperText)}
        </span>
      </div>
    ),
  },
  'text-area': {
    codeName: 'TextArea',
    controls: [{ name: 'label', type: 'text', default: 'Notes for your provider' }],
    layout: 'stretch',
    render: (p) => (
      <div className="dae-field" style={{ maxWidth: 380, width: '100%' }}>
        <label className="dae-label">{s(p.label)}</label>
        <div className="dae-control">
          <textarea defaultValue="Gate code is 4412. Dog is friendly." />
        </div>
        <span className="dae-help">36 / 500</span>
      </div>
    ),
  },
  select: {
    controls: [
      { name: 'label', type: 'text', default: 'Service type' },
      { name: 'disabled', type: 'boolean', default: false },
    ],
    render: (p) => (
      <div className="dae-field" style={{ width: 280 }}>
        <label className="dae-label">{s(p.label)}</label>
        <div className="dae-control" data-disabled={b(p.disabled)}>
          <select disabled={b(p.disabled)} defaultValue="">
            <option value="" disabled>
              Choose a service
            </option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Cleaning</option>
            <option>Painting</option>
            <option>Landscaping</option>
          </select>
        </div>
      </div>
    ),
  },
  checkbox: {
    childProp: 'label',
    controls: [
      { name: 'label', type: 'text', default: 'Send me appointment reminders' },
      { name: 'checked', type: 'select', options: ['false', 'true', 'indeterminate'], default: 'true' },
    ],
    render: (p) => (
      <label className="dae-check">
        <input
          type="checkbox"
          key={s(p.checked)}
          defaultChecked={s(p.checked) === 'true'}
          ref={(el) => {
            if (el) el.indeterminate = s(p.checked) === 'indeterminate';
          }}
        />
        {s(p.label)}
      </label>
    ),
  },
  'radio-group': {
    codeName: 'RadioGroup',
    controls: [
      { name: 'label', type: 'text', default: 'Delivery speed' },
      { name: 'disabled', type: 'boolean', default: false },
    ],
    render: (p) => <RadioDemo label={s(p.label)} disabled={b(p.disabled)} />,
  },
  switch: {
    childProp: 'label',
    controls: [
      { name: 'label', type: 'text', default: 'Email notifications' },
      { name: 'checked', type: 'boolean', default: true },
      { name: 'disabled', type: 'boolean', default: false },
    ],
    render: (p) => <SwitchDemo key={`${p.checked}`} label={s(p.label)} initial={b(p.checked)} disabled={b(p.disabled)} />,
  },
  'date-picker': {
    codeName: 'DatePicker',
    controls: [{ name: 'range', type: 'boolean', default: false }],
    render: (p) => <DateDemo key={s(p.range)} range={b(p.range)} />,
  },
  'search-field': {
    codeName: 'SearchField',
    controls: [{ name: 'placeholder', type: 'text', default: 'Search providers' }],
    layout: 'stretch',
    render: (p) => (
      <div role="search" className="dae-control" style={{ maxWidth: 360, width: '100%', borderRadius: 999 }}>
        <MagnifyingGlass size={16} aria-hidden="true" />
        <input aria-label={s(p.placeholder)} placeholder={s(p.placeholder)} defaultValue="plumb" />
        <button type="button" className="dae-tag-x" aria-label="Clear search">
          <X size={14} />
        </button>
      </div>
    ),
  },
  slider: {
    controls: [{ name: 'label', type: 'text', default: 'Max price' }],
    layout: 'stretch',
    render: (p) => (
      <div className="dae-field" style={{ maxWidth: 320, width: '100%' }}>
        <label className="dae-label">{s(p.label)}</label>
        <input className="dae-slider" type="range" min={0} max={500} defaultValue={180} aria-label={s(p.label)} />
      </div>
    ),
  },
  tabs: {
    controls: [
      { name: 'style', type: 'select', options: ['underline', 'segmented'], default: 'underline' },
      { name: 'count', label: 'tabs', type: 'number', default: 3 },
    ],
    layout: 'stretch',
    render: (p) => <TabsDemo style={s(p.style)} count={Math.max(2, Math.min(5, Number(p.count)))} />,
  },
  'top-app-bar': {
    codeName: 'TopAppBar',
    controls: [{ name: 'title', type: 'text', default: 'Booking details' }],
    layout: 'stretch',
    render: (p) => (
      <div className="dae-appbar">
        <button type="button" className="dae-icon-btn" aria-label="Back"><ArrowLeft size={20} /></button>
        <h4>{s(p.title)}</h4>
        <button type="button" className="dae-icon-btn" aria-label="Share"><ShareNetwork size={20} /></button>
        <button type="button" className="dae-icon-btn" aria-label="More"><DotsThreeVertical size={20} /></button>
      </div>
    ),
  },
  'bottom-navigation': {
    codeName: 'BottomNavigation',
    controls: [],
    layout: 'stretch',
    render: () => (
      <nav className="dae-bottomnav" style={{ maxWidth: 380 }}>
        {[[House, 'Home'], [MagnifyingGlass, 'Search'], [CalendarBlank, 'Bookings'], [User, 'Account']].map(([Icon, l], i) => {
          const I = Icon as typeof House;
          return (
            <button key={l as string} type="button" aria-current={i === 2 ? 'page' : undefined}>
              <I size={22} weight={i === 2 ? 'fill' : 'regular'} />
              {l as string}
            </button>
          );
        })}
      </nav>
    ),
  },
  'side-navigation': {
    codeName: 'SideNavigation',
    controls: [],
    render: () => (
      <nav className="dae-sidenav">
        {['Overview', 'Schedule', 'Clients', 'Payouts', 'Settings'].map((l, i) => (
          <button key={l} type="button" aria-current={i === 1 ? 'page' : undefined}>
            {l}
          </button>
        ))}
      </nav>
    ),
  },
  breadcrumbs: {
    controls: [],
    render: () => (
      <nav aria-label="Breadcrumb" className="dae-crumbs">
        <a className="dae-link">Home</a>/<a className="dae-link">Plumbing</a>/<span aria-current="page">Leak repair</span>
      </nav>
    ),
  },
  pagination: {
    controls: [{ name: 'page', type: 'number', default: 2 }],
    render: (p) => (
      <nav aria-label="Pagination" className="dae-pager">
        <button type="button" aria-label="Previous page"><CaretLeft size={14} /></button>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" aria-current={n === Number(p.page) ? 'page' : undefined}>
            {n}
          </button>
        ))}
        <button type="button" aria-label="Next page"><CaretRight size={14} /></button>
      </nav>
    ),
  },
  stepper: {
    controls: [{ name: 'current', type: 'number', default: 2 }],
    layout: 'stretch',
    render: (p) => (
      <div className="dae-stepper" style={{ maxWidth: 520 }}>
        {['Service', 'Time', 'Details', 'Pay'].map((l, i) => {
          const state = i + 1 < Number(p.current) ? 'done' : i + 1 === Number(p.current) ? 'current' : 'todo';
          return (
            <div key={l} style={{ display: 'contents' }}>
              {i > 0 && <span className="dae-step-line" />}
              <span className="dae-step" data-state={state} aria-current={state === 'current' ? 'step' : undefined}>
                <span>{state === 'done' ? '✓' : i + 1}</span>
                <span>{l}</span>
              </span>
            </div>
          );
        })}
      </div>
    ),
  },
  alert: {
    controls: [
      { name: 'tone', type: 'select', options: ['info', 'success', 'warning', 'danger'], default: 'warning' },
      { name: 'title', type: 'text', default: 'Your card expires soon' },
      { name: 'action', type: 'boolean', default: true },
      { name: 'dismissible', type: 'boolean', default: false },
    ],
    layout: 'stretch',
    render: (p) => {
      const Icon = ALERT_ICON[s(p.tone) as keyof typeof ALERT_ICON];
      return (
        <div className="dae-alert" data-tone={s(p.tone)} role={s(p.tone) === 'danger' || s(p.tone) === 'warning' ? 'alert' : 'status'} style={{ maxWidth: 520, width: '100%' }}>
          <Icon size={20} weight="fill" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <p className="dae-alert-title">{s(p.title)}</p>
            <p className="dae-alert-body">Update your payment method before Oct 31 to avoid interrupted bookings.</p>
            {b(p.action) && (
              <button type="button" className="dae-btn" data-variant="secondary" data-size="sm">
                Update card
              </button>
            )}
          </div>
          {b(p.dismissible) && (
            <button type="button" className="dae-tag-x" aria-label="Dismiss">
              <X size={16} />
            </button>
          )}
        </div>
      );
    },
  },
  toast: {
    childProp: 'message',
    controls: [
      { name: 'message', type: 'text', default: 'Booking cancelled' },
      { name: 'action', label: 'undo action', type: 'boolean', default: true },
    ],
    render: (p) => <ToastDemo key={`${p.message}${p.action}`} message={s(p.message)} action={b(p.action)} />,
  },
  'progress-bar': {
    codeName: 'ProgressBar',
    controls: [{ name: 'value', type: 'number', default: 60 }],
    layout: 'stretch',
    render: (p) => (
      <div className="dae-field" style={{ maxWidth: 320, width: '100%' }}>
        <span className="dae-label">Uploading documents</span>
        <div className="dae-progress" role="progressbar" aria-valuenow={Number(p.value)} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${Math.min(100, Math.max(0, Number(p.value)))}%` }} />
        </div>
        <span className="dae-help">{Number(p.value)}% · 2 of 3 files</span>
      </div>
    ),
  },
  spinner: {
    controls: [],
    render: () => <span className="dae-spinner" role="status" aria-label="Loading" />,
  },
  skeleton: {
    controls: [],
    layout: 'stretch',
    render: () => (
      <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 360 }} aria-busy="true" aria-label="Loading">
        <div className="dae-skeleton" style={{ width: 48, height: 48, borderRadius: '50%' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
          <div className="dae-skeleton" style={{ height: 12, width: '70%' }} />
          <div className="dae-skeleton" style={{ height: 12, width: '45%' }} />
        </div>
      </div>
    ),
  },
  modal: {
    controls: [
      { name: 'title', type: 'text', default: 'Cancel this booking?' },
      { name: 'destructive', type: 'boolean', default: true },
    ],
    layout: 'stretch',
    render: (p) => (
      <div className="dae-backdrop">
        <div className="dae-modal" role="dialog" aria-label={s(p.title)}>
          <h4>{s(p.title)}</h4>
          <p>Kitchen faucet repair with Ana R. on Oct 14 at 9:00 AM. You won&apos;t be charged.</p>
          <div className="dae-modal-actions">
            <button type="button" className="dae-btn" data-variant="secondary">
              Keep booking
            </button>
            <button type="button" className="dae-btn" data-variant={b(p.destructive) ? 'danger' : 'primary'}>
              Cancel booking
            </button>
          </div>
        </div>
      </div>
    ),
  },
  'bottom-sheet': {
    codeName: 'BottomSheet',
    controls: [],
    render: () => (
      <div className="dae-sheet">
        <div className="dae-sheet-handle" />
        <div className="dae-list" style={{ border: 0 }}>
          {[[PencilSimple, 'Reschedule'], [ShareNetwork, 'Share details'], [Trash, 'Cancel booking']].map(([Icon, l]) => {
            const I = Icon as typeof Trash;
            return (
              <div key={l as string} className="dae-list-item" style={{ minHeight: 48, padding: '8px 4px' }}>
                <I size={20} />
                <span className="dae-li-body">{l as string}</span>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
  tooltip: {
    controls: [{ name: 'text', type: 'text', default: 'Copy link' }],
    render: (p) => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span className="dae-tooltip" role="tooltip">{s(p.text)}</span>
        <button type="button" className="dae-icon-btn" data-variant="outlined" aria-label={s(p.text)}>
          <ShareNetwork size={18} />
        </button>
      </div>
    ),
  },
  'popover-menu': {
    codeName: 'PopoverMenu',
    controls: [],
    render: () => (
      <div className="dae-menu" role="menu">
        <button type="button" role="menuitem">Reschedule</button>
        <button type="button" role="menuitem">Message provider</button>
        <button type="button" role="menuitem">Add to calendar</button>
        <hr className="dae-divider" style={{ margin: '4px 0' }} />
        <button type="button" role="menuitem" data-danger="true">Cancel booking</button>
      </div>
    ),
  },
  badge: {
    childProp: 'label',
    controls: [
      { name: 'label', type: 'text', default: 'Confirmed' },
      { name: 'tone', type: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'], default: 'success' },
    ],
    render: (p) => (
      <span className="dae-badge" data-tone={s(p.tone)}>
        {s(p.label)}
      </span>
    ),
  },
  tag: {
    controls: [{ name: 'kind', type: 'select', options: ['filter', 'removable'], default: 'filter' }],
    render: (p) => <TagDemo key={s(p.kind)} kind={s(p.kind)} />,
  },
  avatar: {
    controls: [
      { name: 'name', type: 'text', default: 'Ana Reyes' },
      { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
    ],
    render: (p) => {
      const px = { sm: 24, md: 32, lg: 48 }[s(p.size) as 'md'];
      const initials = s(p.name).split(' ').map((n) => n[0]).slice(0, 2).join('');
      return (
        <span className="dae-avatar" style={{ width: px, height: px, fontSize: px * 0.4 }} role="img" aria-label={s(p.name)}>
          {initials}
        </span>
      );
    },
  },
  icon: {
    controls: [],
    render: () => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 32px)', gap: 12, color: 'var(--dae-color-icon-default)' }}>
        {[House, MagnifyingGlass, CalendarBlank, User, Bell, Heart, Star, ShareNetwork, PencilSimple, Trash, Plus, X, Info, Warning, CheckCircle, DotsThreeVertical].map((I, i) => (
          <I key={i} size={24} />
        ))}
      </div>
    ),
  },
  card: {
    controls: [
      { name: 'variant', type: 'select', options: ['outlined', 'elevated'], default: 'outlined' },
      { name: 'media', type: 'boolean', default: true },
      { name: 'interactive', type: 'boolean', default: true },
    ],
    render: (p) => (
      <div className="dae-card" data-variant={s(p.variant)} data-interactive={b(p.interactive)} style={{ width: 280 }}>
        {b(p.media) && <div className="dae-card-media" />}
        <h4>Deep clean, 2 bed</h4>
        <p>Brightside Cleaning · 4.9 ★ (212)</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <strong>$140</strong>
          <span className="dae-badge" data-tone="success">Available today</span>
        </div>
      </div>
    ),
  },
  divider: {
    controls: [],
    layout: 'stretch',
    render: () => (
      <div style={{ maxWidth: 360, width: '100%' }}>
        <div>Subtotal</div>
        <hr className="dae-divider" />
        <div>Total</div>
      </div>
    ),
  },
  accordion: {
    controls: [{ name: 'multiple', label: 'multi-expand', type: 'boolean', default: false }],
    layout: 'stretch',
    render: (p) => <AccordionDemo key={s(p.multiple)} multiple={b(p.multiple)} />,
  },
  'data-table': {
    codeName: 'DataTable',
    controls: [{ name: 'selectable', type: 'boolean', default: true }],
    layout: 'stretch',
    render: (p) => <TableDemo selectable={b(p.selectable)} />,
  },
  'list-item': {
    codeName: 'ListItem',
    controls: [{ name: 'trailing', type: 'select', options: ['chevron', 'switch', 'badge'], default: 'chevron' }],
    layout: 'stretch',
    render: (p) => (
      <div className="dae-list" style={{ maxWidth: 380, width: '100%' }}>
        {[['Ana Reyes', 'Plumbing · 4.9 ★'], ['Brightside Cleaning', 'Cleaning · 4.8 ★']].map(([t, sub]) => (
          <div key={t} className="dae-list-item">
            <span className="dae-avatar" style={{ width: 36, height: 36, fontSize: 14 }}>{t[0]}</span>
            <div className="dae-li-body">
              <div>{t}</div>
              <div className="dae-li-sub">{sub}</div>
            </div>
            {s(p.trailing) === 'chevron' && <CaretRight size={16} />}
            {s(p.trailing) === 'badge' && <span className="dae-badge" data-tone="info">New</span>}
            {s(p.trailing) === 'switch' && <SwitchDemo label={`Favorite ${t}`} initial={false} disabled={false} />}
          </div>
        ))}
      </div>
    ),
  },
  carousel: {
    controls: [],
    layout: 'stretch',
    render: () => (
      <div className="dae-carousel" style={{ maxWidth: 520 }}>
        {['Spring cleaning', 'Gutter check', 'AC tune-up', 'Window wash'].map((t) => (
          <div key={t} className="dae-card">
            <div className="dae-card-media" style={{ height: 64 }} />
            <h4 style={{ fontSize: 14 }}>{t}</h4>
          </div>
        ))}
      </div>
    ),
  },
  'ghost-button': {
    childProp: 'label',
    codeName: 'GhostButton',
    controls: [{ name: 'label', type: 'text', default: 'Learn more' }],
    render: (p) => (
      <button type="button" className="dae-btn" data-variant="ghost">
        {s(p.label)}
      </button>
    ),
  },
  'rating-stars': {
    codeName: 'RatingStars',
    controls: [
      { name: 'readOnly', type: 'boolean', default: false },
      { name: 'value', type: 'number', default: 4 },
    ],
    render: (p) => <StarsDemo key={`${p.readOnly}${p.value}`} readOnly={b(p.readOnly)} value={Math.max(0, Math.min(5, Number(p.value)))} />,
  },
  'booking-summary-card': {
    codeName: 'BookingSummaryCard',
    controls: [],
    render: () => (
      <div className="dae-card" style={{ width: 320 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="dae-avatar" style={{ width: 40, height: 40, fontSize: 15 }}>AR</span>
          <div>
            <h4>Kitchen faucet repair</h4>
            <p>Ana Reyes · Tue, Oct 14 · 9:00 AM</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button type="button" className="dae-btn" data-variant="secondary" data-size="sm">Reschedule</button>
          <button type="button" className="dae-btn" data-variant="tertiary" data-size="sm">Message</button>
        </div>
      </div>
    ),
  },
  'promo-banner': {
    codeName: 'PromoBanner',
    controls: [],
    layout: 'stretch',
    render: () => (
      <div className="dae-promo" style={{ maxWidth: 520 }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: 'var(--dae-color-coral-100)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <strong>20% off your first deep clean</strong>
          <div style={{ fontSize: 14 }}>Book by Oct 31.</div>
        </div>
        <button type="button" className="dae-btn" data-variant="primary" data-size="sm">Book now</button>
      </div>
    ),
  },
  'form-validation': {
    controls: [],
    layout: 'stretch',
    render: () => (
      <form style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360, width: '100%' }} onSubmit={(e) => e.preventDefault()}>
        <div className="dae-alert" data-tone="danger" role="alert">
          <WarningOctagon size={20} weight="fill" />
          <div>
            <p className="dae-alert-title">Fix 1 problem to continue</p>
            <p className="dae-alert-body"><a className="dae-link">Enter an email like name@example.com</a></p>
          </div>
        </div>
        <div className="dae-field">
          <label className="dae-label">Full name</label>
          <div className="dae-control"><input defaultValue="Jamie Chen" /></div>
        </div>
        <div className="dae-field">
          <label className="dae-label">Email <span className="dae-req">(required)</span></label>
          <div className="dae-control" data-invalid="true"><input defaultValue="jamie@" aria-invalid="true" /></div>
          <span className="dae-error">Enter an email like name@example.com</span>
        </div>
        <button type="submit" className="dae-btn" data-variant="primary">Continue</button>
      </form>
    ),
  },
  'empty-states': {
    controls: [{ name: 'type', type: 'select', options: ['first use', 'no results', 'error'], default: 'no results' }],
    render: (p) => {
      const copy = {
        'first use': ['No bookings yet', 'When you book a service it shows up here.', 'Find a provider'],
        'no results': ['No providers match "plumbr"', 'Check the spelling or remove a filter.', 'Clear filters'],
        error: ["We couldn't load your bookings", 'This is on us. Try again in a moment.', 'Try again'],
      }[s(p.type) as 'first use'];
      return (
        <div style={{ textAlign: 'center', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <CalendarBlank size={40} style={{ color: 'var(--dae-color-icon-default)' }} />
          <strong>{copy[0]}</strong>
          <span style={{ color: 'var(--dae-color-text-secondary)', fontSize: 14 }}>{copy[1]}</span>
          <button type="button" className="dae-btn" data-variant="secondary" data-size="sm">{copy[2]}</button>
        </div>
      );
    },
  },
  'destructive-confirmation': {
    controls: [{ name: 'reversible', type: 'boolean', default: false }],
    layout: 'stretch',
    render: (p) =>
      b(p.reversible) ? (
        <div className="dae-toast" role="status">
          <span>Provider removed from favorites</span>
          <button type="button">Undo</button>
        </div>
      ) : (
        <div className="dae-backdrop">
          <div className="dae-modal" role="dialog" aria-label="Delete payment method?">
            <h4>Delete Visa ending 4242?</h4>
            <p>Upcoming bookings using this card will need a new payment method.</p>
            <div className="dae-modal-actions">
              <button type="button" className="dae-btn" data-variant="secondary">Keep card</button>
              <button type="button" className="dae-btn" data-variant="danger">Delete card</button>
            </div>
          </div>
        </div>
      ),
  },
  'loading-states': {
    controls: [{ name: 'wait', type: 'select', options: ['page load', 'short wait', 'known progress'], default: 'page load' }],
    layout: 'stretch',
    render: (p) => DEMOS[{ 'page load': 'skeleton', 'short wait': 'spinner', 'known progress': 'progress-bar' }[s(p.wait) as 'page load']].render({ value: 60 }),
  },
  'search-filter': {
    controls: [],
    layout: 'stretch',
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
        {DEMOS['search-field'].render({ placeholder: 'Search providers' })}
        <TagDemo kind="filter" />
        <span style={{ fontSize: 14, color: 'var(--dae-color-text-secondary)' }} aria-live="polite">
          24 providers
        </span>
      </div>
    ),
  },
  onboarding: {
    controls: [],
    render: () => (
      <div className="dae-card" style={{ width: 320, gap: 12 }}>
        {DEMOS.stepper.render({ current: 1 })}
        <h4>What do you need help with?</h4>
        <TagDemo kind="filter" />
        <button type="button" className="dae-btn" data-variant="primary" data-full="true">Continue</button>
      </div>
    ),
  },
  'legacy-loader': {
    controls: [],
    render: () => (
      <div style={{ background: 'rgba(12,16,22,.6)', padding: 32, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#fff' }}>
        <span className="dae-spinner" />
        Loading…
      </div>
    ),
  },
  'plan-comparison-table': {
    codeName: 'PlanComparisonTable',
    controls: [],
    layout: 'stretch',
    render: () => (
      <table className="dae-table" style={{ maxWidth: 440 }}>
        <thead>
          <tr><th>Feature</th><th>Basic</th><th>Plus</th></tr>
        </thead>
        <tbody>
          <tr><td>Bookings / month</td><td>3</td><td>Unlimited</td></tr>
          <tr><td>Priority support</td><td>—</td><td>✓</td></tr>
          <tr><td>Satisfaction guarantee</td><td>✓</td><td>✓</td></tr>
        </tbody>
      </table>
    ),
  },
};

export function defaultsFor(demo: Demo): Props {
  return Object.fromEntries(demo.controls.map((c) => [c.name, c.default]));
}
