import { describe, it, expect } from 'vitest';
import { render } from '../src/index';
import fixture from './fixture.resume.json';
import minimal from './minimal.resume.json';
import type { ResumeSchema } from '../src/types/resume';

describe('render', () => {
  it('renders full resume matching snapshot', () => {
    const html = render(fixture as ResumeSchema);
    expect(html).toMatchSnapshot();
  });

  it('renders minimal resume matching snapshot', () => {
    const html = render(minimal as ResumeSchema);
    expect(html).toMatchSnapshot();
  });

  it('produces valid HTML document', () => {
    const html = render(fixture as ResumeSchema);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('</html>');
  });

  it('includes EB Garamond font', () => {
    const html = render(fixture as ResumeSchema);
    expect(html).toContain('EB+Garamond');
  });

  it('uses no icon font', () => {
    const html = render(fixture as ResumeSchema);
    expect(html).not.toContain('font-awesome');
    expect(html).not.toContain('<i class="fa');
  });

  it('puts Experience before Skills', () => {
    const html = render(fixture as ResumeSchema);
    expect(html.indexOf('Professional Experience')).toBeGreaterThan(-1);
    expect(html.indexOf('Professional Experience')).toBeLessThan(html.indexOf('Core Skills'));
  });

  it('renders empty resume without crashing', () => {
    const html = render({} as ResumeSchema);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Resume');
  });

  it('respects custom meta.headings', () => {
    const html = render(fixture as ResumeSchema);
    expect(html).toContain('Professional Experience');
    expect(html).not.toContain('>Experience<');
  });

  it('uses default headings when meta.headings not provided', () => {
    const html = render(minimal as ResumeSchema);
    expect(html).not.toContain('Professional Experience');
  });
});
