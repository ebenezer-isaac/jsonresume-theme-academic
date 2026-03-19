import { describe, it, expect } from 'vitest';
import { renderWork } from '../../src/sections/work';
import { MONTHS } from "../../src/constants.js";

describe('renderWork', () => {
  it('returns empty for undefined/empty work', () => {
    expect(renderWork(undefined, 'Experience', MONTHS)).toBe('');
    expect(renderWork([], 'Experience', MONTHS)).toBe('');
  });

  it('renders section title', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev' }],
      'Experience',
      MONTHS
    );
    expect(html).toContain('Experience');
    expect(html).toContain('class="section-title"');
  });

  it('renders work entry with name and position', () => {
    const html = renderWork(
      [{ name: 'Acme Corp', position: 'Senior Developer' }],
      'Experience',
      MONTHS
    );
    expect(html).toContain('Acme Corp');
    expect(html).toContain('Senior Developer');
  });

  it('renders date range', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev', startDate: '2020-01', endDate: '2023-06' }],
      'Experience',
      MONTHS
    );
    expect(html).toContain('Duration: January 2020 to June 2023');
  });

  it('parses tech-stack from summary', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev', summary: 'Tech-stack: React, Node.js' }],
      'Experience',
      MONTHS
    );
    expect(html).toContain('Tech-stack: React, Node.js');
  });

  it('parses client from summary', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev', summary: 'Tech-stack: React\nClient: BigCorp' }],
      'Experience',
      MONTHS
    );
    expect(html).toContain('Client: BigCorp');
  });

  it('renders narrative summary as paragraph', () => {
    const html = renderWork(
      [{
        name: 'Acme',
        position: 'Dev',
        summary: 'Full-stack development for Acme using React and Node.js.',
      }],
      'Experience',
      MONTHS
    );
    expect(html).toContain('class="work-summary"');
    expect(html).toContain('Full-stack development for Acme using React and Node.js.');
  });

  it('does not render narrative paragraph for structured Tech-stack summary', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev', summary: 'Tech-stack: React, Node.js\nClient: BigCorp' }],
      'Experience',
      MONTHS
    );
    expect(html).not.toContain('class="work-summary"');
    expect(html).toContain('Tech-stack: React, Node.js');
    expect(html).toContain('Client: BigCorp');
  });

  it('does not render summary paragraph when summary is empty', () => {
    const html = renderWork(
      [{ name: 'Acme', position: 'Dev' }],
      'Experience',
      MONTHS
    );
    expect(html).not.toContain('class="work-summary"');
  });

  it('renders highlights as list items', () => {
    const html = renderWork(
      [{
        name: 'Acme',
        position: 'Dev',
        highlights: ['Built API', 'Led team of 5'],
      }],
      'Experience',
      MONTHS
    );
    expect(html).toContain('<li>Built API</li>');
    expect(html).toContain('<li>Led team of 5</li>');
  });

  it('sanitizes HTML in highlights', () => {
    const html = renderWork(
      [{
        name: 'Acme',
        position: 'Dev',
        highlights: ['<b>Important</b> achievement'],
      }],
      'Experience',
      MONTHS
    );
    expect(html).toContain('<b>Important</b>');
  });
});
