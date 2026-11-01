/** Tags allowed through sanitization — safe inline/block formatting. */
const BLOCK_TAGS = new Set(['p', 'ul', 'ol', 'li', 'blockquote']);
const INLINE_TAGS = new Set([
  'br', 'b', 'strong', 'i', 'em', 'u', 's', 'mark', 'a', 'sub', 'sup', 'code',
]);
const ALLOWED_TAGS = new Set([...BLOCK_TAGS, ...INLINE_TAGS]);

/** URL schemes safe for <a href>. Everything else (javascript:, data:, vbscript:) is stripped. */
const SAFE_URL_SCHEMES = /^(?:https?|mailto|tel):/i;
const RELATIVE_URL = /^[#/?.]/;

function isSafeUrl(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) return false;
  return SAFE_URL_SCHEMES.test(trimmed) || RELATIVE_URL.test(trimmed);
}

interface SanitizeOptions {
  readonly inline?: boolean;
}

function attrValue(attrs: string, name: string): string | undefined {
  const m = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i'));
  return m ? (m[1] ?? m[2] ?? m[3]) : undefined;
}

const escAttr = (v: string): string => v.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Sanitize HTML — keep allowed formatting tags, strip everything else.
 * Attributes are rebuilt, never copied: <a> keeps only a safe href, <mark> keeps only class; style and event handlers are dropped.
 * If inline=true, block tags (p, ul, ol, li, blockquote) are also stripped.
 */
export function sanitizeHtml(html: string | null | undefined, { inline = false }: SanitizeOptions = {}): string {
  if (!html) return '';
  const allowed = inline ? INLINE_TAGS : ALLOWED_TAGS;

  return String(html)
    .replace(/<(\/?)([a-z][a-z0-9]*)\b([^>]*?)(\/?)>/gi, (_m, slash: string, tag: string, attrs: string, selfClose: string) => {
      const lower = tag.toLowerCase();
      if (lower === 'a') {
        if (slash) return '</a>';
        const href = attrValue(attrs, 'href');
        if (href === undefined || !isSafeUrl(href)) return '';
        return `<a href="${escAttr(href)}" target="_blank" rel="noopener">`;
      }
      if (lower === 'mark') {
        if (slash) return '</mark>';
        const cls = attrValue(attrs, 'class');
        return cls === undefined ? '<mark>' : `<mark class="${escAttr(cls)}">`;
      }
      if (allowed.has(lower)) return `<${slash}${lower}${selfClose}>`;
      if (inline && BLOCK_TAGS.has(lower)) return slash ? ' ' : '';
      return '';
    })
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
