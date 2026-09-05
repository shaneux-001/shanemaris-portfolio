import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";

export const metadata: Metadata = {
  title: "The Vendor Path Not Taken · Proof Before Progress",
  description: "Nine months building the case for Knapsack, and the internal resistance that ended the relationship before it shipped.",
};

export default function Chapter3() {
  const workDir = path.join(process.cwd(), "public", "work", "proof-before-progress");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-3-hero.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main" style={{ paddingTop: 'clamp(36px, 5vw, 56px)' }}>
        <Link href="/work/proof-before-progress" className="pr-arrow-link pr-hoverable" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 12, letterSpacing: '0.06em', color: 'var(--pr-accent-text)', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}>
          <Ghost>← BACK TO OVERVIEW</Ghost>
        </Link>

        <span style={{ display: 'block', fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.06em', color: 'var(--pr-magenta)', marginBottom: 14 }}>
          CHAPTER 3 — KNAPSACK
        </span>

        <h1 className="pr-page-title" style={{ margin: '0 0 28px', fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--pr-fg-strong)', maxWidth: '24ch' }}>
          The Vendor Path Not Taken
        </h1>

        <div
          style={{
            position: 'relative',
            aspectRatio: '1.6 / 1',
            marginBottom: 40,
            overflow: 'hidden',
            background: 'repeating-linear-gradient(45deg, var(--pr-surface) 0 8px, var(--pr-surface-2) 8px 16px)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 14,
          }}
        >
          {hasHero ? (
            <img src="/work/proof-before-progress/chapter-3-hero.jpg" alt="Chapter 3 hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-muted)' }}>chapter-3-hero.jpg</span>
          )}
        </div>

        <div style={{ maxWidth: '62ch', display: 'flex', flexDirection: 'column', gap: 22, fontSize: 15.5, lineHeight: 1.8, color: 'var(--pr-lede)' }}>
          <p style={{ margin: 0 }}>
            I evaluated Zeroheight and Knapsack. InVision was already winding down, so it came down to those two. We chose Knapsack and spent about nine months building the internal case with our tech partners.
          </p>
          <p style={{ margin: 0 }}>
            Then we hit real resistance. Engineering had reservations I never fully understood, whether about codebase access or something else entirely. I eventually cut the relationship rather than string Knapsack along while the internal politics played out. That wasn&apos;t an easy call. They&apos;d been a genuinely good partner through the whole process.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--pr-rule)' }}>
          <PressCta href="/work/proof-before-progress/chapter-2" variant="secondary">← PREVIOUS</PressCta>
          <PressCta href="/work/proof-before-progress/chapter-4">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
