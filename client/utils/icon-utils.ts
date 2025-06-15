/**
 * Utility functions for managing website icons and favicons
 */

export interface WebsiteMapping {
  icon: any;
  color: string;
  name: string;
}

export interface IconConfig {
  useCustomIcons: boolean;
  useFavicons: boolean;
  fallbackToCategory: boolean;
  faviconService: "google" | "duckduckgo" | "iconhorse";
}

/**
 * Get favicon URL from different services
 */
export function getFaviconUrl(
  domain: string,
  service: "google" | "duckduckgo" | "iconhorse" = "google"
): string {
  switch (service) {
    case "google":
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    case "duckduckgo":
      return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
    case "iconhorse":
      return `https://icon.horse/icon/${domain}`;
    default:
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  }
}

/**
 * Extract clean domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
      .hostname;
    return domain.replace("www.", "").toLowerCase();
  } catch {
    return url.toLowerCase().replace("www.", "");
  }
}

/**
 * Check if a website has a custom icon mapping
 */
export function hasCustomIcon(
  website: string,
  mappings: Record<string, WebsiteMapping>
): boolean {
  const domain = extractDomain(website);
  return domain in mappings;
}

/**
 * Get website name from domain
 */
export function getWebsiteName(domain: string): string {
  const name = domain.split(".")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Validate if URL is a valid website
 */
export function isValidWebsite(url: string): boolean {
  try {
    new URL(url.startsWith("http") ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate icon cache key
 */
export function getIconCacheKey(website: string, title: string): string {
  return `icon_${extractDomain(website)}_${title
    .toLowerCase()
    .replace(/\s+/g, "_")}`;
}
