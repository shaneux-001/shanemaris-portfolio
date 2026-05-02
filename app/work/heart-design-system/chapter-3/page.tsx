'use client';

import Link from 'next/link';
import HoverLink from '@/components/HoverLink';
import { readTimes } from '@/lib/readTime';

export default function Chapter3() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <article style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 4rem' }}>
        {/* Chapter Header */}
        <div style={{ marginBottom: '3rem' }}>
          <HoverLink
            href="/work/heart-design-system"
            hoverEffect="highlight"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: 'var(--color-accent)',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '1.5rem',
            }}
          >
            ← Back to Heart DS
          </HoverLink>

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
              fontSize: '0.8125rem',
              color: 'var(--color-muted)',
              opacity: 0.7,
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
            position: 'relative',
            backgroundColor: 'var(--accent-tint-08)',
            borderRadius: '8px',
            aspectRatio: '1 / 0.56',
            marginBottom: '4rem',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-muted)',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-inter)',
          }}
        >
          Chapter 3 Hero Image
          <img
            src="/work/heart-design-system/chapter-3-hero.jpg"
            alt="Chapter 3 — The Moment It Clicked"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
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
            Southwest&apos;s gift card experience worked. Customers could buy and redeem without issue. But underneath, it was still wearing Leapfrog — our 2008 design language — untouched through years of rebrands. Years of piecemealing a site of this scale meant some corners never got updated. They just waited.
          </p>

          <p>
            Which made the gift card flow a perfect candidate for something I&apos;d been wanting to prove.
          </p>

          {/* Image Break 1 */}
          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--accent-tint-08)',
              borderRadius: '8px',
              aspectRatio: '1.5 / 1',
              margin: '3rem 0',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-muted)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Before / After Gift Card Flow
            <img
              src="/work/heart-design-system/chapter-3-section-1.jpg"
              alt="Before / After — Gift Card Flow"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
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

          {/* Image Break 2 */}
          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--accent-tint-08)',
              borderRadius: '8px',
              aspectRatio: '1.5 / 1',
              margin: '3rem 0',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-muted)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Component Library / Token Usage
            <img
              src="/work/heart-design-system/chapter-3-section-2.jpg"
              alt="Component Library — Token Usage"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
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
            borderTop: '1px solid var(--accent-tint-15)',
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
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'box-shadow var(--motion-slow) var(--ease-default), transform var(--motion-default) var(--ease-default)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-underglow-strong)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
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
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'box-shadow var(--motion-slow) var(--ease-default), transform var(--motion-default) var(--ease-default)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-underglow-strong)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            Next Chapter →
          </Link>
        </div>
      </article>
    </main>
  );
}
