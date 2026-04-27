"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Phone, Mail, Clock } from "lucide-react";
import { gsap, useGSAP } from "@/lib/motion";

export function ContactCtaSection() {
  const t = useTranslations("Contact");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact-content", {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
          duration: 1,
          ease: "entrance",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".contact-info-item", {
          opacity: 0,
          x: -20,
          duration: 0.6,
          stagger: 0.1,
          ease: "entrance",
          scrollTrigger: {
            trigger: ".contact-info-item",
            start: "top 88%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".contact-content, .contact-info-item", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-dark py-[var(--space-section)]"
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[80%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/8 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container-fluid relative z-10">
        <div className="grid items-center gap-[var(--space-xl)] lg:grid-cols-2">
          {/* Left: Text + CTA */}
          <div className="contact-content" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                {t("title")}
              </span>
            </div>

            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-white">
              {t("subtitle")}
            </h2>

            <p className="mt-[var(--space-md)] max-w-[45ch] font-body text-[var(--text-lg)] leading-relaxed text-white/60">
              Egal ob Produktanfrage, individuelle Garnentwicklung oder
              allgemeine Fragen — unser Team ist für Sie da.
            </p>

            <div className="mt-[var(--space-xl)] flex flex-wrap gap-[var(--space-sm)]">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3 hover:scale-[1.02]"
              >
                Zur Kontaktseite <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="mailto:info@lederer-elastic.de"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <Mail className="h-5 w-5" /> E-Mail schreiben
              </a>
            </div>
          </div>

          {/* Right: Contact info */}
          <div className="space-y-[var(--space-md)]">
            <a
              href="tel:+4973314820"
              className="contact-info-item group flex items-center gap-[var(--space-md)] rounded-[var(--radius-lg)] border border-white/5 bg-white/5 p-[var(--space-md)] transition-all duration-300 hover:border-red/20 hover:bg-white/8"
              style={{ opacity: 0 }}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-red/10 transition-colors duration-300 group-hover:bg-red/20">
                <Phone className="h-5 w-5 text-red" />
              </div>
              <div>
                <div className="font-body text-[var(--text-xs)] uppercase tracking-widest text-white/40">
                  Telefon
                </div>
                <div className="font-heading text-[var(--text-lg)] font-semibold text-white">
                  +49 7331 48 20
                </div>
              </div>
            </a>

            <a
              href="mailto:info@lederer-elastic.de"
              className="contact-info-item group flex items-center gap-[var(--space-md)] rounded-[var(--radius-lg)] border border-white/5 bg-white/5 p-[var(--space-md)] transition-all duration-300 hover:border-red/20 hover:bg-white/8"
              style={{ opacity: 0 }}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-red/10 transition-colors duration-300 group-hover:bg-red/20">
                <Mail className="h-5 w-5 text-red" />
              </div>
              <div>
                <div className="font-body text-[var(--text-xs)] uppercase tracking-widest text-white/40">
                  E-Mail
                </div>
                <div className="font-heading text-[var(--text-lg)] font-semibold text-white">
                  info@lederer-elastic.de
                </div>
              </div>
            </a>

            <div
              className="contact-info-item flex items-center gap-[var(--space-md)] rounded-[var(--radius-lg)] border border-white/5 bg-white/5 p-[var(--space-md)]"
              style={{ opacity: 0 }}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-red/10">
                <Clock className="h-5 w-5 text-red" />
              </div>
              <div>
                <div className="font-body text-[var(--text-xs)] uppercase tracking-widest text-white/40">
                  Öffnungszeiten
                </div>
                <div className="font-heading text-[var(--text-lg)] font-semibold text-white">
                  {t("hours")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/30 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
