/**
 * Case study detail page — SERVER COMPONENT.
 * Reads content from content/work/[slug].md via lib/parseProjectMd.ts.
 * Interactive hover links are delegated to components/HoverLink.tsx (client).
 */

import { Clock, CalendarBlank, Monitor, Briefcase } from '@phosphor-icons/react/dist/ssr';
import { portfolioProjects } from '@/lib/projects';
import { getProjectMd } from '@/lib/parseProjectMd';
import HoverLink from '@/components/HoverLink';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 4rem' }}>
          <h1>Project not found</h1>
          <p>
            <HoverLink
              href="/work"
              hoverEffect="highlight"
              style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
            >
              Back to work
            </HoverLink>
          </p>
        </div>
      </main>
    );
  }

  const content = getProjectMd(slug);

  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <article style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 4rem' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: '3rem' }}>
          <HoverLink
            href="/work"
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
            ← Back to work
          </HoverLink>

          {/* Eyebrow */}
          {content?.eyebrow && (
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '0.75rem',
                marginTop: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                width: 'fit-content',
              }}
            >
              <Briefcase size={14} weight="duotone" />
              {content.eyebrow}
            </p>
          )}

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
            {project.title}
          </h1>

          {/* Meta row */}
          <div
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.8125rem',
              color: 'var(--color-muted)',
              marginBottom: 0,
              marginTop: '0.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              alignItems: 'center',
            }}
          >
            {content ? (
              <>
                {content.readTime && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} />
                    {content.readTime} read
                  </span>
                )}
                {content.timeline && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CalendarBlank size={14} />
                    {content.timeline}
                  </span>
                )}
                {content.platform && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Monitor size={14} />
                    {content.platform}
                  </span>
                )}
                {content.role && (
                  <span style={{ opacity: 0.85 }}>{content.role}</span>
                )}
              </>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} />
                3 minutes read
              </span>
            )}
          </div>
        </div>

        {/* ── Hero image placeholder ── */}
        <div
          style={{
            backgroundColor: 'var(--accent-tint-08)',
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
          {project.title} — Hero Image
        </div>

        {/* ── Case study body ── */}
        <div
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.0625rem',
            color: 'var(--color-ink)',
          }}
        >
          {content ? (
            <>
              {/* Summary */}
              <p
                style={{
                  lineHeight: 1.8,
                  marginTop: 0,
                  marginBottom: '3rem',
                  fontSize: '1.125rem',
                }}
              >
                {content.summary}
              </p>

              {/* Sections */}
              {content.sections.map((section, i) => (
                <div key={section.heading}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: '1.5rem',
                      color: 'var(--color-ink)',
                      marginBottom: '1rem',
                      marginTop: 0,
                    }}
                  >
                    {section.heading}
                  </h2>

                  <p style={{ lineHeight: 1.8, marginTop: 0, marginBottom: 0 }}>
                    {section.body}
                  </p>

                  {/* Image placeholder between sections (not after the last) */}
                  {i < content.sections.length - 1 && (
                    <div
                      style={{
                        backgroundColor: 'var(--accent-tint-08)',
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
                      Image — {section.heading}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            /* Fallback for slugs without a content file yet */
            <p>Case study coming soon.</p>
          )}
        </div>

        {/* ── Footer link ── */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--accent-tint-15)',
          }}
        >
          <HoverLink
            href="/work"
            hoverEffect="underglow"
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
            }}
          >
            Back to work
          </HoverLink>
        </div>

      </article>
    </main>
  );
}
