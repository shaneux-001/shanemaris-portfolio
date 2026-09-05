import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";
import { readTimes } from "@/lib/readTime";

export const metadata: Metadata = {
  title: "The Moment It Clicked · Heart Design System",
  description: "Southwest's gift card experience worked. But underneath, it was still wearing Leapfrog.",
};

export default function Chapter3() {
  const workDir = path.join(process.cwd(), "public", "work", "heart-design-system");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-3-hero.jpg"));
  const hasSection1 = fs.existsSync(path.join(workDir, "chapter-3-section-1.jpg"));
  const hasSection2 = fs.existsSync(path.join(workDir, "chapter-3-section-2.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work/heart-design-system" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO HEART DS</Ghost>
        </Link>

        <span className="block font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5">
          CHAPTER 3 OF 4
        </span>

        <h1 className="pr-page-title m-0 mb-2 font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
          The Moment It Clicked
        </h1>

        <p className="m-0 mb-3 text-base text-pr-lede">Gift Card POC</p>
        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">Read time: {readTimes.chapter3}</p>

        <div className="relative aspect-[1.6/1] mb-10 overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
          {hasHero ? (
            <img src="/work/heart-design-system/chapter-3-hero.jpg" alt="Chapter 3 — The Moment It Clicked" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">chapter-3-hero.jpg</span>
          )}
        </div>

        <div className="max-w-[62ch] flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            Southwest&apos;s gift card experience worked. Customers could buy and redeem without issue. But underneath, it was still wearing Leapfrog — our 2008 design language — untouched through years of rebrands. Years of piecemealing a site of this scale meant some corners never got updated. They just waited.
          </p>

          <p className="m-0">
            Which made the gift card flow a perfect candidate for something I&apos;d been wanting to prove.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection1 ? (
              <img src="/work/heart-design-system/chapter-3-section-1.jpg" alt="Before / After — Gift Card Flow" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-3-section-1.jpg</span>
            )}
          </div>

          <p className="m-0">
            No new features. No new flows. Just take what existed and translate it into Heart, component for component. The gift card flow was relatively sheltered — not a booking flow, not check-in. Lower stakes, but still real.
          </p>

          <blockquote className="font-archivo text-[28px] italic text-pr-magenta border-l-4 border-pr-magenta pl-8 my-4 leading-[1.4]">
            One engineer. One weekend. Full front-end, done.
          </blockquote>

          <p className="m-0">
            He had documented components, defined tokens, and a system built to be used — so he used it. What would have previously taken a sprint or more of design-to-development back and forth was done before Monday morning. The delivered experience was visually consistent, the code was cleaner, and almost no interpretation was required.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection2 ? (
              <img src="/work/heart-design-system/chapter-3-section-2.jpg" alt="Component Library — Token Usage" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-3-section-2.jpg</span>
            )}
          </div>

          <p className="m-0">
            Leadership noticed — not because I told them the system was working, but because they saw it. That project quietly marked the end of an era. Vision never finished. Heart had made it irrelevant. Everything forward was NextGen, built in Heart.
          </p>
        </div>

        <div className="flex justify-between items-center mt-14 pt-6 border-t border-pr-rule">
          <PressCta href="/work/heart-design-system/chapter-2" variant="secondary">← PREVIOUS</PressCta>
          <PressCta href="/work/heart-design-system/chapter-4">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
