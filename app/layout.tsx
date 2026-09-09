import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import SiteHeader from "@/components/press/SiteHeader";
import SiteFooter from "@/components/press/SiteFooter";
import "./globals.css";

// Press Room typeface pair — Archivo carries display, body, AND the italic
// accent/quote role (2026-09-09, replacing the Inter + Playfair Display
// pair — both are among the most commonly flagged "this looks
// AI-generated" fonts, and stacking them together compounded that. One
// characterful face across every role reads as an authored choice rather
// than the "safe body + fancy display + fancy accent" template formula).
// IBM Plex Mono still carries eyebrows/nav/buttons/metadata, unchanged.
// Italic weights added for the quote/accent role (case-study blockquotes
// use font-archivo italic directly, e.g. Heart Design System's chapter
// pages) — normal weights unchanged from before.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  // Named --font-archivo-face, NOT --font-archivo: globals.css's Tailwind
  // v4 @theme inline block aliases --font-archivo to this (see that file)
  // to expose the `font-archivo` utility class. A same-name variable here
  // would collide with that alias and create a circular reference —
  // exactly what happened before this fix (2026-09-09): the alias resolved
  // to guaranteed-invalid, `.font-archivo` and every hand-written
  // var(--font-archivo) rule silently fell through to inherited Inter,
  // sitewide, since the 2026-09-05 commit that added the alias. Confirmed
  // live on production, not just local dev.
  variable: "--font-archivo-face",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  // Same collision, same fix — see the Archivo comment above.
  variable: "--font-plex-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shanemaris.com"),
  title: {
    default: "Shane Maris — Design Ops & Systems Leader",
    template: "%s · Shane Maris",
  },
  description: "Design Ops & Systems leader building scalable design infrastructure and mentoring teams to create meaningful digital experiences.",
  icons: {
    icon: [
      { url: "/logo-16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/logo-32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/logo-64.svg", sizes: "64x64", type: "image/svg+xml" },
      { url: "/logo-128.svg", sizes: "128x128", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    title: "Shane Maris — Design Ops & Systems Leader",
    description: "Design Ops & Systems leader building scalable design infrastructure and mentoring teams to create meaningful digital experiences.",
    url: "https://shanemaris.com",
    siteName: "Shane Maris",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Shane Maris — Design Ops & Systems Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shane Maris — Design Ops & Systems Leader",
    description: "Design Ops & Systems leader building scalable design infrastructure and mentoring teams to create meaningful digital experiences.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* No-FOUC: apply saved Press Room theme before React hydrates.
            Dark is the default — only a stored 'light' choice flips it. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('pr-theme')==='light')document.documentElement.setAttribute('data-pr-theme','light');}catch(e){}})();` }} />
      </head>
      {/* backgroundColor/color stay on the OLD tokens here — /resume and the
          work case-study pages still use --color-ink on the assumption of a
          light --color-base body. The Press Room pages (Home/Work/About/
          Contact) paint their own full-bleed dark background via .pr-page;
          see globals.css. */}
      <body
        className="pr-root"
        style={{
          backgroundColor: "var(--color-base)",
          color: "var(--color-ink)",
          margin: 0,
        }}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}