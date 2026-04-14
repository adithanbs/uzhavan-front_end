import { NextResponse } from "next/server";

import { createProduct, getAllProducts } from "@/app/lib/products";
import { validateProductInput } from "@/app/lib/product-validation";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const result = validateProductInput(payload);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error },
      { status: 400 },
    );
  }

  const product = await createProduct(result.data);
  return NextResponse.json(product, { status: 201 });
}
