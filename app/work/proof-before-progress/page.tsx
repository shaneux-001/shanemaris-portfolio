import type { Metadata } from "next";
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
          Read time: ~7 minutes
        </p>

        <div className="flex flex-col">
          {CHAPTERS.map((chapter) => {
            const meta = `CHAPTER ${chapter.number} · ${chapter.subtitle.toUpperCase()}`;
            return (
              <Link key={chapter.number} href={`/work/proof-before-progress/chapter-${chapter.number}`} className="pr-arrow-link pr-hoverable">
                {/* Wide row */}
                <span className="pr-row-link pr-row-wide items-start grid-cols-[minmax(0,1fr)_260px_24px]">
                  <span className="flex flex-col gap-1.5 min-w-0">
                    <span className="text-2xl font-semibold tracking-[-0.02em] text-pr-fg-strong">{chapter.title}</span>
                    <span className="text-sm leading-[1.6] text-pr-lede max-w-[62ch]">{chapter.preview}</span>
                  </span>
                  <span className="font-plex-mono text-[11px] text-pr-muted tracking-[0.04em] text-right whitespace-nowrap">{meta}</span>
                  <span className="pr-row-arrow font-plex-mono text-[13px] text-pr-accent-text text-right" aria-hidden="true">→</span>
                </span>
                {/* Narrow row */}
                <span className="pr-row-link pr-row-narrow flex-col gap-1.5 py-4 pr-2.5">
                  <span className="flex items-baseline justify-between gap-3.5">
                    <span className="text-xl font-semibold tracking-[-0.02em] text-pr-fg-strong min-w-0">{chapter.title}</span>
                    <span className="pr-row-arrow font-plex-mono text-[13px] text-pr-accent-text" aria-hidden="true">→</span>
                  </span>
                  <span className="text-sm leading-[1.55] text-pr-lede">{chapter.preview}</span>
                  <span className="font-plex-mono text-[10.5px] text-pr-muted tracking-[0.04em] min-w-0 whitespace-nowrap overflow-x-auto">{meta}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
