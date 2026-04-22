import type { Product } from "@/app/types/product";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type ApiErrorResponse = {
  message?: string;
  error?: string;
  data?: {
    message?: string;
    error?: string;
  };
};

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

async function getResponseData<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiResponse<T>;
  return payload.data;
}

function getApiErrorMessage(payload: ApiErrorResponse | null): string | null {
  if (!payload) {
    return null;
  }

  return (
    payload.message ||
    payload.error ||
    payload.data?.message ||
    payload.data?.error ||
    null
  );
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(process.env.API_BASE_URL + "/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return getResponseData<Product[]>(response);
}

export async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(process.env.API_BASE_URL + "/products/" + id, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return getResponseData<Product>(response);
}

export async function createProduct(
  product: CreateProductPayload,
): Promise<Product> {
  const response = await fetch(process.env.API_BASE_URL + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
    cache: "no-store",
  });

  if (!response.ok) {
    let errorPayload: ApiErrorResponse | null = null;

    try {
      errorPayload = (await response.json()) as ApiErrorResponse;
    } catch {
      errorPayload = null;
    }

    throw new Error(getApiErrorMessage(errorPayload) || "Unable to save product.");
  }

  return getResponseData<Product>(response);
}
