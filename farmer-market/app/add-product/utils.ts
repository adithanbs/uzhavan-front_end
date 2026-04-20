import type { ProductFormValues } from "@/app/add-product/constants";
import { PRODUCT_FORM_MESSAGES } from "@/app/add-product/constants";
import type { CreateProductPayload } from "@/app/services/product-service";

export function buildCreateProductPayload(
  form: ProductFormValues,
): CreateProductPayload {
  const { image, price, ...product } = form;

  return {
    ...product,
    price: Number(price),
    images: image ? [image] : [],
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
