import type { ResumeSchema } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { has } from '../utils/text.js';
import { sectionTitle } from './shared.js';

export function renderAdditional(resume: ResumeSchema, heading: string): string {
  const parts: string[] = [];

  if (has(resume.interests)) {
    for (const interest of resume.interests) {
      const keywords = has(interest.keywords) ? interest.keywords.join(', ') : '';
      const label = interest.name || 'Interests';
      if (keywords) {
        parts.push(
          `<div class="additional-line"><span class="additional-label">${esc(label)}:</span> ${esc(keywords)}</div>`,
        );
      } else if (interest.name) {
        parts.push(`<div class="additional-line">${esc(interest.name)}</div>`);
      }
    }
  }

  if (has(resume.languages)) {
    const langStr = resume.languages
      .map((l) => `${l.language}${l.fluency ? ` (${l.fluency})` : ''}`)
      .join(', ');
    parts.push(
      `<div class="additional-line"><span class="additional-label">Languages:</span> ${esc(langStr)}</div>`,
    );
  }

  if (has(resume.references)) {
    parts.push(
      `<div class="additional-line"><span class="additional-label">Referees:</span> Available on request</div>`,
    );
  }

  if (parts.length === 0) return '';

  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${parts.join('\n      ')}
    </div>`;
}
