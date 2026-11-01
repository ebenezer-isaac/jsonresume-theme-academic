import { describe, it, expect } from 'vitest';
import { renderAdditional } from '../../src/sections/additional';
import type { ResumeSchema } from '../../src/types/resume';

describe('renderAdditional', () => {
  it('returns empty when no interests, languages, or references', () => {
    expect(renderAdditional({}, 'Additional')).toBe('');
  });

  it('returns empty when arrays are empty', () => {
    expect(renderAdditional({ interests: [], languages: [], references: [] }, 'Additional')).toBe('');
  });

  it('renders interests with keywords', () => {
    const resume: ResumeSchema = {
      interests: [{ name: 'Research', keywords: ['AI', 'ML', 'NLP'] }],
    };
    const html = renderAdditional(resume, 'Additional');
    expect(html).toContain('Research');
    expect(html).toContain('AI, ML, NLP');
  });

  it('renders interests that have a name but no keywords', () => {
    const html = renderAdditional({ interests: [{ name: 'Reading' }, { name: 'Guitar' }] }, 'Additional');
    expect(html).toContain('Reading');
    expect(html).toContain('Guitar');
  });

  it('skips interests with neither name nor keywords', () => {
    expect(renderAdditional({ interests: [{}] }, 'Additional')).toBe('');
  });

  it('uses "Interests" as default label when name missing', () => {
    const resume: ResumeSchema = {
      interests: [{ keywords: ['Hiking', 'Cycling'] }],
    };
    const html = renderAdditional(resume, 'Additional');
    expect(html).toContain('Interests');
    expect(html).toContain('Hiking, Cycling');
  });

  it('renders languages with fluency', () => {
    const resume: ResumeSchema = {
      languages: [
        { language: 'English', fluency: 'Native' },
        { language: 'French', fluency: 'Professional' },
      ],
    };
    const html = renderAdditional(resume, 'Additional');
    expect(html).toContain('Languages');
    expect(html).toContain('English (Native)');
    expect(html).toContain('French (Professional)');
  });

  it('renders languages without fluency', () => {
    const resume: ResumeSchema = {
      languages: [{ language: 'English' }],
    };
    const html = renderAdditional(resume, 'Additional');
    expect(html).toContain('English');
    expect(html).not.toContain('(');
  });

  it('renders references as "Available on request"', () => {
    const resume: ResumeSchema = {
      references: [{ name: 'John' }],
    };
    const html = renderAdditional(resume, 'Additional');
    expect(html).toContain('Referees');
    expect(html).toContain('Available on request');
  });

  it('renders all sections together', () => {
    const resume: ResumeSchema = {
      interests: [{ name: 'Hobbies', keywords: ['Reading'] }],
      languages: [{ language: 'English', fluency: 'Native' }],
      references: [{ name: 'Ref' }],
    };
    const html = renderAdditional(resume, 'Additional');
    expect(html).toContain('Hobbies');
    expect(html).toContain('Languages');
    expect(html).toContain('Referees');
  });
});
