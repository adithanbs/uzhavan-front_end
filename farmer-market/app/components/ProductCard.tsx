import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/app/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images?.[0] || "/placeholder-market.svg";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-emerald-950/10 bg-white shadow-[0_20px_60px_-40px_rgba(24,63,38,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(24,63,38,0.45)] sm:rounded-[1.75rem]">
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-100">
        <Image
          src={imageSrc}
          alt={`${product.name} from ${product.location}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
              {product.category}
            </p>
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{product.name}</h2>
            {product.quantity ? (
              <p className="text-sm leading-6 text-slate-600">{product.quantity}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            {product.price !== undefined ? (
              <div>
                <p className="text-sm text-slate-500">Starting price</p>
                <p className="text-xl font-bold text-emerald-800 sm:text-2xl">₹{product.price}</p>
              </div>
            ) : null}
            <p className="text-sm text-slate-500">{product.location}</p>
          </div>
        </div>

        <div className="mt-auto grid gap-3 sm:grid-cols-2">
          <a
            href={`tel:${product.phone}`}
            className="rounded-full bg-yellow-300 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-yellow-200"
          >
            Call Farmer
          </a>
          <Link
            href={`/product/${product._id}`}
            className="rounded-full bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
