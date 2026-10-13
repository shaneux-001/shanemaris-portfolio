import type { AdoptionHistory, HealthHistory, Product, SystemItem } from '../types';

/** The 14 products that consume Daedalus (items' `adoption.products` counts are out of these). */
export const products: Product[] = [
  { id: 'booking-web', name: 'Booking (web)', teamId: 'bookings', platforms: ['web'] },
  { id: 'booking-ios', name: 'Booking (iOS)', teamId: 'bookings', platforms: ['ios'] },
  { id: 'booking-android', name: 'Booking (Android)', teamId: 'bookings', platforms: ['android'] },
  { id: 'provider-search', name: 'Provider Search', teamId: 'marketplace', platforms: ['web', 'ios', 'android'] },
  { id: 'provider-profiles', name: 'Provider Profiles', teamId: 'marketplace', platforms: ['web', 'ios', 'android'] },
  { id: 'provider-dashboard', name: 'Provider Dashboard', teamId: 'marketplace', platforms: ['web'] },
  { id: 'checkout', name: 'Checkout', teamId: 'billing', platforms: ['web', 'ios', 'android'] },
  { id: 'invoices', name: 'Invoices & Plans', teamId: 'billing', platforms: ['web'] },
  { id: 'home', name: 'Home & Promotions', teamId: 'growth', platforms: ['web', 'ios', 'android'] },
  { id: 'onboarding', name: 'Onboarding', teamId: 'growth', platforms: ['web', 'ios'] },
  { id: 'account', name: 'Account Settings', teamId: 'core', platforms: ['web', 'ios', 'android'] },
  { id: 'help', name: 'Help Center', teamId: 'core', platforms: ['web'] },
  { id: 'admin', name: 'Admin Console', teamId: 'core', platforms: ['web'] },
  { id: 'messages', name: 'Messages', teamId: 'marketplace', platforms: ['web', 'ios', 'android'] },
];

/** Six sprints of history, oldest first. The last one is the snapshot sprint. */
export const historySprints = ['26.15', '26.16', '26.17', '26.18', '26.19', '26.20'];
const SPRINT_STARTS = ['2026-07-20', '2026-08-03', '2026-08-17', '2026-08-31', '2026-09-14', '2026-09-28'];

/** Deterministic 0–1 from a string, so the seed is identical on every load. */
function rand(seed: string): number {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}

/** Hand-authored where the story matters: deprecations burning down. */
const AUTHORED: Record<string, number[]> = {
  'ghost-button': [310, 268, 231, 196, 162, 140],
  'legacy-loader': [21, 18, 15, 13, 11, 9],
  'rating-stars': [18, 22, 31, 40, 52, 64],
  'promo-banner': [0, 0, 2, 4, 6, 7],
};

/**
 * Plausible instance counts per sprint, back-computed from today's count:
 * stable items grow slowly, beta items quickly, experimental ones from zero.
 */
export function buildAdoptionHistory(items: SystemItem[]): AdoptionHistory {
  const out: AdoptionHistory = {};
  for (const i of items) {
    if (AUTHORED[i.slug]) {
      out[i.slug] = AUTHORED[i.slug];
      continue;
    }
    const n = i.adoption.instances;
    const r = rand(i.slug);
    const rate = i.lifecycle === 'stable' ? 0.01 + 0.03 * r : i.lifecycle === 'beta' ? 0.06 + 0.1 * r : i.lifecycle === 'experimental' ? 0.2 + 0.3 * r : i.lifecycle === 'deprecated' ? -(0.12 + 0.06 * r) : 0.02;
    out[i.slug] = historySprints.map((_, idx) => (SPRINT_STARTS[idx] < i.createdAt ? 0 : Math.round(n / (1 + rate) ** (historySprints.length - 1 - idx))));
  }
  return out;
}

/** Past values for 26.15–26.19; the live value for 26.20 is computed from the inventory. */
export const healthHistory: HealthHistory = {
  avgCompleteness: [80, 82, 83, 85, 86],
  parity: [46, 48, 50, 51, 53],
  stableRatio: [65, 66, 68, 69, 70],
  driftCount: [17, 16, 15, 15, 14],
  unowned: [7, 6, 6, 5, 5],
};
