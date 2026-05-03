"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isBrowseActive = pathname === "/" || pathname.startsWith("/product/");
  const isAddProductActive = pathname === "/add-product";
  const baseLinkClasses =
    "rounded-full px-4 py-2 text-center text-sm font-semibold transition";
  const inactiveLinkClasses = "text-emerald-100 hover:bg-white/10";
  const activeLinkClasses =
    "bg-yellow-400 text-slate-950 shadow-sm ring-2 ring-white/70 hover:bg-yellow-300";

  return (
    <header className="border-b border-emerald-950/10 bg-emerald-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3 self-start">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xl">
            U
          </span>
          <div className="min-w-0">
            <p className="text-base font-semibold tracking-wide sm:text-lg">
             UzhavanMart
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200 sm:text-xs sm:tracking-[0.3em]">
              Farmer-first commerce
            </p>
          </div>
        </Link>

        <nav className="grid w-full grid-cols-2 gap-3 md:w-auto md:flex md:items-center">
          <Link
            href="/"
            aria-current={isBrowseActive ? "page" : undefined}
            className={`${baseLinkClasses} ${
              isBrowseActive ? activeLinkClasses : inactiveLinkClasses
            }`}
          >
            Browse
          </Link>
          <Link
            href="/add-product"
            aria-current={isAddProductActive ? "page" : undefined}
            className={`${baseLinkClasses} ${
              isAddProductActive ? activeLinkClasses : inactiveLinkClasses
            }`}
          >
            Add Product
          </Link>
        </nav>
      </div>
    </header>
  );
}
