import type { ChangeEntry, ChangeType, Platform, Proposal, RoadmapItem } from '../types';

let n = 0;
function c(
  date: string,
  sprintId: string,
  itemSlug: string | undefined,
  type: ChangeType,
  platforms: Platform[],
  summary: string,
  authorId: string,
  extra: Partial<ChangeEntry> = {},
): ChangeEntry {
  n += 1;
  return { id: `chg-${n}`, date, sprintId, itemSlug, type, platforms, summary, authorId, breaking: false, ...extra };
}

const ALL: Platform[] = ['web', 'ios', 'android', 'figma'];

export const changes: ChangeEntry[] = [
  // Sprint 26.20 (last sprint)
  c('2026-10-06', '26.20', 'button', 'changed', ALL, 'Loading state now announces progress and blocks repeat presses on all platforms.', 'p-amir', { version: '3.2.0', details: 'Previously only web set aria-busy. iOS and Android now expose an accessibility value of "Loading" and ignore taps while loading.' }),
  c('2026-10-06', '26.20', 'button', 'docs', ['web'], 'Added "Button vs. Link" decision guidance and content rules.', 'p-dev'),
  c('2026-10-02', '26.20', 'text-field', 'changed', ['web', 'ios', 'figma'], 'v4: label stays above the field; floating label animation removed.', 'p-amir', { version: '4.0.0', breaking: true, details: 'The floating label failed usability testing with older users. Migration: remove `floatingLabel` prop; no visual regressions expected for forms already using helper text. Android ships in 26.21.' }),
  c('2026-10-01', '26.20', 'data-table', 'added', ['web'], 'Row selection with shift-click range select.', 'p-june', { version: '0.7.0' }),
  c('2026-09-30', '26.20', 'stepper', 'added', ['web', 'figma'], 'Experimental Stepper contributed by Bookings.', 'p-kit', { version: '0.2.0' }),
  c('2026-09-29', '26.20', undefined, 'tokens', ALL, 'Raised `color.border.focus` in dark mode to lagoon.300 to meet 3:1 focus contrast.', 'p-maya'),
  c('2026-09-29', '26.20', 'skeleton', 'fixed', ['ios'], 'Shimmer no longer runs when Reduce Motion is on.', 'p-sol', { version: '0.8.0' }),
  c('2026-09-28', '26.20', 'bottom-sheet', 'changed', ['ios', 'android'], 'Added medium detent; drag handle is now focusable.', 'p-sol', { version: '1.0.0-beta.4' }),

  // Sprint 26.19
  c('2026-09-25', '26.19', 'bottom-sheet', 'fixed', ['android'], 'Sheet no longer covers the system navigation bar.', 'p-rae'),
  c('2026-09-24', '26.19', 'date-picker', 'changed', ['web', 'figma'], 'Range selection and keyboard grid navigation (a11y review pending).', 'p-kit', { version: '0.9.0' }),
  c('2026-09-18', '26.19', 'skeleton', 'added', ['web', 'ios', 'figma'], 'Skeleton promoted from experimental to beta.', 'p-ines', { version: '0.8.0' }),
  c('2026-09-18', '26.19', 'loading-states', 'docs', ALL, 'New pattern page: choosing Skeleton vs Spinner vs Progress Bar.', 'p-ines'),
  c('2026-09-15', '26.19', 'toast', 'changed', ['web', 'ios', 'figma'], 'Default duration raised to 6s; pauses on hover and focus.', 'p-ines', { version: '2.4.0', details: 'Android still at 4s — tracked as parity drift.' }),
  c('2026-09-14', '26.19', 'search-filter', 'changed', ['web'], 'Results count now announced via live region.', 'p-june'),

  // Sprint 26.18
  c('2026-09-11', '26.18', 'search-field', 'changed', ['web', 'ios', 'figma'], 'Recent searches shown when the field is empty.', 'p-june', { version: '1.0.0-beta.3' }),
  c('2026-09-09', '26.18', 'onboarding', 'added', ['web', 'ios'], 'Onboarding pattern pilot with Growth.', 'p-priya', { version: '0.2.0' }),
  c('2026-09-04', '26.18', 'icon', 'added', ['web', 'ios', 'figma'], '12 new icons for Billing and Marketplace.', 'p-dev', { version: '4.1.0' }),
  c('2026-09-02', '26.18', 'side-navigation', 'changed', ['web'], 'Collapsible rail mode.', 'p-amir', { version: '1.0.0-beta.2' }),
  c('2026-09-01', '26.18', 'rating-stars', 'changed', ['web', 'android'], 'Half-star display support.', 'p-omar', { version: '1.1.0' }),

  // Sprint 26.17
  c('2026-08-28', '26.17', 'tabs', 'changed', ['web', 'android', 'figma'], 'Optional count badges on tabs.', 'p-ines', { version: '2.3.0' }),
  c('2026-08-19', '26.17', 'modal', 'fixed', ['web'], 'Focus returns to trigger after nested popover closes.', 'p-amir', { version: '3.1.0' }),
  c('2026-08-14', '26.17', 'booking-summary-card', 'changed', ['web', 'ios'], 'Reschedule action added.', 'p-kit', { version: '1.4.0' }),
  c('2026-08-12', '26.17', 'select', 'changed', ALL, 'v3: native pickers on mobile.', 'p-june', { version: '3.0.0', breaking: true }),
  c('2026-08-08', '26.17', 'popover-menu', 'added', ['web'], 'Submenu support.', 'p-amir', { version: '0.9.2' }),
  c('2026-08-01', '26.17', 'slider', 'added', ['web', 'figma'], 'Experimental range slider for price filters.', 'p-june', { version: '0.3.0' }),

  // Older
  c('2026-02-01', '26.03', 'ghost-button', 'deprecated', ALL, 'Ghost Button deprecated — use Button variant="tertiary".', 'p-dev', { breaking: false, details: 'Ghost Button failed 4.5:1 text contrast in dark mode. Tertiary keeps the low-emphasis look with compliant contrast. Removal planned for 4.0.' }),
];

export const roadmap: RoadmapItem[] = [
  {
    id: 'RM-101', title: 'Text Field v4 on Android', type: 'parity', status: 'in-progress', priority: 'high', impact: 'high',
    platforms: ['android'], itemSlug: 'text-field', ownerIds: ['p-rae', 'p-amir'], sprintId: '26.21', pi: 'PI 26.4', horizon: 'now',
    description: 'Bring Android up to Text Field 4.0: label above field, error below.', why: 'Text Field is in 1,900+ screens. Android is the last platform on v3, and the error placement difference shows up in every form QA review.',
    dependencies: [], progress: 55,
  },
  {
    id: 'RM-102', title: 'Data Table accessibility hardening', type: 'enhancement', status: 'in-progress', priority: 'high', impact: 'high',
    platforms: ['web'], itemSlug: 'data-table', ownerIds: ['p-amir', 'p-june'], sprintId: '26.21', pi: 'PI 26.4', horizon: 'now',
    description: 'Keyboard navigation, sort announcements, and screen reader row selection.', why: 'Blocking stable status. Five teams are waiting on a stable table before migrating custom tables.',
    dependencies: ['Pagination needs an owner'], risks: 'Pagination is unowned and a dependency.', progress: 40,
  },
  {
    id: 'RM-103', title: 'Toast duration parity on Android', type: 'parity', status: 'planned', priority: 'medium', impact: 'medium',
    platforms: ['android'], itemSlug: 'toast', ownerIds: ['p-rae'], sprintId: '26.21', pi: 'PI 26.4', horizon: 'now',
    description: 'Override Material default; 6s and pause on focus.', why: 'Users on Android miss Undo more often (support tickets up 18% since August).',
    dependencies: [], progress: 0,
  },
  {
    id: 'RM-104', title: 'Remove Legacy Loader', type: 'deprecation', status: 'planned', priority: 'medium', impact: 'breaking',
    platforms: ['web', 'ios'], itemSlug: 'legacy-loader', ownerIds: ['p-june', 'p-theo'], sprintId: '26.22', pi: 'PI 26.4', horizon: 'next',
    description: 'Delete the component after the last two consumers migrate to Skeleton.', why: 'Full-page blocking loaders fail the Loading States pattern and are not accessible.',
    dependencies: ['Billing migration', 'Growth migration'], risks: 'Growth has not scheduled its migration.', progress: 20,
  },
  {
    id: 'RM-105', title: 'Promote Rating Stars to the system', type: 'new', status: 'planned', priority: 'medium', impact: 'medium',
    platforms: ['web', 'ios', 'android', 'figma'], itemSlug: 'rating-stars', ownerIds: ['p-dev', 'p-omar'], sprintId: '26.22', pi: 'PI 26.4', horizon: 'next',
    description: 'Harden, document, and move Rating Stars from Marketplace into Daedalus.', why: 'Three product teams already use it; two more have asked. Promoting it stops forks.',
    dependencies: [], proposalId: 'PRP-031', progress: 0,
  },
  {
    id: 'RM-106', title: 'Bottom Sheet for responsive web', type: 'parity', status: 'in-progress', priority: 'medium', impact: 'medium',
    platforms: ['web'], itemSlug: 'bottom-sheet', ownerIds: ['p-june'], sprintId: '26.21', pi: 'PI 26.4', horizon: 'now',
    description: 'Sheet behavior below 768px for filters and contextual actions.', why: 'Search & Filter pattern depends on it for mobile web.',
    dependencies: [], progress: 30,
  },
  {
    id: 'RM-107', title: 'Consolidate Promo Banner into Alert', type: 'refactor', status: 'proposed', priority: 'low', impact: 'medium',
    platforms: ['web', 'ios'], itemSlug: 'promo-banner', ownerIds: ['p-dev', 'p-priya'], pi: 'PI 26.4', horizon: 'next',
    description: 'Add an optional media slot to Alert and migrate Promo Banner usages.', why: 'Two components doing the same job, one of which has no a11y review and no owner.',
    dependencies: [], progress: 0,
  },
  {
    id: 'RM-108', title: 'Semantic token layer for density', type: 'foundation', status: 'planned', priority: 'high', impact: 'high',
    platforms: ['web', 'ios', 'android', 'figma'], ownerIds: ['p-maya', 'p-dev'], sprintId: '26.23', pi: 'PI 26.4', horizon: 'next',
    description: 'Compact/comfortable spacing modes driven by tokens instead of per-component props.', why: 'Admin tools fork Card and List Item to tighten padding. A density mode removes the reason to fork.',
    dependencies: [], progress: 0,
  },
  {
    id: 'RM-109', title: 'Assign owners for orphaned components', type: 'foundation', status: 'in-progress', priority: 'high', impact: 'medium',
    platforms: ['web', 'ios', 'android', 'figma'], ownerIds: ['p-theo'], sprintId: '26.21', pi: 'PI 26.4', horizon: 'now',
    description: 'Pagination, Accordion and Carousel have no owner.', why: 'Unowned components drift and block downstream work (Data Table depends on Pagination).',
    dependencies: [], progress: 33,
  },
  {
    id: 'RM-110', title: 'Date Picker to stable', type: 'enhancement', status: 'blocked', priority: 'medium', impact: 'high',
    platforms: ['web', 'ios', 'android'], itemSlug: 'date-picker', ownerIds: ['p-kit', 'p-sol'], pi: 'PI 26.4', horizon: 'next',
    description: 'Android build, iOS range support, a11y sign-off.', why: 'Bookings, Billing and Marketplace all have date inputs today; three are custom.',
    dependencies: ['Android capacity'], risks: 'Blocked on Android engineering capacity until Text Field v4 lands.', progress: 60,
  },
  {
    id: 'RM-111', title: 'Searchable Select (combobox)', type: 'new', status: 'proposed', priority: 'medium', impact: 'medium',
    platforms: ['web', 'ios', 'android', 'figma'], itemSlug: 'select', ownerIds: ['p-june'], pi: 'PI 27.1', horizon: 'later',
    description: 'Select with type-ahead for long option lists.', why: 'Most-requested enhancement in the last two PIs.',
    dependencies: [], progress: 0,
  },
  {
    id: 'RM-112', title: 'Remove Ghost Button (4.0)', type: 'deprecation', status: 'planned', priority: 'low', impact: 'breaking',
    platforms: ['web', 'ios', 'android', 'figma'], itemSlug: 'ghost-button', ownerIds: ['p-dev'], pi: 'PI 27.1', horizon: 'later',
    description: 'Hard removal in the 4.0 major. Codemod provided.', why: '140 instances remain across 6 products.',
    dependencies: ['Codemod'], progress: 10,
  },
  {
    id: 'RM-113', title: 'Icon set export to Android', type: 'parity', status: 'complete', priority: 'low', impact: 'low',
    platforms: ['android'], itemSlug: 'icon', ownerIds: ['p-rae'], sprintId: '26.20', pi: 'PI 26.4', horizon: 'now',
    description: 'Automate vector export so Android does not lag new icons.', why: 'Android was missing 12 icons from 4.1.',
    dependencies: [], progress: 100,
  },
];

export const proposals: Proposal[] = [
  {
    id: 'PRP-031', title: 'Rating Stars as a system component', kind: 'new-component', problem: 'Marketplace built Rating Stars; Bookings and Growth copied it. Now there are three slightly different versions.',
    useCases: ['Provider reviews', 'Post-appointment feedback', 'Onboarding satisfaction survey'], platforms: ['web', 'ios', 'android'], reach: 'many',
    submittedBy: 'p-omar', submittedAt: '2026-09-03', status: 'accepted', qualityScore: 88, closestMatch: { slug: 'rating-stars', score: 0.95 },
    triageNote: 'Accepted as a promotion of the existing product component. On the roadmap as RM-105.',
  },
  {
    id: 'PRP-034', title: 'Popup for appointment reminders', kind: 'new-component', problem: 'Need to remind users about upcoming appointments when they open the app.',
    useCases: ['Appointment reminder'], platforms: ['ios'], reach: 'single',
    submittedBy: 'p-kit', submittedAt: '2026-09-22', status: 'redirected', qualityScore: 28, closestMatch: { slug: 'modal', score: 0.82 },
    triageNote: 'Redirected: this is an Alert at the top of Home, not a new component. A blocking popup on launch also conflicts with Modal guidance.',
  },
  {
    id: 'PRP-036', title: 'Compact density for List Item', kind: 'enhancement', targetSlug: 'list-item', problem: 'Admin tools fork List Item to reduce row height to 40px.',
    useCases: ['Provider dashboard', 'Internal admin', 'Billing history'], platforms: ['web'], reach: 'few',
    submittedBy: 'p-lena', submittedAt: '2026-09-29', status: 'accepted', qualityScore: 81, closestMatch: { slug: 'list-item', score: 1 },
    triageNote: 'Folded into RM-108 (density tokens) rather than a one-off prop.',
  },
  {
    id: 'PRP-038', title: 'Countdown timer', kind: 'new-component', problem: 'Promotions need a visible countdown to expiry.',
    useCases: ['Flash sale banner'], platforms: ['web', 'ios'], reach: 'single',
    submittedBy: 'p-priya', submittedAt: '2026-10-05', status: 'needs-info', qualityScore: 44,
    triageNote: 'Asked for: second use case outside promotions, and a11y plan for live-updating text.',
  },
  {
    id: 'PRP-039', title: 'File upload / dropzone', kind: 'new-component', problem: 'Providers upload licenses and insurance documents; three different upload UIs exist today.',
    useCases: ['Provider verification', 'Support attachments', 'Profile photo'], platforms: ['web', 'ios', 'android'], reach: 'many',
    submittedBy: 'p-omar', submittedAt: '2026-10-08', status: 'submitted', qualityScore: 79,
  },
];
