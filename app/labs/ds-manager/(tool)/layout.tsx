import type { Metadata } from 'next';
import { Geist, Geist_Mono, Figtree } from 'next/font/google';
import { TOOL } from '@/lib/labs/dsManager/brand';
import { StoreProvider } from '../_components/Store';
import Shell, { themeScript } from '../_components/Shell';
import '../keystone.css';

// Keystone's chrome uses Geist; the fictional Meridian system it documents
// uses Figtree, so live component demos visibly read as a different brand.
const geist = Geist({ subsets: ['latin'], variable: '--ks-font-sans', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--ks-font-mono', display: 'swap' });
const figtree = Figtree({ subsets: ['latin'], variable: '--mer-font-brand', display: 'swap' });

export const metadata: Metadata = {
  title: { default: TOOL.name, template: `%s · ${TOOL.name}` },
  description: 'A design system management prototype: inventory, health, living docs, tokens, intake and AI guidance.',
  robots: { index: false },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geist.variable} ${geistMono.variable} ${figtree.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <StoreProvider>
        <Shell>{children}</Shell>
      </StoreProvider>
    </div>
  );
}
