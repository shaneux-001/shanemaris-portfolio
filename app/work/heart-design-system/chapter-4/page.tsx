'use client';

import Link from 'next/link';

export default function Chapter4() {
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
            Chapter 4 of 4
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
            No Straight Lines
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1rem',
              color: 'var(--color-muted)',
              marginBottom: '2rem',
              marginTop: 0,
            }}
          >
            Scaling
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
          Chapter 4 Hero Image
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
            Scaling a design system is hard. Scaling one without a dedicated team, across two departments, four different teams, and reporting lines that stretch up to two directors and a VP — while the company around you is navigating one of the most turbulent stretches in aviation history — is a different kind of hard.
          </p>

          <p>
            That's where I've been living for the past few years.
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
            Org Chart / Stakeholder Map
          </div>

          <p>
            The challenges came in threes. Getting native engineering to buy in. Finding budget and headcount in a difficult environment. And building the tooling infrastructure — component inventory, documentation, living style guide — the operational bits that determine whether a system scales.
          </p>

          <p>
            None of these are fully solved. I want to be honest about that.
          </p>

          <p>
            Southwest faced serious headwinds — operational crises, investor pressure, business model shifts, and the first layoffs in company history. In that environment, securing resources for a program that lives between departments, without a clean org chart line, was consistently an uphill conversation.
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
            Resilience / Navigation Through Crisis
          </div>

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
            A design system isn't just a technical challenge. It's an organizational one.
          </blockquote>

          <p>
            The components are the easy part. The hard part is alignment — getting the right people pointed in the same direction, across teams with different priorities, timelines, and definitions of done.
          </p>

          <p>
            But this year feels different. Efficiency is at the top of leadership's agenda. I have a new leader who gets it. And for the first time, I have the organizational momentum to right-size the program — solidify the foundation, build the tools we've always needed, and turn what has been an exceptionally resilient grassroots effort into something that scales.
          </p>

          <p>
            The system survived things it probably shouldn't have. Now it's time to let it thrive.
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
            href="/work/heart-design-system/chapter-3"
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
            href="/work/heart-design-system"
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
            Back to Overview
          </Link>
        </div>
      </article>
    </main>
  );
}
