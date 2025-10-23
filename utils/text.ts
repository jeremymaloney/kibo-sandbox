/**
 * Strips HTML tags and decodes HTML entities from a string
 */
export const stripHtml = (html?: string): string => {
  if (!html) return '';
  
  let text = html.replace(/<[^>]*>/g, '');
  
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
};