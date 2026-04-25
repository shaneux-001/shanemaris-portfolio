/**
 * Project configuration for password protection
 * Used for /labs projects and portfolio case studies
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
 * Each project can have unique password or use master password
 */
export const labsProjects: ProjectConfig[] = [
  {
    slug: 'design-system-v2-explorations',
    title: 'Design System v2 Explorations',
    password: 'heart2024', // Shane's master password
    expiryDays: 30,
    public: false,
  },
  {
    slug: 'accessibility-roi-research',
    title: 'Accessibility ROI Research',
    password: 'heart2024',
    expiryDays: 30,
    public: false,
  },
  {
    slug: 'design-ops-thinking-pieces',
    title: 'Design Ops Thinking Pieces',
    password: 'heart2024',
    expiryDays: 30,
    public: false,
  },
];

/**
 * Portfolio case studies (on /work)
 * Heart DS is featured, supporting projects listed below
 */
export const portfolioProjects: ProjectConfig[] = [
  {
    slug: 'heart-design-system',
    title: 'Heart Design System',
    public: true, // Featured project, public by default
  },
  {
    slug: 'my-account-redesign',
    title: 'My Account Redesign',
    public: true,
  },
  {
    slug: 'mobile-check-in',
    title: 'Mobile Check-in Flow',
    public: true,
  },
  {
    slug: 'change-cancel-experience',
    title: 'Change/Cancel Experience',
    public: true,
  },
  {
    slug: 'homepage-redesign',
    title: 'Homepage Redesign (v1)',
    public: true,
  },
  {
    slug: 'homepage-v2',
    title: 'Homepage Redesign (v2)',
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
