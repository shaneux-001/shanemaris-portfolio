import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proof Before Progress",
  description: "Why HDS needed a real docsite, how a company-wide reorg finally created room to fix it, and how a single prototyped weekend built the case that closed out a $150K vendor decision.",
  openGraph: {
    title: "Proof Before Progress · Shane Maris",
    description: "Why HDS needed a real docsite, how a company-wide reorg finally created room to fix it, and how a single prototyped weekend built the case that closed out a $150K vendor decision.",
    url: "https://shanemaris.com/work/proof-before-progress",
  },
  twitter: {
    title: "Proof Before Progress · Shane Maris",
    description: "How a reorg, a vendor evaluation, and a weekend prototype closed the case for fixing HDS documentation.",
  },
};

const CHAPTERS = [
  { number: 1, title: "The Belief", subtitle: "Documentation", preview: "I've believed a real docsite was foundational to a design system since the beginning." },
  { number: 2, title: "The Reset", subtitle: "RIF", preview: "Southwest's first-ever RIF rearranged the org chart under me. It turned out to be the best thing that could have happened." },
  { number: 3, title: "The Vendor Path Not Taken", subtitle: "Knapsack", preview: "We chose Knapsack and spent nine months building the case. Then we hit resistance I never fully understood." },
  { number: 4, title: "The Weekend and the Proof", subtitle: "AI Prototype", preview: "A single prototyped weekend gave me a concrete case for a larger team — and closed out a $150K vendor decision." },
];

export default function ProofBeforeProgressLanding() {
  const workDir = path.join(process.cwd(), "public", "work", "proof-before-progress");

  return (
    <main className="pr-page">
      <div className="pr-main" style={{ paddingTop: 'clamp(36px, 5vw, 56px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.1em', color: 'var(--pr-magenta)', marginBottom: 18 }}>
          <span style={{ width: 14, height: 1, background: 'var(--pr-magenta)' }} />
          <span>CASE STUDY</span>
        </div>

        <h1 className="pr-page-title" style={{ margin: '0 0 18px', fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--pr-fg-strong)', maxWidth: '26ch' }}>
          Proof Before Progress
        </h1>

        <p className="pr-page-lede" style={{ margin: '0 0 12px', lineHeight: 1.7, color: 'var(--pr-lede)', maxWidth: '58ch' }}>
          Why HDS needed a real docsite, how a company-wide reorg finally created room to fix it, and how a single prototyped weekend built the case that closed out a $150K vendor decision.
        </p>

        <p style={{ margin: '0 0 40px', fontFamily: 'var(--font-plex-mono), monospace', fontSize: 12, color: 'var(--pr-muted)' }}>
          Read time: ~9 minutes
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {CHAPTERS.map((chapter) => {
            const thumbPath = path.join(workDir, `chapter-${chapter.number}-thumb.jpg`);
            const hasThumb = fs.existsSync(thumbPath);
            return (
              <Link key={chapter.number} href={`/work/proof-before-progress/chapter-${chapter.number}`} className="pr-card">
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4 / 3',
                    marginBottom: 16,
                    overflow: 'hidden',
                    background: 'repeating-linear-gradient(45deg, var(--pr-surface) 0 8px, var(--pr-surface-2) 8px 16px)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 12,
                  }}
                >
                  {hasThumb ? (
                    <img
                      src={`/work/proof-before-progress/chapter-${chapter.number}-thumb.jpg`}
                      alt={`Chapter ${chapter.number} — ${chapter.title}`}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-muted)', position: 'relative' }}>
                      chapter-{chapter.number}-thumb.jpg
                    </span>
                  )}
                </div>
                <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.06em', color: 'var(--pr-magenta)', marginBottom: 8 }}>
                  CHAPTER {chapter.number} — {chapter.subtitle.toUpperCase()}
                </span>
                <h3 style={{ fontFamily: 'var(--font-archivo)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--pr-fg-strong)', margin: '0 0 8px' }}>
                  {chapter.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--pr-lede)', lineHeight: 1.6, margin: 0 }}>
                  {chapter.preview}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
