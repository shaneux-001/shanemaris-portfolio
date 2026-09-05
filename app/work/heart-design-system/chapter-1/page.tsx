import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";
import { readTimes } from "@/lib/readTime";

export const metadata: Metadata = {
  title: "The Long Game · Heart Design System",
  description: "I've known design systems were the answer since before most people were calling them that.",
};

export default function Chapter1() {
  const workDir = path.join(process.cwd(), "public", "work", "heart-design-system");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-1-hero.jpg"));
  const hasSection1 = fs.existsSync(path.join(workDir, "chapter-1-section-1.jpg"));
  const hasSection2 = fs.existsSync(path.join(workDir, "chapter-1-section-2.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work/heart-design-system" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO HEART DS</Ghost>
        </Link>

        <span className="block font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5">
          CHAPTER 1 OF 4
        </span>

        <h1 className="pr-page-title m-0 mb-2 font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
          The Long Game
        </h1>

        <p className="m-0 mb-3 text-base text-pr-lede">Origin Story</p>
        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">Read time: {readTimes.chapter1}</p>

        <div className="relative aspect-[1.6/1] mb-10 overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
          {hasHero ? (
            <img src="/work/heart-design-system/chapter-1-hero.jpg" alt="Chapter 1 — The Long Game" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">chapter-1-hero.jpg</span>
          )}
        </div>

        <div className="max-w-[62ch] flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            I&apos;ve known design systems were the answer since before most people were calling them that.
          </p>

          <p className="m-0">
            It was 2013, maybe 2014 — Event Apart in Austin. I sat through a talk on Style Tiles and something clicked. Not just as a design methodology, but as an organizational one. Here was a way to stop redefining the same things over and over, to close the gap between what design intended and what development delivered, to make &quot;digital first&quot; mean something beyond a slide in a deck.
          </p>

          <blockquote className="font-archivo text-[28px] italic text-pr-magenta border-l-4 border-pr-magenta pl-8 my-4 leading-[1.4]">
            Build tools, not rules.
          </blockquote>

          <p className="m-0">
            Around 2017 I was at Delight Conference in Portland when I heard Dan Mall speak for the first time. If Style Tiles gave me the idea, Dan gave me the framework — and more importantly, the philosophy. That line reoriented how I thought about what a design system actually is. Not a governance document. Not a constraint. A gift to the people building alongside you.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection1 ? (
              <img src="/work/heart-design-system/chapter-1-section-1.jpg" alt="Screenshot — Design artifact" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-1-section-1.jpg</span>
            )}
          </div>

          <p className="m-0">
            For years, converting Leapfrog — our 2008 design language — to Vision was like painting a house one brushstroke at a time while someone kept adding rooms. Requests piled up. Timelines stretched. We were moving slowly and inconsistently, and everyone on the ground felt it.
          </p>

          <p className="m-0">
            So I started with my manager. He&apos;d been a UX designer himself, which helped — he didn&apos;t need a long explanation. He got it. From there it was our director, then the brand director. Each conversation was a rung.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection2 ? (
              <img src="/work/heart-design-system/chapter-1-section-2.jpg" alt="Process — Deck screenshot" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-1-section-2.jpg</span>
            )}
          </div>

          <p className="m-0">
            Eventually I made the case plainly: give me the space to try to fix this. He was supportive — and while the business realities meant he couldn&apos;t hand me a team or a budget, he gave me what he could: permission to spend part of my time on it.
          </p>

          <p className="m-0">
            That was enough. For a while, that had to be.
          </p>
        </div>

        <div className="flex justify-end items-center mt-14 pt-6 border-t border-pr-rule">
          <PressCta href="/work/heart-design-system/chapter-2">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
