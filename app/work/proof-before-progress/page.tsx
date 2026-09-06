import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Ghost from "@/components/press/Ghost";

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
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO WORK</Ghost>
        </Link>

        <div className="flex items-center gap-[10px] font-plex-mono text-[11px] tracking-[0.1em] text-pr-magenta mb-[18px]">
          <span className="w-3.5 h-px bg-pr-magenta" />
          <span>CASE STUDY</span>
        </div>

        <h1 className="pr-page-title m-0 mb-[18px] font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong max-w-[26ch]">
          <Ghost trigger="load">Proof Before Progress</Ghost>
        </h1>

        <p className="pr-page-lede m-0 mb-3 leading-[1.7] text-pr-lede max-w-[58ch]">
          Why HDS needed a real docsite, how a company-wide reorg finally created room to fix it, and how a single prototyped weekend built the case that closed out a $150K vendor decision.
        </p>

        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">
          Read time: ~9 minutes
        </p>

        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
          {CHAPTERS.map((chapter) => {
            const thumbPath = path.join(workDir, `chapter-${chapter.number}-thumb.jpg`);
            const hasThumb = fs.existsSync(thumbPath);
            return (
              <Link key={chapter.number} href={`/work/proof-before-progress/chapter-${chapter.number}`} className="pr-card">
                <div className="relative aspect-video mb-4 overflow-hidden flex items-end p-3 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
                  {hasThumb ? (
                    <img
                      src={`/work/proof-before-progress/chapter-${chapter.number}-thumb.jpg`}
                      alt={`Chapter ${chapter.number} — ${chapter.title}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-plex-mono text-[11px] text-pr-muted relative">
                      chapter-{chapter.number}-thumb.jpg
                    </span>
                  )}
                </div>
                <span className="font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-2 block">
                  CHAPTER {chapter.number} — {chapter.subtitle.toUpperCase()}
                </span>
                <h3 className="font-archivo text-xl font-bold tracking-[-0.02em] text-pr-fg-strong m-0 mb-2">
                  <Ghost trigger="load">{chapter.title}</Ghost>
                </h3>
                <p className="text-sm text-pr-lede leading-[1.6] m-0">
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
