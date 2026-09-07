import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labs",
  description: "Experimental work and side projects from Shane Maris.",
  openGraph: {
    title: "Labs · Shane Maris",
    description: "Experimental work and side projects from Shane Maris.",
    url: "https://shanemaris.com/labs",
  },
  twitter: {
    title: "Labs · Shane Maris",
    description: "Experimental work and side projects from Shane Maris.",
  },
};

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
