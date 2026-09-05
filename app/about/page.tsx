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
    <div
      style={{
        fontFamily: 'var(--font-plex-mono), monospace',
        fontSize: 11,
        letterSpacing: '0.1em',
        color: 'var(--pr-muted)',
        marginBottom: 22,
        borderTop: '1px solid var(--pr-rule)',
        paddingTop: 22,
      }}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <main className="pr-page">
    <div className="pr-main" style={{ paddingTop: 'clamp(36px, 5vw, 56px)', paddingBottom: 24 }}>
      <h1
        className="pr-page-title"
        style={{ margin: '0 0 18px', fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--pr-fg-strong)', maxWidth: '22ch' }}
      >
        I design the systems behind great design.
      </h1>
      <p className="pr-lede" style={{ margin: '0 0 12px', lineHeight: 1.7, color: 'var(--pr-lede)', maxWidth: '54ch' }}>
        I build the scaffolding designers actually need to do good work — processes that hold up, tools people will use without a fight, and enough shared standard that teams stop reinventing the same decisions.
      </p>
      <p className="pr-lede" style={{ margin: '0 0 32px', lineHeight: 1.7, color: 'var(--pr-lede)', maxWidth: '54ch' }}>
        I&apos;m a designer by trade who started fixing stuff on the side because I&apos;m the kind of person who can&apos;t leave a broken process alone. It worked well enough that I was able to turn it into my full-time focus.
      </p>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
        <PressCta href="/contact">GET IN TOUCH</PressCta>
        <PressCta href="/resume" variant="secondary">VIEW RESUME</PressCta>
      </div>

      <SectionLabel>OUTSIDE OF WORK</SectionLabel>
      <div style={{ maxWidth: '62ch', marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ fontSize: 14, color: 'var(--pr-lede)', lineHeight: 1.7, margin: 0 }}>
          Outside of work, most of my time goes to my family, cooking, and video games I&apos;m probably too invested in. I&apos;m a genuine film and TV nerd — less about the story on screen and more about how it got there, since the craft decisions behind the scenes interest me as much as the finished product. I&apos;m also trying to get back outdoors more — hiking, walking, easing back into biking — for the roughly five months a year Texas isn&apos;t doing its best impression of a convection oven.
        </p>
        <p style={{ fontSize: 14, color: 'var(--pr-lede)', lineHeight: 1.7, margin: 0 }}>
          That behind-the-scenes curiosity isn&apos;t new. I got my hands on Flash in ninth grade and started making my own cel animations, and later took photography and videography classes in college. Long before &quot;systems thinker&quot; was a job title, I was already the kid who wanted to understand how something got made, not just watch it happen. That&apos;s still basically what I do for a living.
        </p>
      </div>

      <SectionLabel>HOW I WORK</SectionLabel>
      <div className="pr-two-col" style={{ maxWidth: 860, marginBottom: 40 }}>
        {PRINCIPLES.map((p) => (
          <div key={p.term} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--pr-fg-strong)' }}>{p.term}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--pr-lede)' }}>{p.line}</div>
          </div>
        ))}
      </div>

      <SectionLabel>EXPERTISE</SectionLabel>
      <div style={{ marginBottom: 40 }}>
        <Expertise />
      </div>
    </div>
    </main>
  );
}
