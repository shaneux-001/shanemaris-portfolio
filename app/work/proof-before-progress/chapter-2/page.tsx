import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";

export const metadata: Metadata = {
  title: "The Reset · Proof Before Progress",
  description: "Southwest's first-ever RIF rearranged the org chart — and finally created room to fix HDS's documentation gap.",
};

export default function Chapter2() {
  const workDir = path.join(process.cwd(), "public", "work", "proof-before-progress");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-2-hero.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main" style={{ paddingTop: 'clamp(36px, 5vw, 56px)' }}>
        <Link href="/work/proof-before-progress" className="pr-arrow-link pr-hoverable" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 12, letterSpacing: '0.06em', color: 'var(--pr-accent-text)', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}>
          ← BACK TO OVERVIEW
        </Link>

        <span style={{ display: 'block', fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.06em', color: 'var(--pr-magenta)', marginBottom: 14 }}>
          CHAPTER 2 — RIF
        </span>

        <h1 className="pr-page-title" style={{ margin: '0 0 28px', fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--pr-fg-strong)', maxWidth: '22ch' }}>
          The Reset
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
            <img src="/work/proof-before-progress/chapter-2-hero.jpg" alt="Chapter 2 hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-muted)' }}>chapter-2-hero.jpg</span>
          )}
        </div>

        <div style={{ maxWidth: '62ch', display: 'flex', flexDirection: 'column', gap: 22, fontSize: 15.5, lineHeight: 1.8, color: 'var(--pr-lede)' }}>
          <p style={{ margin: 0 }}>
            Southwest&apos;s first-ever RIF, in February 2025, rearranged the org chart under me. It turned out to be the best thing that could have happened.
          </p>
          <p style={{ margin: 0 }}>
            I landed on a new team, Digital Design and Research, under a director focused specifically on design. I made the case plainly: our process had become slow and entirely manual, and we&apos;d been forced to scale the system without any real support to document or onboard people efficiently. She listened.
          </p>
          <p style={{ margin: 0 }}>
            That&apos;s what finally got me room to evaluate real tools instead of patching around the gap.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--pr-rule)' }}>
          <PressCta href="/work/proof-before-progress/chapter-1" variant="secondary">← PREVIOUS</PressCta>
          <PressCta href="/work/proof-before-progress/chapter-3">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
