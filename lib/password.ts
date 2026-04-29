'use client';

const MASTER_PASSWORD = process.env.NEXT_PUBLIC_PORTFOLIO_PASSWORD ?? ''; // Set via Vercel env vars — never hardcoded
const DEFAULT_EXPIRY_DAYS = 30;

interface PasswordConfig {
  password?: string; // Project-specific password (null = use master password)
  expiryDays?: number; // Days until password expires (null = never)
  public?: boolean; // If true, accessible as guest
}

interface StoredPassword {
  password: string;
  createdAt: number;
  expiryDays: number;
}

/**
 * Validate a password against config
 * Returns true if password is correct and not expired
 */
export function validatePassword(inputPassword: string, config: PasswordConfig): boolean {
  const projectPassword = config.password || MASTER_PASSWORD;
  const expiryDays = config.expiryDays ?? DEFAULT_EXPIRY_DAYS;

  if (inputPassword !== projectPassword) {
    return false;
  }

  // Check if using time-based expiry
  if (expiryDays > 0) {
    const stored = getStoredPassword(projectPassword);
    if (!stored) {
      // First time entering this password - store it
      storePassword(projectPassword, expiryDays);
      return true;
    }

    const now = Date.now();
    const expiryTime = stored.createdAt + stored.expiryDays * 24 * 60 * 60 * 1000;

    if (now > expiryTime) {
      // Password has expired
      clearPassword(projectPassword);
      return false;
    }
  }

  return true;
}

/**
 * Check if user has already unlocked a password-protected project
 */
export function isPasswordUnlocked(projectPassword: string): boolean {
  if (typeof window === 'undefined') return false;

  const key = `password_${projectPassword}`;
  const stored = localStorage.getItem(key);

  if (!stored) return false;

  try {
    const data: StoredPassword = JSON.parse(stored);
    const now = Date.now();
    const expiryTime = data.createdAt + data.expiryDays * 24 * 60 * 60 * 1000;

    if (now > expiryTime) {
      clearPassword(projectPassword);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Store password unlock in localStorage with expiry
 */
function storePassword(password: string, expiryDays: number): void {
  if (typeof window === 'undefined') return;

  const key = `password_${password}`;
  const data: StoredPassword = {
    password,
    createdAt: Date.now(),
    expiryDays,
  };

  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get stored password data
 */
function getStoredPassword(password: string): StoredPassword | null {
  if (typeof window === 'undefined') return null;

  const key = `password_${password}`;
  const stored = localStorage.getItem(key);

  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Clear stored password
 */
function clearPassword(password: string): void {
  if (typeof window === 'undefined') return;

  const key = `password_${password}`;
  localStorage.removeItem(key);
}

/**
 * Get master password (for Shane only)
 */
export function getMasterPassword(): string {
  return MASTER_PASSWORD;
}

/**
 * Get the Project Oasis-specific password.
 * Uses a separate env var so it can be shared independently.
 */
export function getOasisPassword(): string {
  return process.env.NEXT_PUBLIC_OASIS_PASSWORD ?? '';
}
