'use client';

import { useEffect, useState } from 'react';

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
      className="pr-toggle-btn"
      style={{
        marginLeft: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '5px 4px',
        color: 'var(--pr-muted)',
        fontSize: '10.5px',
        letterSpacing: '0.08em',
        fontFamily: 'var(--font-plex-mono), monospace',
      }}
    >
      <span className="pr-theme-word">{light ? 'LIGHT' : 'DARK'}</span>
      <span className="pr-toggle-track">
        <span className="pr-toggle-mid" aria-hidden="true" />
        <span className="pr-toggle-knob" style={{ transform: light ? 'translateX(18px)' : 'translateX(0)' }} />
      </span>
    </button>
  );
}
