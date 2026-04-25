'use client';

import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import ParticleBackgroundSubtle from '@/components/ParticleBackgroundSubtle';
import ParticleBackgroundNetwork from '@/components/ParticleBackgroundNetwork';

export default function ParticleDemoPage() {
  const [selected, setSelected] = useState<'interactive' | 'subtle' | 'network'>('interactive');

  const renderParticles = () => {
    switch (selected) {
      case 'interactive':
        return <ParticleBackground />;
      case 'subtle':
        return <ParticleBackgroundSubtle />;
      case 'network':
        return <ParticleBackgroundNetwork />;
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-base)' }}>
      {renderParticles()}

      {/* Control Panel */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          padding: '1.5rem',
          backgroundColor: 'rgba(247, 245, 242, 0.95)',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(123, 94, 167, 0.15)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
        }}
      >
        <button
          onClick={() => setSelected('interactive')}
          style={{
            padding: '0.75rem 1.5rem',
            fontFamily: 'var(--font-inter)',
            fontSize: '0.875rem',
            fontWeight: 500,
            border: 'none',
            borderRadius: '6px',
            backgroundColor: selected === 'interactive' ? 'var(--color-accent)' : 'var(--color-muted)',
            color: selected === 'interactive' ? '#fff' : 'var(--color-ink)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          Option 1: Interactive
        </button>

        <button
          onClick={() => setSelected('subtle')}
          style={{
            padding: '0.75rem 1.5rem',
            fontFamily: 'var(--font-inter)',
            fontSize: '0.875rem',
            fontWeight: 500,
            border: 'none',
            borderRadius: '6px',
            backgroundColor: selected === 'subtle' ? 'var(--color-accent)' : 'var(--color-muted)',
            color: selected === 'subtle' ? '#fff' : 'var(--color-ink)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          Option 2: Subtle
        </button>

        <button
          onClick={() => setSelected('network')}
          style={{
            padding: '0.75rem 1.5rem',
            fontFamily: 'var(--font-inter)',
            fontSize: '0.875rem',
            fontWeight: 500,
            border: 'none',
            borderRadius: '6px',
            backgroundColor: selected === 'network' ? 'var(--color-accent)' : 'var(--color-muted)',
            color: selected === 'network' ? '#fff' : 'var(--color-ink)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          Option 3: Network
        </button>
      </div>

      {/* Info Panel */}
      <div
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          maxWidth: '28rem',
          padding: '2rem',
          backgroundColor: 'rgba(247, 245, 242, 0.95)',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(123, 94, 167, 0.15)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '1.5rem',
            color: 'var(--color-ink)',
            marginTop: 0,
            marginBottom: '1rem',
          }}
        >
          Particle Background Options
        </h2>

        {selected === 'interactive' && (
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9375rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
              }}
            >
              <strong>Interactive with Mouse Following</strong>
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
              }}
            >
              Particles respond gently to mouse position. More engaging, adds interactivity. 30 particles, square shapes.
            </p>
          </div>
        )}

        {selected === 'subtle' && (
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9375rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
              }}
            >
              <strong>Minimal & Gentle</strong>
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
              }}
            >
              Very subtle floating particles, no interaction. Barely noticeable, very calm. 15 particles, circular, slower movement.
            </p>
          </div>
        )}

        {selected === 'network' && (
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9375rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
              }}
            >
              <strong>Network with Connections</strong>
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
              }}
            >
              Particles with subtle connecting lines. Balanced approach—subtle but visually interesting. 20 particles with network lines.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
