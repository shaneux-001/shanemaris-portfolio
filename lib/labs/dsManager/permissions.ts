/*
 * Who can do what. Checked in two places on purpose: the UI uses it to
 * disable and explain, and the repository enforces it on every write — the
 * same split a real backend would have (never trust the client alone).
 */

export type AppRole = 'viewer' | 'contributor' | 'ds-team';

export const ROLES: { id: AppRole; label: string; description: string }[] = [
  { id: 'viewer', label: 'Viewer', description: 'Designers and engineers using the system. Read everything, ask questions, leave feedback, watch components.' },
  { id: 'contributor', label: 'Contributor', description: 'Everything a viewer can do, plus submit requests for new components, patterns and enhancements.' },
  { id: 'ds-team', label: 'DS team', description: 'Maintains the system: edits the inventory, tokens and roadmap, and triages requests and feedback.' },
];

export type Action =
  | 'feedback.submit'
  | 'watch.toggle'
  | 'proposal.submit'
  | 'proposal.triage'
  | 'feedback.resolve'
  | 'item.edit'
  | 'token.edit'
  | 'roadmap.edit';

const MIN_ROLE: Record<Action, AppRole> = {
  'feedback.submit': 'viewer',
  'watch.toggle': 'viewer',
  'proposal.submit': 'contributor',
  'proposal.triage': 'ds-team',
  'feedback.resolve': 'ds-team',
  'item.edit': 'ds-team',
  'token.edit': 'ds-team',
  'roadmap.edit': 'ds-team',
};

const RANK: Record<AppRole, number> = { viewer: 0, contributor: 1, 'ds-team': 2 };

export function can(role: AppRole, action: Action): boolean {
  return RANK[role] >= RANK[MIN_ROLE[action]];
}

/** Human explanation for a locked control. */
export function lockedReason(action: Action): string {
  const min = MIN_ROLE[action];
  return min === 'ds-team' ? 'Only the DS team can change this.' : 'Contributors and the DS team can do this.';
}

export class PermissionError extends Error {
  readonly action: Action;
  constructor(action: Action) {
    super(`Not allowed: ${action}`);
    this.name = 'PermissionError';
    this.action = action;
  }
}
