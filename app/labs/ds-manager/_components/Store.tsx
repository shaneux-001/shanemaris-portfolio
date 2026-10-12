'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createRepository, type Repository } from '@/lib/labs/dsManager/repository';
import { createSeed } from '@/lib/labs/dsManager/seed';
import type { Database, Person, SystemItem, Team } from '@/lib/labs/dsManager/types';

interface Store {
  db: Database;
  /** True once persisted edits (if any) have been loaded over the seed. */
  hydrated: boolean;
  item: (slug: string) => SystemItem | undefined;
  person: (id?: string) => Person | undefined;
  team: (id?: string) => Team | undefined;
  /** Runs a repository write and swaps in the database it returns. */
  run: <T>(fn: (repo: Repository) => Promise<T>, pick?: (result: T) => Database) => Promise<T>;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Render the seed on the server and first client paint (no hydration
  // mismatch), then swap in anything this browser has saved.
  const [db, setDb] = useState<Database>(createSeed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    createRepository()
      .load()
      .then((loaded) => {
        setDb(loaded);
        setHydrated(true);
      });
  }, []);

  const run = useCallback(async <T,>(fn: (repo: Repository) => Promise<T>, pick?: (result: T) => Database) => {
    const result = await fn(createRepository());
    setDb(pick ? pick(result) : (result as unknown as Database));
    return result;
  }, []);

  const value = useMemo<Store>(() => {
    const items = new Map(db.items.map((i) => [i.slug, i]));
    const people = new Map(db.people.map((p) => [p.id, p]));
    const teams = new Map(db.teams.map((t) => [t.id, t]));
    return {
      db,
      hydrated,
      item: (slug) => items.get(slug),
      person: (id) => (id ? people.get(id) : undefined),
      team: (id) => (id ? teams.get(id) : undefined),
      run,
    };
  }, [db, hydrated, run]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
