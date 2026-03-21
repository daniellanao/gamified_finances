/**
 * Used for metadataBase so Open Graph and Twitter resolve absolute image URLs.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://yourdomain.com).
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export const SITE_NAME = "Gamified Finances";

export const SITE_DESCRIPTION =
  "Turn personal finance into a pixel adventure: learn budgeting, saving, and investing through levels, quizzes, and coin rewards.";

export const OG_IMAGE_PATH = "/gamified_finances.png";

export const OG_IMAGE_ALT =
  "Pixel-art hero on a quest path collecting coins toward a castle — financial progress as a game.";
