"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Layers, Wind, Repeat2 } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";

const PRODUCTS = [
  {
    key: "wrapped" as const,
    icon: Layers,
    color: "from-red/20 to-red/5",
    tag: "Umwundene Garne",
  },
  {
    key: "airjet" as const,
    icon: Wind,
    color: "from-dark/20 to-dark/5",
    tag: "Luftverwirbelte Garne",
  },
  {
    key: "elastotwist" as const,
    icon: Repeat2,
    color: "from-gray-400/20 to-gray-400/5",
    tag: "Elasto Twist",
  },
] as const;

export function ProductsShowcaseSection() {
  const t = useTranslations("Products");
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const totalWidth = track.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate cards on enter in horizontal scroll context
        gsap.utils.toArray<HTMLElement>(".product-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            filter: "blur(8px)",
            duration: 0.8,
            ease: "entrance",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 40%",
              scrub: false,
              once: true,
            },
          });
        });
      });

      // Mobile: simple vertical stagger
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch(".product-card", {
          onEnter: (elements) =>
            gsap.from(elements, {
              opacity: 0,
              y: 50,
              filter: "blur(8px)",
              duration: 0.8,
              ease: "entrance",
              stagger: 0.15,
            }),
          start: "top 85%",
          once: true,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".product-card", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-cream-dark">
      {/* Section header - outside scroll track */}
      <div className="container-fluid pt-[var(--space-section)] pb-[var(--space-xl)]">
        <div className="flex items-end justify-between">
          <div>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                Produkte
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {t("title")}
            </h2>
            <p className="mt-[var(--space-sm)] font-body text-[var(--text-lg)] text-gray-500">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/produkte"
            className="hidden items-center gap-2 font-heading text-[var(--text-base)] font-semibold text-red transition-all hover:gap-4 lg:flex"
          >
            {t("cta")} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll track (desktop) / vertical stack (mobile) */}
      <div
        ref={trackRef}
        className="flex gap-[var(--space-md)] px-[var(--space-md)] pb-[var(--space-section)] lg:w-max lg:flex-row"
      >
        {PRODUCTS.map(({ key, icon: Icon, color, tag }) => (
          <article
            key={key}
            className="product-card group relative w-[min(85vw,400px)] flex-shrink-0 overflow-hidden rounded-[var(--radius-xl)] bg-white p-[var(--space-lg)] shadow-sm transition-shadow duration-300 hover:shadow-xl lg:w-[420px]"
            style={{ opacity: 0 }}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              aria-hidden="true"
            />

            {/* Icon */}
            <div className="relative mb-[var(--space-lg)] flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-red/10">
              <Icon className="h-6 w-6 text-red" />
            </div>

            {/* Tag */}
            <span className="relative font-body text-[var(--text-xs)] uppercase tracking-[0.2em] text-red">
              {tag}
            </span>

            {/* Title */}
            <h3 className="relative mt-2 font-heading text-[var(--text-2xl)] font-bold leading-tight text-dark-deep">
              {t(key)}
            </h3>

            {/* Description */}
            <p className="relative mt-[var(--space-sm)] font-body text-[var(--text-base)] leading-relaxed text-gray-500">
              {t(`${key}Desc`)}
            </p>

            {/* Yarn line decoration */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-red to-red/0 transition-transform duration-500 group-hover:scale-x-100"
              aria-hidden="true"
            />

            {/* Link arrow */}
            <div className="relative mt-[var(--space-xl)] flex items-center gap-2 font-heading text-[var(--text-sm)] font-semibold text-red transition-all duration-300 group-hover:gap-4">
              Mehr erfahren <ArrowRight className="h-4 w-4" />
            </div>
          </article>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="container-fluid pb-[var(--space-section)] pt-0 lg:hidden">
        <Link
          href="/produkte"
          className="inline-flex items-center gap-2 font-heading text-[var(--text-base)] font-semibold text-red"
        >
          {t("cta")} <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
