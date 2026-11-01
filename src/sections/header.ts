import type { ResumeBasics } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { regionName } from '../utils/dates.js';
import { has } from '../utils/text.js';

interface ContactLine {
  readonly text: string;
  readonly href?: string;
}

const displayUrl = (url: string): string => url.replace(/^https?:\/\//i, '').replace(/\/$/, '');

export function renderHeader(basics: ResumeBasics | undefined): string {
  if (!basics) return '';

  const location = basics.location
    ? [basics.location.city, regionName(basics.location.region)].filter(Boolean).join(', ')
    : '';

  const lines: ContactLine[] = [];
  if (location) lines.push({ text: location });
  if (basics.phone) lines.push({ text: basics.phone, href: `tel:${basics.phone.replace(/[^\d+]/g, '')}` });
  if (basics.email) lines.push({ text: basics.email, href: `mailto:${basics.email}` });
  if (basics.url) lines.push({ text: displayUrl(basics.url), href: basics.url });
  if (has(basics.profiles)) {
    for (const p of basics.profiles) {
      const text = p.url ? displayUrl(p.url) : p.username || '';
      if (text) lines.push({ text, href: p.url });
    }
  }

  const line = (l: ContactLine): string =>
    `<div class="contact-line">${l.href ? `<a href="${esc(l.href)}">${esc(l.text)}</a>` : esc(l.text)}</div>`;

  return `
    <header class="header">
      <div class="header-left">
        <h1 class="name">${esc(basics.name)}</h1>
        <div class="label">${esc(basics.label)}</div>
      </div>
      <div class="contact-info">
        ${lines.map(line).join('\n        ')}
      </div>
    </header>
    <hr class="header-rule" />`;
}
