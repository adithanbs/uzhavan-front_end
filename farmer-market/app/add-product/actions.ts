"use server";

import { revalidatePath } from "next/cache";

import type { ProductFormValues } from "@/app/add-product/constants";
import { buildCreateProductPayload } from "@/app/add-product/utils";
import { createProduct } from "@/app/lib/products";
import { validateProductInput } from "@/app/lib/product-validation";

export async function createProductAction(form: ProductFormValues) {
  const result = validateProductInput(buildCreateProductPayload(form));

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  await createProduct(result.data);
  revalidatePath("/");

  return {
    success: true,
    error: "",
  };
}
