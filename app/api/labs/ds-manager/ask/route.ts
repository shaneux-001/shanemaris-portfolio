import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { requireSession } from '@/lib/labs/recipeBox/requireSession';
import { askRateLimit } from '@/lib/labs/dsManager/server/rateLimit';
import { askClaude, type Turn } from '@/lib/labs/dsManager/server/ask';

/**
 * Live answers for the Daedalus assistant. Gated by the same signed Labs
 * session as The Recipe Box (real API cost), with a rate limit as backstop.
 * The free retrieval tier runs entirely in the browser and needs neither.
 */
export async function POST(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  const { success } = await askRateLimit().limit('ks_ask');
  if (!success) return NextResponse.json({ error: 'Rate limit reached — try again later.' }, { status: 429 });

  const body = await request.json().catch(() => ({}));
  const question = typeof body.question === 'string' ? body.question.trim().slice(0, 1000) : '';
  if (!question) return NextResponse.json({ error: 'Ask a question.' }, { status: 400 });

  // Short, sanitized history so follow-ups work without unbounded context.
  const history: Turn[] = Array.isArray(body.history)
    ? body.history
        .filter((t: unknown): t is Turn => !!t && typeof t === 'object' && ((t as Turn).role === 'user' || (t as Turn).role === 'assistant') && typeof (t as Turn).text === 'string')
        .slice(-6)
        .map((t: Turn) => ({ role: t.role, text: t.text.slice(0, 2000) }))
    : [];
  // The API requires the first message to be from the user.
  while (history.length && history[0].role !== 'user') history.shift();

  try {
    return NextResponse.json(await askClaude(question, history));
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return NextResponse.json({ error: 'The model is busy — try again in a minute.' }, { status: 429 });
    if (err instanceof Anthropic.APIError) {
      console.error('Daedalus ask: API error', err.status, err.message);
      return NextResponse.json({ error: 'The live assistant is unavailable right now.' }, { status: 502 });
    }
    console.error('Daedalus ask: failed', err);
    return NextResponse.json({ error: 'The live assistant is unavailable right now.' }, { status: 500 });
  }
}
