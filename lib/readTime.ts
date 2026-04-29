/**
 * Calculate estimated read time for a given text
 * Uses 200 words per minute as average reading speed
 */
export function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return minutes === 1 ? '1 minute' : `${minutes} minutes`;
}

/**
 * Pre-calculated read times for major content pieces
 */
export const readTimes = {
  // Heart Design System chapters (estimated)
  chapter1: '3 minutes',
  chapter2: '4 minutes',
  chapter3: '3 minutes',
  chapter4: '2 minutes',

  // HDS adoption stories
  homepageV2: '4 minutes',
  myAccountRedesign: '4 minutes',
  nativeAppHomepage: '3 minutes',

  // Design language transition
  visionDecommission: '5 minutes',
  ifeStarling: '3 minutes',

  // Earlier work
  mobileCheckIn: '3 minutes',
  homepageRedesignV1: '3 minutes',
  changeCancelExperience: '3 minutes',
  enhancedReaccom: '4 minutes',

  // Labs (password-gated)
  projectOasis: '4 minutes',
};
