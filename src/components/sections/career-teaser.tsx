"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/motion";

const BENEFITS = [
  { key: "benefit1" as const, number: "01" },
  { key: "benefit2" as const, number: "02" },
  { key: "benefit3" as const, number: "03" },
  { key: "benefit4" as const, number: "04" },
  { key: "benefit5" as const, number: "05" },
] as const;

export function CareerTeaserSection() {
  const t = useTranslations("Careers");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Left column
        gsap.fromTo(
          ".career-left",
          { opacity: 0, x: -40, filter: "blur(8px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "entrance",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Benefit rows: stagger from right
        gsap.fromTo(
          ".benefit-row",
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "entrance",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".career-right",
              start: "top 80%",
              once: true,
            },
          }
        );

        // CTAs
        gsap.fromTo(
          ".career-cta",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "emphasis",
            scrollTrigger: {
              trigger: ".career-cta",
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".career-left, .benefit-row, .career-cta", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-cream py-[var(--space-section)]"
    >
      {/* Yarn line accent */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M 96 0 C 97 35, 95 65, 96 100"
          stroke="rgba(231,49,55,0.1)"
          strokeWidth="0.3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1 2.5"
        />
      </svg>

      {/* Top rule */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-dark/15 to-transparent"
        aria-hidden="true"
      />

      <div className="container-fluid">
        <div className="grid items-start gap-[var(--space-2xl)] lg:grid-cols-[45%_1fr]">
          {/* Left: Display statement + CTAs */}
          <div className="career-left" style={{ opacity: 0 }}>
            {/* Large display number for impact */}
            <div
              className="font-heading text-[clamp(5rem,12vw,11rem)] font-black leading-none tracking-[-0.05em] text-dark-deep/8 select-none"
              aria-hidden="true"
            >
              75
            </div>

            {/* Overlapping heading */}
            <div className="-mt-[clamp(2rem,5vw,4rem)]">
              <h2 className="font-heading text-[var(--text-4xl)] font-black leading-[1.0] tracking-[-0.03em] text-dark-deep">
                {t("title")}
              </h2>
              <p className="mt-[var(--space-md)] max-w-[38ch] font-body text-[var(--text-lg)] leading-relaxed text-dark/60">
                {t("subtitle")}
              </p>
            </div>

            {/* Quote */}
            <blockquote className="mt-[var(--space-xl)] border-l-2 border-red pl-[var(--space-md)]">
              <p className="font-heading text-[var(--text-base)] italic leading-relaxed text-dark/75">
                &ldquo;Wir verfolgen weiter stringent unsere Strategie, werden
                junge Führungskräfte nachziehen und im Zusammenspiel mit unseren
                langjährigen Mitarbeitenden die Zukunftsfähigkeit des
                Unternehmens sichern.&rdquo;
              </p>
              <cite className="mt-2 block font-body text-[var(--text-sm)] not-italic text-dark/35">
                — Beatrice Lederer &amp; Bernd Grupp, Geschäftsführung
              </cite>
            </blockquote>

            {/* CTAs */}
            <div className="mt-[var(--space-xl)] flex flex-wrap gap-[var(--space-sm)]">
              <Link
                href="/karriere"
                className="career-cta group inline-flex items-center gap-3 rounded-full bg-dark-deep px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-bold text-white transition-all duration-300 hover:bg-red hover:gap-4 hover:scale-[1.02]"
                style={{ opacity: 0 }}
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/karriere#initiativbewerbung"
                className="career-cta inline-flex items-center gap-2 rounded-full border border-dark/15 bg-transparent px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-dark transition-all duration-300 hover:border-red/40 hover:text-red"
                style={{ opacity: 0 }}
              >
                {t("ctaApply")}
              </Link>
            </div>
          </div>

          {/* Right: Benefits as clean horizontal list — no cards, no boxes */}
          <div className="career-right">
            {BENEFITS.map(({ key, number }) => (
              <div
                key={key}
                className="benefit-row group flex items-start gap-[var(--space-md)] border-t border-dark/10 py-[var(--space-md)] transition-colors duration-200 first:border-t-0 hover:border-red/20"
                style={{ opacity: 0 }}
              >
                {/* Number */}
                <span className="mt-1 flex-shrink-0 font-heading text-[var(--text-sm)] font-bold tabular-nums text-dark/25 transition-colors duration-200 group-hover:text-red/50">
                  {number}
                </span>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="font-heading text-[var(--text-lg)] font-bold leading-tight text-dark-deep transition-colors duration-200 group-hover:text-red">
                    {t(key)}
                  </h3>
                  <p className="mt-1 font-body text-[var(--text-base)] leading-relaxed text-dark/55">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
