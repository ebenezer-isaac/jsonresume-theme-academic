import type { ResumeSchema } from './types/resume.js';
import { DEFAULT_HEADINGS } from './constants.js';
import { MONTHS } from './constants.js';
import { esc } from './utils/escape.js';
import { renderHeader } from './sections/header.js';
import { renderSummary } from './sections/summary.js';
import { renderSkills } from './sections/skills.js';
import { renderWork } from './sections/work.js';
import { renderProjects } from './sections/projects.js';
import { renderEducation } from './sections/education.js';
import { renderVolunteer } from './sections/volunteer.js';
import { renderCertificates } from './sections/certificates.js';
import { renderAdditional } from './sections/additional.js';
import css from './styles/academic.css?inline';

export function render(resume: ResumeSchema): string {
  const h = { ...DEFAULT_HEADINGS };
  const metaHeadings = resume?.meta?.headings;
  if (metaHeadings) {
    for (const [key, value] of Object.entries(metaHeadings)) {
      if (value && key in h) {
        h[key] = value;
      }
    }
  }

  const m = { ...MONTHS };
  const metaMonths = resume?.meta?.months;
  if (metaMonths) {
    for (const [key, value] of Object.entries(metaMonths)) {
      if (value && key in m) {
        m[key] = value;
      }
    }
  }

  const basics = resume?.basics || {};

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(basics.name || 'Resume')}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <style>${css}</style>
</head>
<body>
  <div class="resume">
    ${renderHeader(basics)}
    ${renderSummary(basics.summary, h.summary)}
    ${renderSkills(resume.skills, h.skills)}
    ${renderWork(resume.work, h.experience, m)}
    ${renderProjects(resume.projects, h.projects)}
    ${renderEducation(resume.education, h.education, m)}
    ${renderVolunteer(resume.volunteer, h.volunteer)}
    ${renderCertificates(resume.certificates, h.certifications)}
    ${renderAdditional(resume, h.additional)}
  </div>
</body>
</html>`;
}
