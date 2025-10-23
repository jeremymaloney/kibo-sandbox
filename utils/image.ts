/**
 * Converts protocol-relative URLs to absolute HTTPS URLs
 * Returns placeholder if URL is not provided
 */
export const getAbsoluteImageUrl = (url?: string): string => {
  if (!url) return "/placeholder-image.jpg";
  if (url.startsWith("//")) return `https:${url}`;
  return url;
};