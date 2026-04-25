'use client';

import { portfolioProjects } from '@/lib/projects';

const supportingProjects = portfolioProjects.filter(p => p.slug !== 'heart-design-system');

export default function WorkPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      {/* Featured Project: Heart DS */}
      <section style={{ padding: '0 4rem' }}>
        <div
          style={{
            marginBottom: '6rem',
            padding: '4rem',
            backgroundColor: 'rgba(123, 94, 167, 0.08)',
            borderRadius: '12px',
            border: '1px solid rgba(123, 94, 167, 0.15)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            {/* Featured Image */}
            <div
              style={{
                backgroundColor: 'rgba(123, 94, 167, 0.1)',
                borderRadius: '8px',
                aspectRatio: '1 / 0.85',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-muted)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Placeholder: Heart DS Hero Image
            </div>

            {/* Featured Content */}
            <div>
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
                Featured Case Study
              </p>

              <h2
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '3rem',
                  color: 'var(--color-ink)',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                  marginTop: 0,
                }}
              >
                Heart Design System
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '1.125rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                  maxWidth: '28rem',
                }}
              >
                From grassroots effort to enterprise-scale design infrastructure. How I built and scaled Heart across web, iOS, and Android platforms at Southwest Airlines.
              </p>

              <a
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
                  display: 'inline-block',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.85';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                Read Full Case Study
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Projects Grid */}
      <section style={{ padding: '0 4rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '1.5rem',
            color: 'var(--color-ink)',
            marginBottom: '3rem',
            marginTop: 0,
          }}
        >
          Other Work
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
        >
          {supportingProjects.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              style={{
                textDecoration: 'none',
                transition: 'transform 0.2s, opacity 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'padding 0.2s',
                  padding: '0 0 0 0',
                }}
                onMouseEnter={(e) => {
                  const parent = e.currentTarget as HTMLDivElement;
                  parent.style.padding = '0 1rem 0 1rem';
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget as HTMLDivElement;
                  parent.style.padding = '0 0 0 0';
                }}
              >
                {/* Project Image */}
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
                    marginLeft: '-1rem',
                    marginRight: '-1rem',
                    width: 'calc(100% + 2rem)',
                  }}
                >
                  Placeholder
                </div>

                {/* Project Title */}
                <h4
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '1.25rem',
                    color: 'var(--color-ink)',
                    marginBottom: '0.5rem',
                    marginTop: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </h4>

                {/* Project Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.875rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                    marginBottom: 0,
                    marginTop: '0.5rem',
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
