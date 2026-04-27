"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, SplitText } from "@/lib/motion";
import { YarnLines } from "@/components/animations/yarn-lines";

export function AboutTeaserSection() {
  const t = useTranslations("About");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Parallax on image
        gsap.to(".about-image", {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Text reveal
        const split = SplitText.create(".about-headline", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: () =>
            gsap.from(split.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.08,
              ease: "entrance",
              scrollTrigger: {
                trigger: ".about-headline",
                start: "top 80%",
                once: true,
              },
            }),
        });

        gsap.from(".about-body", {
          opacity: 0,
          y: 30,
          filter: "blur(6px)",
          duration: 1,
          ease: "entrance",
          scrollTrigger: {
            trigger: ".about-body",
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(".about-cta", {
          opacity: 0,
          x: -20,
          duration: 0.6,
          ease: "emphasis",
          scrollTrigger: {
            trigger: ".about-cta",
            start: "top 90%",
            once: true,
          },
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".about-headline, .about-body, .about-cta", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-cream py-[var(--space-section)]"
    >
      <YarnLines color="rgba(82, 81, 73, 0.08)" />

      <div className="container-fluid">
        <div className="grid items-center gap-[var(--space-xl)] lg:grid-cols-2">
          {/* Text */}
          <div>
            {/* Tagline */}
            <div className="mb-[var(--space-md)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                {t("tagline")}
              </span>
            </div>

            <h2
              className="about-headline font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep"
              style={{ visibility: "hidden" }}
            >
              {t("title")}
            </h2>

            <p className="about-body mt-[var(--space-lg)] font-body text-[var(--text-lg)] leading-relaxed text-gray-500" style={{ opacity: 0 }}>
              {t("description")}
            </p>

            {/* Quotes */}
            <blockquote className="about-body mt-[var(--space-lg)] border-l-2 border-red pl-[var(--space-md)]" style={{ opacity: 0 }}>
              <p className="font-heading text-[var(--text-lg)] italic text-dark">
                &ldquo;Wir haben große Produktkompetenz und viele erfahrene
                Mitarbeiter – das birgt extremes Potenzial.&rdquo;
              </p>
              <cite className="mt-2 block font-body text-[var(--text-sm)] not-italic text-gray-400">
                — Bernd Grupp, Geschäftsführer
              </cite>
            </blockquote>

            <Link
              href="/unternehmen"
              className="about-cta mt-[var(--space-xl)] inline-flex items-center gap-2 font-heading text-[var(--text-base)] font-semibold text-red transition-all duration-300 hover:gap-4"
              style={{ opacity: 0 }}
            >
              {t("cta")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
            <div className="about-image relative aspect-[4/5] w-full">
              <Image
                src="/images/Produktionshalle.jpg"
                alt="Lederer Produktion - Garnmaschinen in Betrieb"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-[var(--space-md)] left-[var(--space-md)] rounded-[var(--radius-md)] bg-white/90 p-[var(--space-sm)] backdrop-blur-sm">
              <div className="font-heading text-[var(--text-xl)] font-black text-dark-deep">
                1948
              </div>
              <div className="font-body text-[var(--text-xs)] text-gray-500">
                Gegründet in Amstetten
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
