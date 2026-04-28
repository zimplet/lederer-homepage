"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";

const CERTIFICATES = [
  { name: "ISO 9001:2015", subtitle: "Qualitätsmanagement" },
  { name: "ISO 50001:2018", subtitle: "Energiemanagement" },
  { name: "GRS zertifiziert", subtitle: "Global Recycled Standard" },
  { name: "LYCRA® Partner", subtitle: "Offizieller DACH-Partner" },
  { name: "IHK geprüft", subtitle: "Ausbildungsbetrieb" },
  { name: "Made in Germany", subtitle: "Qualität aus Baden-Württemberg" },
] as const;

const ITEMS = [...CERTIFICATES, ...CERTIFICATES];

export function CertificatesMarqueeSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const singleSetWidth = track.scrollWidth / 2;

        gsap.to(track, {
          x: -singleSetWidth,
          ease: "none",
          duration: 32,
          repeat: -1,
          modifiers: {
            x: (x) => {
              const val = parseFloat(x);
              return (val % -singleSetWidth) + "px";
            },
          },
        });

        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "entrance",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-cream py-[var(--space-xl)]"
    >
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[clamp(3rem,8vw,8rem)] bg-gradient-to-r from-cream to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[clamp(3rem,8vw,8rem)] bg-gradient-to-l from-cream to-transparent"
        aria-hidden="true"
      />

      {/* Marquee track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-[var(--space-sm)]"
        >
          {ITEMS.map((cert, i) => (
            <div
              key={`${cert.name}-${i}`}
              className="flex flex-shrink-0 items-center gap-[var(--space-sm)] rounded-full border border-dark/8 bg-white px-[var(--space-md)] py-[var(--space-sm)] shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
              aria-hidden={i >= CERTIFICATES.length}
            >
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red" aria-hidden="true" />
              <div>
                <div className="font-heading text-[var(--text-sm)] font-bold text-dark-deep">
                  {cert.name}
                </div>
                <div className="font-body text-[var(--text-xs)] text-dark/40">
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
