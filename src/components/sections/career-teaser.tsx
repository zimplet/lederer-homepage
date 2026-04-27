"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Dumbbell,
  GraduationCap,
  Heart,
  Zap,
} from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";

const BENEFITS = [
  { key: "benefit1", icon: Shield },
  { key: "benefit2", icon: Dumbbell },
  { key: "benefit3", icon: GraduationCap },
  { key: "benefit4", icon: Heart },
  { key: "benefit5", icon: Zap },
] as const;

export function CareerTeaserSection() {
  const t = useTranslations("Careers");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Section entrance
        gsap.from(".career-label", {
          opacity: 0,
          x: -20,
          duration: 0.6,
          ease: "entrance",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".career-heading", {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
          duration: 1,
          ease: "entrance",
          scrollTrigger: {
            trigger: ".career-heading",
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(".career-sub", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "entrance",
          delay: 0.15,
          scrollTrigger: {
            trigger: ".career-heading",
            start: "top 85%",
            once: true,
          },
        });

        // Benefits cards stagger
        ScrollTrigger.batch(".benefit-card", {
          onEnter: (elements) =>
            gsap.from(elements, {
              opacity: 0,
              y: 50,
              filter: "blur(8px)",
              duration: 0.7,
              ease: "entrance",
              stagger: 0.1,
            }),
          start: "top 85%",
          once: true,
        });

        // Icon float animation on enter
        gsap.utils.toArray<HTMLElement>(".benefit-icon").forEach((icon, i) => {
          gsap.from(icon, {
            scale: 0,
            rotation: -10,
            duration: 0.5,
            ease: "spring",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: icon,
              start: "top 90%",
              once: true,
            },
          });
        });

        // CTAs
        gsap.from(".career-cta", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "emphasis",
          scrollTrigger: {
            trigger: ".career-cta",
            start: "top 90%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".career-label, .career-heading, .career-sub, .benefit-card, .career-cta", {
          opacity: 1,
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
      {/* Red glow */}
      <div
        className="absolute right-0 top-1/2 h-[60%] w-[30%] -translate-y-1/2 rounded-full bg-red/10 blur-[120px]"
        aria-hidden="true"
      />
      {/* Top separator */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red/30 to-transparent"
        aria-hidden="true"
      />

      {/* Yarn line accent */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M 8% 0 C 7% 30%, 9% 60%, 8% 100%"
          stroke="rgba(231,49,55,0.15)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 8"
        />
      </svg>

      <div className="container-fluid relative z-10">
        {/* Header */}
        <div className="mb-[var(--space-xl)] text-center">
          <div className="career-label mb-[var(--space-sm)] flex items-center justify-center gap-3" style={{ opacity: 0 }}>
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
            <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
              {t("tagline")}
            </span>
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
          </div>

          <h2
            className="career-heading font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-white"
            style={{ opacity: 0 }}
          >
            {t("title")}
          </h2>
          <p
            className="career-sub mx-auto mt-[var(--space-sm)] max-w-[50ch] font-body text-[var(--text-lg)] text-white/60"
            style={{ opacity: 0 }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Benefits grid */}
        <div className="mb-[var(--space-xl)] grid grid-cols-1 gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="benefit-card group relative overflow-hidden rounded-[var(--radius-lg)] border border-white/5 bg-white/5 p-[var(--space-md)] backdrop-blur-sm transition-all duration-300 hover:border-red/20 hover:bg-white/8"
              style={{ opacity: 0 }}
            >
              {/* Icon */}
              <div className="benefit-icon mb-[var(--space-sm)] flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-red/10 transition-colors duration-300 group-hover:bg-red/20">
                <Icon className="h-5 w-5 text-red" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-[var(--text-base)] font-bold text-white">
                {t(key)}
              </h3>
              <p className="mt-1 font-body text-[var(--text-sm)] leading-snug text-white/50">
                {t(`${key}Desc`)}
              </p>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-red to-red/0 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="mx-auto mb-[var(--space-xl)] max-w-[65ch] border-l-2 border-red pl-[var(--space-md)]">
          <p className="font-heading text-[var(--text-xl)] italic leading-relaxed text-white/80">
            &ldquo;Wir verfolgen weiter stringent unsere Strategie, werden
            junge Führungskräfte nachziehen und im Zusammenspiel mit unseren
            langjährigen Mitarbeitenden die Zukunftsfähigkeit des Unternehmens
            sichern.&rdquo;
          </p>
          <cite className="mt-3 block font-body text-[var(--text-sm)] not-italic text-white/40">
            — Beatrice Lederer & Bernd Grupp, Geschäftsführung
          </cite>
        </blockquote>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-[var(--space-sm)]">
          <Link
            href="/karriere"
            className="career-cta inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3 hover:scale-[1.02]"
            style={{ opacity: 0 }}
          >
            {t("cta")} <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/karriere#initiativbewerbung"
            className="career-cta inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            style={{ opacity: 0 }}
          >
            {t("ctaApply")}
          </Link>
        </div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/30 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
