import { createHmac, timingSafeEqual } from 'crypto';

export const SESSION_COOKIE = 'rb_session';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function secret(): string {
  const s = process.env.RECIPE_BOX_SESSION_SECRET;
  if (!s) throw new Error('RECIPE_BOX_SESSION_SECRET is not set');
  return s;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

/** Builds a signed "<expiresAt>.<signature>" token. Carries no identity — this is a single-password gate. */
export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  return true;
}

/** Constant-time password check — avoids leaking length/timing info via early-exit comparison. */
export function checkPassword(input: string): boolean {
  const expected = process.env.RECIPE_BOX_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Still run a comparison so the branch takes comparable time either way.
    timingSafeEqual(Buffer.from(expected), Buffer.from(expected));
    return false;
  }
  return timingSafeEqual(a, b);
}
