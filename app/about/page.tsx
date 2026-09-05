import type { Metadata } from "next";
import { Gear, Stack, Devices, Compass, Users, DeviceMobile, Robot, Code } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import PressCta from "@/components/press/PressCta";

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

type ExpertiseTone = "accent" | "muted";
interface ExpertiseEntry { skill: string; Icon: Icon; tone: ExpertiseTone }

const EXPERTISE: ExpertiseEntry[] = [
  { skill: "Design Ops",          Icon: Gear,         tone: "muted"  },
  { skill: "Design Systems",      Icon: Stack,        tone: "accent" },
  { skill: "UI/UX Design",        Icon: Devices,      tone: "muted"  },
  { skill: "UX Strategy",         Icon: Compass,      tone: "accent" },
  { skill: "Design Leadership",   Icon: Users,        tone: "accent" },
  { skill: "App Design",          Icon: DeviceMobile, tone: "muted"  },
  { skill: "Agentic Design",      Icon: Robot,        tone: "accent" },
  { skill: "Prompt Engineering",  Icon: Code,         tone: "muted"  },
];

const PRINCIPLES = [
  { term: "Build tools not rules", line: "Rigid processes create silos. When you build tools that invite collaboration, teams stop working around each other and start working together — with clarity, speed, and a shared point of truth." },
  { term: "One bite at a time", line: "Complex problems rarely yield to brute force. Break the work into its smallest meaningful parts, solve each with intention, and the right solution tends to assemble itself." },
  { term: "Constraints force creativity", line: "The best design rarely comes from unlimited resources. A tight constraint — a deadline, a budget, a platform limitation — is often the pressure that produces the most durable solution." },
  { term: "Less is more", line: "Every element in a design earns its place or it doesn't belong. If something isn't improving the experience or solving a business objective, the right move is usually to remove it." },
  { term: "Good design works for everyone", line: "Design that only works for some people isn't finished. Accessible, inclusive systems multiply impact — when more people can participate in the process, better work comes out the other side." },
];

const EXPERIENCE = [
  { role: "Digital Product Manager, Design Ops", span: "Dec 2022 to present", copy: "Manage and maintain the commercial design system. Co-lead the UX Community of Practice. Lead and mentor UX Designers and manage contract designers. Partner with teams across Marketing, Customer Experience, Technology, and Innovation to optimize design processes." },
  { role: "Lead UX Designer", span: "Mar 2022 to Dec 2022", copy: "Co-led the UX Community of Practice. Led design effort for the first Southwest commercial digital design system. Worked with engineers to implement design systems for responsive web and native apps." },
  { role: "Sr. UX Designer", span: "Feb 2019 to Mar 2022", copy: "Explored design systems and design ops as a formal role within Southwest. Design Leader for system implementation across responsive web, native iOS and Android. Created UX Community of Practice in 2020." },
  { role: "UX Designer", span: "Apr 2014 to Feb 2019", copy: "Primary designer on Vision, the complete redesign of Southwest Digital Channels. Designer for Check-in, Homepage, Select Flights, Manage Reservation, and Enhanced Reaccommodation." },
  { role: "Web Designer", span: "Feb 2012 to Apr 2014", copy: "Transitioned from contractor to FTE, supporting content creation across Southwest's Digital Channels. Managed production timelines, ensuring consistency and delivery across marketing and digital properties." },
  { role: "UX Designer (Contractor)", span: "Aug 2011 to Feb 2012", copy: "Integrated AirTran's digital presence into the Southwest ecosystem following acquisition. Collaborated with SMEs to establish UX and digital best practices, laying groundwork for future design operations." },
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
      <p className="pr-lede" style={{ margin: '0 0 32px', lineHeight: 1.7, color: 'var(--pr-lede)', maxWidth: '54ch' }}>
        I help designers do their best work by building scalable processes, enabling the right tools, and aligning teams around shared standards.
      </p>
      <PressCta href="/contact" style={{ marginBottom: 8 }}>GET IN TOUCH</PressCta>

      <SectionLabel>HOW I WORK</SectionLabel>
      <div className="pr-two-col" style={{ maxWidth: 860, marginBottom: 8 }}>
        {PRINCIPLES.map((p) => (
          <div key={p.term} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--pr-fg-strong)' }}>{p.term}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--pr-lede)' }}>{p.line}</div>
          </div>
        ))}
      </div>

      <SectionLabel>EXPERIENCE — SOUTHWEST AIRLINES, 2011 TO PRESENT</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 8 }}>
        {EXPERIENCE.map((e) => (
          <div key={e.role}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 6, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-archivo)', fontSize: 18, fontWeight: 600, color: 'var(--pr-fg-strong)', margin: 0 }}>{e.role}</h3>
              <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: '10.5px', letterSpacing: '0.04em', color: 'var(--pr-muted)' }}>{e.span.toUpperCase()}</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--pr-lede)', lineHeight: 1.7, margin: 0, maxWidth: '62ch' }}>{e.copy}</p>
          </div>
        ))}
      </div>

      <SectionLabel>EXPERTISE</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginBottom: 40 }}>
        {EXPERTISE.map(({ skill, Icon, tone }) => (
          <div
            key={skill}
            style={{
              fontSize: '13.5px',
              color: 'var(--pr-fg)',
              padding: '10px 14px',
              border: '1px solid var(--pr-rule)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon size={16} weight="duotone" color={tone === 'accent' ? 'var(--pr-magenta)' : 'var(--pr-muted)'} />
            {skill}
          </div>
        ))}
      </div>
    </div>
    </main>
  );
}
