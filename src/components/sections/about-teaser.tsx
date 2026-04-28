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
        // Headline reveal
        const headlineSplit = SplitText.create(".about-headline", {
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
                duration: 1.1,
                stagger: 0.1,
                ease: "entrance",
                scrollTrigger: {
                  trigger: ".about-headline",
                  start: "top 82%",
                  once: true,
                },
              }
            );
          },
        });

        // Word-by-word scrub on body paragraph — GSAP TextScrub paradigm
        const bodySplit = SplitText.create(".about-body-scrub", {
          type: "words",
        });
        gsap.set(".about-body-scrub", { visibility: "visible" });

        gsap.fromTo(
          bodySplit.words,
          { opacity: 0.1, filter: "blur(3px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            stagger: { each: 0.35 },
            scrollTrigger: {
              trigger: ".about-body-scrub",
              start: "top 72%",
              end: "bottom 40%",
              scrub: 1.5,
            },
          }
        );

        // Blockquote + CTA
        gsap.fromTo(
          ".about-secondary",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "entrance",
            scrollTrigger: {
              trigger: ".about-secondary",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Images: scale from 0.88 on enter (Image Scale paradigm)
        gsap.utils.toArray<HTMLElement>(".about-img").forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 0.88, filter: "brightness(0.7)" },
            {
              scale: 1,
              filter: "brightness(1)",
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top 85%",
                end: "top 30%",
                scrub: 1.2,
              },
            }
          );
        });

        // Right column parallax
        gsap.to(".about-image-col", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => {
          headlineSplit.revert();
          bodySplit.revert();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".about-headline, .about-body-scrub, .about-secondary",
          { opacity: 1, visibility: "visible" }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-cream-dark py-[var(--space-section)]"
    >
      <YarnLines color="rgba(82, 81, 73, 0.06)" />

      <div className="container-fluid">
        <div className="grid items-start gap-[var(--space-xl)] lg:grid-cols-[1fr_44%]">
          {/* Left: sticky text column */}
          <div className="lg:sticky lg:top-[clamp(6rem,10vw,9rem)]">
            {/* Tagline */}
            <div className="mb-[var(--space-md)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.22em] text-red/80">
                {t("tagline")}
              </span>
            </div>

            <h2
              className="about-headline font-heading text-[var(--text-4xl)] font-black leading-[1.0] tracking-[-0.03em] text-dark-deep"
              style={{ visibility: "hidden" }}
            >
              {t("title")}
            </h2>

            {/* Body — word scrub */}
            <p
              className="about-body-scrub mt-[var(--space-lg)] font-body text-[var(--text-lg)] leading-relaxed text-dark/65"
              style={{ visibility: "hidden" }}
            >
              {t("description")}
            </p>

            {/* Quote + CTA */}
            <div className="about-secondary" style={{ opacity: 0 }}>
              <blockquote className="mt-[var(--space-xl)] border-l-2 border-red pl-[var(--space-md)]">
                <p className="font-heading text-[var(--text-lg)] italic leading-relaxed text-dark">
                  &ldquo;Wir haben große Produktkompetenz und viele erfahrene
                  Mitarbeiter — das birgt extremes Potenzial.&rdquo;
                </p>
                <cite className="mt-2 block font-body text-[var(--text-sm)] not-italic text-dark/40">
                  — Bernd Grupp, Geschäftsführer
                </cite>
              </blockquote>

              <Link
                href="/unternehmen"
                className="mt-[var(--space-xl)] inline-flex items-center gap-3 font-heading text-[var(--text-base)] font-bold text-red transition-all duration-300 hover:gap-5"
              >
                {t("cta")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right: stacked images */}
          <div className="about-image-col flex flex-col gap-[var(--space-md)]">
            {/* Primary image */}
            <div className="about-img relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)]">
              <Image
                src="/images/Produktionshalle.jpg"
                alt="Lederer Produktion — Garnmaschinen in Betrieb"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/25 to-transparent" />
            </div>

            {/* Secondary image — offset right */}
            <div className="about-img relative ml-[var(--space-xl)] aspect-[3/2] overflow-hidden rounded-[var(--radius-xl)]">
              <Image
                src="/images/Spulen-rot.jpg"
                alt="Elastische Garne auf Spulen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 38vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red/10 to-transparent mix-blend-multiply" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
