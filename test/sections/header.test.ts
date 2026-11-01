import { describe, it, expect } from 'vitest';
import { renderHeader } from '../../src/sections/header';

describe('renderHeader', () => {
  it('returns empty string for undefined basics', () => {
    expect(renderHeader(undefined)).toBe('');
  });

  it('renders name and label', () => {
    const html = renderHeader({ name: 'John Doe', label: 'Engineer' });
    expect(html).toContain('John Doe');
    expect(html).toContain('Engineer');
    expect(html).toContain('class="name"');
    expect(html).toContain('class="label"');
  });

  it('renders location with region name', () => {
    const html = renderHeader({
      name: 'Jane',
      location: { city: 'London', region: 'GB' },
    });
    expect(html).toContain('London, United Kingdom');
  });

  it('renders phone as tel link', () => {
    const html = renderHeader({ name: 'Test', phone: '+1 555-0100' });
    expect(html).toContain('+1 555-0100');
    expect(html).toContain('href="tel:+15550100"');
  });

  it('renders email as mailto link', () => {
    const html = renderHeader({ name: 'Test', email: 'test@example.com' });
    expect(html).toContain('test@example.com');
    expect(html).toContain('href="mailto:test@example.com"');
  });

  it('renders URL without protocol', () => {
    const html = renderHeader({ name: 'Test', url: 'https://example.com/portfolio' });
    expect(html).toContain('example.com/portfolio');
    expect(html).toContain('>example.com/portfolio</a>');
    expect(html).toContain('href="https://example.com/portfolio"');
  });

  it('shows profile URLs, not bare usernames, and links them', () => {
    const html = renderHeader({
      name: 'Test',
      profiles: [
        { network: 'LinkedIn', username: 'johndoe', url: 'https://www.linkedin.com/in/johndoe/' },
        { network: 'GitHub', username: 'johndoe' },
      ],
    });
    expect(html).toContain('>www.linkedin.com/in/johndoe</a>');
    expect(html).toContain('href="https://www.linkedin.com/in/johndoe/"');
    expect(html).toContain('johndoe');
    expect(html).not.toContain('<i class=');
  });

  it('escapes HTML in name', () => {
    const html = renderHeader({ name: '<script>alert("xss")</script>' });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('renders header-rule separator', () => {
    const html = renderHeader({ name: 'Test' });
    expect(html).toContain('class="header-rule"');
  });
});
