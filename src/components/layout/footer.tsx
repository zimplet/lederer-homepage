import { useTranslations } from "next-intl";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-deep text-white" role="contentinfo">
      {/* Yarn line top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red to-transparent"
        aria-hidden="true"
      />

      <div className="container-fluid py-[var(--space-2xl)]">
        {/* Top section */}
        <div className="grid gap-[var(--space-xl)] sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-sm)] font-bold uppercase tracking-wider text-gray-400">
              {t("company")}
            </h3>
            <ul className="space-y-[var(--space-xs)]">
              <li>
                <Link
                  href="/unternehmen"
                  className="text-[var(--text-sm)] text-gray-300 transition-colors hover:text-white"
                >
                  {t("company")}
                </Link>
              </li>
              <li>
                <Link
                  href="/kompetenz"
                  className="text-[var(--text-sm)] text-gray-300 transition-colors hover:text-white"
                >
                  Kompetenz
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[var(--text-sm)] text-gray-300 transition-colors hover:text-white"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-sm)] font-bold uppercase tracking-wider text-gray-400">
              {t("products")}
            </h3>
            <ul className="space-y-[var(--space-xs)]">
              <li>
                <Link
                  href="/produkte"
                  className="text-[var(--text-sm)] text-gray-300 transition-colors hover:text-white"
                >
                  Umwundene Garne
                </Link>
              </li>
              <li>
                <Link
                  href="/produkte"
                  className="text-[var(--text-sm)] text-gray-300 transition-colors hover:text-white"
                >
                  Luftverwirbelte Garne
                </Link>
              </li>
              <li>
                <Link
                  href="/produkte"
                  className="text-[var(--text-sm)] text-gray-300 transition-colors hover:text-white"
                >
                  Elasto Twist
                </Link>
              </li>
            </ul>
          </div>

          {/* Careers */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-sm)] font-bold uppercase tracking-wider text-gray-400">
              {t("careers")}
            </h3>
            <ul className="space-y-[var(--space-xs)]">
              <li>
                <Link
                  href="/karriere"
                  className="text-[var(--text-sm)] text-gray-300 transition-colors hover:text-white"
                >
                  Offene Stellen
                </Link>
              </li>
              <li>
                <Link
                  href="/karriere"
                  className="text-[var(--text-sm)] text-gray-300 transition-colors hover:text-white"
                >
                  Initiativbewerbung
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-sm)] font-bold uppercase tracking-wider text-gray-400">
              {t("contact")}
            </h3>
            <address className="not-italic">
              <p className="text-[var(--text-sm)] text-gray-300">
                Jörg Lederer GmbH
              </p>
              <p className="text-[var(--text-sm)] text-gray-300">
                Hauptstraße 115
              </p>
              <p className="text-[var(--text-sm)] text-gray-300">
                73340 Amstetten
              </p>
              <p className="mt-[var(--space-xs)] text-[var(--text-sm)] text-gray-300">
                <a
                  href="tel:+497331200060"
                  className="transition-colors hover:text-white"
                >
                  +49 (0) 7331 2006-0
                </a>
              </p>
              <p className="text-[var(--text-sm)] text-gray-300">
                <a
                  href="mailto:info@lederer-elastic.de"
                  className="transition-colors hover:text-white"
                >
                  info@lederer-elastic.de
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-[var(--space-xl)] flex flex-col items-center justify-between gap-[var(--space-sm)] border-t border-white/10 pt-[var(--space-lg)] sm:flex-row">
          <div className="flex items-center gap-[var(--space-md)]">
            <Logo className="w-[120px] brightness-0 invert" />
            <span className="rounded-full border border-white/20 px-3 py-1 text-[var(--text-xs)] text-gray-400">
              {t("since")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-[var(--space-sm)] text-[var(--text-xs)] text-gray-400">
            <Link
              href="/impressum"
              className="transition-colors hover:text-white"
            >
              {t("imprint")}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/datenschutz"
              className="transition-colors hover:text-white"
            >
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
