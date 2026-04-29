/**
 * Server-side utility for reading case study content from content/work/*.md files.
 *
 * NO external dependencies — uses Node's built-in fs + path modules.
 * Must only be called from server components or server actions (not 'use client' files).
 *
 * MD file format:
 *
 *   ---
 *   tagline: "Short description for the /work grid card."
 *   eyebrow: Lead UX Designer · Southwest Airlines
 *   role: Lead UX Designer
 *   timeline: 2022–2023
 *   platform: "Web · southwest.com"
 *   readTime: 4 minutes
 *   ---
 *
 *   Summary paragraph(s) here, before the first ## heading.
 *
 *   ## Section Heading
 *
 *   Section body text.
 *
 *   ## Another Section
 *
 *   More text here.
 */

import fs from 'fs';
import path from 'path';

export interface MdSection {
  heading: string;
  body: string;
}

export interface ParsedProject {
  slug: string;
  tagline: string;
  eyebrow: string;
  role: string;
  timeline: string;
  platform: string;
  readTime: string;
  summary: string;
  sections: MdSection[];
}

/**
 * Parse simple YAML frontmatter (key: value pairs only — no nesting, no lists).
 * Values may be wrapped in single or double quotes; they will be stripped.
 */
function parseFrontmatter(content: string): { data: Record<string, string>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const yamlStr = match[1];
  const body = match[2];

  const data: Record<string, string> = {};
  for (const line of yamlStr.split('\n')) {
    const colonIdx = line.indexOf(': ');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const rawValue = line.slice(colonIdx + 2).trim();
    // Strip surrounding quotes (single or double)
    data[key] = rawValue.replace(/^(["'])([\s\S]*)\1$/, '$2');
  }

  return { data, body };
}

/**
 * Split the markdown body into a summary block and named sections.
 * Sections are delineated by ## headings.
 */
function parseBody(body: string): { summary: string; sections: MdSection[] } {
  const parts = body.split(/^## /m);
  const summary = parts[0].trim();

  const sections: MdSection[] = parts.slice(1).map((part) => {
    const firstNewline = part.indexOf('\n');
    if (firstNewline === -1) return { heading: part.trim(), body: '' };
    return {
      heading: part.slice(0, firstNewline).trim(),
      body: part.slice(firstNewline).trim(),
    };
  });

  return { summary, sections };
}

/**
 * Read and parse a single project's markdown file.
 * Returns null if the file doesn't exist.
 */
export function getProjectMd(slug: string): ParsedProject | null {
  const filePath = path.join(process.cwd(), 'content', 'work', `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, body } = parseFrontmatter(raw);
  const { summary, sections } = parseBody(body);

  return {
    slug,
    tagline:  data.tagline  ?? '',
    eyebrow:  data.eyebrow  ?? '',
    role:     data.role     ?? '',
    timeline: data.timeline ?? '',
    platform: data.platform ?? '',
    readTime: data.readTime ?? '3 minutes',
    summary,
    sections,
  };
}

/**
 * Read taglines for multiple slugs — used on the /work grid page.
 * Slugs without a matching file return an empty string tagline.
 */
export function getProjectTaglines(slugs: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const slug of slugs) {
    const project = getProjectMd(slug);
    result[slug] = project?.tagline ?? '';
  }
  return result;
}
