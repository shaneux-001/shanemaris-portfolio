'use client';

import { use } from 'react';
import Link from 'next/link';
import { portfolioProjects } from '@/lib/projects';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectPage({ params }: PageProps) {
  const { slug } = use(params);
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 4rem' }}>
          <h1>Project not found</h1>
          <p>
            <Link href="/work" style={{ color: 'var(--color-accent)' }}>
              Back to work
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
      <article style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 4rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <Link
            href="/work"
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
            ← Back to work
          </Link>

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
          {project.title} Hero Image
        </div>

        {/* Project Content */}
        <div
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.0625rem',
            color: 'var(--color-ink)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.5rem',
              color: 'var(--color-ink)',
              marginBottom: '1rem',
              marginTop: 0,
            }}
          >
            Context
          </h2>
          <p>
            This project demonstrates [context]. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            Project screenshot or artifact
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.5rem',
              color: 'var(--color-ink)',
              marginBottom: '1rem',
              marginTop: 0,
            }}
          >
            Key Constraint
          </h2>
          <p>
            The primary constraint was [constraint]. This required careful consideration and creative problem-solving to navigate successfully.
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
            Process or decision diagram
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.5rem',
              color: 'var(--color-ink)',
              marginBottom: '1rem',
              marginTop: 0,
            }}
          >
            Outcome
          </h2>
          <p>
            The final result was [outcome]. This delivered measurable value and taught us important lessons about [learning].
          </p>
        </div>

        {/* Back Link */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(123, 94, 167, 0.15)',
          }}
        >
          <Link
            href="/work"
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
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.85';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Back to work
          </Link>
        </div>
      </article>
    </main>
  );
}
