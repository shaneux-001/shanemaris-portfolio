import type { Metadata } from "next";
import HoverLink from "@/components/HoverLink";
import HoverAnchor from "@/components/HoverAnchor";

export const metadata: Metadata = {
  title: "Resume",
  description: "14+ years at Southwest Airlines — from Web Designer to Digital Product Manager, Design Ops. Building scalable design systems and leading UX teams.",
  openGraph: {
    title: "Resume · Shane Maris",
    description: "14+ years at Southwest Airlines — from Web Designer to Digital Product Manager, Design Ops.",
    url: "https://shanemaris.com/resume",
  },
  twitter: {
    title: "Resume · Shane Maris",
    description: "14+ years at Southwest Airlines — from Web Designer to Digital Product Manager, Design Ops.",
  },
};

export default function Resume() {
  return (
    <main style={{ paddingTop: "8rem", paddingBottom: "6rem", paddingLeft: "4rem", paddingRight: "4rem", maxWidth: "56rem", margin: "0 auto" }}>
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1rem" }}>Resume</p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--color-ink)", lineHeight: 1.15, marginBottom: "0.5rem" }}>Shane Maris</h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", marginBottom: "0.25rem" }}>Design Ops and Systems Leader</p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", marginBottom: "2rem" }}>contact@shanemaris.com · shanemaris.com · +1 (214) 546 3047</p>
        <HoverAnchor
          href="/Shane_Maris_Resume.docx"
          download
          hoverEffect="highlight"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.8rem",
            color: "var(--color-accent)",
            textDecoration: "none",
            borderBottom: "1px solid var(--color-accent)",
            display: "inline-block",
          }}
        >
          Download resume
        </HoverAnchor>
        <p style={{ marginBottom: "2rem" }} />
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.125rem", color: "var(--color-muted)", lineHeight: 1.8, maxWidth: "42rem", marginBottom: "1rem" }}>I help designers do their best work by building scalable processes, enabling the right tools, and aligning teams around shared standards so design can move faster, with clarity and confidence.</p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.125rem", color: "var(--color-muted)", lineHeight: 1.8, maxWidth: "42rem" }}>I am a designer by trade who grew into systems thinking. I have spent the last several years at Southwest Airlines building and scaling the Heart Design System across web and native platforms.</p>
      </section>
      <hr style={{ border: "none", borderTop: "1px solid var(--color-hairline)", marginBottom: "5rem" }} />
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2rem" }}>Experience</p>
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
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2rem" }}>Expertise</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
          {["Design Ops", "Design Systems", "UI/UX Design", "UX Strategy", "Design Leadership", "App Design", "Agentic Design", "Prompt Engineering"].map((skill) => (
            <div key={skill} style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--color-ink)", padding: "0.75rem 1rem", border: "1px solid var(--color-hairline)", borderRadius: "6px" }}>{skill}</div>
          ))}
        </div>
      </section>
      <hr style={{ border: "none", borderTop: "1px solid var(--color-hairline)", marginBottom: "5rem" }} />
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2rem" }}>Education and Certifications</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", color: "var(--color-ink)", margin: "0 0 0.25rem" }}>B.A. Interactive Media Design</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>Art Institute of Dallas 2008 to 2011</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", color: "var(--color-ink)", margin: "0 0 0.25rem" }}>UX Management Certified</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>Nielsen Norman Group Dec 2025</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", color: "var(--color-ink)", margin: "0 0 0.25rem" }}>UX Certified</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>Nielsen Norman Group Feb 2022</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", color: "var(--color-ink)", margin: "0 0 0.25rem" }}>Agile Team Facilitation</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>Jan 2022</p>
          </div>
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
