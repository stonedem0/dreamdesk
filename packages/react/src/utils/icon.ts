/**
 * Whether an icon string is an image (a URL or inline SVG) rather than text
 * like an emoji. Bundlers inline small images as `data:` URLs, so those count.
 */
export function isImageIcon(icon?: string): icon is string {
  if (!icon) return false;
  const v = icon.trim();
  return /^(\/|\.\.?\/|https?:|data:image\/|blob:|<svg)/i.test(v);
}
