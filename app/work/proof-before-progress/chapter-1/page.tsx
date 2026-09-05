import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";

export const metadata: Metadata = {
  title: "The Belief · Proof Before Progress",
  description: "Why HDS needed a real docsite from the beginning, and why embedding guidance in UI kits was never going to scale.",
};

export default function Chapter1() {
  const workDir = path.join(process.cwd(), "public", "work", "proof-before-progress");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-1-hero.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work/proof-before-progress" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO OVERVIEW</Ghost>
        </Link>

        <span className="block font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5">
          CHAPTER 1 — DOCUMENTATION
        </span>

        <h1 className="pr-page-title m-0 mb-7 font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
          The Belief
        </h1>

        <div className="relative aspect-[1.6/1] mb-10 overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
          {hasHero ? (
            <img src="/work/proof-before-progress/chapter-1-hero.jpg" alt="Chapter 1 hero" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">chapter-1-hero.jpg</span>
          )}
        </div>

        <div className="max-w-[62ch] flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            I&apos;ve believed a real docsite was foundational to a design system since the beginning. For a long time, I wouldn&apos;t call what we had a &quot;real&quot; design system without one.
          </p>
          <p className="m-0">
            HDS never had one. It grew out of 10% of my time, then 50%, then a rotating cast of engineers trying to operationalize a concept I&apos;d sold before there was any real infrastructure behind it. Engineers defaulted to Storybook and Confluence, tools they already knew. Designers worked straight out of the Figma UI kits. I never trusted Confluence or SharePoint for this kind of thing. In my experience, that&apos;s where documentation goes to die, written once and never read again.
          </p>
          <p className="m-0">
            I wanted something closer to Carbon&apos;s docsite. It wasn&apos;t in the budget. Southwest was navigating activist investor pressure at the time, and design wasn&apos;t high on my boss&apos;s list. So the workaround was keeping guidance embedded directly in the UI kits, next to the components themselves. That held for a while. But it doesn&apos;t scale, it bloats the system it&apos;s supposed to support, and it goes stale the moment anything changes. There was zero automation behind any of it.
          </p>
        </div>

        <div className="flex justify-end items-center mt-14 pt-6 border-t border-pr-rule">
          <PressCta href="/work/proof-before-progress/chapter-2">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
