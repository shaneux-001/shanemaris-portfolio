'use client';

import Link from 'next/link';

export default function Chapter2() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <article style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 4rem' }}>
        {/* Chapter Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <Link
              href="/work/heart-design-system"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                color: 'var(--color-accent)',
                textDecoration: 'none',
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
          </div>

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
            Chapter 2 of 4
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
            Staying Alive
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1rem',
              color: 'var(--color-muted)',
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            Pandemic
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
          Chapter 2 Hero Image
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
            When the brand director signed off, things started moving. I got time with Lippincott, one of our brand agencies, to help lay the foundations of the system — a grid at four breakpoints, a typography system, and an expanded color palette that finally broke free from the constraints of Pantone and CMYK values.
          </p>

          <p>
            Then the pandemic hit. The engagement ended a week after the kickoff.
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
            Lippincott Foundations / Color System
          </div>

          <p>
            I thought I was going to lose the whole thing. Aviation didn't pause — it collapsed. Southwest, like every carrier, was in survival mode. Design systems are easy to believe in when business is good. They're a much harder sell when the company is fighting to stay solvent.
          </p>

          <p>
            But out of the prep work we'd already done with Lippincott, and the exceptional partnership we'd built, we were able to salvage what mattered most — the color system, the typography, and the grid. It wasn't everything we'd planned. But it was a foundation. And a foundation was enough to keep going.
          </p>

          <p>
            That's when I was connected to Vince Bratton.
          </p>

          <p>
            Vince was a senior manager in technology with a small foundation team under him — engineers who understood reusable components in the context of React, since Vision had been built on it. But design systems as a discipline, as an organizational philosophy, was new territory for them. I was building the system and teaching the methodology at the same time, to people I was also depending on to help me build it.
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
            Team Foundation / Early Partnership
          </div>

          <p>
            We were laying philosophical and foundational groundwork. Structure. Shared language. The way of thinking about it. The engineering concept clicked early, which helped. But it was slow, and uncertain, and the business case had to be made over and over.
          </p>

          <p>
            My argument was never abstract. Southwest's culture is built on cost discipline. So I spoke that language. <em>Efficiency. Reduced rework. Faster delivery with fewer people.</em> If we could do more with less, the system paid for itself.
          </p>

          <p>
            That argument was slower to land. But it planted seeds.
          </p>

          <p>
            Then 2023 happened.
          </p>

          <p>
            We finally got Figma in the door, replacing Sketch, Abstract, and Zeplin in one move. I attended my first Config — Figma's annual conference — and it's hard to overstate the timing. That was the year Figma announced variables, modes, and Dev Mode from the Config stage. The tooling was finally catching up to the vision. I came back a different kind of energized.
          </p>

          <p>
            What had been a slow burn started moving. Shortly after, I was asked to take what we'd built for responsive web and extend the system's thinking to iOS and Android. Both apps were heavily webview and hybrid at the time, which created its own challenges — but it also opened a door.
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
            Multi-platform Expansion / iOS & Android
          </div>

          <p>
            That's when the team started to take real shape. The foundation pod on the technology side became a consistent crew. A couple of native dev allies came on board. I got my first dedicated contractor. What had been a grassroots effort run mostly on conviction and borrowed time started to look, for the first time, like an actual program.
          </p>

          <p>
            It wasn't official. But it was real.
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
            href="/work/heart-design-system/chapter-1"
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
            Next Chapter →
          </Link>
        </div>
      </article>
    </main>
  );
}
