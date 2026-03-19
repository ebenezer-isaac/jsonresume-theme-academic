import { COUNTRY_NAMES } from '../constants.js';

export function formatDate(
  dateStr: string | null | undefined,
  months: Readonly<Record<string, string>>
): string {
  if (!dateStr) return 'Present';
  if (dateStr.toLowerCase() === 'present') return 'Present';
  const parts = String(dateStr).split('-');
  if (parts.length === 1) return parts[0];
  const year = parts[0];
  const month = Object.values(months)[parseInt(parts[1], 10) - 1] || '';
  return `${month} ${year}`;
}

export function dateRange(
  start: string | null | undefined,
  end: string | null | undefined,
  months: Readonly<Record<string, string>>): string {
  const s = formatDate(start, months);
  const e = formatDate(end, months);
  if (!s || s === 'Present') return ''; // start date should not be empty or present
  if (!e) return s;
  return `${s} to ${e}`;
}

export function regionName(code: string | null | undefined): string {
  if (!code) return '';
  return COUNTRY_NAMES[code.toUpperCase()] || code;
}
