import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '../../src/utils/sanitize';

describe('sanitizeHtml', () => {
  it('returns empty string for null/undefined', () => {
    expect(sanitizeHtml(null)).toBe('');
    expect(sanitizeHtml(undefined)).toBe('');
    expect(sanitizeHtml('')).toBe('');
  });

  it('preserves allowed inline tags', () => {
    expect(sanitizeHtml('<b>bold</b>')).toContain('<b>');
    expect(sanitizeHtml('<i>italic</i>')).toContain('<i>');
    expect(sanitizeHtml('<em>emphasis</em>')).toContain('<em>');
    expect(sanitizeHtml('<strong>strong</strong>')).toContain('<strong>');
    expect(sanitizeHtml('<u>underline</u>')).toContain('<u>');
    expect(sanitizeHtml('<code>code</code>')).toContain('<code>');
    expect(sanitizeHtml('<sub>sub</sub>')).toContain('<sub>');
    expect(sanitizeHtml('<sup>sup</sup>')).toContain('<sup>');
    expect(sanitizeHtml('<s>strike</s>')).toContain('<s>');
    expect(sanitizeHtml('<br/>')).toContain('<br');
  });

  it('preserves block tags in block mode', () => {
    const result = sanitizeHtml('<p>paragraph</p><ul><li>item</li></ul>');
    expect(result).toContain('<p>');
    expect(result).toContain('<ul>');
    expect(result).toContain('<li>');
  });

  it('strips block tags in inline mode', () => {
    const result = sanitizeHtml('<p>paragraph</p>', { inline: true });
    expect(result).not.toContain('<p>');
    expect(result).toContain('paragraph');
  });

  it('replaces closing block tags with space in inline mode', () => {
    const result = sanitizeHtml('<ul><li>one</li><li>two</li></ul>', { inline: true });
    expect(result).not.toContain('<li>');
    expect(result).toContain('one');
    expect(result).toContain('two');
  });

  it('preserves href on <a> tags with safe schemes', () => {
    const result = sanitizeHtml('<a href="https://example.com" class="link">click</a>');
    expect(result).toContain('href="https://example.com"');
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener"');
  });

  it('allows http: hrefs', () => {
    const result = sanitizeHtml('<a href="http://example.com">link</a>');
    expect(result).toContain('href="http://example.com"');
  });

  it('allows mailto: hrefs', () => {
    const result = sanitizeHtml('<a href="mailto:user@example.com">email</a>');
    expect(result).toContain('href="mailto:user@example.com"');
  });

  it('allows tel: hrefs', () => {
    const result = sanitizeHtml('<a href="tel:+15551234567">call</a>');
    expect(result).toContain('href="tel:+15551234567"');
  });

  it('preserves class on <mark> tags', () => {
    const result = sanitizeHtml('<mark class="highlight-yellow">text</mark>');
    expect(result).toContain('class="highlight-yellow"');
  });

  // ─── XSS Prevention ───────────────────────────────────────────

  it('strips script tags', () => {
    const result = sanitizeHtml('<script>alert("xss")</script>');
    expect(result).not.toContain('<script');
    expect(result).not.toContain('</script');
  });

  it('strips event handlers on disallowed tags', () => {
    const result = sanitizeHtml('<img onerror="alert(1)" src="x">');
    expect(result).not.toContain('onerror');
    expect(result).not.toContain('alert');
  });

  it('strips iframe tags', () => {
    const result = sanitizeHtml('<iframe src="evil.com"></iframe>');
    expect(result).not.toContain('<iframe');
  });

  it('strips svg onload XSS', () => {
    const result = sanitizeHtml('<svg onload="alert(1)">');
    expect(result).not.toContain('<svg');
    expect(result).not.toContain('onload');
  });

  it('strips javascript: protocol in <a> href', () => {
    const result = sanitizeHtml('<a href="javascript:alert(1)">click</a>');
    expect(result).not.toContain('javascript:');
    expect(result).not.toContain('alert');
  });

  it('strips data: protocol in <a> href', () => {
    const result = sanitizeHtml('<a href="data:text/html,<script>alert(1)</script>">click</a>');
    expect(result).not.toContain('data:');
  });

  it('strips vbscript: protocol in <a> href', () => {
    const result = sanitizeHtml('<a href="vbscript:MsgBox(1)">click</a>');
    expect(result).not.toContain('vbscript:');
  });

  it('strips <a> with empty href', () => {
    const result = sanitizeHtml('<a href="">click</a>');
    expect(result).not.toContain('href=""');
  });

  it('handles case-insensitive tag stripping', () => {
    const result = sanitizeHtml('<SCRIPT>alert(1)</SCRIPT>');
    expect(result).not.toContain('<SCRIPT');
    expect(result).not.toContain('<script');
  });

  // ─── Cleanup ──────────────────────────────────────────────────

  it('removes empty paragraphs', () => {
    const result = sanitizeHtml('<p></p><p>content</p>');
    expect(result).not.toMatch(/<p>\s*<\/p>/);
    expect(result).toContain('content');
  });

  it('collapses multiple whitespace', () => {
    const result = sanitizeHtml('hello    world');
    expect(result).toBe('hello world');
  });

  it('strips attributes from allowed tags except a and mark', () => {
    const result = sanitizeHtml('<b style="color:red">text</b>');
    expect(result).toBe('<b>text</b>');
    expect(result).not.toContain('style');
  });

  it('drops style and event handlers from anchors, whatever the quoting', () => {
    const cases = [
      '<a href="https://x.com" style="color:red">x</a>',
      '<a style="color:red" href="https://x.com">x</a>',
      "<a href='https://x.com' style='color:red' onclick='e()'>x</a>",
      '<a href=https://x.com style=color:red>x</a>',
      '<A HREF="https://x.com" STYLE="color:red">x</A>',
    ];
    for (const c of cases) {
      const out = sanitizeHtml(c);
      expect(out).toBe('<a href="https://x.com" target="_blank" rel="noopener">x</a>');
    }
  });

  it('drops class extras and handlers from mark', () => {
    expect(sanitizeHtml("<mark class='k' onclick='e()' style='x'>m</mark>")).toBe('<mark class="k">m</mark>');
  });

  it('strips anchors with unsafe single-quoted hrefs', () => {
    expect(sanitizeHtml("<a href='javascript:alert(1)'>x</a>")).not.toContain('javascript');
  });
});
