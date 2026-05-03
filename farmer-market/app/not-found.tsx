import Link from "next/link";

import Navbar from "@/app/components/Navbar";
import { T } from "@/app/i18n/LanguageProvider";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f5f8ef_0%,_#eef4e8_100%)]">
      <Navbar />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 sm:text-sm sm:tracking-[0.3em]">
          404
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          <T k="notFound.title" />
        </h1>
        <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          <T k="notFound.description" />
        </p>
        <Link
          href="/"
          className="w-full rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:w-auto"
        >
          <T k="notFound.back" />
        </Link>
      </main>
    </div>
  );
}
