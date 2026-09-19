import { NextResponse } from 'next/server';
import { checkPassword, createSessionToken, SESSION_COOKIE } from '@/lib/labs/recipeBox/session';

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: '' }));

  if (typeof password !== 'string' || !checkPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: true,
    // 'strict' gets dropped across the redirect-through-vercel.com-and-back
    // chain Vercel's own SSO protection does on preview deployments — 'lax'
    // still blocks third-party sites from triggering state-changing requests
    // (the actual CSRF risk), it just also survives same-site redirect hops.
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return response;
}
