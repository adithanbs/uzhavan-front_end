import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/app/config/site";
import { getProducts } from "@/app/services/product-service";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const products = await getProducts();

  return [
    {
      url: siteUrl,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/add-product`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...products.map((product) => ({
      url: `${siteUrl}/product/${product._id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
