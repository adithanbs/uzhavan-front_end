import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-emerald-950/10 bg-emerald-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3 self-start">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xl">
            U
          </span>
          <div className="min-w-0">
            <p className="text-base font-semibold tracking-wide sm:text-lg">
              Uzhavan Market
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200 sm:text-xs sm:tracking-[0.3em]">
              Farmer-first commerce
            </p>
          </div>
        </Link>

        <nav className="grid w-full grid-cols-2 gap-3 md:w-auto md:flex md:items-center">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-center text-sm font-medium text-emerald-100 transition hover:bg-white/10"
          >
            Browse
          </Link>
          <Link
            href="/add-product"
            className="rounded-full bg-yellow-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
          >
            Add Product
          </Link>
        </nav>
      </div>
    </header>
  );
}
