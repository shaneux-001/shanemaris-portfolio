export default function About() {
  return (
    <main style={{ paddingTop: "8rem", paddingBottom: "6rem", paddingLeft: "4rem", paddingRight: "4rem", maxWidth: "56rem", margin: "0 auto" }}>

      {/* Bio */}
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1rem" }}>About</p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--color-ink)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
          I design the systems<br />behind great design.
        </h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.125rem", color: "var(--color-muted)", lineHeight: 1.8, maxWidth: "42rem", marginBottom: "1rem" }}>
          I help designers do their best work by building scalable processes, enabling the right tools, and aligning teams around shared standards — so design can move faster, with clarity and confidence.
        </p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.125rem", color: "var(--color-muted)", lineHeight: 1.8, maxWidth: "42rem", marginBottom: "2rem" }}>
          I'm a designer by trade who grew into systems thinking. I've spent the last several years at Southwest Airlines building and scaling the Heart Design System — a commercial design system used across web and native platforms by designers and engineers company-wide.
        </p>
        <a href="/contact" style={{ backgroundColor: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 500, padding: "0.75rem 1.5rem", borderRadius: "6px", textDecoration: "none", display: "inline-block" }}>
          Get in touch
        </a>
      </section>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #E8E4DE", marginBottom: "5rem" }} />

      {/* Experience */}
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2rem" }}>Experience</p>

        <div style={{ marginBottom: "1rem" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", marginBottom: "0.25rem" }}>Southwest Airlines · 2014 – present</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>Digital Product Manager, Design Ops</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>2022 – present</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>
              Manage and maintain the commercial design system. Co-lead the UX Community of Practice. Lead and mentor UX Designers and manage contract designers. Partner with teams across Marketing, Customer Experience, Technology, and Innovation to optimize design processes.
            </p>
          </div>

          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>Lead UX Designer</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>2022</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>
              Co-led the UX Community of Practice. Led design effort for the first Southwest commercial digital design system. Worked with engineers to implement design systems for responsive web and native apps.
            </p>
          </div>

          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>Sr. UX Designer</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>2019 – 2022</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>
              Explored design systems and design ops as a formal role within Southwest. Supported design efforts for Revenue Products. Design Leader for system implementation across responsive web, native iOS and Android. Created UX Community of Practice in 2020.
            </p>
          </div>

          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "var(--color-ink)", margin: 0 }}>UX Designer</h3>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--color-muted)" }}>2014 – 2019</span>
            </div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)", lineHeight: 1.75, margin: 0, maxWidth: "42rem" }}>
              Primary designer on Vision — the complete redesign of Southwest Digital Channels. Designer for Check-in, Homepage, Select Flights, Manage Reservation, and Enhanced Reaccommodation.
            </p>
          </div>

        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #E8E4DE", marginBottom: "5rem" }} />

      {/* Expertise & Skills */}
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2rem" }}>Expertise</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
          {["Design Ops", "Design Systems", "UI/UX Design", "UX Strategy", "Design Leadership", "App Design"].map((skill) => (
            <div key={skill} style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--color-ink)", padding: "0.75rem 1rem", border: "1px solid #E8E4DE", borderRadius: "6px" }}>
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #E8E4DE", marginBottom: "5rem" }} />

      {/* Education & Certifications */}
      <section style={{ marginBottom: "5rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "2rem" }}>Education & Certifications</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", color: "var(--color-ink)", margin: "0 0 0.25rem" }}>B.A. Interactive Media Design</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>Art Institute of Dallas · 2008 – 2011</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", color: "var(--color-ink)", margin: "0 0 0.25rem" }}>UX Management Certified</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>Nielsen Norman Group · Dec 2025</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", color: "var(--color-ink)", margin: "0 0 0.25rem" }}>UX Certified</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>Nielsen Norman Group · Feb 2022</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", color: "var(--color-ink)", margin: "0 0 0.25rem" }}>Agile Team Facilitation</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>Jan 2022</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section>
        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.75rem", color: "var(--color-ink)", marginBottom: "1rem" }}>Want to work together?</p>
        <a href="/contact" style={{ backgroundColor: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 500, padding: "0.75rem 1.5rem", borderRadius: "6px", textDecoration: "none" }}>
          Get in touch
        </a>
      </section>

    </main>
  );
}