import { SYSTEM } from './brand';
import { snippets } from './codegen';
import { findMatches, tokenize, type Match } from './match';
import { driftFor } from './metrics';
import { LAST_SPRINT_ID } from './seed';
import type { Database, Platform, SystemItem } from './types';
import { PLATFORM_LABEL } from './types';

/*
 * The free tier of "Ask the system": intent detection + retrieval over the
 * inventory + templated answers. No model call, no cost, deterministic, and
 * it never invents a component — it can only recommend what exists. The
 * live tier (app/api/labs/ds-manager/ask) layers Claude on top for
 * open-ended situational questions.
 */

export interface Answer {
  /** Light Markdown: **bold**, `code`, "- " bullets, blank-line paragraphs. */
  text: string;
  items: string[];
  code?: { platform: Platform; code: string };
  actions: { label: string; href: string }[];
  source: 'retrieval' | 'claude';
}

const PLATFORM_WORDS: Record<string, Platform> = { ios: 'ios', swift: 'ios', swiftui: 'ios', iphone: 'ios', android: 'android', compose: 'android', kotlin: 'android', web: 'web', react: 'web', figma: 'figma' };

function platformIn(q: string): Platform | undefined {
  for (const w of tokenize(q)) if (PLATFORM_WORDS[w]) return PLATFORM_WORDS[w];
  return undefined;
}

const active = (db: Database) => db.items.filter((i) => i.lifecycle !== 'proposed');
const docs = (i: SystemItem) => `/components/${i.slug}`;

function availability(i: SystemItem): string {
  const missing = (['web', 'ios', 'android'] as Platform[]).filter((p) => i.platforms[p].status !== 'shipped' && i.platforms[p].status !== 'n/a');
  const drift = driftFor(i);
  const parts = [];
  if (missing.length) parts.push(`not yet shipped on ${missing.map((p) => PLATFORM_LABEL[p]).join(' or ')}`);
  if (drift.length) parts.push(`known drift on ${drift.map((d) => PLATFORM_LABEL[d.platform]).join(', ')}`);
  return parts.length ? ` Heads up: ${parts.join('; ')}.` : '';
}

function lifecycleNote(i: SystemItem): string {
  if (i.lifecycle === 'beta') return ' It’s in **beta** — fine to use, but expect minor API changes.';
  if (i.lifecycle === 'experimental') return ' It’s **experimental** — check with the owner before shipping it.';
  return '';
}

/** Planned work touching this item, so answers say "it's coming" instead of inviting a duplicate request. */
function roadmapNote(db: Database, i: SystemItem): string {
  const work = db.roadmap.filter((r) => r.itemSlug === i.slug && r.status !== 'complete');
  if (!work.length) return '';
  return `\n\nOn the roadmap:\n${work.map((r) => `- ${r.title} (${r.status.replace('-', ' ')}, ${r.sprintId ? `Sprint ${r.sprintId}` : r.pi})`).join('\n')}`;
}

function kindNote(db: Database, i: SystemItem): string {
  if (i.kind !== 'product-component') return '';
  const team = db.teams.find((t) => t.id === i.productTeamId)?.name;
  return ` It's a **product component**${team ? ` built by ${team}` : ''}, not part of the core system yet — reuse it rather than rebuilding it.`;
}

function recommend(db: Database, m: Match): Answer {
  const i = m.item;
  if (i.lifecycle === 'deprecated' && i.replacedBy) {
    const r = db.items.find((x) => x.slug === i.replacedBy)!;
    return {
      text: `**${i.name}** is deprecated. Use **${r.name}** instead.\n\n${i.docs.summary}`,
      items: [r.slug, i.slug],
      actions: [{ label: `${r.name} docs`, href: docs(r) }],
      source: 'retrieval',
    };
  }
  const lines = [`Yes — use **${i.name}**. ${i.docs.summary || i.description}${kindNote(db, i)}${lifecycleNote(i)}${availability(i)}`];
  if (i.docs.whenToUse.length) lines.push(`Use it for:\n${i.docs.whenToUse.map((w) => `- ${w}`).join('\n')}`);
  if (i.docs.whenNotToUse.length) lines.push(`Not for:\n${i.docs.whenNotToUse.map((w) => `- ${w}`).join('\n')}`);
  return { text: lines.join('\n\n') + roadmapNote(db, i), items: [i.slug], actions: [{ label: `${i.name} docs`, href: docs(i) }, { label: 'Try it in the sandbox', href: `/sandbox?add=${i.slug}` }], source: 'retrieval' };
}

function compare(a: SystemItem, b: SystemItem): Answer {
  const side = (i: SystemItem) => `**${i.name}** — ${i.docs.summary || i.description}${i.docs.whenToUse.length ? `\n- Use for: ${i.docs.whenToUse.slice(0, 2).join(' ')}` : ''}`;
  const crossRef = [...a.docs.whenNotToUse, ...b.docs.whenNotToUse].filter((w) => w.toLowerCase().includes(a.name.toLowerCase()) || w.toLowerCase().includes(b.name.toLowerCase()));
  return {
    text: [side(a), side(b), crossRef.length ? `The rule of thumb:\n${crossRef.map((w) => `- ${w}`).join('\n')}` : ''].filter(Boolean).join('\n\n'),
    items: [a.slug, b.slug],
    actions: [
      { label: `${a.name} docs`, href: docs(a) },
      { label: `${b.name} docs`, href: docs(b) },
    ],
    source: 'retrieval',
  };
}

export function answer(question: string, db: Database): Answer {
  const q = question.toLowerCase();
  const items = active(db);
  const matches = findMatches(question, items, { limit: 4, min: 0.3 });
  const top = matches[0];
  const platform = platformIn(question);

  // "What changed / what's new"
  if (/\b(what('?s| is)? new|what changed|changelog|release notes|last sprint|shipped)\b/.test(q)) {
    const changes = db.changes.filter((c) => c.sprintId === LAST_SPRINT_ID);
    return {
      text: `${db.releases[0] ? `**${SYSTEM.name} ${db.releases[0].version}** — ` : ''}In Sprint ${LAST_SPRINT_ID} the team shipped ${changes.length} changes:\n\n${changes.map((c) => `- ${c.itemSlug ? `**${db.items.find((i) => i.slug === c.itemSlug)?.name}**: ` : ''}${c.summary}${c.breaking ? ' _(breaking)_' : ''}`).join('\n')}`,
      items: [],
      actions: [...(db.releases[0] ? [{ label: 'Release notes', href: `/releases/${db.releases[0].version}` }] : []), { label: 'Full changelog', href: '/changelog' }],
      source: 'retrieval',
    };
  }

  // Migrations: "how do I migrate…", "upgrade to Text Field 4", "breaking changes"
  if (/\b(migrat|upgrade|breaking)/.test(q)) {
    const guides = db.migrations.filter((m) => !top || m.itemSlug === top.item.slug || m.toSlug === top.item.slug);
    const list = guides.length ? guides : db.migrations;
    return {
      text: `${list.length === 1 ? 'There’s a migration guide for that' : 'Open migration guides'}:\n\n${list.map((m) => `- **${m.title}** — ${m.products.filter((p) => p.status === 'done').length} of ${m.products.length} products done${m.codemod ? ', codemod available' : ''}`).join('\n')}`,
      items: [],
      actions: list.map((m) => ({ label: m.title, href: `/migrations/${m.id}` })),
      source: 'retrieval',
    };
  }

  // A deprecated item named outright gets the "use X instead" answer, even
  // though deprecated items rank lower in general retrieval.
  const namedDeprecated = db.items.find((i) => i.lifecycle === 'deprecated' && q.includes(i.name.toLowerCase()));
  if (namedDeprecated) return recommend(db, { item: namedDeprecated, score: 1, reasons: [] });

  // "What's deprecated"
  if (/\bdeprecat/.test(q) && !top) {
    const dep = db.items.filter((i) => i.lifecycle === 'deprecated');
    return {
      text: `${dep.length} items are deprecated:\n\n${dep.map((i) => `- **${i.name}** → use ${db.items.find((x) => x.slug === i.replacedBy)?.name ?? 'see docs'}`).join('\n')}`,
      items: dep.map((i) => i.slug),
      actions: [{ label: 'Deprecated in inventory', href: '/inventory?lifecycle=deprecated' }],
      source: 'retrieval',
    };
  }

  // Comparisons: "X vs Y", "difference between X and Y", "X or Y"
  if (matches.length >= 2 && /\b(vs\.?|versus|difference|compare|or)\b/.test(q) && matches[1].score >= 0.6) {
    return compare(matches[0].item, matches[1].item);
  }

  if (top) {
    const i = top.item;
    // Ownership
    if (/\b(who|owner|owns|contact|maintain)/.test(q)) {
      const owner = db.people.find((p) => p.id === i.ownerId);
      return {
        text: owner ? `**${owner.name}** (${owner.title}) owns **${i.name}**.` : `**${i.name}** has no owner right now — that's a known risk. DesignOps (Theo Lindqvist) is assigning one this sprint.`,
        items: [i.slug],
        actions: [{ label: 'Owners directory', href: '/owners' }],
        source: 'retrieval',
      };
    }
    // Accessibility
    if (/\b(a11y|accessib|screen reader|keyboard|contrast|wcag)/.test(q)) {
      return {
        text: `**${i.name}** — accessibility: **${i.a11yLevel}**.\n\n${i.docs.a11y.length ? i.docs.a11y.map((a) => `- ${a}`).join('\n') : 'No component-specific notes yet.'}${roadmapNote(db, i)}`,
        items: [i.slug],
        actions: [{ label: `${i.name} docs`, href: docs(i) }],
        source: 'retrieval',
      };
    }
    // Tokens
    if (/\b(token|color|colour|spacing|radius)/.test(q) && i.tokens.length) {
      return { text: `**${i.name}** uses these tokens:\n\n${i.tokens.map((t) => `- \`${t}\``).join('\n')}`, items: [i.slug], actions: [{ label: 'Tokens', href: '/tokens' }], source: 'retrieval' };
    }
    // Implementation on a platform
    if (platform || /\b(implement|code|import|build|snippet|how do i use)/.test(q)) {
      const p = platform ?? 'web';
      const impl = i.platforms[p];
      if (impl.status !== 'shipped') {
        return {
          text: `**${i.name}** isn't available on ${PLATFORM_LABEL[p]} (${impl.status.replace('-', ' ')}).${impl.status === 'in-progress' || impl.status === 'planned' ? ' It’s on the roadmap.' : ''} Don't build your own — ask ${db.people.find((x) => x.id === i.ownerId)?.name ?? 'the DS team'} about timing.`,
          items: [i.slug],
          actions: [{ label: 'Roadmap', href: '/roadmap' }],
          source: 'retrieval',
        };
      }
      const code = snippets(i, {}, {}, {})[p];
      return {
        text: `Here's **${i.name}** on ${PLATFORM_LABEL[p]}${impl.ref ? ` (\`${impl.ref}\`)` : ''}.${impl.drift ? ` Note the known drift: ${impl.drift}` : ''}${lifecycleNote(i)} The docs playground generates code for any variant.`,
        items: [i.slug],
        code: { platform: p, code },
        actions: [{ label: 'Open playground', href: docs(i) }],
        source: 'retrieval',
      };
    }
    // "Do we have…" and everything else with a strong match
    if (top.score >= 0.6) return recommend(db, top);
  }

  // Weak or no match
  if (matches.length) {
    return {
      text: `Nothing in ${SYSTEM.name} is an exact fit, but these are close:\n\n${matches.map((m) => `- **${m.item.name}** — ${m.item.description}`).join('\n')}\n\nIf none of them work, propose it — the request form will check the same things.`,
      items: matches.map((m) => m.item.slug),
      actions: [{ label: 'Propose something new', href: '/proposals/new' }],
      source: 'retrieval',
    };
  }
  return {
    text: `I couldn't find anything in ${SYSTEM.name} for that. Try describing what the UI needs to *do* (e.g. "let people pick a date range"), or propose it if it's a genuine gap.`,
    items: [],
    actions: [{ label: 'Propose something new', href: '/proposals/new' }],
    source: 'retrieval',
  };
}

export const SUGGESTED_QUESTIONS = [
  'Do we have a dropdown with search?',
  'Toast vs Alert — when do I use which?',
  'How do I implement Button in SwiftUI?',
  'Is Data Table accessible?',
  'Who owns Accordion?',
  'What shipped last sprint?',
  'Can I still use Ghost Button?',
  'How do I migrate to Text Field 4?',
  'I need a popup to confirm deleting a booking',
];
