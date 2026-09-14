import { Fragment, type ReactNode } from 'react';

// Matches markdown-style [label](url) links first, falling back to bare
// URLs — lets case study markdown use either `[Slides](https://...)` for
// clean link text, or just paste a raw URL when there's no natural label.
const TOKEN_PATTERN = /(\[[^\]]+\]\(https?:\/\/[^)]+\))|(https?:\/\/[^\s]+)/g;
const MARKDOWN_LINK = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/;

function linkifyLine(line: string, keyPrefix: string): ReactNode {
  const parts = line.split(TOKEN_PATTERN).filter((part) => part !== undefined);
  if (parts.length === 1) return line;

  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    const mdMatch = part.match(MARKDOWN_LINK);
    if (mdMatch) {
      const [, label, url] = mdMatch;
      return (
        <a
          key={key}
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
      return <Fragment key={key}>{part}</Fragment>;
    }

    const trailingPunctuation = /[).,;:!?—-]+$/;
    const match = part.match(trailingPunctuation);
    const trail = match ? match[0] : '';
    const url = trail ? part.slice(0, -trail.length) : part;

    return (
      <Fragment key={key}>
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

/**
 * Turns markdown-style [label](url) links and bare http(s) URLs inside
 * plain text into real, clickable inline links — used for markdown-sourced
 * case study body copy. Bare URLs have trailing punctuation/dashes trimmed
 * off (e.g. a " | " separating two links, or a trailing period) since
 * that's sentence formatting, not part of the URL.
 *
 * A literal newline in the source text becomes a real line break (<br />)
 * — section bodies render as a single paragraph, but markdown source can
 * still put something like a "Slides | Webinar" links line on its own row
 * by just breaking the line in the .md file.
 */
export function linkifyText(text: string): ReactNode {
  const lines = text.split('\n');
  if (lines.length === 1) return linkifyLine(text, '0');

  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {linkifyLine(line, String(i))}
    </Fragment>
  ));
}
