'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { initKonamiCode } from '@/lib/konami';
import PressCta from '@/components/press/PressCta';
import Ghost from '@/components/press/Ghost';

export default function Home() {
  useEffect(() => {
    const cleanup = initKonamiCode(() => {
      window.location.href = '/labs';
    });
    return cleanup;
  }, []);

  return (
    <main className="pr-page">
      <div className="pr-main">
      <div
        style={{
          position: 'relative',
          padding: 'clamp(40px, 6vw, 68px) 0 clamp(40px, 5vw, 56px)',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ borderRight: '1px solid var(--pr-grid-line)' }} />
          ))}
          <div />
        </div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', left: -70, top: 30, width: 470, height: 210,
            background: 'radial-gradient(ellipse at 42% 50%, var(--pr-glow-a), transparent 66%)',
            filter: 'blur(30px)', pointerEvents: 'none', willChange: 'transform',
            animation: 'pr-drift-a 28s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', left: 150, top: 130, width: 430, height: 195,
            background: 'radial-gradient(ellipse at 55% 50%, var(--pr-glow-b), transparent 66%)',
            filter: 'blur(30px)', pointerEvents: 'none', willChange: 'transform',
            animation: 'pr-drift-b 34s ease-in-out infinite',
          }}
        />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 680 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.1em', color: 'var(--pr-muted)' }}>
            <span style={{ width: 14, height: 1, background: 'var(--pr-cyan)' }} />
            <span>DESIGN OPS &amp; SYSTEMS · SOUTHWEST AIRLINES</span>
          </div>
          <h1 className="pr-hero-title" style={{ margin: 0, fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 0.98, letterSpacing: '-0.035em', color: 'var(--pr-fg-strong)' }}>
            I design systems that scale.
          </h1>
          <p className="pr-lede" style={{ margin: 0, lineHeight: 1.6, color: 'var(--pr-lede)', maxWidth: '44ch' }}>
            Building the foundations product teams rely on at Southwest Airlines.
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', paddingTop: 4 }}>
            <PressCta href="/resume">VIEW RESUME</PressCta>
            <PressCta href="/about" variant="secondary">ABOUT ME</PressCta>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--pr-rule)', padding: 'clamp(32px, 4vw, 40px) 0 clamp(30px, 4vw, 36px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.1em', color: 'var(--pr-magenta)', marginBottom: 18 }}>
          <span style={{ width: 14, height: 1, background: 'var(--pr-magenta)' }} />
          <span>LEAD CASE STUDY</span>
        </div>
        <div className="pr-lead-grid">
          <div
            style={{
              aspectRatio: '4 / 3',
              minWidth: 0,
              background: 'repeating-linear-gradient(45deg, var(--pr-surface) 0 8px, var(--pr-surface-2) 8px 16px)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 14,
            }}
          >
            <span style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-muted)' }}>heart-ds-hero.jpg</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
            <h2 className="pr-lead-title" style={{ margin: 0, fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.025em', color: 'var(--pr-fg-strong)' }}>
              Heart Design System
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--pr-lede)' }}>
              From grassroots effort to enterprise-scale design infrastructure. How I built and scaled Heart across web, iOS, and Android platforms at Southwest Airlines.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.04em' }}>
              <span style={{ border: '1px solid var(--pr-cyan)', color: 'var(--pr-cyan)', padding: '4px 8px' }}>WEB</span>
              <span style={{ border: '1px solid var(--pr-rule-strong)', color: 'var(--pr-muted)', padding: '4px 8px' }}>iOS</span>
              <span style={{ border: '1px solid var(--pr-rule-strong)', color: 'var(--pr-muted)', padding: '4px 8px' }}>ANDROID</span>
            </div>
            <Link
              href="/work/heart-design-system"
              className="pr-arrow-link pr-hoverable"
              style={{
                fontFamily: 'var(--font-plex-mono), monospace',
                fontSize: 12,
                letterSpacing: '0.06em',
                color: 'var(--pr-accent-text)',
                borderBottom: '1px solid var(--pr-accent-text)',
                padding: '0 0 3px',
                alignSelf: 'flex-start',
                marginTop: 4,
                textDecoration: 'none',
              }}
            >
              <Ghost>READ FULL CASE STUDY</Ghost> <span className="pr-row-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
