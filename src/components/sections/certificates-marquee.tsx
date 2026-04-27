"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/motion";

const CERTIFICATES = [
  { name: "ISO 9001:2015", subtitle: "Qualitätsmanagement" },
  { name: "ISO 50001:2018", subtitle: "Energiemanagement" },
  { name: "GRS zertifiziert", subtitle: "Global Recycled Standard" },
  { name: "LYCRA® Partner", subtitle: "Offizieller DACH-Partner" },
  { name: "IHK geprüft", subtitle: "Ausbildungsbetrieb" },
  { name: "Made in Germany", subtitle: "Qualität aus Baden-Württemberg" },
] as const;

// Duplicate for seamless loop
const ITEMS = [...CERTIFICATES, ...CERTIFICATES];

export function CertificatesMarqueeSection() {
  const t = useTranslations("Certificates");
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const singleSetWidth = track.scrollWidth / 2;

        // Infinite marquee
        gsap.to(track, {
          x: -singleSetWidth,
          ease: "none",
          duration: 28,
          repeat: -1,
          modifiers: {
            x: (x) => {
              const val = parseFloat(x);
              return (val % -singleSetWidth) + "px";
            },
          },
        });

        // Section fade-in
        gsap.from(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "entrance",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Static display, no animation
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-cream-dark py-[var(--space-xl)]"
    >
      {/* Section label */}
      <div className="container-fluid mb-[var(--space-lg)]">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
          <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
            {t("title")}
          </span>
        </div>
      </div>

      {/* Fade edges */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[var(--space-xl)] bg-gradient-to-r from-cream-dark to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[var(--space-xl)] bg-gradient-to-l from-cream-dark to-transparent"
        aria-hidden="true"
      />

      {/* Marquee track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-[var(--space-md)]"
          aria-label={t("title")}
        >
          {ITEMS.map((cert, i) => (
            <div
              key={`${cert.name}-${i}`}
              className="flex flex-shrink-0 items-center gap-[var(--space-sm)] rounded-[var(--radius-md)] border border-dark/10 bg-white px-[var(--space-md)] py-[var(--space-sm)] shadow-sm"
              aria-hidden={i >= CERTIFICATES.length}
            >
              {/* Yarn dot accent */}
              <div className="h-2 w-2 flex-shrink-0 rounded-full bg-red" aria-hidden="true" />
              <div>
                <div className="font-heading text-[var(--text-base)] font-bold text-dark-deep">
                  {cert.name}
                </div>
                <div className="font-body text-[var(--text-xs)] text-gray-400">
                  {cert.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
