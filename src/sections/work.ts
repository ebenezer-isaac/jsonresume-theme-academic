import type { ResumeWorkEntry } from '../types/resume.js';
import { esc } from '../utils/escape.js';
import { dateRange } from '../utils/dates.js';
import { has, richText, stripHtml } from '../utils/text.js';
import { sectionTitle } from './shared.js';

/** Check whether summary uses structured Tech-stack / Client format. */
function isStructuredMeta(text: string): boolean {
  return /Tech-stack:\s/i.test(text) || /Client:\s/i.test(text);
}

/** Extract tech-stack, client, and any remaining narrative from a work summary. */
function parseWorkMeta(summary: string | undefined): {
  techStack: string;
  client: string;
  narrative: string;
} {
  if (!summary) return { techStack: '', client: '', narrative: '' };
  const text = stripHtml(summary).replace(/\n/g, ' ').trim();
  if (!isStructuredMeta(text)) return { techStack: '', client: '', narrative: text };

  let remaining = text;

  const clientMatch = remaining.match(/Client:\s*(.+)$/i);
  const client = clientMatch ? clientMatch[1].trim() : '';
  if (clientMatch) remaining = remaining.slice(0, clientMatch.index).trim();

  const techMatch = remaining.match(/Tech-stack:\s*(.+)/i);
  const techStack = techMatch ? techMatch[1].trim() : '';
  if (techMatch) remaining = remaining.slice(0, techMatch.index).trim();

  return { techStack, client, narrative: remaining };
}

function renderWorkEntry(
  entry: ResumeWorkEntry,
  months: Readonly<Record<string, string>>
): string {
  const { techStack, client, narrative } = parseWorkMeta(entry.summary);
  const duration = dateRange(entry.startDate, entry.endDate, months);

  return `
    <div class="work-entry">
      <div class="work-header">
        <div class="work-title">${esc(entry.name)} - ${esc(entry.position)}</div>
        <div class="work-duration">${duration ? `Duration: ${esc(duration)}` : ''}</div>
      </div>
      ${
        techStack || client
          ? `
      <div class="work-meta">
        <div class="work-tech">${techStack ? `Tech-stack: ${esc(techStack)}` : ''}</div>
        <div class="work-client">${client ? `Client: ${esc(client)}` : ''}</div>
      </div>`
          : ''
      }
      ${narrative ? `<p class="work-summary">${richText(narrative, { block: false })}</p>` : ''}
      ${
        has(entry.highlights)
          ? `
      <ul class="work-highlights">
        ${entry.highlights.map((h) => `<li>${richText(h)}</li>`).join('\n        ')}
      </ul>`
          : ''
      }
    </div>`;
}

export function renderWork(work: readonly ResumeWorkEntry[] | undefined, heading: string, months: Readonly<Record<string, string>>): string {
  if (!has(work)) return '';
  return `
    ${sectionTitle(heading)}
    <div class="section-body">
      ${work.map(entry => renderWorkEntry(entry, months)).join('')}
    </div>`;
}
