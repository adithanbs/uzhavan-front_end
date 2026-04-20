import type { Metadata } from "next";

import Navbar from "@/app/components/Navbar";
import AddProductForm from "@/app/add-product/AddProductForm";

export const metadata: Metadata = {
  title: "Add Product",
  description: "Create a farmer listing with validated inputs and a cleaner submission flow.",
};

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#fffef5_0%,_#f5f8f0_100%)]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 sm:text-sm sm:tracking-[0.3em]">
            Seller onboarding
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Add a new product listing with safer validation
          </h1>
          <p className="text-sm leading-7 text-slate-600 sm:text-base">
            This first-level listing form now validates important fields before
            data enters the product pipeline, which makes future scaling to
            databases and admin review much easier.
          </p>
        </section>

        <section className="rounded-[1.75rem] border border-emerald-950/10 bg-white p-4 shadow-[0_28px_80px_-55px_rgba(24,63,38,0.45)] sm:rounded-[2rem] sm:p-6">
          <AddProductForm />
        </section>
      </main>
    </div>
  );
}
