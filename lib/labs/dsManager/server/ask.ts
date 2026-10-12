import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM } from '../brand';
import { toAgentSpec } from '../exporters';
import { createSeed } from '../seed';
import type { Answer } from '../assistant';

/*
 * The live tier of "Ask the system". Grounded in the same agent spec the
 * Tokens → Export view generates, so the model only knows what the system
 * actually contains. Server-only: the API key never reaches the client.
 */

const db = createSeed();
const SPEC = toAgentSpec(db);

const INSTRUCTIONS = `You are the ${SYSTEM.name} design system assistant inside Keystone, the team's design system management tool. Designers and engineers ask you whether something exists, which component to use, and how to use or implement it.

Answer in plain language, like a helpful senior on the design systems team:
- Recommend only components and patterns listed in the guide below, by their exact names. Never invent components, props or tokens.
- If nothing fits, say so plainly and suggest proposing it through Keystone's request form.
- Mention lifecycle caveats (beta, experimental, deprecated → replacement) and platform gaps when they matter to the question.
- Keep answers under about 180 words unless the person asks for code. Code should use the platform packages named in the guide.
- Formatting: short paragraphs, "- " bullets, **bold** for component names, \`code\` for props and tokens. No headings, no tables.

The guide:

${SPEC}`;

export interface Turn {
  role: 'user' | 'assistant';
  text: string;
}

export async function askClaude(question: string, history: Turn[]): Promise<Answer> {
  const client = new Anthropic();
  const messages: Anthropic.Beta.BetaMessageParam[] = [...history.map((t) => ({ role: t.role, content: t.text })), { role: 'user', content: question }];

  const response = await client.beta.messages.create({
    model: 'claude-opus-5-5',
    max_tokens: 16000,
    // Conversational Q&A over a fixed guide — low effort is the right trade here.
    output_config: { effort: 'low' },
    // Route around a refusal instead of failing the turn.
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    // The guide is identical on every request, so cache it.
    system: [{ type: 'text', text: INSTRUCTIONS, cache_control: { type: 'ephemeral' } }],
    messages,
  });

  if (response.stop_reason === 'refusal') {
    return { text: "I can't help with that one. Try asking about a component, pattern or token in the system.", items: [], actions: [], source: 'claude' };
  }

  const text = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();

  // Surface cards for every system item the answer names.
  const items = db.items.filter((i) => new RegExp(`\\b${i.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text)).map((i) => i.slug);
  return { text, items: items.slice(0, 4), actions: items[0] ? [{ label: 'Open docs', href: `/components/${items[0]}` }] : [], source: 'claude' };
}
