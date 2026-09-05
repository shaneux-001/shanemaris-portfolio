import type { Metadata } from "next";
import PressCta from "@/components/press/PressCta";
import Expertise from "@/components/press/Expertise";

export const metadata: Metadata = {
  title: "About",
  description: "Design Ops & Systems leader. Designer by trade, systems thinker by necessity — building the infrastructure that helps teams do their best work.",
  openGraph: {
    title: "About · Shane Maris",
    description: "Design Ops & Systems leader. Designer by trade, systems thinker by necessity — building the infrastructure that helps teams do their best work.",
    url: "https://shanemaris.com/about",
  },
  twitter: {
    title: "About · Shane Maris",
    description: "Design Ops & Systems leader. Designer by trade, systems thinker by necessity.",
  },
};

const PRINCIPLES = [
  { term: "Build tools not rules", line: "Rigid processes create silos. Tools that invite collaboration get teams working together instead of around each other." },
  { term: "One bite at a time", line: "Complex problems rarely yield to brute force. Break the work into its smallest meaningful parts and the right solution tends to assemble itself." },
  { term: "Constraints force creativity", line: "The best design rarely comes from unlimited resources. A tight deadline, budget, or platform limit is often the pressure that produces the most durable solution." },
  { term: "Less is more", line: "Every element in a design earns its place, or it doesn't belong. If it's not improving the experience or solving a real objective, the right move is usually to remove it." },
  { term: "Design works for everyone", line: "Design that only works for some people isn't finished. Accessible, inclusive systems multiply impact — better work comes out when more people can participate." },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-plex-mono text-[11px] tracking-[0.1em] text-pr-muted mb-[22px] border-t border-pr-rule pt-[22px]">
      {children}
    </div>
  );
}

export default function About() {
  return (
    <main className="pr-page">
    <div className="pr-main pt-[clamp(36px,5vw,56px)] pb-6">
      <h1 className="pr-page-title m-0 mb-[18px] font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
        I design the systems behind great design.
      </h1>
      <p className="pr-lede m-0 mb-3 leading-[1.7] text-pr-lede max-w-[54ch]">
        I build the scaffolding designers actually need to do good work — processes that hold up, tools people will use without a fight, and enough shared standard that teams stop reinventing the same decisions.
      </p>
      <p className="pr-lede m-0 mb-8 leading-[1.7] text-pr-lede max-w-[54ch]">
        I&apos;m a designer by trade who started fixing stuff on the side because I&apos;m the kind of person who can&apos;t leave a broken process alone. It worked well enough that I was able to turn it into my full-time focus.
      </p>
      <div className="flex gap-[10px] items-center flex-wrap mb-2">
        <PressCta href="/contact">GET IN TOUCH</PressCta>
        <PressCta href="/resume" variant="secondary">VIEW RESUME</PressCta>
      </div>

      <SectionLabel>OUTSIDE OF WORK</SectionLabel>
      <div className="max-w-[62ch] mb-2 flex flex-col gap-3.5">
        <p className="text-sm text-pr-lede leading-[1.7] m-0">
          Outside of work, most of my time goes to my family, cooking, and video games I&apos;m probably too invested in. I&apos;m a genuine film and TV nerd — less about the story on screen and more about how it got there, since the craft decisions behind the scenes interest me as much as the finished product. I&apos;m also trying to get back outdoors more — hiking, walking, easing back into biking — for the roughly five months a year Texas isn&apos;t doing its best impression of a convection oven.
        </p>
        <p className="text-sm text-pr-lede leading-[1.7] m-0">
          That behind-the-scenes curiosity isn&apos;t new. I got my hands on Flash in ninth grade and started making my own cel animations, and later took photography and videography classes in college. Long before &quot;systems thinker&quot; was a job title, I was already the kid who wanted to understand how something got made, not just watch it happen. That&apos;s still basically what I do for a living.
        </p>
      </div>

      <SectionLabel>HOW I WORK</SectionLabel>
      <div className="pr-two-col max-w-[860px] mb-10">
        {PRINCIPLES.map((p) => (
          <div key={p.term} className="flex flex-col gap-[5px]">
            <div className="text-[17px] font-semibold text-pr-fg-strong">{p.term}</div>
            <div className="text-sm leading-[1.6] text-pr-lede">{p.line}</div>
          </div>
        ))}
      </div>

      <SectionLabel>EXPERTISE</SectionLabel>
      <div className="mb-10">
        <Expertise />
      </div>
    </div>
    </main>
  );
}
