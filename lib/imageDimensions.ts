import fs from "fs";

/**
 * Reads width/height straight out of a PNG's IHDR chunk (bytes 16-23,
 * big-endian) instead of decoding the whole file. Every image this site
 * serves is a PNG dropped into `public/` at request time (see
 * CaseStudyImage's doc comment) — there's no build-time asset pipeline to
 * hand these to, so `next/image` needs explicit width/height, and this is
 * the cheapest way to get real ones without forcing a crop/aspect-ratio box.
 * Returns null for a missing/unreadable/non-PNG file, which callers treat
 * the same as "no image here."
 */
export function getPngDimensions(absPath: string): { width: number; height: number } | null {
  try {
    const fd = fs.openSync(absPath, "r");
    const buf = Buffer.alloc(24);
    fs.readSync(fd, buf, 0, 24, 0);
    fs.closeSync(fd);
    if (buf.toString("ascii", 1, 4) !== "PNG") return null;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}
