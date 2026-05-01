import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Mark from "@/components/Mark";
import NavLink from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://shanemaris.com"),
  title: {
    default: "Shane Maris — Design Ops & Systems Leader",
    template: "%s · Shane Maris",
  },
  description: "Design Ops & Systems leader building scalable design infrastructure and mentoring teams to create meaningful digital experiences.",
  icons: {
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* No-FOUC: apply saved theme before React hydrates to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('theme-dark');}catch(e){}})();` }} />
      </head>
      <body style={{ backgroundColor: "var(--color-base)", color: "var(--color-ink)", margin: 0 }}>
        <header className="site-header">
          <Link
            href="/"
            aria-label="Shane Maris — home"
            className="site-logo"
          >
            <Mark size={22} />
            <div className="site-logo-text">
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.125rem", color: "var(--color-ink)", fontWeight: 500 }}>Shane Maris</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6875rem", color: "var(--color-muted)" }}>Design Ops &amp; Systems Leader</span>
            </div>
          </Link>
          <nav className="site-nav">
            <NavLink href="/work" icon="briefcase">Work</NavLink>
            <NavLink href="/about" icon="user">About</NavLink>
            <NavLink href="/contact" icon="envelope">Contact</NavLink>
          </nav>
        </header>
        {children}
        <footer style={{
          padding: "1.5rem 4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--color-hairline)",
        }}>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            margin: 0,
          }}>
            © 2026 Shane Maris
          </p>
          <ThemeToggle />
        </footer>
      </body>
    </html>
  );
}