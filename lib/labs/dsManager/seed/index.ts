import type { Database } from '../types';
import { items } from './items';
import { people, teams, sprints } from './people';
import { changes, roadmap, proposals } from './activity';
import { tokens } from './tokens';
import { products, historySprints, buildAdoptionHistory, healthHistory } from './adoption';
import { releases, migrations } from './releases';

/** A fresh copy every call — the repository mutates its own copy, never the seed modules. */
export function createSeed(): Database {
  return structuredClone({
    items,
    people,
    teams,
    sprints,
    changes,
    roadmap,
    proposals,
    tokens,
    products,
    historySprints,
    adoptionHistory: buildAdoptionHistory(items),
    healthHistory,
    releases,
    migrations,
  });
}

export { CURRENT_SPRINT_ID, LAST_SPRINT_ID, DEMO_USER_ID } from './people';
