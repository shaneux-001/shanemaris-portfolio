'use client';

import { useEffect, useState } from 'react';
import Ghost from './Ghost';

export default function PressThemeToggle() {
  // Default dark; synced from whatever the no-FOUC script in layout.tsx
  // already set on <html data-pr-theme> before hydration.
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.getAttribute('data-pr-theme') === 'light');
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.setAttribute('data-pr-theme', 'light');
      localStorage.setItem('pr-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-pr-theme');
      localStorage.setItem('pr-theme', 'dark');
    }
  }

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={light}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className="pr-toggle-btn pr-hoverable ml-3 flex items-center gap-[9px] px-1 py-[5px] text-pr-muted text-[10.5px] tracking-[0.08em] font-plex-mono"
    >
      <span className="pr-theme-word"><Ghost>{light ? 'LIGHT' : 'DARK'}</Ghost></span>
      <span className="pr-toggle-track">
        <span className="pr-toggle-mid" aria-hidden="true" />
        <span className={`pr-toggle-knob ${light ? 'translate-x-[18px]' : 'translate-x-0'}`} />
      </span>
    </button>
  );
}
