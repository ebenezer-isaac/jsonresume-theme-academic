import { describe, it, expect } from 'vitest';
import { renderVolunteer } from '../../src/sections/volunteer';

describe('renderVolunteer', () => {
  it('returns empty for undefined/empty volunteer', () => {
    expect(renderVolunteer(undefined, 'Volunteering')).toBe('');
    expect(renderVolunteer([], 'Volunteering')).toBe('');
  });

  it('renders section title', () => {
    const html = renderVolunteer(
      [{ organization: 'Red Cross', summary: 'Helped people' }],
      'Leadership & Volunteering',
    );
    expect(html).toContain('Leadership &amp; Volunteering');
    expect(html).toContain('class="section-title"');
  });

  it('renders organization with position and en-dash', () => {
    const html = renderVolunteer(
      [{ organization: 'Code.org', position: 'Mentor', summary: 'Mentored students' }],
      'Volunteering',
    );
    expect(html).toContain('Mentor');
    expect(html).toContain('Code.org');
    expect(html).toContain('\u2013');
  });

  it('renders organization without position', () => {
    const html = renderVolunteer(
      [{ organization: 'Red Cross', summary: 'Donated time' }],
      'Volunteering',
    );
    expect(html).toContain('Red Cross');
  });

  it('renders date range with en-dash', () => {
    const html = renderVolunteer(
      [{ organization: 'NPO', startDate: '2020', endDate: '2024', summary: 'Work' }],
      'Volunteering',
    );
    expect(html).toContain('2020\u20132024');
  });

  it('renders start date only when no end date', () => {
    const html = renderVolunteer(
      [{ organization: 'NPO', startDate: '2020', summary: 'Work' }],
      'Volunteering',
    );
    expect(html).toContain('2020');
  });

  it('renders without dates when none provided', () => {
    const html = renderVolunteer(
      [{ organization: 'NPO', summary: 'Work' }],
      'Volunteering',
    );
    expect(html).not.toContain('(');
  });

  it('renders rich text summary', () => {
    const html = renderVolunteer(
      [{ organization: 'NPO', summary: '<b>Important</b> work' }],
      'Volunteering',
    );
    expect(html).toContain('<b>Important</b>');
  });

  it('renders highlights as list items', () => {
    const html = renderVolunteer(
      [{ organization: 'NPO', summary: 'Work', highlights: ['Ran sessions', 'Wrote <b>reports</b>'] }],
      'Volunteering',
    );
    expect(html).toContain('<li>Ran sessions</li>');
    expect(html).toContain('<li>Wrote <b>reports</b></li>');
  });
});
