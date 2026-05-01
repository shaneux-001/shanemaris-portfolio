import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shane Maris — available for design ops consulting, speaking, and collaboration opportunities.",
  openGraph: {
    title: "Contact · Shane Maris",
    description: "Get in touch — available for design ops consulting, speaking, and collaboration opportunities.",
    url: "https://shanemaris.com/contact",
  },
  twitter: {
    title: "Contact · Shane Maris",
    description: "Get in touch — available for design ops consulting, speaking, and collaboration.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
