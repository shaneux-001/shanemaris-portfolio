'use client';

import Link from 'next/link';
import { labsProjects } from '@/lib/projects';
import PasswordGate from '@/components/PasswordGate';
import LabsHeader from '@/components/LabsHeader';
import ParticleBackgroundNetwork from '@/components/ParticleBackgroundNetwork';
import { useEffect, useRef } from 'react';

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }

    const particles: Particle[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.4 + 0.15,
    }));

    let animationId: number | null = null;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x - p.radius < 0 || p.x + p.radius > canvas.width) {
          p.vx *= -1;
          p.x = Math.max(p.radius, Math.min(canvas.width - p.radius, p.x));
        }
        if (p.y - p.radius < 0 || p.y + p.radius > canvas.height) {
          p.vy *= -1;
          p.y = Math.max(p.radius, Math.min(canvas.height - p.radius, p.y));
        }
      });

      const connectionDistance = 150;
      ctx.strokeStyle = 'rgba(123, 94, 167, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.globalAlpha = (1 - distance / connectionDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = 'rgba(123, 94, 167, 0.4)';
      particles.forEach((p) => {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        backgroundColor: 'transparent',
      }}
    />
  );
}

function LabsContent() {
  return (
    <>
      <LabsHeader />
      <ParticleCanvas />
      <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '4rem', position: 'relative', zIndex: 2 }}>
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
