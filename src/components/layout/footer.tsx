import { useTranslations } from "next-intl";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-deep text-white" role="contentinfo">
      {/* Red top rule */}
      <div
        className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red to-transparent"
        aria-hidden="true"
      />

      <div className="container-fluid pt-[var(--space-2xl)] pb-[var(--space-xl)]">
        {/* Brand statement row */}
        <div className="mb-[var(--space-xl)] flex flex-col gap-[var(--space-lg)] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo className="mb-[var(--space-md)] w-[clamp(140px,12vw,200px)] brightness-0 invert" />
            <p className="max-w-[36ch] font-body text-[var(--text-base)] leading-relaxed text-white/40">
              Elastische Hochleistungsgarne für die anspruchsvollsten
              Textilien Europas. Seit 1948. Made in Germany.
            </p>
          </div>

          <Link
            href="/kontakt"
            className="inline-flex self-start items-center gap-2 rounded-full border border-white/15 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-sm)] font-semibold text-white/60 transition-all duration-200 hover:border-red/50 hover:text-white sm:self-end"
          >
            Anfrage senden
          </Link>
        </div>

        {/* Divider */}
        <div
          className="mb-[var(--space-xl)] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          aria-hidden="true"
        />

        {/* Links grid */}
        <div className="grid gap-[var(--space-xl)] sm:grid-cols-2 lg:grid-cols-4">
          {/* Unternehmen */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-xs)] font-bold uppercase tracking-[0.18em] text-white/30">
              {t("company")}
            </h3>
            <ul className="space-y-[var(--space-xs)]">
              <li>
                <Link
                  href="/unternehmen"
                  className="font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
                >
                  {t("company")}
                </Link>
              </li>
              <li>
                <Link
                  href="/kompetenz"
                  className="font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
                >
                  Kompetenz
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Produkte */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-xs)] font-bold uppercase tracking-[0.18em] text-white/30">
              {t("products")}
            </h3>
            <ul className="space-y-[var(--space-xs)]">
              <li>
                <Link
                  href="/produkte"
                  className="font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
                >
                  Umwundene Garne
                </Link>
              </li>
              <li>
                <Link
                  href="/produkte"
                  className="font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
                >
                  Luftverwirbelte Garne
                </Link>
              </li>
              <li>
                <Link
                  href="/produkte"
                  className="font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
                >
                  Elasto Twist
                </Link>
              </li>
            </ul>
          </div>

          {/* Karriere */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-xs)] font-bold uppercase tracking-[0.18em] text-white/30">
              {t("careers")}
            </h3>
            <ul className="space-y-[var(--space-xs)]">
              <li>
                <Link
                  href="/karriere"
                  className="font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
                >
                  Offene Stellen
                </Link>
              </li>
              <li>
                <Link
                  href="/karriere"
                  className="font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
                >
                  Initiativbewerbung
                </Link>
              </li>
              <li>
                <Link
                  href="/karriere"
                  className="font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
                >
                  Ausbildung
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-xs)] font-bold uppercase tracking-[0.18em] text-white/30">
              {t("contact")}
            </h3>
            <address className="not-italic space-y-[var(--space-xs)]">
              <p className="font-body text-[var(--text-sm)] text-white/55">
                Jörg Lederer GmbH
              </p>
              <p className="font-body text-[var(--text-sm)] text-white/55">
                Hauptstraße 115, 73340 Amstetten
              </p>
              <a
                href="tel:+4973312006-0"
                className="block font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
              >
                +49 (0) 7331 2006-0
              </a>
              <a
                href="mailto:info@lederer-elastic.de"
                className="block font-body text-[var(--text-sm)] text-white/55 transition-colors hover:text-white"
              >
                info@lederer-elastic.de
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-[var(--space-xl)] flex flex-col items-center justify-between gap-[var(--space-sm)] border-t border-white/8 pt-[var(--space-lg)] sm:flex-row">
          <span className="rounded-full border border-white/12 px-3 py-1 font-body text-[var(--text-xs)] text-white/30">
            {t("since")}
          </span>

          <div className="flex flex-wrap items-center gap-[var(--space-sm)] font-body text-[var(--text-xs)] text-white/30">
            <Link href="/impressum" className="transition-colors hover:text-white/70">
              {t("imprint")}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/datenschutz" className="transition-colors hover:text-white/70">
              {t("privacy")}
            </Link>
            <span aria-hidden="true">·</span>
            <span>{t("copyright", { year: currentYear.toString() })}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
