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
 *
 * Fonts are the real Archivo (headings/UI) + IBM Plex Mono (labels/mono
 * metadata) static TTFs in resume-source/fonts/ — the same pair the site
 * uses via next/font/google (see app/layout.tsx). Body copy stays on
 * @react-pdf/renderer's built-in Helvetica: the site's body font is Inter,
 * but no static Inter TTF is vendored here, and body copy carries far less
 * of the site's visual identity than the Archivo/Plex Mono pairing does.
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
const SUMMARY_PDF = "Design systems and design ops leader with a decade-plus career at Southwest Airlines, currently driving strategy for the airline's customer-facing commercial design system, spanning responsive web and native iOS and Android.";
// Dropped for space, per Shane's rule: cut oldest roles first, absolute
// cutoff is 10 years back. "UX Designer (Contractor)" (Aug 2011–Feb 2012)
// is the only role entirely outside that window — cut here, kept in the
// .md's full EXPERIENCE list.
const EXPERIENCE_PDF = EXPERIENCE.filter((e) => e.role !== "UX Designer (Contractor)");

// Static (non-variable) TTF instances, subsetted 2026-09-08 with fontTools
// (basic Latin + em/en dash, middle dot, curly quotes, ellipsis) — the
// 2026-09-05 crash was real, but it wasn't about any glyph this resume
// actually renders: a handful of unrelated, corrupted composite glyphs sat
// at the tail end of the original Google Fonts TTF exports (Archivo-Regular
// glyphs 771-773, IBM Plex Mono Regular/Medium glyphs 991-994), and
// react-pdf's font embedding walks the whole glyph table, not just the
// glyphs actually used, so it crashed regardless of what text was on the
// page. Subsetting to the character set below drops those dead glyphs
// entirely. If the resume ever needs a character outside this set, re-run
// the subset command (see resume-source/fonts/) with an expanded --unicodes.
const fontsDir = path.join(dirname, "..", "resume-source", "fonts");
Font.register({
  family: "Archivo",
  fonts: [
    { src: path.join(fontsDir, "Archivo-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "Archivo-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fontsDir, "Archivo-Bold.ttf"), fontWeight: 700 },
  ],
});
Font.register({
  family: "IBM Plex Mono",
  fonts: [
    { src: path.join(fontsDir, "IBMPlexMono-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "IBMPlexMono-Medium.ttf"), fontWeight: 500 },
  ],
});

// Avoids a tsx/ESM-exports resolution error when @react-pdf/renderer tries
// to dynamically load its English hyphenation dictionary. We don't need
// automatic hyphenation for a resume — disable it outright.
Font.registerHyphenationCallback((word) => [word]);

// Light-theme Press Room tokens (see app/globals.css [data-pr-theme="light"]).
// Re-synced 2026-09-08 — lede/muted had drifted from the live site (the site
// retuned both values at some point after this file's first pass and this
// snapshot was never updated).
const color = {
  fgStrong: "#16161A",
  lede: "#55524B",
  muted: "#6B675F",
  rule: "#D9D5CA",
  magenta: "#C1006A",
  accentText: "#5A2A82",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: color.lede,
    paddingTop: 22,
    paddingBottom: 18,
    paddingHorizontal: 40,
  },
  name: {
    fontFamily: "Archivo",
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
    fontFamily: "IBM Plex Mono",
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
    fontFamily: "IBM Plex Mono",
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
    fontFamily: "Archivo",
    fontWeight: 600,
    fontSize: 10.5,
    color: color.fgStrong,
  },
  roleSpan: {
    fontFamily: "IBM Plex Mono",
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
    fontFamily: "Archivo",
    fontWeight: 600,
    fontSize: 9.5,
    color: color.fgStrong,
  },
  eduMeta: {
    fontFamily: "IBM Plex Mono",
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
        <Text style={styles.skillsText}>{SKILLS.join(" · ")}</Text>
      </Page>
    </Document>
  );
}

const outPath = path.join(dirname, "..", "public", "Shane_Maris_Resume.pdf");
renderToFile(<ResumeDocument />, outPath).then(() => {
  console.log(`Wrote ${outPath}`);
});
