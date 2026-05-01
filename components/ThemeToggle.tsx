'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from '@phosphor-icons/react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Sync state with whatever the no-FOUC script already set
    setDark(document.documentElement.classList.contains('theme-dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
      localStorage.setItem('theme', 'light');
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-muted)',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        transition: 'color var(--motion-default)',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
    >
      {dark ? <Sun size={16} weight="duotone" /> : <Moon size={16} weight="duotone" />}
    </button>
  );
}
