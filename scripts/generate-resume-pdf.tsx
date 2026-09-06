/**
 * Generates public/Shane_Maris_Resume.pdf from scripts/resume-pdf-content.ts.
 *
 * Run: npm run generate:resume (generates both the PDF and the .md)
 *
 * Do NOT run this directly with `tsx` or `npx tsx` — it fails with an
 * ERR_PACKAGE_PATH_NOT_EXPORTED error from deep inside @react-pdf/renderer's
 * dependency tree (tsx's CJS-interop resolver chokes on a wildcard "exports"
 * map that Node's own resolver handles fine). The npm script instead bundles
 * this file with esbuild (--packages=external, so third-party packages keep
 * their own internal resolution semantics intact — bundling THOSE in breaks
 * @react-pdf/renderer's self-referencing "#standard-fonts" imports) and runs
 * the result with plain `node`.
 *
 * Re-run whenever resume-pdf-content.ts changes — this is NOT built
 * automatically as part of `npm run build`. Nothing else on the site
 * depends on this script at runtime.
 *
 * Colors are the Press Room system's LIGHT-theme token values (a printed
 * page is always "light"), not the dark-default values used elsewhere on
 * the site — see app/globals.css's [data-pr-theme="light"] block for the
 * source of truth if these ever need to be re-synced.
 */

import React from "react";
import path from "path";
import { fileURLToPath } from "url";
import { Document, Page, Text, View, StyleSheet, Font, Link, renderToFile } from "@react-pdf/renderer";
import { NAME, TITLE, EXPERIENCE, EDUCATION, CERTIFICATIONS, SKILLS } from "./resume-pdf-content";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// PDF-only overrides (2026-09-05, per Shane's review of the first draft) —
// the .md keeps the fuller CONTACT/SUMMARY from resume-pdf-content.ts.
// Not shared with generate-resume-md.ts on purpose.
const CONTACT_PDF = "Dallas, TX · 214.546.3047 · contact@shanemaris.com";
const SUMMARY_PDF = "Design systems and design ops leader with over a decade at Southwest Airlines, currently driving strategy for the airline's customer-facing commercial design system across web and native platforms.";
// Dropped for space, per Shane's rule: cut oldest roles first, absolute
// cutoff is 10 years back. "UX Designer (Contractor)" (Aug 2011–Feb 2012)
// is the only role entirely outside that window — cut here, kept in the
// .md's full EXPERIENCE list.
const EXPERIENCE_PDF = EXPERIENCE.filter((e) => e.role !== "UX Designer (Contractor)");

// NOTE (2026-09-05): tried registering the actual Archivo/IBM Plex Mono TTFs
// (downloaded to resume-source/fonts/ from Google Fonts) to match the site's
// brand typography exactly. Hit a hard crash deep in fontkit's composite-glyph
// metrics parsing (RangeError, offset outside DataView bounds) — looked like a
// specific-glyph issue (likely the em dash) in at least one of those font
// files, not something worth burning more time on for a v1. Falling back to
// @react-pdf/renderer's built-in Helvetica/Helvetica-Bold and Courier, which
// need no font registration and are guaranteed to work. If exact brand-font
// fidelity in the PDF matters later, revisit resume-source/fonts/ — try
// re-sourcing static (non-variable) TTF instances, or a different subset.

// Avoids a tsx/ESM-exports resolution error when @react-pdf/renderer tries
// to dynamically load its English hyphenation dictionary. We don't need
// automatic hyphenation for a resume — disable it outright.
Font.registerHyphenationCallback((word) => [word]);

// Light-theme Press Room tokens (see app/globals.css [data-pr-theme="light"])
const color = {
  fgStrong: "#16161A",
  lede: "#3A3833",
  muted: "#55524B",
  rule: "#D9D5CA",
  magenta: "#C1006A",
  accentText: "#5A2A82",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: color.lede,
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 40,
  },
  name: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    fontSize: 22,
    color: color.fgStrong,
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    color: color.lede,
    marginBottom: 3,
  },
  contact: {
    fontFamily: "Courier",
    fontSize: 8,
    color: color.muted,
    marginBottom: 10,
  },
  summary: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: color.lede,
    marginBottom: 11,
    paddingBottom: 10,
    borderBottom: `1pt solid ${color.rule}`,
  },
  sectionLabel: {
    fontFamily: "Courier",
    fontWeight: 500,
    fontSize: 8,
    letterSpacing: 1,
    color: color.magenta,
    marginBottom: 7,
    marginTop: 2,
  },
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 3,
  },
  roleTitle: {
    fontFamily: "Helvetica",
    fontWeight: 600,
    fontSize: 10.5,
    color: color.fgStrong,
  },
  roleSpan: {
    fontFamily: "Courier",
    fontSize: 7.5,
    color: color.muted,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 5,
    paddingRight: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 9.5,
    color: color.muted,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.48,
    color: color.lede,
  },
  experienceBlock: {
    marginBottom: 9,
  },
  eduRow: {
    marginBottom: 6,
  },
  eduTitle: {
    fontFamily: "Helvetica",
    fontWeight: 600,
    fontSize: 9.5,
    color: color.fgStrong,
  },
  eduMeta: {
    fontFamily: "Courier",
    fontSize: 7.5,
    color: color.muted,
  },
  skillsText: {
    fontSize: 8.5,
    lineHeight: 1.6,
    color: color.lede,
  },
  link: {
    color: color.accentText,
    textDecoration: "none",
  },
});

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>—</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function ResumeDocument() {
  return (
    <Document title={`${NAME} — Resume`} author={NAME}>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{NAME}</Text>
        <Text style={styles.title}>{TITLE}</Text>
        <Text style={styles.contact}>
          {CONTACT_PDF} ·{" "}
          <Link src="https://www.linkedin.com/in/shanemaris/" style={styles.link}>linkedin.com/in/shanemaris</Link>
        </Text>

        <Text style={styles.summary}>{SUMMARY_PDF}</Text>

        <Text style={styles.sectionLabel}>EXPERIENCE — SOUTHWEST AIRLINES, 2011 TO PRESENT</Text>
        {EXPERIENCE_PDF.map((e) => (
          <View key={e.role} style={styles.experienceBlock} wrap={false}>
            <View style={styles.roleRow}>
              <Text style={styles.roleTitle}>{e.role}</Text>
              <Text style={styles.roleSpan}>{e.span.toUpperCase()}</Text>
            </View>
            {e.bullets.map((b, i) => <Bullet key={i}>{b}</Bullet>)}
          </View>
        ))}

        <Text style={styles.sectionLabel}>EDUCATION AND CERTIFICATIONS</Text>
        {[...EDUCATION, ...CERTIFICATIONS].map((item) => (
          <View key={item.title} style={styles.eduRow}>
            <Text style={styles.eduTitle}>{item.title}</Text>
            <Text style={styles.eduMeta}>{item.meta}</Text>
          </View>
        ))}

        <Text style={styles.sectionLabel}>EXPERTISE</Text>
        <Text style={styles.skillsText}>{SKILLS.join("  ·  ")}</Text>
      </Page>
    </Document>
  );
}

const outPath = path.join(dirname, "..", "public", "Shane_Maris_Resume.pdf");
renderToFile(<ResumeDocument />, outPath).then(() => {
  console.log(`Wrote ${outPath}`);
});
