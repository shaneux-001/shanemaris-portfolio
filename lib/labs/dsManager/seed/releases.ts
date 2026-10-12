import type { MigrationGuide, Release } from '../types';

/*
 * System releases bundle what shipped in a sprint. Components version
 * independently (Text Field can go 4.0 inside a 3.x system release); the
 * release notes themselves are assembled from the changelog by sprint, so
 * nothing here duplicates change entries.
 */

const pkgs = (v: string, android = v) => ({ web: `@meridian/react ${v}`, ios: `MeridianUI ${v}`, android: `meridian-compose ${android}`, figma: `Library ${v.split('.').slice(0, 2).join('.')}` });

export const releases: Release[] = [
  { version: '3.4.0', date: '2026-10-09', sprintId: '26.20', summary: 'Text Field 4 on web and iOS, accessible loading states for Button, row selection in Data Table, and an experimental Stepper.', packages: pkgs('3.4.0', '3.3.1'), migrationIds: ['MIG-004'] },
  { version: '3.3.0', date: '2026-09-25', sprintId: '26.19', summary: 'Skeleton graduates to beta, Toast stays up long enough to catch Undo, and a new Loading States pattern.', packages: pkgs('3.3.0'), migrationIds: [] },
  { version: '3.2.0', date: '2026-09-11', sprintId: '26.18', summary: 'Recent searches in Search Field, 12 new icons, a collapsible Side Navigation, and the Onboarding pilot.', packages: pkgs('3.2.0'), migrationIds: [] },
  { version: '3.1.0', date: '2026-08-28', sprintId: '26.17', summary: 'Select moves to native pickers on mobile (breaking), count badges on Tabs, and submenus in Popover Menu.', packages: pkgs('3.1.0'), migrationIds: ['MIG-003'] },
  { version: '3.0.0', date: '2026-02-06', sprintId: '26.03', summary: 'Major release. Ghost Button and Legacy Loader are deprecated in favor of accessible replacements.', packages: pkgs('3.0.0'), migrationIds: ['MIG-001', 'MIG-002'] },
];

export const migrations: MigrationGuide[] = [
  {
    id: 'MIG-004',
    itemSlug: 'text-field',
    title: 'Text Field 3.x → 4.0',
    kind: 'breaking-change',
    fromVersion: '3.x',
    toVersion: '4.0.0',
    releasedIn: '3.4.0',
    deadline: '2026-12-11',
    why: 'The floating label failed usability testing with older users: once you started typing, the label shrank out of the way and people lost track of what the field was for. 4.0 keeps the label above the field at all times and always shows helper text below it.',
    steps: [
      'Remove the `floatingLabel` prop. Labels are always visible now, so there is nothing to configure.',
      'If you hid helper text to save space, check the layout — helper text is now always rendered below the field.',
      'Replace any custom error placement with the `error` prop. Errors now replace helper text in the same spot.',
      'Android: wait for meridian-compose 3.4.0 (Sprint 26.21). Do not hand-roll the new layout in the meantime.',
    ],
    before: {
      web: `<TextField\n  floatingLabel\n  label="Email address"\n  placeholder="Email address"\n/>`,
      ios: `MTextField("Email address", style: .floating)`,
    },
    after: {
      web: `<TextField\n  label="Email address"\n  helperText="We'll send your receipt here."\n/>`,
      ios: `MTextField("Email address", helperText: "We'll send your receipt here.")`,
    },
    products: [
      { productId: 'booking-web', status: 'done' },
      { productId: 'account', status: 'done' },
      { productId: 'help', status: 'done' },
      { productId: 'admin', status: 'done' },
      { productId: 'checkout', status: 'in-progress' },
      { productId: 'booking-ios', status: 'in-progress' },
      { productId: 'provider-search', status: 'in-progress' },
      { productId: 'onboarding', status: 'in-progress' },
      { productId: 'booking-android', status: 'not-started' },
      { productId: 'messages', status: 'not-started' },
      { productId: 'home', status: 'not-started' },
      { productId: 'invoices', status: 'not-started' },
      { productId: 'provider-profiles', status: 'not-started' },
    ],
    ownerId: 'p-amir',
  },
  {
    id: 'MIG-003',
    itemSlug: 'select',
    title: 'Select 2.x → 3.0',
    kind: 'breaking-change',
    fromVersion: '2.x',
    toVersion: '3.0.0',
    releasedIn: '3.1.0',
    deadline: '2026-10-23',
    why: 'The custom dropdown on iOS and Android fought the platform: no VoiceOver rotor support, no haptics, and it broke with large text sizes. 3.0 wraps the native picker on mobile. Web is unchanged.',
    steps: [
      'Mobile only. Remove `maxVisibleOptions` — native pickers size themselves.',
      'Custom option rendering (`renderOption`) is not supported on mobile. If you relied on it, you likely need a List Item in a Bottom Sheet instead.',
      'Re-test any screenshot tests on iOS and Android; the closed state is visually unchanged but the open state is native.',
    ],
    before: { ios: `MSelect("Service type", options: services, maxVisibleOptions: 6)`, android: `MSelect(\n    label = "Service type",\n    options = services,\n    maxVisibleOptions = 6\n)` },
    after: { ios: `MSelect("Service type", options: services)`, android: `MSelect(\n    label = "Service type",\n    options = services\n)` },
    products: [
      { productId: 'booking-ios', status: 'done' },
      { productId: 'booking-android', status: 'done' },
      { productId: 'checkout', status: 'done' },
      { productId: 'account', status: 'done' },
      { productId: 'provider-search', status: 'done' },
      { productId: 'home', status: 'done' },
      { productId: 'onboarding', status: 'done' },
      { productId: 'provider-profiles', status: 'in-progress' },
      { productId: 'messages', status: 'in-progress' },
    ],
    ownerId: 'p-june',
  },
  {
    id: 'MIG-001',
    itemSlug: 'ghost-button',
    title: 'Ghost Button → Button (tertiary)',
    kind: 'deprecation',
    fromVersion: '2.4.0',
    toVersion: '3.0.0',
    toSlug: 'button',
    releasedIn: '3.0.0',
    deadline: '2027-01-29',
    why: 'Ghost Button failed 4.5:1 text contrast in dark mode. The tertiary Button keeps the same low-emphasis look and meets contrast in both themes. Ghost Button is removed in Meridian 4.0 (PI 27.1).',
    steps: ['Run the codemod — it handles every straightforward usage.', 'Review anything the codemod flags: Ghost Buttons with custom colors usually wanted `variant="secondary"` instead.', 'Remove any local overrides that forced Ghost Button text color.'],
    codemod: 'npx @meridian/codemods ghost-to-tertiary ./src',
    before: { web: `<GhostButton onPress={showDetails}>Learn more</GhostButton>`, ios: `MGhostButton("Learn more", action: showDetails)` },
    after: { web: `<Button variant="tertiary" onPress={showDetails}>Learn more</Button>`, ios: `MButton("Learn more", variant: .tertiary, action: showDetails)` },
    products: [
      { productId: 'booking-web', status: 'done' },
      { productId: 'account', status: 'done' },
      { productId: 'invoices', status: 'done' },
      { productId: 'provider-search', status: 'done' },
      { productId: 'checkout', status: 'in-progress', remaining: 48 },
      { productId: 'help', status: 'in-progress', remaining: 22 },
      { productId: 'provider-dashboard', status: 'in-progress', remaining: 9 },
      { productId: 'messages', status: 'in-progress', remaining: 6 },
      { productId: 'home', status: 'not-started', remaining: 37 },
      { productId: 'admin', status: 'not-started', remaining: 18 },
    ],
    ownerId: 'p-dev',
  },
  {
    id: 'MIG-002',
    itemSlug: 'legacy-loader',
    title: 'Legacy Loader → Skeleton or Spinner',
    kind: 'deprecation',
    fromVersion: '1.0.0',
    toVersion: '3.0.0',
    toSlug: 'skeleton',
    releasedIn: '3.0.0',
    deadline: '2026-11-06',
    why: 'A full-screen blocking overlay hides the whole page for the slowest request on it, and it never announced anything to screen readers. Removal is scheduled for Sprint 26.22.',
    steps: ['Page loads: render the layout with Skeleton placeholders where content will appear.', 'Short actions (under ~3s): use Spinner inside the button or region that is busy, not over the page.', 'Delete the `<LegacyLoader>` wrapper and its `isLoading` plumbing at the page level.'],
    before: { web: `<LegacyLoader isLoading={loading}>\n  <InvoiceList />\n</LegacyLoader>` },
    after: { web: `{loading ? <InvoiceListSkeleton /> : <InvoiceList />}` },
    products: [
      { productId: 'account', status: 'done' },
      { productId: 'help', status: 'done' },
      { productId: 'invoices', status: 'in-progress', remaining: 5 },
      { productId: 'home', status: 'not-started', remaining: 4 },
    ],
    ownerId: 'p-june',
  },
];
