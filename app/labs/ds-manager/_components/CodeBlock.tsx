'use client';

import { useState } from 'react';
import { Check, Copy, DownloadSimple } from '@phosphor-icons/react';
import { cx } from './ui';

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function downloadText(filename: string, text: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function CopyButton({ text, label = 'Copy', className }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyText(text)) {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        }
      }}
      className={cx('inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[12px] font-medium text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg', className)}
    >
      {done ? <Check size={14} /> : <Copy size={14} />}
      <span aria-live="polite">{done ? 'Copied' : label}</span>
    </button>
  );
}

interface Tab {
  id: string;
  label: string;
  code: string;
  filename?: string;
}

/** Code viewer with optional language tabs, copy, and download. */
export default function CodeBlock({ tabs, className, maxHeight = 420 }: { tabs: Tab[]; className?: string; maxHeight?: number }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  if (!tab) return null;
  return (
    <div className={cx('overflow-hidden rounded-lg border border-ks-border bg-ks-sunken', className)}>
      <div className="flex items-center justify-between gap-2 border-b border-ks-border bg-ks-surface px-2">
        <div role="tablist" className="ks-scroll flex min-w-0 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === tab.id}
              onClick={() => setActive(t.id)}
              className={cx('-mb-px whitespace-nowrap border-b-2 px-2.5 py-2 text-[12.5px] font-medium', t.id === tab.id ? 'border-ks-accent text-ks-fg' : 'border-transparent text-ks-fg-subtle hover:text-ks-fg')}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center">
          {tab.filename && (
            <button
              type="button"
              onClick={() => downloadText(tab.filename!, tab.code)}
              className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[12px] font-medium text-ks-fg-muted hover:bg-ks-surface-2 hover:text-ks-fg"
            >
              <DownloadSimple size={14} />
              <span className="hidden sm:inline">{tab.filename}</span>
            </button>
          )}
          <CopyButton text={tab.code} />
        </div>
      </div>
      <pre className="ks-scroll m-0 overflow-auto p-4 font-ks-mono text-[12.5px] leading-[1.6] text-ks-fg" style={{ maxHeight }}>
        <code>{tab.code}</code>
      </pre>
    </div>
  );
}
