import type { ProductFormValues } from "@/app/add-product/constants";
import { PRODUCT_FORM_MESSAGES } from "@/app/add-product/constants";

export function buildCreateProductPayload(form: ProductFormValues) {
  return {
    ...form,
    price: Number(form.price),
    images: form.image ? [form.image] : [],
  };
}

export function validatePositivePrice(value: string) {
  return Number(value) > 0 || PRODUCT_FORM_MESSAGES.priceInvalid;
}

export function getProductSubmitErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : PRODUCT_FORM_MESSAGES.submitUnknown;
}
