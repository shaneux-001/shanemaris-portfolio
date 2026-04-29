'use client';

import Link from 'next/link';
import { readTimes } from '@/lib/readTime';

export default function Chapter1() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem', backgroundColor: 'var(--color-base)' }}>
      <article style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 4rem' }}>
        {/* Chapter Header */}
        <div style={{ marginBottom: '4rem' }}>
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
            Chapter 1 of 4
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
            The Long Game
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
            Origin Story
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
            Read time: {readTimes.chapter1}
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
          Chapter 1 Hero Image
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
            I&apos;ve known design systems were the answer since before most people were calling them that.
          </p>

          <p>
            It was 2013, maybe 2014 — Event Apart in Austin. I sat through a talk on Style Tiles and something clicked. Not just as a design methodology, but as an organizational one. Here was a way to stop redefining the same things over and over, to close the gap between what design intended and what development delivered, to make &quot;digital first&quot; mean something beyond a slide in a deck.
          </p>

          {/* Pullout Quote */}
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
            Build tools, not rules.
          </blockquote>

          <p>
            Around 2017 I was at Delight Conference in Portland when I heard Dan Mall speak for the first time. If Style Tiles gave me the idea, Dan gave me the framework — and more importantly, the philosophy. That line reoriented how I thought about what a design system actually is. Not a governance document. Not a constraint. A gift to the people building alongside you.
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
            Screenshot / Design artifact
          </div>

          <p>
            For years, converting Leapfrog — our 2008 design language — to Vision was like painting a house one brushstroke at a time while someone kept adding rooms. Requests piled up. Timelines stretched. We were moving slowly and inconsistently, and everyone on the ground felt it.
          </p>

          <p>
            So I started with my manager. He&apos;d been a UX designer himself, which helped — he didn&apos;t need a long explanation. He got it. From there it was our director, then the brand director. Each conversation was a rung.
          </p>

          {/* Another Image Break */}
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
            Process / Deck screenshot
          </div>

          <p>
            Eventually I made the case plainly: give me the space to try to fix this. He was supportive — and while the business realities meant he couldn&apos;t hand me a team or a budget, he gave me what he could: permission to spend part of my time on it.
          </p>

          <p>
            That was enough. For a while, that had to be.
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
          <div />

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
            Next Chapter →
          </Link>
        </div>
      </article>
    </main>
  );
}
