const defaultApiBaseUrl = "http://localhost:5050/api";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const API_CONFIG = {
  baseUrl: trimTrailingSlash(
    process.env.API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      defaultApiBaseUrl,
  ),
};

export const API_ENDPOINTS = {
  products: `${API_CONFIG.baseUrl}/products`,
  productById: (id: string) =>
    `${API_CONFIG.baseUrl}/products/${encodeURIComponent(id)}`,
};
