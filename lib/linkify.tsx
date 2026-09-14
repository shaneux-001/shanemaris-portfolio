import { Fragment, type ReactNode } from 'react';

// Matches markdown-style [label](url) links first, falling back to bare
// URLs — lets case study markdown use either `[Slides](https://...)` for
// clean link text, or just paste a raw URL when there's no natural label.
const TOKEN_PATTERN = /(\[[^\]]+\]\(https?:\/\/[^)]+\))|(https?:\/\/[^\s]+)/g;
const MARKDOWN_LINK = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/;

/**
 * Turns markdown-style [label](url) links and bare http(s) URLs inside
 * plain text into real, clickable inline links — used for markdown-sourced
 * case study body copy. Bare URLs have trailing punctuation/dashes trimmed
 * off (e.g. a " — " separating two links, or a trailing period) since
 * that's sentence formatting, not part of the URL.
 */
export function linkifyText(text: string): ReactNode {
  const parts = text.split(TOKEN_PATTERN).filter((part) => part !== undefined);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const mdMatch = part.match(MARKDOWN_LINK);
    if (mdMatch) {
      const [, label, url] = mdMatch;
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-pr-rule-strong underline-offset-2 hover:text-pr-accent-text transition-colors"
        >
          {label}
        </a>
      );
    }

    if (!/^https?:\/\//.test(part)) {
      return <Fragment key={i}>{part}</Fragment>;
    }

    const trailingPunctuation = /[).,;:!?—-]+$/;
    const match = part.match(trailingPunctuation);
    const trail = match ? match[0] : '';
    const url = trail ? part.slice(0, -trail.length) : part;

    return (
      <Fragment key={i}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-pr-rule-strong underline-offset-2 hover:text-pr-accent-text transition-colors"
        >
          {url}
        </a>
        {trail}
      </Fragment>
    );
  });
}
