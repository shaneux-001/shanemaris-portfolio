import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";

export const metadata: Metadata = {
  title: "The Weekend and the Proof · Proof Before Progress",
  description: "A weekend-built AI prototype closed the case for a larger team, avoided a $150K vendor purchase, and proved the docsite argument with real NPS data.",
};

export default function Chapter4() {
  const workDir = path.join(process.cwd(), "public", "work", "proof-before-progress");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-4-hero.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main" style={{ paddingTop: 'clamp(36px, 5vw, 56px)' }}>
        <Link href="/work/proof-before-progress" className="pr-arrow-link pr-hoverable" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 12, letterSpacing: '0.06em', color: 'var(--pr-accent-text)', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}>
          <Ghost>← BACK TO OVERVIEW</Ghost>
        </Link>

        <span style={{ display: 'block', fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.06em', color: 'var(--pr-magenta)', marginBottom: 14 }}>
          CHAPTER 4 — AI PROTOTYPE
        </span>

        <h1 className="pr-page-title" style={{ margin: '0 0 28px', fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--pr-fg-strong)', maxWidth: '22ch' }}>
          The Weekend and the Proof
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
            <img src="/work/proof-before-progress/chapter-4-hero.jpg" alt="Chapter 4 hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-muted)' }}>chapter-4-hero.jpg</span>
          )}
        </div>

        <div style={{ maxWidth: '62ch', display: 'flex', flexDirection: 'column', gap: 22, fontSize: 15.5, lineHeight: 1.8, color: 'var(--pr-lede)' }}>
          <p style={{ margin: 0 }}>
            Then came what I&apos;d call my AI awakening. Southwest is conservative about AI tooling, but once internal Copilot access and Figma&apos;s AI features landed, I prototyped a component inventory tool in a single weekend.
          </p>
          <p style={{ margin: 0 }}>
            It included a dashboard for design system health metrics, an agent that could answer real-time questions about the system (freeing my one designer from fielding every question that came up in a project meeting), an intake process that forced actual thought into a component request instead of just lobbing a question at us, visibility into who owns which component, and a booking system to replace poorly-attended office hours.
          </p>
          <p style={{ margin: 0 }}>
            Most of that is still a vision. The prototype is genuinely paused, not actively being built out, because HDS itself isn&apos;t in a state to be easily made AI-readable yet. It&apos;s homegrown and inconsistent in ways that need to be resolved first. But it gave me a concrete case for a larger team, and a real plan for closing out v1 and addressing the gaps that show up when you scale something fast with minimal support.
          </p>
          <p style={{ margin: 0 }}>
            One outcome is already real. We never moved forward on an estimated $150K-a-year vendor purchase, an early figure from initial conversations, before procurement negotiations would have shaped a final number. We&apos;re planning to build our own tool instead.
          </p>
          <p style={{ margin: 0 }}>
            The first-ever HDS satisfaction survey, in 2025, returned an NPS of 21.43. The most recent survey, in June 2026, returned an NPS of 52 — a real, measured improvement, not a claimed one.
          </p>
          <p style={{ margin: 0 }}>
            The same surveys also confirmed things I&apos;d known since the system&apos;s early days but had only ever had as observation, not data: documentation gaps, and a governance bottleneck around needing to route requests through a single person. Leaders work off data, not feelings, so gathering this wasn&apos;t a surprise that had to be solved for. It was proof for an argument I&apos;d already been making.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--pr-rule)' }}>
          <PressCta href="/work/proof-before-progress/chapter-3" variant="secondary">← PREVIOUS</PressCta>
          <PressCta href="/work">BACK TO WORK</PressCta>
        </div>
      </div>
    </main>
  );
}
