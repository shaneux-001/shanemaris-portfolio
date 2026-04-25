'use client';

export default function HeartDSLanding() {
  const chapters = [
    {
      number: 1,
      title: 'The Long Game',
      subtitle: 'Origin Story',
      preview: 'I&apos;ve known design systems were the answer since before most people were calling them that.',
    },
    {
      number: 2,
      title: 'Staying Alive',
      subtitle: 'Pandemic',
      preview: 'When the brand director signed off, things started moving. Then the pandemic hit.',
    },
    {
      number: 3,
      title: 'The Moment It Clicked',
      subtitle: 'Gift Card POC',
      preview: 'Southwest&apos;s gift card experience worked. But underneath, it was still wearing Leapfrog.',
    },
    {
      number: 4,
      title: 'No Straight Lines',
      subtitle: 'Scaling',
      preview: 'Scaling a design system is hard. Scaling one without a dedicated team is a different kind of hard.',
    },
  ];

  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <section style={{ padding: '0 4rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
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
            Case Study
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: 'var(--color-ink)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              marginTop: 0,
            }}
          >
            Heart Design System
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1.125rem',
              color: 'var(--color-muted)',
              lineHeight: 1.75,
              maxWidth: '48rem',
              marginBottom: '1rem',
            }}
          >
            From grassroots effort to enterprise-scale design infrastructure. The story of how I built and scaled Heart across web, iOS, and Android platforms at Southwest Airlines—and what I learned along the way.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: 'var(--color-muted)',
              marginBottom: 0,
            }}
          >
            Read time: ~12 minutes
          </p>
        </div>

        {/* Chapter Grid */}
        <div style={{ marginTop: '4rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.5rem',
              color: 'var(--color-ink)',
              marginBottom: '2rem',
              marginTop: 0,
            }}
          >
            Four chapters tell the story
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
            }}
          >
            {chapters.map((chapter) => (
              <a
                key={chapter.number}
                href={`/work/heart-design-system/chapter-${chapter.number}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Chapter Image */}
                <div
                  style={{
                    backgroundColor: 'rgba(123, 94, 167, 0.08)',
                    borderRadius: '8px',
                    aspectRatio: '1 / 0.67',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-muted)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  Chapter {chapter.number} Image
                </div>

                {/* Chapter Info */}
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                  }}
                >
                  Chapter {chapter.number}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '1.5rem',
                    color: 'var(--color-ink)',
                    marginBottom: '0.25rem',
                    marginTop: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {chapter.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.75rem',
                    color: 'var(--color-muted)',
                    marginBottom: '0.75rem',
                    marginTop: 0,
                  }}
                >
                  {chapter.subtitle}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                    marginBottom: 0,
                    marginTop: 'auto',
                  }}
                >
                  {chapter.preview}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
