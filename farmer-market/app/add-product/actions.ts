"use server";

import { revalidatePath } from "next/cache";

import type { ProductFormValues } from "@/app/add-product/constants";
import { buildCreateProductPayload } from "@/app/add-product/utils";
import { createProduct } from "@/app/services/product-service";

export async function createProductAction(form: ProductFormValues) {
  try {
    await createProduct(buildCreateProductPayload(form));
    revalidatePath("/");
    revalidatePath("/sitemap.xml");

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to save product.",
    };
  }
}
