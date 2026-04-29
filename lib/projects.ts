/**
 * Project configuration for password protection
 * Used for /labs projects and portfolio case studies
 *
 * Passwords are NOT stored here. Set NEXT_PUBLIC_PORTFOLIO_PASSWORD
 * and NEXT_PUBLIC_OASIS_PASSWORD as environment variables in Vercel
 * (and locally in .env.local — already gitignored).
 */

interface ProjectConfig {
  slug: string;
  title: string;
  password?: string; // Unique password for this project (optional - falls back to master password)
  expiryDays?: number; // Days until password expires (default: 30)
  public?: boolean; // If true, accessible as guest in /labs
  external?: string; // Optional external URL link
}

/**
 * Labs projects (hidden, gated behind Konami code + auth)
 * Passwords come from env vars — see lib/password.ts
 */
export const labsProjects: ProjectConfig[] = [
  {
    slug: 'design-system-v2-explorations',
    title: 'Design System v2 Explorations',
    expiryDays: 30,
    public: false,
  },
  {
    slug: 'accessibility-roi-research',
    title: 'Accessibility ROI Research',
    expiryDays: 30,
    public: false,
  },
  {
    slug: 'design-ops-thinking-pieces',
    title: 'Design Ops Thinking Pieces',
    expiryDays: 30,
    public: false,
  },
  {
    // Unannounced — uses separate Oasis password set via NEXT_PUBLIC_OASIS_PASSWORD
    slug: 'project-oasis',
    title: 'Project Oasis',
    password: process.env.NEXT_PUBLIC_OASIS_PASSWORD,
    expiryDays: 30,
    public: false,
  },
];

/**
 * Portfolio case studies (on /work)
 * Heart DS is featured; all others appear in the supporting grid.
 */
export const portfolioProjects: ProjectConfig[] = [
  {
    slug: 'heart-design-system',
    title: 'Heart Design System',
    public: true, // Featured project
  },
  // ----- HDS adoption stories -----
  {
    slug: 'homepage-v2',
    title: 'Responsive Homepage',
    public: true,
  },
  {
    slug: 'my-account-redesign',
    title: 'My Account Redesign',
    public: true,
  },
  {
    slug: 'native-app-homepage',
    title: 'Native App Homepage',
    public: true,
  },
  // ----- Design language transition -----
  {
    slug: 'vision-decommission',
    title: 'Vision Decommission',
    public: true,
  },
  {
    slug: 'ife-starling',
    title: 'IFE Starling — Dark Mode',
    public: true,
  },
  // ----- Earlier work -----
  {
    slug: 'mobile-check-in',
    title: 'Check-in Flow Redesign',
    public: true,
  },
  {
    slug: 'homepage-redesign',
    title: 'Homepage Redesign (2014)',
    public: true,
  },
  {
    slug: 'change-cancel-experience',
    title: 'Change & Cancel Experience',
    public: true,
  },
  {
    slug: 'enhanced-reaccom',
    title: 'Enhanced Reaccom Program',
    public: true,
  },
];

/**
 * Get project config by slug
 */
export function getProjectConfig(slug: string, type: 'labs' | 'portfolio' = 'portfolio'): ProjectConfig | null {
  const projects = type === 'labs' ? labsProjects : portfolioProjects;
  return projects.find(p => p.slug === slug) || null;
}

/**
 * Check if project is public (no password needed)
 */
export function isProjectPublic(slug: string, type: 'labs' | 'portfolio' = 'portfolio'): boolean {
  const project = getProjectConfig(slug, type);
  return project?.public ?? false;
}
