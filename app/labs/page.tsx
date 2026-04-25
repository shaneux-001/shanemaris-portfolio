'use client';

import Link from 'next/link';
import { labsProjects } from '@/lib/projects';
import PasswordGate from '@/components/PasswordGate';
import LabsHeader from '@/components/LabsHeader';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function AnimatedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = 15;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 1 + 0.5,
      opacity: (Math.random() * 0.5 + 0.4) * 0.9,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(123, 94, 167, 0.36)';

      particlesRef.current.forEach((particle, idx) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }
        if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
        }

        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 6.5, 0, Math.PI * 2);
        ctx.fill();
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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
        mixBlendMode: 'multiply',
      }}
    />
  );
}


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
    <AnimatedParticles />
    </>
  );
}

export default function LabsPage() {
  return <LabsContent />;
}
