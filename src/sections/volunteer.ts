import type { ResumeVolunteerEntry } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { has, richText } from '../utils/text.js';
import { sectionTitle } from './shared.js';

export function renderVolunteer(
  volunteer: readonly ResumeVolunteerEntry[] | undefined,
  heading: string,
): string {
  if (!has(volunteer)) return '';
  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${volunteer
        .map((v) => {
          const years = v.endDate
            ? `${v.startDate}\u2013${v.endDate}`
            : v.startDate || '';
          const title = v.position
            ? `${v.position} \u2013 ${v.organization}`
            : v.organization;
          const summary = richText(v.summary);
          const highlights = has(v.highlights)
            ? `
        <ul class="work-highlights">
          ${v.highlights.map((h) => `<li>${richText(h)}</li>`).join('\n          ')}
        </ul>`
            : '';

          return `
      <div class="bullet-item volunteer-item">
        <span class="vol-title">${esc(title)}${years ? ` (${esc(years)})` : ''}:</span> ${summary}${highlights}
      </div>`;
        })
        .join('')}
    </div>`;
}
