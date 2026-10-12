'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createRepository, type Repository } from '@/lib/labs/dsManager/repository';
import { createSeed } from '@/lib/labs/dsManager/seed';
import { can as canDo, lockedReason, PermissionError, type Action, type AppRole } from '@/lib/labs/dsManager/permissions';
import type { Database, Person, SystemItem, Team } from '@/lib/labs/dsManager/types';

const ROLE_KEY = 'keystone-role';

interface Store {
  db: Database;
  /** True once persisted edits (if any) have been loaded over the seed. */
  hydrated: boolean;
  item: (slug: string) => SystemItem | undefined;
  person: (id?: string) => Person | undefined;
  team: (id?: string) => Team | undefined;
  role: AppRole;
  setRole: (role: AppRole) => void;
  can: (action: Action) => boolean;
  /** A short message to surface (e.g. a write the data layer refused). */
  notice: string | null;
  dismissNotice: () => void;
  /**
   * Runs a repository write and swaps in the database it returns. Resolves
   * undefined if the repository refused it (the UI should have prevented
   * that, but the data layer is the real gate).
   */
  run: <T>(fn: (repo: Repository) => Promise<T>, pick?: (result: T) => Database) => Promise<T | undefined>;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Render the seed on the server and first client paint (no hydration
  // mismatch), then swap in anything this browser has saved.
  const [db, setDb] = useState<Database>(createSeed);
  const [hydrated, setHydrated] = useState(false);
  const [role, setRoleState] = useState<AppRole>('ds-team');
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const repo = createRepository();
    repo.load().then((loaded) => {
      let saved: AppRole | null = null;
      try {
        saved = localStorage.getItem(ROLE_KEY) as AppRole | null;
      } catch {
        /* default role */
      }
      if (saved === 'viewer' || saved === 'contributor' || saved === 'ds-team') {
        repo.setRole(saved);
        setRoleState(saved);
      }
      setDb(loaded);
      setHydrated(true);
    });
  }, []);

  const setRole = useCallback((r: AppRole) => {
    createRepository().setRole(r);
    setRoleState(r);
    try {
      localStorage.setItem(ROLE_KEY, r);
    } catch {
      /* not persisted */
    }
  }, []);

  const run = useCallback(async <T,>(fn: (repo: Repository) => Promise<T>, pick?: (result: T) => Database) => {
    try {
      const result = await fn(createRepository());
      setDb(pick ? pick(result) : (result as unknown as Database));
      return result;
    } catch (err) {
      if (err instanceof PermissionError) {
        setNotice(lockedReason(err.action));
        return undefined;
      }
      throw err;
    }
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
      role,
      setRole,
      can: (action) => canDo(role, action),
      notice,
      dismissNotice: () => setNotice(null),
      run,
    };
  }, [db, hydrated, role, setRole, notice, run]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
