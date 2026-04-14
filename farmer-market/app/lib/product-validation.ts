import type { ProductInput } from "@/app/lib/products";

const phonePattern = /^\d{10}$/;

function asNonEmptyText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().replace(/\s+/g, " ");
  if (!normalized || normalized.length > maxLength) {
    return null;
  }

  return normalized;
}

function asPositivePrice(value: unknown) {
  const price = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(price) || price <= 0 || price > 1_000_000) {
    return null;
  }

  return Math.round(price * 100) / 100;
}

function asPhone(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const digits = value.replace(/\D/g, "");
  if (!phonePattern.test(digits)) {
    return null;
  }

  return digits;
}

function asImages(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export function validateProductInput(payload: unknown):
  | { success: true; data: ProductInput }
  | { success: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { success: false, error: "Invalid request payload." };
  }

  const record = payload as Record<string, unknown>;
  const name = asNonEmptyText(record.name, 80);
  const category = asNonEmptyText(record.category, 40);
  const quantity = asNonEmptyText(record.quantity, 40);
  const location = asNonEmptyText(record.location, 60);
  const description = asNonEmptyText(record.description ?? "", 400) ?? undefined;
  const phone = asPhone(record.phone);
  const price = asPositivePrice(record.price);
  const images = asImages(record.images);

  if (!name) {
    return { success: false, error: "Product name is required." };
  }

  if (!category) {
    return { success: false, error: "Category is required." };
  }

  if (price === null) {
    return { success: false, error: "Enter a valid price greater than 0." };
  }

  if (!quantity) {
    return { success: false, error: "Quantity details are required." };
  }

  if (!location) {
    return { success: false, error: "Location is required." };
  }

  if (!phone) {
    return { success: false, error: "Enter a valid 10-digit phone number." };
  }

  return {
    success: true,
    data: {
      name,
      category,
      price,
      quantity,
      location,
      phone,
      images,
      description,
    },
  };
}
