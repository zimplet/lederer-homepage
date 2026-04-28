"use client";

import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Link as LocaleLink, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { gsap, useGSAP } from "@/lib/motion";

const navLinks = [
  { href: "/unternehmen", key: "company" },
  { href: "/produkte", key: "products" },
  { href: "/kompetenz", key: "expertise" },
  { href: "/karriere", key: "careers" },
  { href: "/blog", key: "blog" },
  { href: "/kontakt", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          pillRef.current,
          { y: -72, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "entrance", delay: 0.4 }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(pillRef.current, { opacity: 1 });
      });
    },
    { scope: headerRef }
  );

  const toggleMobile = () => {
    setMobileOpen((prev) => {
      const next = !prev;
      if (next && mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll("[data-mobile-link]"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "entrance",
            stagger: 0.07,
            delay: 0.1,
          }
        );
      }
      return next;
    });
  };

  const alternateLocale = (locale === "de" ? "en" : "de") as "de" | "en";
  const rawPathname = usePathname();
  const staticPathnames = [
    "/",
    "/unternehmen",
    "/produkte",
    "/kompetenz",
    "/karriere",
    "/blog",
    "/kontakt",
    "/impressum",
    "/datenschutz",
  ] as const;
  type StaticPathname = (typeof staticPathnames)[number];
  const switchHref = (staticPathnames as readonly string[]).includes(rawPathname)
    ? (rawPathname as StaticPathname)
    : ("/" as const);

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-[var(--space-md)] pt-[var(--space-sm)]"
    >
      {/* Floating pill */}
      <div
        ref={pillRef}
        className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-dark-deep/88 px-[var(--space-md)] py-3 shadow-[0_8px_40px_-4px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl"
        style={{ opacity: 0 }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Jörg Lederer GmbH – Startseite">
          <Logo className="w-[clamp(100px,8vw,148px)] brightness-0 invert" />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-[var(--space-md)] lg:flex"
          aria-label="Hauptnavigation"
        >
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="font-heading text-[var(--text-sm)] font-medium text-white/50 transition-colors duration-200 hover:text-white"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-[var(--space-sm)]">
          <LocaleLink
            href={switchHref}
            locale={alternateLocale}
            className="hidden font-body text-[var(--text-xs)] text-white/30 transition-colors hover:text-white/60 lg:block"
            aria-label={`Switch to ${t("langSwitch")}`}
          >
            {t("langSwitch")}
          </LocaleLink>

          <Link
            href="/kontakt"
            className="hidden rounded-full bg-red px-[var(--space-md)] py-[0.4rem] font-heading text-[var(--text-xs)] font-bold text-white transition-all duration-200 hover:bg-red-dark hover:scale-[1.03] lg:inline-flex"
          >
            {t("cta")}
          </Link>

          {/* Mobile burger */}
          <button
            onClick={toggleMobile}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:hidden"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="pointer-events-auto fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark-deep/97 backdrop-blur-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col items-center gap-[var(--space-lg)]">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                data-mobile-link
                onClick={() => setMobileOpen(false)}
                className="font-heading text-[var(--text-2xl)] font-bold text-white/75 transition-colors hover:text-white"
              >
                {t(key)}
              </Link>
            ))}

            <div
              data-mobile-link
              className="mt-[var(--space-md)] flex flex-col items-center gap-[var(--space-sm)]"
            >
              <Link
                href="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-lg)] font-bold text-white"
              >
                {t("cta")}
              </Link>

              <LocaleLink
                href={switchHref}
                locale={alternateLocale}
                onClick={() => setMobileOpen(false)}
                className="font-body text-[var(--text-sm)] text-white/35"
              >
                {t("langSwitch")}
              </LocaleLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
