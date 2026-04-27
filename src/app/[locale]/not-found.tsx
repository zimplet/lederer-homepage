import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-dark-deep text-center">
      {/* Red glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[50%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 container-fluid">
        {/* Big 404 */}
        <div className="font-heading text-[clamp(8rem,20vw,18rem)] font-black leading-none tracking-[-0.05em] text-white/5 select-none">
          404
        </div>

        <div className="-mt-[clamp(3rem,8vw,7rem)]">
          <div className="mb-[var(--space-sm)] flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
            <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
              Seite nicht gefunden
            </span>
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
          </div>

          <h1 className="font-heading text-[var(--text-4xl)] font-black leading-tight text-white">
            Das Garn ist gerissen.
          </h1>
          <p className="mx-auto mt-[var(--space-md)] max-w-[45ch] font-body text-[var(--text-lg)] text-white/60">
            Die gesuchte Seite existiert nicht oder wurde verschoben. Finden Sie
            Ihren Weg zurück zur Startseite.
          </p>

          <div className="mt-[var(--space-xl)] flex flex-wrap justify-center gap-[var(--space-sm)]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3"
            >
              <Home className="h-5 w-5" /> Zur Startseite
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              Kontakt <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
