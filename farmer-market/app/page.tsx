import type { Metadata } from "next";

import Navbar from "@/app/components/Navbar";
import ProductCard from "@/app/components/ProductCard";
import { siteConfig } from "@/app/config/site";
import { getProducts } from "@/app/services/product-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description: siteConfig.description,
};

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(243,244,214,0.95),_rgba(247,250,244,1)_46%,_rgba(239,244,235,1)_100%)]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:px-8">
        <section className="grid gap-5 rounded-[1.75rem] border border-emerald-950/10 bg-white/80 p-5 shadow-[0_20px_70px_-45px_rgba(24,63,38,0.45)] backdrop-blur sm:gap-6 sm:rounded-[2rem] sm:p-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 sm:text-sm sm:tracking-[0.3em]">
              Direct-from-farm marketplace
            </p>
            <h1 className="max-w-3xl font-serif text-3xl leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Discover trusted farmers, fresher produce, and faster local buying.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg">
              UzhaMart is optimized for quick browsing, direct calls, and
              future-ready expansion into richer farmer listings, logistics, and
              verified supply workflows.
            </p>
          </div>

          <div className="grid gap-3 rounded-[1.5rem] bg-emerald-950 px-4 py-5 text-white sm:rounded-[1.75rem] sm:px-5 sm:py-6">
            <div>
              <p className="text-sm text-emerald-200">Live listings</p>
              <p className="text-2xl font-semibold sm:text-3xl">{products.length}</p>
            </div>
            <div>
              <p className="text-sm text-emerald-200">Core categories</p>
              <p className="text-lg font-medium sm:text-xl">Vegetables, fruits, grains</p>
            </div>
            <div>
              <p className="text-sm text-emerald-200">Primary experience</p>
              <p className="text-lg font-medium sm:text-xl">Fast browsing and direct contact</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 sm:text-sm sm:tracking-[0.28em]">
                Available produce
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                Scalable listing cards with cleaner semantics and faster rendering
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-emerald-950/10 bg-white p-6 text-sm leading-6 text-slate-600 md:col-span-2 xl:col-span-3">
                Products are not available right now. Please make sure the
                backend API is running at http://localhost:5050/api/products.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
