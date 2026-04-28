"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, SplitText } from "@/lib/motion";

export function ContactCtaSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Massive display text — line reveal
        const headlineSplit = SplitText.create(".contact-display", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.elements, { visibility: "visible" });
            return gsap.fromTo(
              self.lines,
              { yPercent: 108 },
              {
                yPercent: 0,
                duration: 1.15,
                stagger: 0.1,
                ease: "entrance",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 75%",
                  once: true,
                },
              }
            );
          },
        });

        gsap.fromTo(
          ".contact-actions",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "entrance",
            scrollTrigger: {
              trigger: ".contact-actions",
              start: "top 88%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".contact-info-row",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "entrance",
            scrollTrigger: {
              trigger: ".contact-info-row",
              start: "top 90%",
              once: true,
            },
          }
        );

        return () => headlineSplit.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".contact-display, .contact-actions, .contact-info-row", {
          opacity: 1,
          visibility: "visible",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-dark-deep py-[var(--space-section)]"
    >
      {/* Background ambient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/6 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red/30 to-transparent"
        aria-hidden="true"
      />

      {/* Yarn lines */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M 5 0 C 4 38, 6 68, 5 100"
          stroke="rgba(231,49,55,0.14)"
          strokeWidth="0.2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="0.8 2"
        />
      </svg>

      <div className="container-fluid relative z-10 text-center">
        {/* Massive display headline */}
        <h2
          className="contact-display mx-auto max-w-[18ch] font-heading text-[clamp(2.6rem,5.5vw,6.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-white"
          style={{ visibility: "hidden" }}
        >
          Lassen Sie uns über Ihr Garn sprechen.
        </h2>

        {/* CTA */}
        <div
          className="contact-actions mt-[var(--space-2xl)] flex flex-wrap items-center justify-center gap-[var(--space-sm)]"
          style={{ opacity: 0 }}
        >
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-3 rounded-full bg-red px-[var(--space-2xl)] py-[var(--space-md)] font-heading text-[var(--text-lg)] font-bold text-white transition-all duration-300 hover:bg-red-dark hover:gap-5 hover:scale-[1.02]"
          >
            Anfrage senden
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="mailto:info@lederer-elastic.de"
            className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/5 px-[var(--space-xl)] py-[var(--space-md)] font-heading text-[var(--text-base)] font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white"
          >
            E-Mail schreiben
          </a>
        </div>

        {/* Contact details row */}
        <div
          className="mt-[var(--space-2xl)] flex flex-wrap items-center justify-center gap-[var(--space-lg)] border-t border-white/8 pt-[var(--space-xl)]"
        >
          <a
            href="tel:+4973312006-0"
            className="contact-info-row font-heading text-[var(--text-base)] font-medium text-white/40 transition-colors hover:text-white/80"
            style={{ opacity: 0 }}
          >
            +49 (0) 7331 2006-0
          </a>
          <div className="h-[1px] w-6 rotate-90 bg-white/15" aria-hidden="true" />
          <a
            href="mailto:info@lederer-elastic.de"
            className="contact-info-row font-heading text-[var(--text-base)] font-medium text-white/40 transition-colors hover:text-white/80"
            style={{ opacity: 0 }}
          >
            info@lederer-elastic.de
          </a>
          <div className="h-[1px] w-6 rotate-90 bg-white/15 hidden sm:block" aria-hidden="true" />
          <span
            className="contact-info-row hidden font-body text-[var(--text-sm)] text-white/30 sm:block"
            style={{ opacity: 0 }}
          >
            Mo. – Fr. 08:00 – 16:30 Uhr
          </span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/25 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
