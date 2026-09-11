import { ReactNode } from 'react';

interface CaseStudyImageProps {
  src: string;
  alt: string;
  hasImage: boolean;
  aspectClassName: string;
  caption?: ReactNode;
  wrapperClassName?: string;
}

/**
 * Image slot used across case study / chapter pages: the existing
 * placeholder-or-real-image behavior (fs.existsSync check passed in as
 * hasImage), plus an optional caption directly under the image — visually
 * separate from body copy (small, monospace, muted) and spaced tight to the
 * image so it reads as attached to it, not as another paragraph.
 */
export default function CaseStudyImage({ src, alt, hasImage, aspectClassName, caption, wrapperClassName }: CaseStudyImageProps) {
  const filename = src.split('/').pop() ?? src;
  return (
    <figure className={`m-0${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      <div className={`relative ${aspectClassName} overflow-hidden flex items-end p-3.5 border-b border-pr-rule-strong${hasImage ? "" : " bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]"}`}>
        {hasImage ? (
          <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <span className="font-plex-mono text-[11px] text-pr-muted">{filename}</span>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 font-plex-mono text-[11px] leading-[1.5] text-pr-muted line-clamp-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
