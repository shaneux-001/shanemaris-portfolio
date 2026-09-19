import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from './session';

/**
 * The real security boundary — checked inside every gated route handler,
 * not just relied on via proxy.ts. Proxy matchers get refactored; this doesn't.
 */
export function requireSession(request: NextRequest): NextResponse | null {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
