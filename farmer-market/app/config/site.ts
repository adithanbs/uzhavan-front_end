export const siteConfig = {
  name: "UzhaMart",
  title: "UzhaMart | Fresh produce direct from farmers",
  description:
    "A fast farmer marketplace for discovering fresh vegetables, fruits, grains, and local produce directly from trusted growers.",
  locale: "en_IN",
  defaultUrl: "http://localhost:3000",
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || siteConfig.defaultUrl;
}
