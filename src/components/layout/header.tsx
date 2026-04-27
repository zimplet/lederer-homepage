"use client";

import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll progress bar + header background on scroll
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scroll progress bar
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });

        // Header background on scroll
        gsap.to(headerRef.current, {
          backgroundColor: "rgba(245, 243, 239, 0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          duration: 0.3,
          ease: "smooth",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "80px top",
            toggleActions: "play none none reverse",
          },
        });
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
            stagger: 0.06,
            delay: 0.15,
          }
        );
      }
      return next;
    });
  };

  const alternateLocale = locale === "de" ? "en" : "de";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-colors"
    >
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-red"
        aria-hidden="true"
      />

      <div className="container-fluid flex items-center justify-between py-[var(--space-sm)]">
        {/* Logo */}
        <Link href="/" aria-label="Lederer Elastic-Garne - Startseite">
          <Logo className="w-[clamp(120px,10vw,200px)]" />
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
              className="font-heading text-[var(--text-sm)] font-medium text-dark transition-colors duration-200 hover:text-red"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-[var(--space-sm)] lg:flex">
          {/* Language Switch */}
          <Link
            href="/"
            locale={alternateLocale}
            className="flex items-center gap-1 text-[var(--text-sm)] text-gray-500 transition-colors hover:text-dark"
            aria-label={`Switch to ${t("langSwitch")}`}
          >
            <Globe className="h-4 w-4" />
            <span>{t("langSwitch")}</span>
          </Link>

          {/* CTA Button */}
          <Link
            href="/kontakt"
            className="inline-flex items-center rounded-full bg-red px-[var(--space-md)] py-[var(--space-xs)] font-heading text-[var(--text-sm)] font-semibold text-white transition-all duration-200 hover:bg-red-dark hover:scale-[1.02]"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobile}
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-dark" />
          ) : (
            <Menu className="h-6 w-6 text-dark" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-cream/98 backdrop-blur-md lg:hidden"
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
                className="font-heading text-[var(--text-2xl)] font-bold text-dark transition-colors hover:text-red"
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
                className="inline-flex items-center rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-lg)] font-semibold text-white"
              >
                {t("cta")}
              </Link>

              <Link
                href="/"
                locale={alternateLocale}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-[var(--text-base)] text-gray-500"
              >
                <Globe className="h-5 w-5" />
                {t("langSwitch")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
