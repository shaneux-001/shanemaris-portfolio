/**
 * Every user-facing name for this prototype lives here, so a rename is a
 * one-file change. Both are fictional placeholders — TOOL is the management
 * tool itself, SYSTEM is the made-up design system it manages.
 */
export const TOOL = {
  name: 'Keystone',
  tagline: 'The source of truth for your design system',
};

export const SYSTEM = {
  name: 'Daedalus',
  org: 'Skyforge',
  idPrefix: 'DAE',
};

/**
 * The demo is a frozen snapshot, not a live feed — every "days since",
 * "stale docs" and "last sprint" calculation is measured from this date
 * instead of Date.now(), so the dashboard reads the same in a year as it
 * does today.
 */
export const SNAPSHOT_DATE = '2026-10-11';
