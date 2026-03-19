import { describe, it, expect } from 'vitest';
import { formatDate, dateRange, regionName } from '../../src/utils/dates';
import { MONTHS } from "../../src/constants.js";

describe('formatDate', () => {
  it('returns "Present" string for falsy input', () => {
    expect(formatDate('', MONTHS)).toBe('Present');
    expect(formatDate(null, MONTHS)).toBe('Present');
    expect(formatDate(undefined, MONTHS)).toBe('Present');
    expect(formatDate('present', MONTHS)).toBe('Present');
  });

  it('returns year-only for single-part dates', () => {
    expect(formatDate('2024', MONTHS)).toBe('2024');
  });

  it('formats YYYY-MM to "Month Year"', () => {
    expect(formatDate('2024-01', MONTHS)).toBe('January 2024');
    expect(formatDate('2024-06', MONTHS)).toBe('June 2024');
    expect(formatDate('2024-12', MONTHS)).toBe('December 2024');
  });

  it('handles YYYY-MM-DD (ignores day)', () => {
    expect(formatDate('2024-03-15', MONTHS)).toBe('March 2024');
  });

  it('handles invalid month gracefully', () => {
    expect(formatDate('2024-13', MONTHS)).toBe(' 2024');
    expect(formatDate('2024-00', MONTHS)).toBe(' 2024');
  });
});

describe('dateRange', () => {
  it('returns empty string when no start or start is "Present"', () => {
    expect(dateRange('', '2024-06', MONTHS)).toBe('');
    expect(dateRange(null, '2024-06', MONTHS)).toBe('');
    expect(dateRange('present', '2024-06', MONTHS)).toBe('');
  });

  it('returns start to "Present" when no end', () => {
    expect(dateRange('2024-01', '', MONTHS)).toBe('January 2024 to Present');
    expect(dateRange('2024-01', null, MONTHS)).toBe('January 2024 to Present');
  });

  it('formats full range', () => {
    expect(dateRange('2020-03', '2024-06', MONTHS)).toBe('March 2020 to June 2024');
  });
});

describe('regionName', () => {
  it('returns empty string for falsy input', () => {
    expect(regionName('')).toBe('');
    expect(regionName(null)).toBe('');
    expect(regionName(undefined)).toBe('');
  });

  it('maps known country codes', () => {
    expect(regionName('US')).toBe('United States');
    expect(regionName('GB')).toBe('United Kingdom');
    expect(regionName('DE')).toBe('Germany');
  });

  it('is case-insensitive', () => {
    expect(regionName('us')).toBe('United States');
  });

  it('returns original code for unknown countries', () => {
    expect(regionName('ZZ')).toBe('ZZ');
  });
});
