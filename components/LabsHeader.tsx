'use client';

import Link from 'next/link';

export default function LabsHeader() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        backgroundColor: 'var(--color-base)',
        borderBottom: '1px solid rgba(123, 94, 167, 0.1)',
        zIndex: 10000,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'var(--color-ink)',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        ShaneUX Labs
      </Link>

      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.875rem',
            color: 'var(--color-ink)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-ink)';
          }}
        >
          Home
        </Link>
        <Link
          href="/work"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.875rem',
            color: 'var(--color-ink)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-ink)';
          }}
        >
          Work
        </Link>
        <Link
          href="/contact"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.875rem',
            color: 'var(--color-ink)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-ink)';
          }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
