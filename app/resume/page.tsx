import type { Metadata } from "next";
import PressCta from "@/components/press/PressCta";

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

const EXPERIENCE = [
  { role: "Digital Product Manager, Design Ops", span: "Dec 2022 to present", copy: "Manage and maintain the commercial design system. Co-lead the UX Community of Practice. Lead and mentor UX Designers and manage contract designers. Partner with teams across Marketing, Customer Experience, Technology, and Innovation to optimize design processes." },
  { role: "Lead UX Designer", span: "Mar 2022 to Dec 2022", copy: "Co-led the UX Community of Practice. Led design effort for the first Southwest commercial digital design system. Worked with engineers to implement design systems for responsive web and native apps." },
  { role: "Sr. UX Designer", span: "Feb 2019 to Mar 2022", copy: "Explored design systems and design ops as a formal role within Southwest. Design Leader for system implementation across responsive web, native iOS and Android. Created UX Community of Practice in 2020." },
  { role: "UX Designer", span: "Apr 2014 to Feb 2019", copy: "Primary designer on Vision, the complete redesign of Southwest Digital Channels. Designer for Check-in, Homepage, Select Flights, Manage Reservation, and Enhanced Reaccommodation." },
  { role: "Web Designer", span: "Feb 2012 to Apr 2014", copy: "Transitioned from contractor to FTE, supporting content creation across Southwest's Digital Channels. Managed production timelines, ensuring consistency and delivery across marketing and digital properties." },
  { role: "UX Designer (Contractor)", span: "Aug 2011 to Feb 2012", copy: "Integrated AirTran's digital presence into the Southwest ecosystem following acquisition. Collaborated with SMEs to establish UX and digital best practices, laying groundwork for future design operations." },
];

const EXPERTISE = ["Design Ops", "Design Systems", "UI/UX Design", "UX Strategy", "Design Leadership", "App Design", "Agentic Design", "Prompt Engineering"];

const EDUCATION = [
  { title: "B.A. Interactive Media Design", meta: "Art Institute of Dallas 2008 to 2011" },
  { title: "UX Management Certified", meta: "Nielsen Norman Group Dec 2025" },
  { title: "UX Certified", meta: "Nielsen Norman Group Feb 2022" },
  { title: "Agile Team Facilitation", meta: "Jan 2022" },
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

export default function Resume() {
  return (
    <main className="pr-page">
      <div className="pr-main" style={{ paddingTop: 'clamp(36px, 5vw, 56px)', paddingBottom: 24 }}>
        <h1
          className="pr-page-title"
          style={{ margin: '0 0 10px', fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--pr-fg-strong)' }}
        >
          Shane Maris
        </h1>
        <p style={{ margin: '0 0 6px', fontSize: 16, color: 'var(--pr-lede)' }}>Design Ops and Systems Leader</p>
        <p style={{ margin: '0 0 18px', fontFamily: 'var(--font-plex-mono), monospace', fontSize: 12.5, letterSpacing: '0.02em', color: 'var(--pr-muted)' }}>
          contact@shanemaris.com · shanemaris.com · +1 (214) 546 3047
        </p>
        <a
          href="/Shane_Maris_Resume.docx"
          download
          className="pr-arrow-link pr-hoverable"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            fontSize: 12,
            letterSpacing: '0.06em',
            color: 'var(--pr-accent-text)',
            borderBottom: '1px solid var(--pr-accent-text)',
            padding: '0 0 3px',
            display: 'inline-block',
            textDecoration: 'none',
          }}
        >
          DOWNLOAD RESUME
        </a>

        <div style={{ marginTop: 32, maxWidth: '62ch' }}>
          <p style={{ fontSize: 15, color: 'var(--pr-lede)', lineHeight: 1.75, margin: '0 0 14px' }}>
            I help designers do their best work by building scalable processes, enabling the right tools, and aligning teams around shared standards so design can move faster, with clarity and confidence.
          </p>
          <p style={{ fontSize: 15, color: 'var(--pr-lede)', lineHeight: 1.75, margin: 0 }}>
            I am a designer by trade who grew into systems thinking. I have spent the last several years at Southwest Airlines building and scaling the Heart Design System across web and native platforms.
          </p>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 8 }}>
          {EXPERTISE.map((skill) => (
            <div
              key={skill}
              style={{ fontSize: '13.5px', color: 'var(--pr-fg)', padding: '10px 14px', border: '1px solid var(--pr-rule)' }}
            >
              {skill}
            </div>
          ))}
        </div>

        <SectionLabel>EDUCATION AND CERTIFICATIONS</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 8 }}>
          {EDUCATION.map((item) => (
            <div key={item.title}>
              <p style={{ fontFamily: 'var(--font-archivo)', fontSize: 16, fontWeight: 600, color: 'var(--pr-fg-strong)', margin: '0 0 3px' }}>{item.title}</p>
              <p style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 12, letterSpacing: '0.02em', color: 'var(--pr-muted)', margin: 0 }}>{item.meta}</p>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--pr-rule)', paddingTop: 32, marginTop: 8 }}>
          <p style={{ fontFamily: 'var(--font-archivo)', fontSize: 22, fontWeight: 700, color: 'var(--pr-fg-strong)', margin: '0 0 14px' }}>Want to work together?</p>
          <PressCta href="/contact">GET IN TOUCH</PressCta>
        </div>
      </div>
    </main>
  );
}
