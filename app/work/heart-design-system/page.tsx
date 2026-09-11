import type { Metadata } from "next";
import Link from "next/link";
import Ghost from "@/components/press/Ghost";

export const metadata: Metadata = {
  title: "Heart Design System",
  description: "From grassroots effort to enterprise-scale design infrastructure. The story of how I built and scaled Heart across web, iOS, and Android platforms at Southwest Airlines.",
  openGraph: {
    title: "Heart Design System · Shane Maris",
    description: "From grassroots effort to enterprise-scale design infrastructure. The story of how I built and scaled Heart across web, iOS, and Android platforms at Southwest Airlines.",
    url: "https://shanemaris.com/work/heart-design-system",
  },
  twitter: {
    title: "Heart Design System · Shane Maris",
    description: "From grassroots effort to enterprise-scale design infrastructure at Southwest Airlines.",
  },
};

const CHAPTERS = [
  { number: 1, title: "The Long Game", subtitle: "Origin Story", preview: "I've known design systems were the answer since before most people were calling them that." },
  { number: 2, title: "Staying Alive", subtitle: "Pandemic", preview: "When the brand director signed off, things started moving. Then the pandemic hit." },
  { number: 3, title: "The Moment It Clicked", subtitle: "Gift Card POC", preview: "Southwest's gift card experience worked. But underneath, it was still wearing Leapfrog." },
  { number: 4, title: "No Straight Lines", subtitle: "Scaling", preview: "Scaling a design system is hard. Scaling one without a dedicated team is a different kind of hard." },
];

export default function HeartDSLanding() {
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

        <h1 className="pr-page-title m-0 mb-[18px] font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
          <Ghost trigger="load">Heart Design System</Ghost>
        </h1>

        <p className="pr-page-lede m-0 mb-3 leading-[1.7] text-pr-lede max-w-[58ch]">
          From grassroots effort to enterprise-scale design infrastructure. The story of how I built and scaled Heart across web, iOS, and Android platforms at Southwest Airlines — and what I learned along the way.
        </p>

        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">
          Read time: ~14 minutes
        </p>

        <h2 className="font-archivo text-xl font-bold text-pr-fg-strong mb-6 mt-0">
          Four chapters tell the story
        </h2>

        <div className="flex flex-col">
          {CHAPTERS.map((chapter) => {
            const meta = `CHAPTER ${chapter.number} · ${chapter.subtitle.toUpperCase()}`;
            return (
              <Link key={chapter.number} href={`/work/heart-design-system/chapter-${chapter.number}`} className="pr-arrow-link pr-hoverable">
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
