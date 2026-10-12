import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

let limiter: Ratelimit | null = null;

/** Backstop for the live assistant tier: 20 model calls/hour across all sessions. */
export function askRateLimit(): Ratelimit {
  if (!limiter) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) throw new Error('UPSTASH_REDIS_REST_URL/TOKEN are not set');
    limiter = new Ratelimit({ redis: new Redis({ url, token }), limiter: Ratelimit.slidingWindow(20, '1 h'), prefix: 'ks_ask_ratelimit' });
  }
  return limiter;
}
