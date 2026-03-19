import { describe, it, expect } from 'vitest';
import { renderEducation } from '../../src/sections/education';
import { MONTHS } from "../../src/constants.js";

describe('renderEducation', () => {
  it('returns empty for undefined/empty education', () => {
    expect(renderEducation(undefined, 'Education', MONTHS)).toBe('');
    expect(renderEducation([], 'Education', MONTHS)).toBe('');
  });

  it('renders degree from studyType and area', () => {
    const html = renderEducation(
      [{ studyType: 'B.S.', area: 'Computer Science' }],
      'Education',
      MONTHS
    );
    expect(html).toContain('B.S. Computer Science');
  });

  it('renders end date', () => {
    const html = renderEducation(
      [{ institution: 'MIT', endDate: '2024-05' }],
      'Education',
      MONTHS
    );
    expect(html).toContain('May 2024');
  });

  it('renders "Expected" for future start dates with no end date', () => {
    const futureYear = new Date().getFullYear() + 2;
    const html = renderEducation(
      [{ institution: 'MIT', startDate: `${futureYear}-06` }],
      'Education',
      MONTHS
    );
    expect(html).toContain('Expected');
  });

  it('renders institution with score', () => {
    const html = renderEducation(
      [{ institution: 'Stanford', score: 'GPA: 3.9/4.0' }],
      'Education',
      MONTHS
    );
    expect(html).toContain('Stanford | GPA: 3.9/4.0');
  });

  it('renders courses', () => {
    const html = renderEducation(
      [{ institution: 'MIT', courses: ['Algorithms', 'Data Structures'] }],
      'Education',
      MONTHS
    );
    expect(html).toContain('Algorithms');
    expect(html).toContain('Data Structures');
  });
});
