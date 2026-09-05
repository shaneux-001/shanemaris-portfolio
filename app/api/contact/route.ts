import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  const { name, email, message, website } = await request.json();

  // Honeypot: real visitors never see or fill this field. A bot that
  // fills every input will populate it — pretend success so it doesn't
  // learn to skip the field next time.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !EMAIL_RE.test(email.trim()) ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <contact@shanemaris.com>",
      to: "contact@shanemaris.com",
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    // Resend resolves (rather than throws) on API-level failures — a bad
    // API key or rejected request would otherwise report success here.
    if (error) {
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
