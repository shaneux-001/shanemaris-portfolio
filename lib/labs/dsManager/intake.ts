import { duplicateVerdict, findMatches, tokenize, type Match } from './match';
import type { Platform, Proposal, ProposalKind, SystemItem } from './types';

/*
 * The intake gate. A request has to earn its way to the DS team: the score
 * rewards evidence (use cases, reach, platforms) and penalizes rebuilding
 * something that already exists without saying why. Every point has a
 * human-readable reason, and every gap has a specific fix.
 */

export interface IntakeDraft {
  title: string;
  kind: ProposalKind;
  targetSlug?: string;
  problem: string;
  useCases: string[];
  reach: 'single' | 'few' | 'many' | '';
  platforms: Platform[];
  figmaLink: string;
  a11y: string;
  /** Why the closest existing match doesn't work — required when one is strong. */
  notThatReason: string;
}

export const emptyDraft: IntakeDraft = { title: '', kind: 'new-component', problem: '', useCases: [''], reach: '', platforms: [], figmaLink: '', a11y: '', notThatReason: '' };

export interface Factor {
  label: string;
  points: number;
  max: number;
  note?: string;
}

export interface Assessment {
  score: number;
  factors: Factor[];
  /** Specific things to fix, in priority order. */
  pushback: string[];
  matches: Match[];
  verdict: 'exists' | 'similar' | 'novel';
  /** Hard stops: these must be resolved before the request can be submitted. */
  blockers: string[];
  canSubmit: boolean;
}

export const SUBMIT_THRESHOLD = 55;

/**
 * The title names the thing, so it carries full weight; the problem
 * statement is prose full of incidental words ("progress", "list"), so its
 * matches count for a little over half.
 */
const PROBLEM_WEIGHT = 0.55;

export function duplicateMatches(title: string, problem: string, items: SystemItem[]): Match[] {
  const best = new Map<string, Match>();
  const add = (ms: Match[], w: number) => {
    for (const m of ms) {
      const scored = { ...m, score: m.score * w };
      const prev = best.get(m.item.slug);
      if (!prev || scored.score > prev.score) best.set(m.item.slug, scored);
    }
  };
  add(findMatches(title, items, { limit: 6, min: 0.2 }), 1);
  add(findMatches(problem, items, { limit: 6, min: 0.2 }), PROBLEM_WEIGHT);
  return [...best.values()].filter((m) => m.score >= 0.3).sort((a, b) => b.score - a.score).slice(0, 4);
}

export function assess(d: IntakeDraft, items: SystemItem[]): Assessment {
  const matches = duplicateMatches(d.title, d.problem, items).filter((m) => m.item.slug !== d.targetSlug || d.kind !== 'enhancement');
  const top = matches[0];
  const verdict = top ? duplicateVerdict(top.score) : 'novel';
  const useCases = d.useCases.map((u) => u.trim()).filter(Boolean);
  const factors: Factor[] = [];
  const pushback: string[] = [];
  const blockers: string[] = [];

  // Problem clarity
  const plen = d.problem.trim().length;
  factors.push({ label: 'Problem is specific', points: plen >= 120 ? 15 : plen >= 50 ? 9 : plen > 0 ? 3 : 0, max: 15 });
  if (plen < 50) pushback.push('Describe the problem, not the solution: who is stuck, where, and what happens today.');

  // Evidence
  factors.push({ label: 'Use cases', points: useCases.length >= 3 ? 20 : useCases.length === 2 ? 12 : useCases.length === 1 ? 4 : 0, max: 20, note: `${useCases.length} listed` });
  if (useCases.length < 2) pushback.push('Add at least two real use cases. One use case is a product decision, not a system one.');

  factors.push({ label: 'Reach', points: d.reach === 'many' ? 20 : d.reach === 'few' ? 10 : 0, max: 20, note: d.reach || 'not set' });
  if (d.reach === 'single') pushback.push('Used by one team in one flow? Build it in the product first. If others adopt it, propose promoting it.');
  if (!d.reach) blockers.push('Say how many teams need this.');

  factors.push({ label: 'Platform coverage', points: d.platforms.length >= 3 ? 10 : d.platforms.length === 2 ? 6 : d.platforms.length === 1 ? 2 : 0, max: 10 });
  if (!d.platforms.length) blockers.push('Pick at least one platform.');

  // Reuse check
  if (d.kind === 'enhancement' && d.targetSlug) {
    factors.push({ label: 'Builds on an existing component', points: 20, max: 20, note: 'Extending is cheaper than adding' });
  } else if (verdict === 'exists') {
    const justified = d.notThatReason.trim().length >= 40;
    factors.push({ label: 'Not a duplicate', points: justified ? 6 : -15, max: 20, note: `${top.item.name} matches ${Math.round(top.score * 100)}%` });
    if (!justified) blockers.push(`${top.item.name} already does this. Use it, request an enhancement to it, or explain why it can't work.`);
  } else if (verdict === 'similar') {
    const justified = d.notThatReason.trim().length >= 20;
    factors.push({ label: 'Not a duplicate', points: justified ? 14 : 8, max: 20, note: `Similar to ${top.item.name}` });
    if (!justified) pushback.push(`Say why ${top.item.name} doesn't fit — it's close enough that triage will ask.`);
  } else {
    factors.push({ label: 'Not a duplicate', points: 20, max: 20, note: 'Nothing similar in the system' });
  }

  factors.push({ label: 'Design exploration linked', points: /figma\.com\//.test(d.figmaLink) ? 5 : 0, max: 5 });
  factors.push({ label: 'Accessibility considered', points: d.a11y.trim().length >= 30 ? 10 : d.a11y.trim() ? 4 : 0, max: 10 });
  if (d.a11y.trim().length < 30) pushback.push('Note keyboard, screen reader and touch-target needs. Triage will ask anyway.');

  if (!d.title.trim()) blockers.push('Give it a title.');

  const score = Math.max(0, Math.min(100, factors.reduce((s, f) => s + f.points, 0)));
  if (score < SUBMIT_THRESHOLD && !blockers.length) blockers.push(`Strengthen the request to at least ${SUBMIT_THRESHOLD} — the fixes above are the fastest way there.`);

  return { score, factors, pushback, matches, verdict, blockers, canSubmit: blockers.length === 0 && score >= SUBMIT_THRESHOLD };
}

/** Sandbox compositions that are really an existing pattern. */
export const PATTERN_SIGNATURES: { pattern: string; needs: string[]; message: string }[] = [
  { pattern: 'form-validation', needs: ['text-field', 'button'], message: 'Fields plus a submit button: follow Form Validation for how errors appear.' },
  { pattern: 'search-filter', needs: ['search-field', 'tag'], message: 'A search field with tags is the Search & Filter pattern.' },
  { pattern: 'destructive-confirmation', needs: ['modal', 'button'], message: 'A modal with a button: if the action is destructive, use Destructive Confirmation.' },
  { pattern: 'onboarding', needs: ['stepper'], message: 'A stepper suggests a multi-step flow. See the Onboarding pattern.' },
  { pattern: 'empty-states', needs: ['icon', 'button'], message: 'An icon and a single action looks like an Empty State.' },
  { pattern: 'loading-states', needs: ['skeleton'], message: 'Using Skeleton? Loading States covers when to use it versus Spinner.' },
];

/**
 * Open requests that look like this one (title word overlap). Not a blocker —
 * the better move is usually adding your use case to the existing request.
 */
export function similarOpenProposals(title: string, proposals: Proposal[]): Proposal[] {
  const mine = new Set(tokenize(title));
  if (mine.size === 0) return [];
  return proposals.filter((p) => {
    if (p.status !== 'submitted' && p.status !== 'needs-info') return false;
    const theirs = new Set(tokenize(p.title));
    const overlap = [...mine].filter((t) => theirs.has(t)).length;
    return overlap / Math.min(mine.size, theirs.size) >= 0.5;
  });
}
