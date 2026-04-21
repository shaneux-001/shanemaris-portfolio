"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "sent" : "error");
  }

  return (
    <main style={{ paddingTop: "8rem", paddingBottom: "6rem", paddingLeft: "4rem", paddingRight: "4rem", maxWidth: "56rem", margin: "0 auto" }}>
      <section style={{ marginBottom: "4rem", maxWidth: "36rem" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1rem" }}>Contact</p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--color-ink)", lineHeight: 1.15, marginBottom: "1rem" }}>Get in touch</h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.125rem", color: "var(--color-muted)", lineHeight: 1.8 }}>Have a question or want to work together? Send me a message and I will get back to you.</p>
      </section>
      {status === "sent" ? (
        <div style={{ maxWidth: "36rem" }}>
          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", color: "var(--color-ink)", marginBottom: "0.5rem" }}>Message sent.</p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "var(--color-muted)" }}>Thanks for reaching out. I will be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "36rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-ink)" }}>Name</label>
            <input name="name" required style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", padding: "0.75rem 1rem", border: "1px solid #E8E4DE", borderRadius: "6px", backgroundColor: "#fff", color: "var(--color-ink)", outline: "none" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-ink)" }}>Email</label>
            <input name="email" type="email" required style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", padding: "0.75rem 1rem", border: "1px solid #E8E4DE", borderRadius: "6px", backgroundColor: "#fff", color: "var(--color-ink)", outline: "none" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-ink)" }}>Message</label>
            <textarea name="message" required rows={6} style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", padding: "0.75rem 1rem", border: "1px solid #E8E4DE", borderRadius: "6px", backgroundColor: "#fff", color: "var(--color-ink)", outline: "none", resize: "vertical" }} />
          </div>
          <button type="submit" disabled={status === "sending"} style={{ backgroundColor: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 500, padding: "0.75rem 1.5rem", borderRadius: "6px", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          {status === "error" && <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "#D95F4B" }}>Something went wrong. Please try again or email me directly at contact@shanemaris.com</p>}
        </form>
      )}
      <hr style={{ border: "none", borderTop: "1px solid #E8E4DE", margin: "4rem 0" }} />
      <section>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "1.5rem" }}>Find me online</p>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <a href="https://linkedin.com/in/shanemaris" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-ink)", textDecoration: "none", fontWeight: 500 }}>LinkedIn</a>
          <a href="https://twitter.com/shanemaris" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-ink)", textDecoration: "none", fontWeight: 500 }}>Twitter</a>
          <a href="mailto:contact@shanemaris.com" style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-ink)", textDecoration: "none", fontWeight: 500 }}>contact@shanemaris.com</a>
        </div>
      </section>
    </main>
  );
}
