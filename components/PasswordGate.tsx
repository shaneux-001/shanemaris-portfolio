'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validatePassword } from '@/lib/password';
import LabsHeader from './LabsHeader';

interface PasswordGateProps {
  projectSlug: string;
  projectTitle: string;
  config: {
    password?: string;
    expiryDays?: number;
  };
  children: React.ReactNode;
}

export default function PasswordGate({
  projectSlug,
  projectTitle,
  config,
  children,
}: PasswordGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (validatePassword(password, config)) {
      setIsUnlocked(true);
      setPassword('');
    } else {
      setError('Incorrect password');
    }

    setIsSubmitting(false);
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <>
      <LabsHeader />

      {/* Password Gate Modal */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(247, 245, 242, 0.95)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
        }}
      >
      <div
        style={{
          maxWidth: '32rem',
          padding: '3rem',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '2.25rem',
            color: 'var(--color-ink)',
            marginBottom: '1rem',
          }}
        >
          {projectTitle}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1rem',
            color: 'var(--color-muted)',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          This project is password protected. Enter the password to continue.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={isSubmitting}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              border: `1.5px solid ${error ? '#D95F4B' : 'var(--color-muted)'}`,
              backgroundColor: 'var(--color-base)',
              color: 'var(--color-ink)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? '#D95F4B' : 'var(--color-muted)';
            }}
          />

          {error && (
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                color: '#D95F4B',
                margin: '0',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: password ? 'var(--color-accent)' : 'var(--color-muted)',
              color: '#fff',
              cursor: password && !isSubmitting ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s',
            }}
          >
            {isSubmitting ? 'Checking...' : 'Unlock'}
          </button>
        </form>

        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.75rem',
            color: 'var(--color-muted)',
            marginTop: '2rem',
            marginBottom: '0',
            lineHeight: 1.6,
          }}
        >
          Passwords expire {config.expiryDays || 30} days after first use. Contact Shane for access.
        </p>
      </div>
      </div>
    </>
  );
}
