import type { Feedback, Watch } from '../types';

/*
 * Docs feedback. Written comments tell the same story as the rest of the
 * seed (stale Popover docs, unowned Accordion, Android Toast drift); bare
 * "was this helpful?" votes are generated so helpfulness scores have volume.
 */

const comments: Feedback[] = [
  { id: 'fb-1', itemSlug: 'data-table', authorId: 'p-omar', createdAt: '2026-10-07', helpful: false, category: 'missing-example', message: 'No example of server-side sorting and pagination together. Had to read the source to figure out the callbacks.', status: 'open' },
  { id: 'fb-2', itemSlug: 'select', authorId: 'p-lena', createdAt: '2026-09-29', helpful: false, category: 'request', message: 'We have 40+ service types. Is type-ahead coming? Scrolling the native picker is painful.', status: 'resolved', response: 'Yes — Searchable Select is on the roadmap (RM-111) for PI 27.1. Added Billing as a use case.', respondedBy: 'p-june' },
  { id: 'fb-3', itemSlug: 'date-picker', authorId: 'p-lena', createdAt: '2026-10-02', helpful: false, category: 'accessibility', message: 'With VoiceOver, arrow keys skip disabled dates in some months but not others.', status: 'open' },
  { id: 'fb-4', itemSlug: 'popover-menu', authorId: 'p-omar', createdAt: '2026-09-30', helpful: false, category: 'unclear-docs', message: 'Docs still describe the old API — the `items` prop doesn’t exist anymore.', status: 'open' },
  { id: 'fb-5', itemSlug: 'text-field', authorId: 'p-kit', createdAt: '2026-10-08', helpful: false, category: 'unclear-docs', message: 'Migration guide doesn’t say what happens to `placeholder` once `floatingLabel` is removed.', status: 'open' },
  { id: 'fb-6', itemSlug: 'toast', authorId: 'p-priya', createdAt: '2026-09-22', helpful: false, category: 'bug', message: 'On Android the toast disappears before people can hit Undo.', status: 'resolved', response: 'Known drift — Android still uses the 4s Material default. Fix is in Sprint 26.21 (RM-103).', respondedBy: 'p-ines' },
  { id: 'fb-7', itemSlug: 'button', authorId: 'p-kit', createdAt: '2026-10-06', helpful: true, category: 'other', message: 'The Button vs. Link guidance settled a two-week debate on our team.', status: 'resolved', response: 'Love to hear it. That section came out of exactly that kind of debate.', respondedBy: 'p-dev' },
  { id: 'fb-8', itemSlug: 'accordion', authorId: 'p-priya', createdAt: '2026-10-05', helpful: false, category: 'unclear-docs', message: 'Who do I ask about Accordion? There’s no owner listed.', status: 'open' },
  { id: 'fb-9', itemSlug: 'modal', authorId: 'p-kit', createdAt: '2026-09-26', helpful: true, category: 'missing-example', message: 'Would love a mobile example — when should this be a Bottom Sheet instead?', status: 'open' },
  { id: 'fb-10', itemSlug: 'search-filter', authorId: 'p-omar', createdAt: '2026-09-18', helpful: false, category: 'missing-example', message: 'The mobile filter sheet isn’t documented.', status: 'wont-fix', response: 'Bottom Sheet for responsive web is still in progress (RM-106). Docs land when it ships.', respondedBy: 'p-june' },
];

/** [helpful, not helpful] bare votes per page, in addition to the comments above. */
const VOTES: Record<string, [number, number]> = {
  button: [17, 1],
  'text-field': [11, 3],
  modal: [8, 1],
  select: [7, 4],
  tabs: [6, 1],
  toast: [8, 2],
  card: [10, 1],
  alert: [7, 1],
  'data-table': [3, 5],
  'date-picker': [2, 3],
  'popover-menu': [2, 3],
  accordion: [1, 2],
  'search-filter': [2, 2],
  'form-validation': [6, 0],
  checkbox: [4, 0],
  switch: [3, 0],
};

const VOTERS = ['p-kit', 'p-lena', 'p-omar', 'p-priya', 'p-amir', 'p-sol', 'p-rae', 'p-june'];
const DATES = ['2026-09-15', '2026-09-19', '2026-09-24', '2026-09-30', '2026-10-03', '2026-10-08'];

function votes(): Feedback[] {
  const out: Feedback[] = [];
  let n = 0;
  for (const [slug, [yes, no]] of Object.entries(VOTES)) {
    for (let i = 0; i < yes + no; i++) {
      n += 1;
      out.push({ id: `fv-${n}`, itemSlug: slug, authorId: VOTERS[n % VOTERS.length], createdAt: DATES[n % DATES.length], helpful: i < yes, status: 'resolved' });
    }
  }
  return out;
}

export const feedback: Feedback[] = [...comments, ...votes()];

/** The demo visitor starts out watching a few components so notifications have something to show. */
export const watches: Watch[] = [
  { personId: 'p-you', itemSlug: 'button' },
  { personId: 'p-you', itemSlug: 'text-field' },
  { personId: 'p-you', itemSlug: 'data-table' },
];
