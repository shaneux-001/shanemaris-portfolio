import { Sparkle, Stack, Gear, Devices, Compass, Users, DeviceMobile, Briefcase } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import HoverLink from "@/components/HoverLink";

type ExpertiseTone = "accent" | "muted";
interface ExpertiseEntry { skill: string; Icon: Icon; tone: ExpertiseTone }

const EXPERTISE: ExpertiseEntry[] = [
  { skill: "Design Ops",         Icon: Gear,         tone: "muted"  },
  { skill: "Design Systems",     Icon: Stack,        tone: "accent" },
  { skill: "UI/UX Design",       Icon: Devices,      tone: "muted"  },
  { skill: "UX Strategy",        Icon: Compass,      tone: "accent" },
  { skill: "Design Leadership",  Icon: Users,        tone: "accent" },
  { skill: "App Design",         Icon: DeviceMobile, tone: "muted"  },
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
          {[
            { n: "1", title: "Principle Title", copy: "A short description of what this principle means in practice and why it matters." },
            { n: "2", title: "Principle Title", copy: "A short description of what this principle means in practice and why it matters." },
            { n: "3", title: "Principle Title", copy: "A short description of what this principle means in practice and why it matters." },
            { n: "4", title: "Principle Title", copy: "A short description of what this principle means in practice and why it matters." },
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
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", marginBottom: "2rem" }}>Southwest Airlines 2014 to present</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>Digital Product Manager, Design Ops</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>2022 to present</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>Manage and maintain the commercial design system. Co-lead the UX Community of Practice. Lead and mentor UX Designers and manage contract designers.</p>
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>Sr. UX Designer</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>2019 to 2022</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>Design Leader for system implementation across responsive web, native iOS and Android. Created UX Community of Practice in 2020.</p>
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>UX Designer</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>2014 to 2019</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>Primary designer on Vision, the complete redesign of Southwest Digital Channels.</p>
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
