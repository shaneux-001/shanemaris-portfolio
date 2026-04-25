'use client';

import Link from 'next/link';
import { labsProjects } from '@/lib/projects';
import PasswordGate from '@/components/PasswordGate';
import LabsHeader from '@/components/LabsHeader';

function LabsContent() {
  return (
    <>
      <LabsHeader />
      <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 4rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '4rem' }}>
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
              Labs
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
              Experimental work and side projects
            </p>
          </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {labsProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/labs/${project.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  const parent = e.currentTarget as HTMLDivElement;
                  parent.style.transform = 'translateY(-4px)';
                  parent.style.boxShadow = '0 8px 24px rgba(123, 94, 167, 0.12)';
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget as HTMLDivElement;
                  parent.style.transform = 'translateY(0)';
                  parent.style.boxShadow = 'none';
                }}
              >
                {/* Project Image */}
                <div
                  style={{
                    backgroundColor: 'rgba(123, 94, 167, 0.08)',
                    borderRadius: '8px',
                    aspectRatio: '1 / 0.67',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-muted)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {project.title} Preview
                </div>

                {/* Project Info */}
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '1.25rem',
                    color: 'var(--color-ink)',
                    marginBottom: '0.5rem',
                    marginTop: 0,
                  }}
                >
                  {project.title}
                </h3>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}

export default function LabsPage() {
  return (
    <PasswordGate
      projectSlug="labs"
      projectTitle="Labs"
      config={{ expiryDays: 30 }}
    >
      <LabsContent />
    </PasswordGate>
  );
}
