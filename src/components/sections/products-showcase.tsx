"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";

export function ProductsShowcaseSection() {
  const t = useTranslations("Products");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Section header
        gsap.fromTo(
          ".products-header",
          { opacity: 0, y: 30, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "entrance",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );

        // Image Scale & Fade paradigm — images start small, grow on scroll in
        gsap.utils.toArray<HTMLElement>(".product-img").forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 0.88, filter: "brightness(0.65)" },
            {
              scale: 1,
              filter: "brightness(1)",
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top 85%",
                end: "top 20%",
                scrub: 1.2,
              },
            }
          );
        });

        // Bento cards stagger
        ScrollTrigger.batch(".bento-card", {
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { opacity: 0, y: 40, filter: "blur(8px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.9,
                ease: "entrance",
                stagger: 0.12,
              }
            ),
          start: "top 85%",
          once: true,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".bento-card", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-dark-deep py-[var(--space-section)]"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-[20%] top-[30%] h-[40%] w-[30%] rounded-full bg-red/6 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-fluid relative z-10">
        {/* Header */}
        <div className="products-header mb-[var(--space-2xl)] flex items-end justify-between" style={{ opacity: 0 }}>
          <div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-[-0.03em] text-white">
              {t("title")}
            </h2>
            <p className="mt-[var(--space-sm)] max-w-[48ch] font-body text-[var(--text-lg)] text-white/50">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/produkte"
            className="hidden items-center gap-2 font-heading text-[var(--text-base)] font-semibold text-red transition-all duration-300 hover:gap-4 lg:flex"
          >
            {t("cta")} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/*
          Bento Grid — Mathematically verified:
          12 columns total
          Card A: col-span-7 row-span-2 → occupies cols 1-7, rows 1-2
          Card B: col-span-5 row-span-1 → occupies cols 8-12, row 1
          Card C: col-span-5 row-span-1 → occupies cols 8-12, row 2
          Row 1: 7+5=12 ✓  Row 2: 7(A cont)+5(C)=12 ✓  Zero gaps ✓
        */}
        <div className="grid auto-rows-[minmax(200px,auto)] grid-flow-dense grid-cols-1 gap-[var(--space-sm)] lg:grid-cols-12">
          {/* Card A: Umwundene Garne — large, spans 2 rows */}
          <article
            className="bento-card group relative col-span-1 overflow-hidden rounded-[var(--radius-xl)] lg:col-span-7 lg:row-span-2"
            style={{ minHeight: "clamp(320px,45vw,560px)", opacity: 0 }}
          >
            {/* Image */}
            <div className="product-img absolute inset-0">
              <Image
                src="/images/Spulen-rot.jpg"
                alt="Umwundene Elastikgarne auf Spulen"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/90 via-dark-deep/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-red/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-[var(--space-lg)]">
              <span className="font-body text-[var(--text-xs)] uppercase tracking-[0.22em] text-red/80">
                Umwundene Garne
              </span>
              <h3 className="mt-2 font-heading text-[var(--text-3xl)] font-black leading-tight text-white">
                {t("wrapped")}
              </h3>
              <p className="mt-[var(--space-sm)] max-w-[40ch] font-body text-[var(--text-base)] leading-relaxed text-white/65">
                {t("wrappedDesc")}
              </p>
              <div className="mt-[var(--space-md)] flex items-center gap-2 font-heading text-[var(--text-sm)] font-semibold text-white/70 transition-all duration-300 group-hover:gap-4 group-hover:text-white">
                Mehr erfahren <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {/* Bottom red line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-red to-red/0 transition-transform duration-600 group-hover:scale-x-100"
              aria-hidden="true"
            />
          </article>

          {/* Card B: Luftverwirbelte Garne */}
          <article
            className="bento-card group relative col-span-1 overflow-hidden rounded-[var(--radius-xl)] lg:col-span-5"
            style={{ minHeight: "clamp(200px,22vw,280px)", opacity: 0 }}
          >
            <div className="product-img absolute inset-0">
              <Image
                src="/images/Produktion.jpg"
                alt="Luftverwirbelte Garnproduktion"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/88 via-dark-deep/40 to-transparent" />
            <div className="absolute inset-0 bg-dark-deep/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute bottom-0 left-0 right-0 p-[var(--space-md)]">
              <span className="font-body text-[var(--text-xs)] uppercase tracking-[0.22em] text-white/45">
                Luftverwirbelte Garne
              </span>
              <h3 className="mt-1 font-heading text-[var(--text-xl)] font-bold leading-tight text-white">
                {t("airjet")}
              </h3>
              <p className="mt-[var(--space-xs)] font-body text-[var(--text-sm)] leading-relaxed text-white/60">
                {t("airjetDesc")}
              </p>
              <div className="mt-[var(--space-sm)] flex items-center gap-2 font-heading text-[var(--text-sm)] font-semibold text-white/60 transition-all duration-300 group-hover:gap-3 group-hover:text-white">
                Mehr erfahren <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-white/30 to-transparent transition-transform duration-600 group-hover:scale-x-100"
              aria-hidden="true"
            />
          </article>

          {/* Card C: Elasto Twist */}
          <article
            className="bento-card group relative col-span-1 overflow-hidden rounded-[var(--radius-xl)] lg:col-span-5"
            style={{ minHeight: "clamp(200px,22vw,280px)", opacity: 0 }}
          >
            <div className="product-img absolute inset-0">
              <Image
                src="/images/2020-10-22_Joerg-Lederer-GmbH_TOBIAS-FROEHNER-PHOTOGRAPHY_0505_bearbeitet.jpg"
                alt="Elasto Twist Hohlspindel-Technik"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/90 via-dark-deep/45 to-transparent" />
            {/* Red tint on hover */}
            <div className="absolute inset-0 bg-red/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute bottom-0 left-0 right-0 p-[var(--space-md)]">
              <span className="font-body text-[var(--text-xs)] uppercase tracking-[0.22em] text-red/70">
                Elasto Twist
              </span>
              <h3 className="mt-1 font-heading text-[var(--text-xl)] font-bold leading-tight text-white">
                {t("elastotwist")}
              </h3>
              <p className="mt-[var(--space-xs)] font-body text-[var(--text-sm)] leading-relaxed text-white/60">
                {t("elastotwistDesc")}
              </p>
              <div className="mt-[var(--space-sm)] flex items-center gap-2 font-heading text-[var(--text-sm)] font-semibold text-white/60 transition-all duration-300 group-hover:gap-3 group-hover:text-white">
                Mehr erfahren <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-red to-red/0 transition-transform duration-600 group-hover:scale-x-100"
              aria-hidden="true"
            />
          </article>
        </div>

        {/* Mobile CTA */}
        <div className="mt-[var(--space-xl)] lg:hidden">
          <Link
            href="/produkte"
            className="inline-flex items-center gap-2 font-heading text-[var(--text-base)] font-semibold text-red"
          >
            {t("cta")} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
