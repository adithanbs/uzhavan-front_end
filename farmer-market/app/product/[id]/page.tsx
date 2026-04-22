import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import { getProductById } from "@/app/services/product-service";

type ProductPageProps = PageProps<"/product/[id]">;

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  const description =
    product.description ||
    `${product.category} available from ${product.location}.`;
  const image = product.images?.[0] || "/placeholder-market.svg";
  const isInlineImage = image.startsWith("data:");

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      type: "article",
      images: isInlineImage ? undefined : [{ url: image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: isInlineImage ? undefined : [image],
    },
  };
}

export default async function ProductDetail({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const image = product.images?.[0] || "/placeholder-market.svg";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f4f8ef_0%,_#eef3ea_100%)]">
      <Navbar />

      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <section className="overflow-hidden rounded-[1.75rem] border border-emerald-950/10 bg-white shadow-[0_30px_80px_-50px_rgba(24,63,38,0.4)] sm:rounded-[2rem]">
          <div className="aspect-[4/3] bg-emerald-100">
            <img
              src={image}
              alt={`${product.name} from ${product.location}`}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="flex flex-col gap-5 rounded-[1.75rem] border border-emerald-950/10 bg-white/90 p-5 shadow-[0_30px_80px_-55px_rgba(24,63,38,0.35)] sm:gap-6 sm:rounded-[2rem] sm:p-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 sm:text-sm sm:tracking-[0.28em]">
              {product.category}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>
            {product.price !== undefined ? (
              <p className="text-2xl font-bold text-emerald-800 sm:text-3xl">₹{product.price}</p>
            ) : null}
          </div>

          <dl className="grid gap-4 rounded-[1.5rem] bg-slate-50 p-4 text-sm text-slate-700 sm:p-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <dt className="font-medium text-slate-500">Location</dt>
              <dd>{product.location}</dd>
            </div>
            {product.quantity ? (
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <dt className="font-medium text-slate-500">Available quantity</dt>
                <dd>{product.quantity}</dd>
              </div>
            ) : null}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <dt className="font-medium text-slate-500">Contact</dt>
              <dd>{product.phone}</dd>
            </div>
          </dl>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Description</h2>
            <p className="leading-7 text-slate-600">
              {product.description || "Fresh farm produce listing with direct farmer contact."}
            </p>
          </div>

          <a
            href={`tel:${product.phone}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200 sm:w-auto"
          >
            Call Farmer Now
          </a>
        </section>
      </main>
    </div>
  );
}
