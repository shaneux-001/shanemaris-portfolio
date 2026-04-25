'use client';

import Link from 'next/link';
import { readTimes } from '@/lib/readTime';

export default function Chapter3() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <article style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 4rem' }}>
        {/* Chapter Header */}
        <div style={{ marginBottom: '3rem' }}>
          <Link
            href="/work/heart-design-system"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: 'var(--color-accent)',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '1.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            ← Back to Heart DS
          </Link>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '1rem',
              marginTop: 0,
            }}
          >
            Chapter 3 of 4
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--color-ink)',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
              marginTop: 0,
            }}
          >
            The Moment It Clicked
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1rem',
              color: 'var(--color-muted)',
              marginBottom: '1rem',
              marginTop: 0,
            }}
          >
            Gift Card POC
          </p>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: 'var(--color-muted)',
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            Read time: {readTimes.chapter3}
          </p>
        </div>

        {/* Hero Image */}
        <div
          style={{
            backgroundColor: 'rgba(123, 94, 167, 0.08)',
            borderRadius: '8px',
            aspectRatio: '1 / 0.56',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-muted)',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-inter)',
          }}
        >
          Chapter 3 Hero Image
        </div>

        {/* Chapter Content */}
        <div
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.0625rem',
            color: 'var(--color-ink)',
          }}
        >
          <p>
            Southwest's gift card experience worked. Customers could buy and redeem without issue. But underneath, it was still wearing Leapfrog — our 2008 design language — untouched through years of rebrands. Years of piecemealing a site of this scale meant some corners never got updated. They just waited.
          </p>

          <p>
            Which made the gift card flow a perfect candidate for something I'd been wanting to prove.
          </p>

          {/* Image Break */}
          <div
            style={{
              backgroundColor: 'rgba(123, 94, 167, 0.08)',
              borderRadius: '8px',
              aspectRatio: '1.5 / 1',
              margin: '3rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-muted)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Before / After Gift Card Flow
          </div>

          <p>
            No new features. No new flows. Just take what existed and translate it into Heart, component for component. The gift card flow was relatively sheltered — not a booking flow, not check-in. Lower stakes, but still real.
          </p>

          <blockquote
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.75rem',
              fontStyle: 'italic',
              color: 'var(--color-accent)',
              borderLeft: '4px solid var(--color-accent)',
              paddingLeft: '2rem',
              margin: '3rem 0',
              lineHeight: 1.4,
            }}
          >
            One engineer. One weekend. Full front-end, done.
          </blockquote>

          <p>
            He had documented components, defined tokens, and a system built to be used — so he used it. What would have previously taken a sprint or more of design-to-development back and forth was done before Monday morning. The delivered experience was visually consistent, the code was cleaner, and almost no interpretation was required.
          </p>

          {/* Image Break */}
          <div
            style={{
              backgroundColor: 'rgba(123, 94, 167, 0.08)',
              borderRadius: '8px',
              aspectRatio: '1.5 / 1',
              margin: '3rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-muted)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Component Library / Token Usage
          </div>

          <p>
            Leadership noticed — not because I told them the system was working, but because they saw it. That project quietly marked the end of an era. Vision never finished. Heart had made it irrelevant. Everything forward was NextGen, built in Heart.
          </p>
        </div>

        {/* Chapter Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(123, 94, 167, 0.15)',
          }}
        >
          <Link
            href="/work/heart-design-system/chapter-2"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.85';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            ← Previous Chapter
          </Link>

          <Link
            href="/work/heart-design-system/chapter-4"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.85';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Next Chapter →
          </Link>
        </div>
      </article>
    </main>
  );
}
