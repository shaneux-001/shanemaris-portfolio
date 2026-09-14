import { ReactNode } from 'react';
import Image from 'next/image';

interface CaseStudyImageProps {
  src: string;
  alt: string;
  dimensions: { width: number; height: number } | null;
  caption?: ReactNode;
  wrapperClassName?: string;
}

/**
 * Image slot used across case study / chapter pages. `dimensions` comes
 * from lib/imageDimensions.ts (an fs read at request time) rather than a
 * hasImage boolean — next/image needs real width/height since these PNGs
 * live in public/ with no build-time asset pipeline, but passing the
 * image's own pixel dimensions (not a fixed box) preserves the same
 * natural-aspect-ratio rendering the plain <img> version had — every
 * export is a fixed width but heights vary per image by design, so no
 * forced aspect-ratio box or object-cover crop — with a 1px bottom border
 * so it reads as grounded rather than floating, and an optional caption
 * directly underneath: visually separate from body copy (small, monospace,
 * muted) and spaced tight to the image so it reads as attached to it, not
 * as another paragraph.
 *
 * When the image doesn't exist (dimensions is null), renders a small
 * invisible spacer instead of a placeholder box — a missing slot shouldn't
 * show a "still needs this" reminder (that's a final decision, "no image
 * here"), but the surrounding paragraphs also shouldn't butt up against
 * each other at plain paragraph-to-paragraph spacing — that reads like the
 * section break was never there. The spacer adds just enough of a pause to
 * imply "something was considered here" without an obviously empty gap.
 */
export default function CaseStudyImage({ src, alt, dimensions, caption, wrapperClassName }: CaseStudyImageProps) {
  if (!dimensions) return <div aria-hidden="true" className="h-6" />;

  return (
    <figure className={`m-0${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        sizes="(min-width: 860px) 700px, 100vw"
        className="block w-full h-auto border-b border-pr-rule-strong"
      />
      {caption && (
        <figcaption className="mt-2 font-plex-mono text-[11px] leading-[1.5] text-pr-muted line-clamp-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
