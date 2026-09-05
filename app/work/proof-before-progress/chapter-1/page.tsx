import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";

export const metadata: Metadata = {
  title: "The Belief · Proof Before Progress",
  description: "Why HDS needed a real docsite from the beginning, and why embedding guidance in UI kits was never going to scale.",
};

export default function Chapter1() {
  const workDir = path.join(process.cwd(), "public", "work", "proof-before-progress");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-1-hero.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main" style={{ paddingTop: 'clamp(36px, 5vw, 56px)' }}>
        <Link href="/work/proof-before-progress" className="pr-arrow-link pr-hoverable" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 12, letterSpacing: '0.06em', color: 'var(--pr-accent-text)', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}>
          <Ghost>← BACK TO OVERVIEW</Ghost>
        </Link>

        <span style={{ display: 'block', fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.06em', color: 'var(--pr-magenta)', marginBottom: 14 }}>
          CHAPTER 1 — DOCUMENTATION
        </span>

        <h1 className="pr-page-title" style={{ margin: '0 0 28px', fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--pr-fg-strong)', maxWidth: '22ch' }}>
          The Belief
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
            <img src="/work/proof-before-progress/chapter-1-hero.jpg" alt="Chapter 1 hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-muted)' }}>chapter-1-hero.jpg</span>
          )}
        </div>

        <div style={{ maxWidth: '62ch', display: 'flex', flexDirection: 'column', gap: 22, fontSize: 15.5, lineHeight: 1.8, color: 'var(--pr-lede)' }}>
          <p style={{ margin: 0 }}>
            I&apos;ve believed a real docsite was foundational to a design system since the beginning. For a long time, I wouldn&apos;t call what we had a &quot;real&quot; design system without one.
          </p>
          <p style={{ margin: 0 }}>
            HDS never had one. It grew out of 10% of my time, then 50%, then a rotating cast of engineers trying to operationalize a concept I&apos;d sold before there was any real infrastructure behind it. Engineers defaulted to Storybook and Confluence, tools they already knew. Designers worked straight out of the Figma UI kits. I never trusted Confluence or SharePoint for this kind of thing. In my experience, that&apos;s where documentation goes to die, written once and never read again.
          </p>
          <p style={{ margin: 0 }}>
            I wanted something closer to Carbon&apos;s docsite. It wasn&apos;t in the budget. Southwest was navigating activist investor pressure at the time, and design wasn&apos;t high on my boss&apos;s list. So the workaround was keeping guidance embedded directly in the UI kits, next to the components themselves. That held for a while. But it doesn&apos;t scale, it bloats the system it&apos;s supposed to support, and it goes stale the moment anything changes. There was zero automation behind any of it.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--pr-rule)' }}>
          <PressCta href="/work/proof-before-progress/chapter-2">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
