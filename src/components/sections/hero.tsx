"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { gsap, useGSAP, SplitText } from "@/lib/motion";

export function HeroSection() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "entrance" } });

        // Layer 1: Video fade in
        tl.from(".hero-video-wrap", {
          opacity: 0,
          scale: 1.05,
          duration: 1.8,
          ease: "entrance.soft",
        });

        // Layer 2: Yarn lines (already handled by YarnLines component)

        // Layer 3: Headline - SplitText
        const headlineSplit = SplitText.create(".hero-headline", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            tl.from(
              self.lines,
              {
                yPercent: 110,
                duration: 1.1,
                stagger: 0.1,
                ease: "entrance",
              },
              ">-1.0"
            ),
        });

        // Layer 4: Subtitle words
        const subtitleSplit = SplitText.create(".hero-subtitle", {
          type: "words",
        });

        tl.from(
          subtitleSplit.words,
          {
            opacity: 0,
            y: 15,
            filter: "blur(4px)",
            duration: 0.6,
            stagger: { each: 0.03, from: "start" },
            ease: "entrance",
          },
          ">-0.4"
        );

        // Layer 5: CTAs
        tl.from(
          ".hero-cta",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: "emphasis",
          },
          ">-0.2"
        );

        // Scroll indicator loop
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          duration: 1.2,
          ease: "smooth",
          repeat: -1,
          yoyo: true,
          delay: 2,
        });

        // Parallax on scroll: video + text
        gsap.to(".hero-video-wrap", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(".hero-content", {
          yPercent: -15,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "30% top",
            end: "bottom top",
            scrub: 1,
          },
        });

        return () => {
          headlineSplit.revert();
          subtitleSplit.revert();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-headline, .hero-subtitle, .hero-cta", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-dark-deep"
    >
      {/* Background Video */}
      <div className="hero-video-wrap absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/Der-passende.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover opacity-40"
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-dark-deep/60 via-dark-deep/30 to-dark-deep/80"
          aria-hidden="true"
        />
        {/* Edge blur effect */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(58,57,50,0.7)_100%)]"
          aria-hidden="true"
        />
        {/* Red glow accent */}
        <div
          className="absolute bottom-0 left-1/4 h-[40%] w-[50%] -translate-x-1/2 rounded-full bg-red/10 blur-[120px]"
          aria-hidden="true"
        />
      </div>

      {/* Animated yarn lines */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          className="hero-yarn-1"
          d="M 12 0 C 10 25, 14 50, 12 75 C 11 88, 13 95, 12 100"
          stroke="rgba(231,49,55,0.25)"
          strokeWidth="0.3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1 1.5"
        />
        <path
          className="hero-yarn-2"
          d="M 50 -5 C 51 30, 49 65, 50 105"
          stroke="rgba(231,49,55,0.12)"
          strokeWidth="0.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="hero-yarn-3"
          d="M 88 0 C 90 33, 86 67, 88 100"
          stroke="rgba(231,49,55,0.2)"
          strokeWidth="0.3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="0.5 2"
        />
      </svg>

      {/* Content */}
      <div className="hero-content relative z-10 w-full pt-[var(--space-3xl)]">
        <div className="container-fluid">
          {/* Label */}
          <div className="mb-[var(--space-md)] flex items-center gap-3">
            <div className="h-[1px] w-12 bg-red" aria-hidden="true" />
            <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-white/60">
              Seit 1948
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-headline max-w-[14ch] font-heading text-[var(--text-hero)] font-black leading-[0.95] tracking-[-0.03em] text-white"
            style={{ visibility: "hidden" }}
          >
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle mt-[var(--space-lg)] max-w-[40ch] font-body text-[var(--text-lg)] leading-relaxed text-white/70"
            style={{ visibility: "hidden" }}
          >
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-[var(--space-xl)] flex flex-wrap gap-[var(--space-sm)]">
            <Link
              href="/produkte"
              className="hero-cta inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3 hover:scale-[1.02]"
              style={{ opacity: 0 }}
            >
              {t("ctaProducts")}
            </Link>
            <Link
              href="/karriere"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
              style={{ opacity: 0 }}
            >
              {t("ctaCareers")}
            </Link>
          </div>

          {/* Stats teaser */}
          <div className="mt-[var(--space-2xl)] flex flex-wrap gap-[var(--space-xl)] border-t border-white/10 pt-[var(--space-lg)]">
            {[
              { value: "75+", label: "Jahre Erfahrung" },
              { value: "~130", label: "Mitarbeiter" },
              { value: "50.000", label: "Spindeln" },
            ].map(({ value, label }) => (
              <div key={label} className="hero-cta" style={{ opacity: 0 }}>
                <div className="font-heading text-[var(--text-2xl)] font-black text-white">
                  {value}
                </div>
                <div className="font-body text-[var(--text-sm)] text-white/50">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-[var(--space-lg)] left-1/2 -translate-x-1/2"
        aria-label={t("scrollDown")}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-[var(--text-xs)] uppercase tracking-[0.2em] text-white/40">
            {t("scrollDown")}
          </span>
          <ArrowDown className="h-4 w-4 text-white/40" />
        </div>
      </div>
    </section>
  );
}
