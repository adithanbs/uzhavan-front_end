import { cache } from "react";

import type { Product } from "@/app/types/product";

export type ProductInput = {
  name: string;
  category: string;
  price: number;
  quantity: string;
  location: string;
  phone: string;
  images: string[];
  description?: string;
};

const placeholderImage = "/placeholder-market.svg";

const initialProducts: Product[] = [
  {
    _id: "thinai-rice-1",
    name: "Traditional Thinai Rice",
    category: "Millets",
    price: 92,
    quantity: "25 kg available",
    location: "Thanjavur, Tamil Nadu",
    phone: "9876543210",
    images: [placeholderImage],
    description:
      "Stone-cleaned foxtail millet rice from a small family farm with weekly harvest packing.",
  },
  {
    _id: "tomato-2",
    name: "Farm Fresh Country Tomatoes",
    category: "Vegetables",
    price: 38,
    quantity: "80 kg available",
    location: "Dindigul, Tamil Nadu",
    phone: "9123456780",
    images: [placeholderImage],
    description:
      "Naturally ripened tomatoes suited for retail buyers, hotels, and neighborhood stores.",
  },
  {
    _id: "banana-3",
    name: "Nendran Bananas",
    category: "Fruits",
    price: 68,
    quantity: "120 bunches available",
    location: "Pollachi, Tamil Nadu",
    phone: "9000012345",
    images: [placeholderImage],
    description:
      "Carefully graded Nendran bananas with consistent size, ideal for fresh sale and chips production.",
  },
];

const productStore = new Map<string, Product>(
  initialProducts.map((product) => [product._id as string, product]),
);

function sortProducts(products: Product[]) {
  return [...products].sort((left, right) => left.name.localeCompare(right.name));
}

export const getAllProducts = cache(async () => {
  return sortProducts(Array.from(productStore.values()));
});

export const getProductById = cache(async (id: string) => {
  return productStore.get(id) ?? null;
});

export async function createProduct(input: ProductInput) {
  const product: Product = {
    _id: crypto.randomUUID(),
    ...input,
    images: input.images.length > 0 ? input.images : [placeholderImage],
  };

  productStore.set(product._id as string, product);
  return product;
}

export function getProductImage(product: Product) {
  const firstImage = product.images[0];
  return firstImage && firstImage.startsWith("/") ? firstImage : placeholderImage;
}
