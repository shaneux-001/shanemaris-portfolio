import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/labs/recipeBox/session';

/**
 * UX-layer redirect only. The real auth check lives inside each API route
 * (requireSession) — this just keeps an unauthenticated visitor from ever
 * seeing the page, per Next's own guidance not to rely on proxy alone.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/labs/recipe-box/login') return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.redirect(new URL('/labs/recipe-box/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/labs/recipe-box/:path*'],
};
