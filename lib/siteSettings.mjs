export const defaultSiteSettings = {
  companyName: "Sudeep Engineers", logo: "/logo.png",
  address: "Waluj MIDC, Aurangabad, Maharashtra 431136, India",
  phone: "+91 9922996236", email: "info@sudeepengineers.com", whatsapp: "919922996236",
  facebook: "", instagram: "", linkedin: "", youtube: "",
};

export function safeWebUrl(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  const url = value.trim();
  if (/[\\\x00-\x1f\x7f]/.test(url)) return fallback;
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  try { return ['http:', 'https:'].includes(new URL(url).protocol) ? url : fallback; }
  catch { return fallback; }
}

export function normalizeSiteSettings(input = {}) {
  const result = { ...defaultSiteSettings };
  for (const key of Object.keys(result)) {
    if (typeof input[key] === "string" && input[key].trim()) result[key] = input[key].trim();
  }
  result.logo = safeWebUrl(result.logo, defaultSiteSettings.logo);
  for (const key of ['facebook', 'instagram', 'linkedin', 'youtube']) result[key] = safeWebUrl(result[key]);
  if (!/^[+\d\s().-]{7,25}$/.test(result.phone)) result.phone = defaultSiteSettings.phone;
  if (!/^[\d\s+()-]{7,25}$/.test(result.whatsapp)) result.whatsapp = defaultSiteSettings.whatsapp;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) result.email = defaultSiteSettings.email;
  return result;
}
export const phoneHref = (number) => `tel:${number.replace(/[^\d+]/g, '')}`;
export const whatsappNumber = (number) => number.replace(/\D/g, '');
