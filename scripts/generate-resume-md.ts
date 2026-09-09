/**
 * Generates public/Shane_Maris_Resume.md — the plain-text-readable download,
 * mirroring the same condensed content as the PDF (scripts/resume-pdf-content.ts),
 * not the full uncondensed resume-source/Shane_Maris_Resume.md master.
 *
 * Run: npx tsx scripts/generate-resume-md.ts
 */

import fs from "fs";
import path from "path";
import { NAME, TITLE, CONTACT, SUMMARY, EXPERIENCE, EDUCATION, CERTIFICATIONS, SKILLS } from "./resume-pdf-content";

const lines: string[] = [];

lines.push(`# ${NAME}`, "");
lines.push(`**${TITLE}**`);
lines.push(CONTACT, "");
lines.push("---", "");
lines.push("## Summary", "");
lines.push(SUMMARY, "");
lines.push("---", "");
lines.push("## Experience", "");

for (const e of EXPERIENCE) {
  lines.push(`### ${e.role}`);
  lines.push(`*${e.span}*`, "");
  for (const b of e.bullets) lines.push(`- ${b}`);
  // Extra blank line between role entries (not just one) — this file is
  // meant to be readable as raw plain text, not only rendered markdown,
  // and a single blank line reads cramped between entries once opened
  // outside a markdown viewer. Kept to a blank-line gap rather than a
  // "---" per entry — that many dividers inside one section would be
  // more clutter than breathing room.
  lines.push("", "");
}
lines.pop(); // drop the trailing extra blank line before the section's own "---"

lines.push("---", "");
lines.push("## Education", "");
for (const item of EDUCATION) {
  lines.push(`**${item.title}**`);
  lines.push(item.meta, "");
}

lines.push("---", "");
lines.push("## Certifications", "");
for (const item of CERTIFICATIONS) {
  lines.push(`- ${item.title} — ${item.meta}`);
}
lines.push("");

lines.push("---", "");
lines.push("## Skills", "");
lines.push(SKILLS.join(" · "), "");

const outPath = path.join(__dirname, "..", "public", "Shane_Maris_Resume.md");
fs.writeFileSync(outPath, lines.join("\n"));
console.log(`Wrote ${outPath}`);
