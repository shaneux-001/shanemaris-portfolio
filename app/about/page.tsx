import type { Metadata } from "next";
import { Sparkle, Stack, Gear, Devices, Compass, Users, DeviceMobile, Briefcase, Robot, Code } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import HoverLink from "@/components/HoverLink";

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

export default function About() {
  return (
    <main style={{ paddingTop: "8rem", paddingBottom: "6rem", paddingLeft: "4rem", paddingRight: "4rem", maxWidth: "56rem", margin: "0 auto" }}>
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1rem" }}>About</p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--color-ink)", lineHeight: 1.15, marginBottom: "1.5rem" }}>I design the systems behind great design.</h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.125rem", color: "var(--color-muted)", lineHeight: 1.8, maxWidth: "42rem", marginBottom: "1rem" }}>I help designers do their best work by building scalable processes, enabling the right tools, and aligning teams around shared standards so design can move faster, with clarity and confidence.</p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.125rem", color: "var(--color-muted)", lineHeight: 1.8, maxWidth: "42rem", marginBottom: "2rem" }}>I am a designer by trade who grew into systems thinking. I have spent the last several years at Southwest Airlines building and scaling the Heart Design System across web and native platforms.</p>
        <HoverLink
          href="/contact"
          hoverEffect="underglow"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "#fff",
            fontFamily: "var(--font-inter)",
            fontSize: "0.875rem",
            fontWeight: 500,
            padding: "0.75rem 1.5rem",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Get in touch
        </HoverLink>
      </section>
      <hr style={{ border: "none", borderTop: "1px solid var(--color-hairline)", marginBottom: "5rem" }} />
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.4rem", width: "fit-content" }}>
          <Sparkle size={14} weight="duotone" />
          Design Principles
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {[
            { n: "1", title: "Build tools not rules", copy: "Rigid processes create silos. When you build tools that invite collaboration, teams stop working around each other and start working together — with clarity, speed, and a shared point of truth." },
            { n: "2", title: "One bite at a time", copy: "Complex problems rarely yield to brute force. Break the work into its smallest meaningful parts, solve each with intention, and the right solution tends to assemble itself." },
            { n: "3", title: "Constraints force creativity", copy: "The best design rarely comes from unlimited resources. A tight constraint — a deadline, a budget, a platform limitation — is often the pressure that produces the most durable solution." },
            { n: "4", title: "Less is more", copy: "Every element in a design earns its place or it doesn't belong. If something isn't improving the experience or solving a business objective, the right move is usually to remove it." },
            { n: "5", title: "Good design works for everyone", copy: "Design that only works for some people isn't finished. Accessible, inclusive systems multiply impact — when more people can participate in the process, better work comes out the other side." },
          ].map(({ n, title, copy }) => (
            <div key={n}>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "2.5rem", fontWeight: 700, color: "#D9D5CF", lineHeight: 1, marginBottom: "0.75rem" }}>{n}</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", fontWeight: 600, color: "var(--color-accent)", marginBottom: "0.5rem" }}>{title}</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.7, margin: 0 }}>{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <hr style={{ border: "none", borderTop: "1px solid var(--color-hairline)", marginBottom: "5rem" }} />
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.4rem", width: "fit-content" }}>
          <Briefcase size={14} weight="duotone" />
          Experience
        </p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", marginBottom: "2rem" }}>Southwest Airlines 2011 to present</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>Digital Product Manager, Design Ops</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>Dec 2022 to present</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>Manage and maintain the commercial design system. Co-lead the UX Community of Practice. Lead and mentor UX Designers and manage contract designers. Partner with teams across Marketing, Customer Experience, Technology, and Innovation to optimize design processes.</p>
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>Lead UX Designer</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>Mar 2022 to Dec 2022</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>Co-led the UX Community of Practice. Led design effort for the first Southwest commercial digital design system. Worked with engineers to implement design systems for responsive web and native apps.</p>
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>Sr. UX Designer</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>Feb 2019 to Mar 2022</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>Explored design systems and design ops as a formal role within Southwest. Design Leader for system implementation across responsive web, native iOS and Android. Created UX Community of Practice in 2020.</p>
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>UX Designer</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>Apr 2014 to Feb 2019</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>Primary designer on Vision, the complete redesign of Southwest Digital Channels. Designer for Check-in, Homepage, Select Flights, Manage Reservation, and Enhanced Reaccommodation.</p>
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>Web Designer</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>Feb 2012 to Apr 2014</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>Transitioned from contractor to FTE, supporting content creation across Southwest's Digital Channels. Managed production timelines, ensuring consistency and delivery across marketing and digital properties.</p>
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>UX Designer (Contractor)</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>Aug 2011 to Feb 2012</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>Integrated AirTran's digital presence into the Southwest ecosystem following acquisition. Collaborated with SMEs to establish UX and digital best practices, laying groundwork for future design operations.</p>
          </div>
        </div>
      </section>
      <hr style={{ border: "none", borderTop: "1px solid var(--color-hairline)", marginBottom: "5rem" }} />
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.4rem", width: "fit-content" }}>
          <Stack size={14} weight="duotone" />
          Expertise
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
          {EXPERTISE.map(({ skill, Icon, tone }) => (
            <div
              key={skill}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                color: "var(--color-ink)",
                padding: "0.625rem 1rem",
                border: "1px solid var(--color-hairline)",
                borderRadius: "var(--radius-sm)",
                background: "var(--color-base)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Icon
                size={18}
                weight="duotone"
                color={tone === "accent" ? "var(--color-accent)" : "var(--color-muted)"}
              />
              {skill}
            </div>
          ))}
        </div>
      </section>
      <hr style={{ border: "none", borderTop: "1px solid var(--color-hairline)", marginBottom: "5rem" }} />
      <section>
        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.75rem", color: "var(--color-ink)", marginBottom: "1rem" }}>Want to work together?</p>
        <HoverLink
          href="/contact"
          hoverEffect="underglow"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "#fff",
            fontFamily: "var(--font-inter)",
            fontSize: "0.875rem",
            fontWeight: 500,
            padding: "0.75rem 1.5rem",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Get in touch
        </HoverLink>
      </section>
    </main>
  );
}
