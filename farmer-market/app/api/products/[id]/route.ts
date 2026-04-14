import { NextResponse } from "next/server";

import { getProductById } from "@/app/lib/products";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/products/[id]">,
) {
  const { id } = await context.params;
  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json(product);
}
