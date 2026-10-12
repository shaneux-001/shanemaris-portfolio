import type { Database } from '../types';
import { items } from './items';
import { people, teams, sprints } from './people';
import { changes, roadmap, proposals } from './activity';
import { tokens } from './tokens';

/** A fresh copy every call — the repository mutates its own copy, never the seed modules. */
export function createSeed(): Database {
  return structuredClone({ items, people, teams, sprints, changes, roadmap, proposals, tokens });
}

export { CURRENT_SPRINT_ID, LAST_SPRINT_ID, DEMO_USER_ID } from './people';
