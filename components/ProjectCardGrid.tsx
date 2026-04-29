'use client';

/**
 * Client component for the /work page project grid.
 * Handles hover effects on cards; all data arrives as props from the server component.
 */

interface ProjectCard {
  slug: string;
  title: string;
  tagline: string;
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
        gap: '2rem',
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
              transition: 'transform 0.2s, opacity 0.2s',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
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
            {/* Project Image placeholder */}
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
              Placeholder
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
                marginBottom: 0,
                marginTop: '0.5rem',
              }}
            >
              {shortTagline || 'Case study coming soon.'}
            </p>
          </a>
        );
      })}
    </div>
  );
}
