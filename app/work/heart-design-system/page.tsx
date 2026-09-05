import type { Metadata } from "next";
import fs from "fs";
import path from "path";
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
  const workDir = path.join(process.cwd(), "public", "work", "heart-design-system");

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
          Heart Design System
        </h1>

        <p className="pr-page-lede m-0 mb-3 leading-[1.7] text-pr-lede max-w-[58ch]">
          From grassroots effort to enterprise-scale design infrastructure. The story of how I built and scaled Heart across web, iOS, and Android platforms at Southwest Airlines — and what I learned along the way.
        </p>

        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">
          Read time: ~12 minutes
        </p>

        <h2 className="font-archivo text-xl font-bold text-pr-fg-strong mb-6 mt-0">
          Four chapters tell the story
        </h2>

        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {CHAPTERS.map((chapter) => {
            const thumbPath = path.join(workDir, `chapter-${chapter.number}-thumb.jpg`);
            const hasThumb = fs.existsSync(thumbPath);
            return (
              <Link key={chapter.number} href={`/work/heart-design-system/chapter-${chapter.number}`} className="pr-card">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden flex items-end p-3 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
                  {hasThumb ? (
                    <img
                      src={`/work/heart-design-system/chapter-${chapter.number}-thumb.jpg`}
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
                  {chapter.title}
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
