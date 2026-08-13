export function asList(value: string[] | string | undefined | null): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
  } catch {
    // Plain comma-separated content from older records.
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function statusLabel(value: string | undefined | null): string {
  if (!value) return "Active";
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function yearLabel(dateValue: string | null | undefined): string {
  if (!dateValue) return "Present";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return String(date.getFullYear());
}
