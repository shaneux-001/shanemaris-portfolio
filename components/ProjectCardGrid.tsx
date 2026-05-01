'use client';

/**
 * Client component for the /work page project grid.
 *
 * Implements the kit's project-card-v2 pattern:
 *   - Built-in 1.5rem padding (so hover doesn't shift surrounding layout)
 *   - Calmer hover: background tint + accent border, no opacity drop
 *   - Optional tag pills (first = primary accent, rest = accent-2)
 *
 * All data arrives as props from the server-rendered /work page.
 */

interface ProjectCard {
  slug: string;
  title: string;
  tagline: string;
  tags?: string[];
}

interface ProjectCardGridProps {
  projects: ProjectCard[];
}

export default function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
      }}
    >
      {projects.map((project) => {
        // Trim tagline to ~120 chars for card legibility
        const tagline = project.tagline;
        const shortTagline =
          tagline.length > 120
            ? tagline.slice(0, tagline.lastIndexOf(' ', 120)) + '…'
            : tagline;

        return (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid transparent',
              background: 'transparent',
              cursor: 'pointer',
              transition:
                'transform var(--motion-default) var(--ease-default), background-color var(--motion-default) var(--ease-default), border-color var(--motion-default) var(--ease-default)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.background = 'var(--accent-tint-08)';
              e.currentTarget.style.borderColor = 'var(--accent-tint-15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.background = '';
              e.currentTarget.style.borderColor = '';
            }}
          >
            {/* Project Image placeholder */}
            <div
              style={{
                backgroundColor: 'var(--accent-tint-08)',
                borderRadius: 'var(--radius-md)',
                aspectRatio: '1 / 0.67',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-muted)',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Image
            </div>

            {/* Title */}
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

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9375rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
                marginBottom: project.tags?.length ? '1rem' : 0,
                marginTop: '0.25rem',
              }}
            >
              {shortTagline || 'Case study coming soon.'}
            </p>

            {/* Tag pills — primary accent for the first, accent-2 for the rest */}
            {project.tags && project.tags.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '0.375rem',
                  flexWrap: 'wrap',
                  marginTop: 'auto',
                }}
              >
                {project.tags.map((tag, i) => {
                  const isPrimary = i === 0;
                  return (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.6875rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.25rem 0.5rem',
                        lineHeight: 1.2,
                        color: 'var(--color-ink)',
                        background: isPrimary
                          ? 'var(--accent-tint-08)'
                          : 'var(--accent2-tint-08)',
                        border: `1px solid ${
                          isPrimary
                            ? 'var(--accent-tint-15)'
                            : 'var(--accent2-tint-15)'
                        }`,
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
          </a>
        );
      })}
    </div>
  );
}
