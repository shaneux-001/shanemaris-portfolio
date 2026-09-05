'use client';

import { useState } from 'react';
import { LinkedinLogo, ThreadsLogo, Envelope } from '@phosphor-icons/react';
import Ghost from '@/components/press/Ghost';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function validate(name: string, email: string, message: string) {
  const errors: { name?: boolean; email?: boolean; message?: boolean } = {};
  if (!name.trim()) errors.name = true;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) errors.email = true;
  if (!message.trim()) errors.message = true;
  return errors;
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — real users never see or fill this
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const errors = touched ? validate(name, email, message) : {};
  const sending = status === 'sending';
  const sent = status === 'sent';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const e2 = validate(name, email, message);
    setTouched(true);
    if (Object.keys(e2).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const border = (hasError?: boolean) => (hasError ? 'var(--pr-magenta)' : 'var(--pr-muted)');
  const submitLabel = sending ? 'SENDING…' : sent ? 'SEND AGAIN' : 'SEND MESSAGE';

  return (
    <main className="pr-page">
    <div className="pr-main" style={{ paddingTop: 'clamp(36px, 5vw, 56px)' }}>
      <h1 className="pr-page-title" style={{ margin: '0 0 16px', fontFamily: 'var(--font-archivo)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--pr-fg-strong)' }}>
        Get in touch
      </h1>
      <p className="pr-page-lede" style={{ margin: '0 0 34px', lineHeight: 1.65, color: 'var(--pr-lede)', maxWidth: '48ch' }}>
        Have a project, a question, or just want to talk shop about design systems? I&apos;d love to hear from you.
      </p>

      <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Honeypot — visually hidden, skipped by real users, off the tab order */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="contact-website">Leave this field blank</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <label htmlFor="contact-name" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.08em', color: 'var(--pr-muted)' }}>NAME</label>
          <input
            type="text" id="contact-name" name="name" value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-err' : undefined}
            className="pr-input"
            style={{ fontSize: 16, padding: '12px 14px', background: 'var(--pr-surface)', border: `1px solid ${border(errors.name)}`, color: 'var(--pr-fg-strong)' }}
          />
          {errors.name && <div id="contact-name-err" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-magenta)' }}>Required.</div>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <label htmlFor="contact-email" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.08em', color: 'var(--pr-muted)' }}>EMAIL</label>
          <input
            type="email" id="contact-email" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-err' : undefined}
            className="pr-input"
            style={{ fontSize: 16, padding: '12px 14px', background: 'var(--pr-surface)', border: `1px solid ${border(errors.email)}`, color: 'var(--pr-fg-strong)' }}
          />
          {errors.email && <div id="contact-email-err" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-magenta)' }}>Needs a valid email address.</div>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <label htmlFor="contact-message" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, letterSpacing: '0.08em', color: 'var(--pr-muted)' }}>MESSAGE</label>
          <textarea
            rows={4} id="contact-message" name="message" value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-err' : undefined}
            className="pr-input"
            style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: 16, padding: '12px 14px', background: 'var(--pr-surface)', border: `1px solid ${border(errors.message)}`, color: 'var(--pr-fg-strong)', resize: 'vertical' }}
          />
          {errors.message && <div id="contact-message-err" style={{ fontFamily: 'var(--font-plex-mono), monospace', fontSize: 11, color: 'var(--pr-magenta)' }}>Required.</div>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button type="submit" disabled={sending} className="pr-cta pr-hoverable">
            <Ghost>{submitLabel}</Ghost>
          </button>
          <div role="status" aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-plex-mono), monospace', fontSize: 12, color: 'var(--pr-accent-text)' }}>
            {sending && <span>Sending your message…</span>}
            {sent && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, background: 'var(--pr-accent-text)', animation: 'pr-tick 240ms cubic-bezier(0.2,0.85,0.25,1) both' }} />
                <span style={{ display: 'inline-block', animation: 'pr-wipe 380ms cubic-bezier(0.3,0.9,0.2,1) 120ms both' }}>SENT — I&apos;ll reply within a day.</span>
              </span>
            )}
            {status === 'error' && <span style={{ color: 'var(--pr-magenta)' }}>Something went wrong — email me directly at contact@shanemaris.com</span>}
          </div>
        </div>
      </form>

      <div style={{ marginTop: 44, borderTop: '1px solid var(--pr-rule)', paddingTop: 22, display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        <a href="https://linkedin.com/in/shanemaris" target="_blank" rel="noopener noreferrer" className="pr-text-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <LinkedinLogo size={14} /> LinkedIn
        </a>
        <a href="https://www.threads.com/@_shaneux_" target="_blank" rel="noopener noreferrer" className="pr-text-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <ThreadsLogo size={14} /> Threads
        </a>
        <a href="mailto:contact@shanemaris.com" className="pr-text-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Envelope size={14} /> contact@shanemaris.com
        </a>
      </div>
    </div>
    </main>
  );
}
