import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  title: "Shane Maris",
  description: "Design Ops & Systems Leader",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    title: "Shane Maris",
    description: "Design Ops & Systems Leader",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Shane Maris — Design Ops & Systems Leader",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body style={{ backgroundColor: "var(--color-base)", color: "var(--color-ink)", margin: 0 }}>
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, padding: "1.25rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, backgroundColor: "var(--color-base)" }}>
          <a href="/" style={{ fontFamily: "var(--font-playfair)", fontSize: "1.125rem", color: "var(--color-ink)", textDecoration: "none", fontWeight: 500 }}>
            Shane Maris
          </a>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a href="/work" style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", textDecoration: "none" }}>Work</a>
            <a href="/about" style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-muted)", textDecoration: "none" }}>About</a>
            <a href="/contact" style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "var(--color-accent)", textDecoration: "none", fontWeight: 500 }}>Contact</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}