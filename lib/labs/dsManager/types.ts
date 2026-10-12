/**
 * Domain model. Shaped like the payloads a real backend would return —
 * the UI never reaches into seed data directly, only through the
 * repository (see repository.ts).
 */

export type Platform = 'web' | 'ios' | 'android' | 'figma';
export const PLATFORMS: Platform[] = ['web', 'ios', 'android', 'figma'];
export const PLATFORM_LABEL: Record<Platform, string> = {
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
  figma: 'Figma',
};

export type ItemKind = 'component' | 'product-component' | 'pattern';
export const KIND_LABEL: Record<ItemKind, string> = {
  component: 'System component',
  'product-component': 'Product component',
  pattern: 'Pattern',
};

export type Lifecycle = 'proposed' | 'experimental' | 'beta' | 'stable' | 'deprecated';
export const LIFECYCLES: Lifecycle[] = ['proposed', 'experimental', 'beta', 'stable', 'deprecated'];

export type Category =
  | 'Actions'
  | 'Inputs'
  | 'Navigation'
  | 'Feedback'
  | 'Overlays'
  | 'Data Display'
  | 'Layout'
  | 'Patterns';

/** `n/a` = the platform doesn't need it (e.g. Breadcrumbs on iOS), and is excluded from parity. */
export type PlatformStatus = 'shipped' | 'in-progress' | 'planned' | 'not-planned' | 'n/a';

export interface PlatformImpl {
  status: PlatformStatus;
  /** Version shipped on this platform — compared against the item's spec version to detect drift. */
  version?: string;
  /** Known behavioral/visual divergence from spec, even if the version matches. */
  drift?: string;
  /** Import path / package / Figma library name. */
  ref?: string;
}

export interface Readiness {
  design: boolean;
  code: boolean;
  docs: boolean;
  a11y: boolean;
  tokens: boolean;
  tests: boolean;
}

export type A11yLevel = 'AAA' | 'AA' | 'partial' | 'unverified';

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface UsageDocs {
  summary: string;
  whenToUse: string[];
  whenNotToUse: string[];
  dos: string[];
  donts: string[];
  a11y: string[];
  content?: string[];
}

export interface SystemItem {
  id: string;
  slug: string;
  name: string;
  kind: ItemKind;
  category: Category;
  description: string;
  /** Other names people search for — powers duplicate detection and the assistant. */
  aliases: string[];
  lifecycle: Lifecycle;
  version: string;
  ownerId?: string;
  /** For product components: the product team that built it. */
  productTeamId?: string;
  platforms: Record<Platform, PlatformImpl>;
  readiness: Readiness;
  a11yLevel: A11yLevel;
  adoption: { products: number; instances: number };
  dependencies: string[];
  tokens: string[];
  variants: string[];
  props: PropDef[];
  docs: UsageDocs;
  related: string[];
  /** Deprecated items point at what to use instead. */
  replacedBy?: string;
  /** Product components that are candidates to become system components. */
  promotionCandidate?: boolean;
  createdAt: string;
  updatedAt: string;
  docsUpdatedAt: string;
}

export type Role = 'design' | 'engineering' | 'designops' | 'product';
export const ROLE_LABEL: Record<Role, string> = {
  design: 'Design',
  engineering: 'Engineering',
  designops: 'DesignOps',
  product: 'Product',
};

export interface Team {
  id: string;
  name: string;
  /** System team vs. a product team that consumes (and sometimes contributes to) the system. */
  type: 'system' | 'product';
  description: string;
}

export interface Person {
  id: string;
  name: string;
  title: string;
  teamId: string;
  role: Role;
  platforms: Platform[];
  /** Hue for the generated initials avatar — no photos of real people for fictional owners. */
  hue: number;
}

export interface Sprint {
  id: string;
  name: string;
  pi: string;
  start: string;
  end: string;
}

export type ChangeType = 'added' | 'changed' | 'fixed' | 'deprecated' | 'removed' | 'docs' | 'tokens';

export interface ChangeEntry {
  id: string;
  date: string;
  sprintId: string;
  /** Items are referenced by slug everywhere (dependencies, related, changes, roadmap). */
  itemSlug?: string;
  type: ChangeType;
  platforms: Platform[];
  version?: string;
  breaking: boolean;
  summary: string;
  details?: string;
  authorId: string;
}

export type RoadmapType = 'new' | 'enhancement' | 'refactor' | 'parity' | 'deprecation' | 'foundation';
export type RoadmapStatus = 'proposed' | 'planned' | 'in-progress' | 'blocked' | 'complete';
export type Impact = 'low' | 'medium' | 'high' | 'breaking';
export type Priority = 'low' | 'medium' | 'high';

export const IMPACT_DEFINITION: Record<Impact, string> = {
  low: 'Minor improvement or maintenance.',
  medium: 'Moderate enhancement affecting reuse or consistency.',
  high: 'Broad system value, major adoption, or significant parity progress.',
  breaking: 'Requires migration, rework, or downstream updates.',
};

export interface RoadmapItem {
  id: string;
  title: string;
  type: RoadmapType;
  status: RoadmapStatus;
  priority: Priority;
  impact: Impact;
  platforms: Platform[];
  itemSlug?: string;
  ownerIds: string[];
  /** Sprint the work is committed to, or undefined for PI-level / later work. */
  sprintId?: string;
  pi: string;
  horizon: 'now' | 'next' | 'later';
  description: string;
  why: string;
  dependencies: string[];
  risks?: string;
  proposalId?: string;
  progress: number;
}

export type ProposalKind = 'new-component' | 'new-pattern' | 'enhancement';
export type ProposalStatus = 'submitted' | 'needs-info' | 'redirected' | 'accepted' | 'declined';

export interface Proposal {
  id: string;
  title: string;
  kind: ProposalKind;
  /** For enhancements: the item being extended. */
  targetSlug?: string;
  problem: string;
  useCases: string[];
  platforms: Platform[];
  reach: 'single' | 'few' | 'many';
  figmaLink?: string;
  submittedBy: string;
  submittedAt: string;
  status: ProposalStatus;
  qualityScore: number;
  /** Closest existing match found at submission time. */
  closestMatch?: { slug: string; score: number };
  triageNote?: string;
}

export type TokenTier = 'primitive' | 'semantic' | 'component';
export type TokenType = 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'fontSize' | 'lineHeight' | 'duration' | 'shadow';

export interface Token {
  /** Dot path, e.g. `color.action.primary.bg`. */
  name: string;
  tier: TokenTier;
  type: TokenType;
  /** Literal value or a `{reference.path}`. Themed tokens have a per-mode value. */
  value: string | { light: string; dark: string };
  description?: string;
  deprecated?: boolean;
}

/** A product (app or surface) that consumes the system. */
export interface Product {
  id: string;
  name: string;
  teamId: string;
  platforms: Platform[];
}

/** Instances in code per sprint, oldest first; aligned to Database.historySprints. */
export type AdoptionHistory = Record<string, number[]>;

/** Past values of the system-level metrics, oldest first; the live value is appended at read time. */
export interface HealthHistory {
  avgCompleteness: number[];
  parity: number[];
  stableRatio: number[];
  driftCount: number[];
  unowned: number[];
}

export interface Release {
  version: string;
  date: string;
  sprintId: string;
  summary: string;
  /** Package version shipped per platform. */
  packages: Record<Platform, string>;
  migrationIds: string[];
}

export type MigrationStatus = 'done' | 'in-progress' | 'not-started';

export interface MigrationGuide {
  id: string;
  itemSlug: string;
  /** e.g. "Text Field 3.x → 4.0" */
  title: string;
  kind: 'breaking-change' | 'deprecation';
  fromVersion: string;
  toVersion: string;
  /** Replacement item, for deprecations. */
  toSlug?: string;
  releasedIn: string;
  deadline: string;
  why: string;
  steps: string[];
  codemod?: string;
  before: Partial<Record<Platform, string>>;
  after: Partial<Record<Platform, string>>;
  products: { productId: string; status: MigrationStatus; remaining?: number }[];
  ownerId: string;
}

export type FeedbackCategory = 'unclear-docs' | 'missing-example' | 'bug' | 'accessibility' | 'request' | 'other';
export const FEEDBACK_CATEGORY_LABEL: Record<FeedbackCategory, string> = {
  'unclear-docs': 'Docs unclear',
  'missing-example': 'Missing example',
  bug: 'Bug',
  accessibility: 'Accessibility',
  request: 'Feature request',
  other: 'Other',
};

export interface Feedback {
  id: string;
  itemSlug: string;
  authorId: string;
  createdAt: string;
  /** The page-level "Was this helpful?" vote. */
  helpful: boolean;
  category?: FeedbackCategory;
  message?: string;
  status: 'open' | 'resolved' | 'wont-fix';
  response?: string;
  respondedBy?: string;
}

export interface Watch {
  personId: string;
  itemSlug: string;
}

export type FigmaPropType = 'VARIANT' | 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP';

/**
 * One row of a Figma ↔ code mapping. Either side can be missing: a Figma
 * property with no code prop, or a code prop Figma doesn't expose.
 */
export interface PropMapping {
  figmaProp?: string;
  figmaType?: FigmaPropType;
  codeProp?: string;
  /** Figma variant value → code value. A null code value means Figma offers it but code doesn't. */
  values?: [string, string | null][];
  /** One-sided by design (e.g. interaction states Figma draws and code renders itself). */
  intentional?: boolean;
  note?: string;
}

export interface FigmaMapping {
  itemSlug: string;
  /** Component name in the Figma library, e.g. "Meridian / Actions / Button". */
  nodeName: string;
  nodeId: string;
  props: PropMapping[];
  lastSynced: string;
  /** Instances across product design files at the last library scan. */
  figmaInstances: number;
  /** Share of those instances that are detached, 0–1. */
  detachRate: number;
}

export interface Database {
  items: SystemItem[];
  people: Person[];
  teams: Team[];
  sprints: Sprint[];
  changes: ChangeEntry[];
  roadmap: RoadmapItem[];
  proposals: Proposal[];
  tokens: Token[];
  products: Product[];
  /** Sprint ids the history arrays line up with, oldest first. */
  historySprints: string[];
  adoptionHistory: AdoptionHistory;
  healthHistory: HealthHistory;
  releases: Release[];
  migrations: MigrationGuide[];
  feedback: Feedback[];
  watches: Watch[];
  figma: FigmaMapping[];
}
