import type { Metadata } from "next";
import { Inter, Playfair_Display, Archivo, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import PressMark from "@/components/press/PressMark";
import PressNavLink from "@/components/press/PressNavLink";
import PressThemeToggle from "@/components/press/PressThemeToggle";
import SiteFooter from "@/components/press/SiteFooter";
import "./globals.css";

// Inter + Playfair remain loaded for /resume and the work case-study
// pages, which keep the pre-redesign token system (see globals.css) and
// are being reconciled to Press Room in a later pass.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Press Room typeface pair — Archivo (display/UI) + IBM Plex Mono (press
// apparatus: eyebrows, nav, buttons, metadata).
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
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
      className={`${inter.variable} ${playfair.variable} ${archivo.variable} ${plexMono.variable}`}
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
        <header className="pr-header">
          <Link
            href="/"
            aria-label="Shane Maris — home"
            className="pr-mark-btn flex items-center gap-3 p-1 -m-1 text-inherit"
          >
            <PressMark size={24} />
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-pr-fg-strong">
              Shane Maris
            </span>
          </Link>
          <nav className="flex gap-1 items-center font-plex-mono text-xs tracking-[0.04em]">
            <PressNavLink href="/work">Work</PressNavLink>
            <PressNavLink href="/about">About</PressNavLink>
            <PressNavLink href="/contact">Contact</PressNavLink>
            <PressThemeToggle />
          </nav>
        </header>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}