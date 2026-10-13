import type { Person, Sprint, Team } from '../types';

export const teams: Team[] = [
  { id: 'core', name: 'Core Systems', type: 'system', description: 'Owns the system: foundations, tokens, governance and the component roadmap.' },
  { id: 'web-platform', name: 'Web Platform', type: 'system', description: 'Builds and maintains the React component library.' },
  { id: 'mobile-platform', name: 'Mobile Platform', type: 'system', description: 'Builds and maintains the SwiftUI and Compose libraries.' },
  { id: 'bookings', name: 'Bookings', type: 'product', description: 'Scheduling and appointment flows.' },
  { id: 'billing', name: 'Billing', type: 'product', description: 'Plans, payments and invoices.' },
  { id: 'marketplace', name: 'Marketplace', type: 'product', description: 'Provider discovery, profiles and reviews.' },
  { id: 'growth', name: 'Growth', type: 'product', description: 'Onboarding, promotions and lifecycle messaging.' },
];

export const people: Person[] = [
  { id: 'p-maya', name: 'Maya Okafor', title: 'Design Systems Lead', teamId: 'core', role: 'designops', platforms: ['web', 'ios', 'android', 'figma'], hue: 262 },
  { id: 'p-dev', name: 'Devin Hale', title: 'Senior Product Designer, Systems', teamId: 'core', role: 'design', platforms: ['web', 'figma'], hue: 200 },
  { id: 'p-ines', name: 'Inés Varela', title: 'Product Designer, Systems', teamId: 'core', role: 'design', platforms: ['ios', 'android', 'figma'], hue: 330 },
  { id: 'p-theo', name: 'Theo Lindqvist', title: 'DesignOps Program Manager', teamId: 'core', role: 'designops', platforms: ['web', 'ios', 'android'], hue: 30 },
  { id: 'p-amir', name: 'Amir Rahimi', title: 'Staff Engineer, Web', teamId: 'web-platform', role: 'engineering', platforms: ['web'], hue: 160 },
  { id: 'p-june', name: 'June Park', title: 'Senior Engineer, Web', teamId: 'web-platform', role: 'engineering', platforms: ['web'], hue: 95 },
  { id: 'p-sol', name: 'Sol Achebe', title: 'Senior Engineer, iOS', teamId: 'mobile-platform', role: 'engineering', platforms: ['ios'], hue: 12 },
  { id: 'p-rae', name: 'Rae Moreno', title: 'Engineer, Android', teamId: 'mobile-platform', role: 'engineering', platforms: ['android'], hue: 140 },
  { id: 'p-kit', name: 'Kit Brennan', title: 'Product Designer', teamId: 'bookings', role: 'design', platforms: ['web', 'ios'], hue: 220 },
  { id: 'p-lena', name: 'Lena Fisher', title: 'Senior Product Designer', teamId: 'billing', role: 'design', platforms: ['web'], hue: 300 },
  { id: 'p-omar', name: 'Omar Said', title: 'Engineer', teamId: 'marketplace', role: 'engineering', platforms: ['web', 'android'], hue: 50 },
  /** The person viewing the demo. Attributed on anything they submit or edit; hidden from the Owners directory. */
  { id: 'p-you', name: 'You', title: 'Demo visitor', teamId: 'core', role: 'design', platforms: [], hue: 210 },
  { id: 'p-priya', name: 'Priya Natarajan', title: 'Product Manager', teamId: 'growth', role: 'product', platforms: ['web', 'ios', 'android'], hue: 280 },
];

/** Two-week sprints rolling up into quarterly PIs. The snapshot date sits on the boundary of 26.20 → 26.21. */
export const sprints: Sprint[] = [
  { id: '26.03', name: 'Sprint 26.03', pi: 'PI 26.1', start: '2026-01-26', end: '2026-02-06' },
  { id: '26.15', name: 'Sprint 26.15', pi: 'PI 26.3', start: '2026-07-20', end: '2026-07-31' },
  { id: '26.16', name: 'Sprint 26.16', pi: 'PI 26.3', start: '2026-08-03', end: '2026-08-14' },
  { id: '26.17', name: 'Sprint 26.17', pi: 'PI 26.3', start: '2026-08-17', end: '2026-08-28' },
  { id: '26.18', name: 'Sprint 26.18', pi: 'PI 26.3', start: '2026-08-31', end: '2026-09-11' },
  { id: '26.19', name: 'Sprint 26.19', pi: 'PI 26.3', start: '2026-09-14', end: '2026-09-25' },
  { id: '26.20', name: 'Sprint 26.20', pi: 'PI 26.4', start: '2026-09-28', end: '2026-10-09' },
  { id: '26.21', name: 'Sprint 26.21', pi: 'PI 26.4', start: '2026-10-12', end: '2026-10-23' },
  { id: '26.22', name: 'Sprint 26.22', pi: 'PI 26.4', start: '2026-10-26', end: '2026-11-06' },
  { id: '26.23', name: 'Sprint 26.23', pi: 'PI 26.4', start: '2026-11-09', end: '2026-11-20' },
  { id: '26.24', name: 'Sprint 26.24', pi: 'PI 26.4', start: '2026-11-30', end: '2026-12-11' },
];

export const DEMO_USER_ID = 'p-you';
export const CURRENT_SPRINT_ID = '26.21';
export const LAST_SPRINT_ID = '26.20';
