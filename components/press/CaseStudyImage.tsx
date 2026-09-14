import { ReactNode } from 'react';

interface CaseStudyImageProps {
  src: string;
  alt: string;
  hasImage: boolean;
  caption?: ReactNode;
  wrapperClassName?: string;
}

/**
 * Image slot used across case study / chapter pages (fs.existsSync check
 * passed in as hasImage). Renders at the image's own natural aspect ratio —
 * every export is a fixed width but heights vary per image by design, so no
 * forced aspect-ratio box or object-cover crop — with a 1px bottom border so
 * it reads as grounded rather than floating, and an optional caption
 * directly underneath: visually separate from body copy (small, monospace,
 * muted) and spaced tight to the image so it reads as attached to it, not
 * as another paragraph.
 *
 * Renders nothing when the image doesn't exist — a missing slot disappears
 * rather than showing a placeholder box, since that's meant for a final
 * decision ("no image here"), not a mid-progress reminder.
 */
export default function CaseStudyImage({ src, alt, hasImage, caption, wrapperClassName }: CaseStudyImageProps) {
  if (!hasImage) return null;

  return (
    <figure className={`m-0${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      <img src={src} alt={alt} className="block w-full h-auto border-b border-pr-rule-strong" />
      {caption && (
        <figcaption className="mt-2 font-plex-mono text-[11px] leading-[1.5] text-pr-muted line-clamp-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
