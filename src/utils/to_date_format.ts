export function formatIsoToLongDate(iso: string, locale = "en-US"): string {
  if (!iso) return "";

  // Trim excessive fractional seconds to milliseconds (JS Date handles up to 3 digits)
  const normalized = iso.replace(/\.([0-9]{3})[0-9]*/g, ".$1");

  const d = new Date(normalized);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}