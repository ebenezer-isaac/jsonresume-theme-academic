import type { ResumeEducationEntry } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { formatDate } from '../utils/dates.js';
import { has, richText } from '../utils/text.js';
import { sectionTitle } from './shared.js';

function renderEducationEntry(
  entry: ResumeEducationEntry,
  months: Readonly<Record<string, string>>
): string {
  const degree = [entry.studyType, entry.area].filter(Boolean).join(' ');

  let yearDisplay = '';
  if (entry.endDate) {
    yearDisplay = formatDate(entry.endDate, months);
  } else if (entry.startDate) {
    const year = parseInt(String(entry.startDate).split('-')[0], 10);
    const currentYear = new Date().getFullYear();
    yearDisplay = year >= currentYear ? `Expected ${formatDate(entry.startDate, months)}` : formatDate(entry.startDate, months);
  }

  const instParts = [entry.institution];
  if (entry.score) instParts.push(entry.score);
  const instLine = instParts.filter(Boolean).join(' | ');

  return `
    <div class="edu-entry">
      <div class="edu-header">
        <div class="edu-degree">${esc(degree)}</div>
        <div class="edu-year">${esc(yearDisplay)}</div>
      </div>
      ${entry.institution ? `<div class="edu-institution">${esc(instLine)}</div>` : ''}
      ${
        has(entry.courses)
      ? `<div class="edu-courses">Coursework: ${entry.courses.map((c) => richText(c)).join(', ')}</div>`
      : ''
    }
    </div>`;
}

export function renderEducation(
  education: readonly ResumeEducationEntry[] | undefined,
  heading: string,
  months: Readonly<Record<string, string>>
): string {
  if (!has(education)) return '';
  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${education.map(entry => renderEducationEntry(entry, months)).join('')}
    </div>`;
}
