import { SNAPSHOT_DATE } from './brand';
import { createSeed, CURRENT_SPRINT_ID, DEMO_USER_ID } from './seed';
import type { ChangeEntry, Database, Proposal, ProposalStatus, RoadmapItem, SystemItem, Token } from './types';

/*
 * The seam between UI and data. Every read and write in the tool goes
 * through this interface, and every method is async — so swapping the
 * local demo implementation for an HTTP one is a change to `createRepository`
 * and nothing else.
 */
export interface Repository {
  load(): Promise<Database>;
  updateItem(slug: string, patch: Partial<SystemItem>, summary: string): Promise<Database>;
  submitProposal(input: Omit<Proposal, 'id' | 'submittedAt' | 'submittedBy' | 'status'>): Promise<{ db: Database; proposal: Proposal }>;
  triageProposal(id: string, status: ProposalStatus, note: string): Promise<Database>;
  updateToken(name: string, value: Token['value']): Promise<Database>;
  updateRoadmapItem(id: string, patch: Partial<RoadmapItem>): Promise<Database>;
  reset(): Promise<Database>;
}

const STORAGE_KEY = 'keystone-demo:v1';

/**
 * Demo implementation: the seed in memory, persisted per-browser. Storage can
 * be unavailable (private mode, blocked site data), so every access is
 * guarded and the demo still works — it just won't remember edits.
 */
class LocalRepository implements Repository {
  private db: Database | null = null;

  private read(): Database {
    if (this.db) return this.db;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) this.db = JSON.parse(raw) as Database;
    } catch {
      /* fall through to seed */
    }
    this.db ??= createSeed();
    return this.db;
  }

  private commit(next: Database): Database {
    this.db = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* non-persistent session */
    }
    return next;
  }

  private logChange(db: Database, entry: Omit<ChangeEntry, 'id' | 'date' | 'sprintId' | 'authorId'>): ChangeEntry[] {
    const change: ChangeEntry = { id: `chg-local-${Date.now()}`, date: SNAPSHOT_DATE, sprintId: CURRENT_SPRINT_ID, authorId: DEMO_USER_ID, ...entry };
    return [change, ...db.changes];
  }

  async load() {
    return this.read();
  }

  async updateItem(slug: string, patch: Partial<SystemItem>, summary: string) {
    const db = this.read();
    const current = db.items.find((i) => i.slug === slug);
    if (!current) throw new Error(`No item ${slug}`);
    const updated = { ...current, ...patch, updatedAt: SNAPSHOT_DATE };
    return this.commit({
      ...db,
      items: db.items.map((i) => (i.slug === slug ? updated : i)),
      changes: this.logChange(db, { itemSlug: slug, type: patch.lifecycle === 'deprecated' ? 'deprecated' : 'changed', platforms: ['web', 'ios', 'android', 'figma'], breaking: false, summary }),
    });
  }

  async submitProposal(input: Omit<Proposal, 'id' | 'submittedAt' | 'submittedBy' | 'status'>) {
    const db = this.read();
    const next = Math.max(0, ...db.proposals.map((p) => Number(p.id.split('-')[1]))) + 1;
    const proposal: Proposal = { ...input, id: `PRP-${String(next).padStart(3, '0')}`, submittedAt: SNAPSHOT_DATE, submittedBy: DEMO_USER_ID, status: 'submitted' };
    return { db: this.commit({ ...db, proposals: [proposal, ...db.proposals] }), proposal };
  }

  async triageProposal(id: string, status: ProposalStatus, note: string) {
    const db = this.read();
    return this.commit({ ...db, proposals: db.proposals.map((p) => (p.id === id ? { ...p, status, triageNote: note } : p)) });
  }

  async updateToken(name: string, value: Token['value']) {
    const db = this.read();
    return this.commit({
      ...db,
      tokens: db.tokens.map((t) => (t.name === name ? { ...t, value } : t)),
      changes: this.logChange(db, { type: 'tokens', platforms: ['web', 'ios', 'android', 'figma'], breaking: false, summary: `Updated \`${name}\`.` }),
    });
  }

  async updateRoadmapItem(id: string, patch: Partial<RoadmapItem>) {
    const db = this.read();
    return this.commit({ ...db, roadmap: db.roadmap.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  }

  async reset() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    this.db = null;
    return this.commit(createSeed());
  }
}

let instance: Repository | null = null;

/** Swap point for a real backend: return an HttpRepository here instead. */
export function createRepository(): Repository {
  instance ??= new LocalRepository();
  return instance;
}
