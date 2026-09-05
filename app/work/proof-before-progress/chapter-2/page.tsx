import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";

export const metadata: Metadata = {
  title: "The Reset · Proof Before Progress",
  description: "Southwest's first-ever RIF rearranged the org chart — and finally created room to fix HDS's documentation gap.",
};

export default function Chapter2() {
  const workDir = path.join(process.cwd(), "public", "work", "proof-before-progress");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-2-hero.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work/proof-before-progress" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO OVERVIEW</Ghost>
        </Link>

        <span className="block font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5">
          CHAPTER 2 — RIF
        </span>

        <h1 className="pr-page-title m-0 mb-7 font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
          The Reset
        </h1>

        <div className="relative aspect-[1.6/1] mb-10 overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
          {hasHero ? (
            <img src="/work/proof-before-progress/chapter-2-hero.jpg" alt="Chapter 2 hero" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">chapter-2-hero.jpg</span>
          )}
        </div>

        <div className="max-w-[62ch] flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            Southwest&apos;s first-ever RIF, in February 2025, rearranged the org chart under me. It turned out to be the best thing that could have happened.
          </p>
          <p className="m-0">
            I landed on a new team, Digital Design and Research, under a director focused specifically on design. I made the case plainly: our process had become slow and entirely manual, and we&apos;d been forced to scale the system without any real support to document or onboard people efficiently. She listened.
          </p>
          <p className="m-0">
            That&apos;s what finally got me room to evaluate real tools instead of patching around the gap.
          </p>
        </div>

        <div className="flex justify-between items-center mt-14 pt-6 border-t border-pr-rule">
          <PressCta href="/work/proof-before-progress/chapter-1" variant="secondary">← PREVIOUS</PressCta>
          <PressCta href="/work/proof-before-progress/chapter-3">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
