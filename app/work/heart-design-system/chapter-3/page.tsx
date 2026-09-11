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
          <Ghost trigger="load">The Moment It Clicked</Ghost>
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
            Southwest&apos;s gift card experience worked. Customers could buy and redeem without issue. But underneath, it was still wearing Leapfrog — our old design language, untouched since before I even started at Southwest. Years of piecemealing a site of this scale meant some flows never got updated. They just waited.
          </p>

          <p className="m-0">
            Which made it a perfect candidate for something I&apos;d been wanting to prove.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection1 ? (
              <img src="/work/heart-design-system/chapter-3-section-1.jpg" alt="Before / After — Gift Card Flow" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-3-section-1.jpg</span>
            )}
          </div>

          <p className="m-0">
            I asked for six weeks — three sprints. I got three. That gap wasn&apos;t a negotiation I won; it came from a capacity window my leader was trying to hand me, and I took it. No new features, no new flows — just take what existed and translate it into the new system, component for component. Lower stakes than a booking flow or check-in, but still real, and still forced me to actually use what I&apos;d spent years designing instead of just advocating for it.
          </p>

          <blockquote className="font-archivo text-[28px] italic text-pr-magenta border-l-4 border-pr-magenta pl-8 my-4 leading-[1.4]">
            One engineer. One weekend. Full front-end, done.
          </blockquote>

          <p className="m-0">
            He had a set of documented components and a system built to be used — so he used it, and finished early enough that the freed-up time went to other work to fill the rest of his capacity. What would have previously taken a whole sprint or more of design-to-development back-and-forth was done before Monday morning. The delivered experience was visually consistent, the code was cleaner, and almost no interpretation was required. He was so excited he kept telling people — and anyone I pointed him at — that he wanted to continue working this way.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection2 ? (
              <img src="/work/heart-design-system/chapter-3-section-2.jpg" alt="Component library in use" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-3-section-2.jpg</span>
            )}
          </div>

          <p className="m-0">
            Leadership noticed — not because I told them the system was working, but because they saw it. I wasn&apos;t in the room for the budget conversations that followed, but I know what came out of them: the ask to extend the system beyond responsive web, and the case for my first contractor. That project quietly marked the end of an era. Our legacy design language had made it irrelevant. Everything &quot;new&quot; was built in this system.
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
