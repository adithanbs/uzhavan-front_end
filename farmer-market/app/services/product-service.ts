import "server-only";

import { API_ENDPOINTS } from "@/app/config/api";
import type { Product } from "@/app/types/product";

export type CreateProductPayload = {
  name: string;
  category: string;
  price?: number;
  quantity?: string;
  location: string;
  phone: string;
  images: string[];
  description?: string;
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_ENDPOINTS.products, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(API_ENDPOINTS.productById(id), {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function createProduct(
  product: CreateProductPayload,
): Promise<Product> {
  const response = await fetch(API_ENDPOINTS.products, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to save product.");
  }

  return response.json();
}
