import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";

export const metadata: Metadata = {
  title: "The Vendor Path Not Taken · Proof Before Progress",
  description: "Nine months building the case for Knapsack, and the internal resistance that ended the relationship before it shipped.",
};

export default function Chapter3() {
  const workDir = path.join(process.cwd(), "public", "work", "proof-before-progress");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-3-hero.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work/proof-before-progress" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO OVERVIEW</Ghost>
        </Link>

        <span className="block font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5">
          CHAPTER 3 — KNAPSACK
        </span>

        <h1 className="pr-page-title m-0 mb-7 font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong max-w-[24ch]">
          <Ghost trigger="load">The Vendor Path Not Taken</Ghost>
        </h1>

        <div className="relative aspect-[1.6/1] mb-10 overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
          {hasHero ? (
            <img src="/work/proof-before-progress/chapter-3-hero.jpg" alt="Chapter 3 hero" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">chapter-3-hero.jpg</span>
          )}
        </div>

        <div className="max-w-[62ch] flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            I evaluated Zeroheight and Knapsack. InVision was already winding down, so it came down to those two. We chose Knapsack and spent about nine months building the internal case with our tech partners.
          </p>
          <p className="m-0">
            Then we hit real resistance. Engineering had reservations I never fully understood, whether about codebase access or something else entirely. I eventually cut the relationship rather than string Knapsack along while the internal politics played out. That wasn&apos;t an easy call. They&apos;d been a genuinely good partner through the whole process.
          </p>
        </div>

        <div className="flex justify-between items-center mt-14 pt-6 border-t border-pr-rule">
          <PressCta href="/work/proof-before-progress/chapter-2" variant="secondary">← PREVIOUS</PressCta>
          <PressCta href="/work/proof-before-progress/chapter-4">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
