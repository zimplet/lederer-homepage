"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-dark-deep text-center">
      <div
        className="absolute left-1/2 top-1/2 h-[50%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 container-fluid">
        <div className="mb-[var(--space-sm)] flex items-center justify-center gap-3">
          <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
          <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
            Fehler
          </span>
          <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
        </div>

        <h1 className="font-heading text-[var(--text-4xl)] font-black leading-tight text-white">
          Etwas ist schiefgelaufen.
        </h1>
        <p className="mx-auto mt-[var(--space-md)] max-w-[45ch] font-body text-[var(--text-lg)] text-white/60">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut
          oder kontaktieren Sie uns direkt.
        </p>

        <div className="mt-[var(--space-xl)] flex flex-wrap justify-center gap-[var(--space-sm)]">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark"
          >
            <RefreshCw className="h-5 w-5" /> Erneut versuchen
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
          >
            <Home className="h-5 w-5" /> Startseite
          </Link>
        </div>
      </div>
    </section>
  );
}
