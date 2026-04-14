import type { MetadataRoute } from "next";

import { getAllProducts } from "@/app/lib/products";
import { getSiteUrl } from "@/app/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const products = await getAllProducts();

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
