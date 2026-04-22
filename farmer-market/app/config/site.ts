export const siteConfig = {
  name: "UzhaMart",
  title: "UzhaMart | Fresh produce direct from farmers",
  description:
    "A fast farmer marketplace for discovering fresh vegetables, fruits, grains, and local produce directly from trusted growers.",
  locale: "en_IN",
  defaultUrl: "http://localhost:3000",
};

function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

  if (configuredUrl) {
    return normalizeSiteUrl(configuredUrl);
  }

  if (vercelUrl) {
    return normalizeSiteUrl(`https://${vercelUrl}`);
  }

  return siteConfig.defaultUrl;
}
