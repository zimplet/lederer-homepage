"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap, useGSAP, SplitText } from "@/lib/motion";

export function HeroSection() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "entrance" } });

        // Video fade in with subtle scale
        tl.fromTo(
          ".hero-video-wrap",
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 2.2, ease: "entrance.soft" }
        );

        // Floating image reveal
        tl.fromTo(
          ".hero-image-float",
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "entrance" },
          ">-1.6"
        );

        // Headline lines
        const headlineSplit = SplitText.create(".hero-headline", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.elements, { visibility: "visible" });
            return tl.fromTo(
              self.lines,
              { yPercent: 108 },
              {
                yPercent: 0,
                duration: 1.15,
                stagger: 0.13,
                ease: "entrance",
              },
              ">-1.2"
            );
          },
        });

        // Subtitle words
        const subtitleSplit = SplitText.create(".hero-subtitle", {
          type: "words",
        });
        gsap.set(".hero-subtitle", { visibility: "visible" });

        tl.fromTo(
          subtitleSplit.words,
          { opacity: 0, y: 14, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            stagger: { each: 0.028 },
            ease: "entrance",
          },
          ">-0.5"
        );

        // CTAs
        tl.fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "emphasis" },
          ">-0.4"
        );

        // Scroll indicator bounce
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.4,
          ease: "smooth",
          repeat: -1,
          yoyo: true,
          delay: 2.8,
        });

        // Parallax on scroll
        gsap.to(".hero-video-wrap", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(".hero-image-float", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });

        gsap.to(".hero-content", {
          yPercent: -14,
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
        gsap.set(".hero-headline, .hero-subtitle, .hero-cta", {
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
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-dark-deep"
    >
      {/* Full-bleed video background */}
      <div className="hero-video-wrap absolute inset-0">
        <video
          src="/videos/Der-passende.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover opacity-30"
        />
        {/* Directional gradient — heavier on left for legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-dark-deep/95 via-dark-deep/70 to-dark-deep/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-dark-deep/80 via-transparent to-dark-deep/50"
          aria-hidden="true"
        />
        {/* Ambient red glow */}
        <div
          className="absolute bottom-[8%] left-[12%] h-[32%] w-[28%] rounded-full bg-red/7 blur-[110px]"
          aria-hidden="true"
        />
      </div>

      {/* Yarn lines */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M 7 0 C 6 28, 8 58, 7 100"
          stroke="rgba(231,49,55,0.18)"
          strokeWidth="0.22"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1 2.2"
        />
        <path
          d="M 93 0 C 94 38, 92 68, 93 100"
          stroke="rgba(231,49,55,0.1)"
          strokeWidth="0.18"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Content layer */}
      <div className="hero-content relative z-10 w-full pt-[clamp(5.5rem,9vw,9rem)]">
        <div className="container-fluid">
          <div className="flex items-end justify-between gap-[var(--space-xl)]">
            {/* Left: Text */}
            <div className="min-w-0 flex-1">
              {/* Eyebrow */}
              <div className="mb-[var(--space-lg)] flex items-center gap-3">
                <div className="h-[1px] w-10 bg-red" aria-hidden="true" />
                <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.22em] text-white/45">
                  Seit 1948
                </span>
              </div>

              {/* Headline — max-w-[22ch] guarantees 2-line flow at all viewport sizes */}
              <h1
                className="hero-headline max-w-[22ch] font-heading text-[clamp(2.8rem,5.2vw,5.8rem)] font-black leading-[0.92] tracking-[-0.04em] text-white"
                style={{ visibility: "hidden" }}
              >
                {t("title")}
              </h1>

              {/* Subtitle */}
              <p
                className="hero-subtitle mt-[var(--space-lg)] max-w-[44ch] font-body text-[var(--text-lg)] leading-relaxed text-white/60"
                style={{ visibility: "hidden" }}
              >
                {t("subtitle")}
              </p>

              {/* CTAs */}
              <div className="mt-[var(--space-xl)] flex flex-wrap items-center gap-[var(--space-sm)]">
                <Link
                  href="/produkte"
                  className="hero-cta group inline-flex items-center gap-3 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-bold text-white transition-all duration-300 hover:bg-red-dark hover:gap-4 hover:scale-[1.02]"
                  style={{ opacity: 0 }}
                >
                  {t("ctaProducts")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/karriere"
                  className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/7 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/45 hover:bg-white/14"
                  style={{ opacity: 0 }}
                >
                  {t("ctaCareers")}
                </Link>
              </div>
            </div>

            {/* Right: Floating image — desktop only, creates asymmetric editorial feel */}
            <div
              className="hero-image-float relative hidden flex-shrink-0 self-end overflow-hidden rounded-[var(--radius-xl)] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.6)] lg:block"
              style={{
                width: "clamp(260px,24vw,400px)",
                height: "clamp(320px,32vw,500px)",
                opacity: 0,
              }}
            >
              <Image
                src="/images/Spulen-rot.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1440px) 28vw, 400px"
                aria-hidden="true"
                priority
              />
              {/* Inner gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/50 via-transparent to-transparent" />
              {/* Subtle red border refraction */}
              <div className="absolute inset-0 rounded-[var(--radius-xl)] border border-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
            </div>
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
          <span className="font-body text-[var(--text-xs)] uppercase tracking-[0.22em] text-white/30">
            {t("scrollDown")}
          </span>
          <ArrowDown className="h-4 w-4 text-white/30" />
        </div>
      </div>
    </section>
  );
}
