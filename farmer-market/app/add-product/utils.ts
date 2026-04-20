import type { ProductFormValues } from "@/app/add-product/constants";
import { PRODUCT_FORM_MESSAGES } from "@/app/add-product/constants";
import type { CreateProductPayload } from "@/app/services/product-service";

export function buildCreateProductPayload(
  form: ProductFormValues,
): CreateProductPayload {
  const payload: CreateProductPayload = {
    name: form.name,
    category: form.category,
    location: form.location,
    phone: form.phone,
    images: [form.image],
  };

  if (form.price) {
    payload.price = Number(form.price);
  }

  if (form.quantity) {
    payload.quantity = form.quantity;
  }

  if (form.description) {
    payload.description = form.description;
  }

  return payload;
}

export function validatePositivePrice(value: string) {
  return !value || Number(value) > 0 || PRODUCT_FORM_MESSAGES.priceInvalid;
}

export function getProductSubmitErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : PRODUCT_FORM_MESSAGES.submitUnknown;
}
