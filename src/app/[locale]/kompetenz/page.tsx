"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Cog, FlaskConical, Award, Zap } from "lucide-react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/motion";
import { YarnLines } from "@/components/animations/yarn-lines";

const MACHINES = [
  { name: "Ringspinn-Umwindemaschinen", count: "200+", desc: "Hochmoderne Umwindemaschinen für Single und Double Cover Garne. 50.000 Spindeln im Einsatz." },
  { name: "Luftverwirbelungsmaschinen", count: "50+", desc: "Präzise Air-Jet-Systeme für wirtschaftliche, gleichmäßige Elastikgarne." },
  { name: "Hohlspindel-Zwirnmaschinen", count: "30+", desc: "Elasto Twist Technologie für Webgarne aus diversen Fasermaterialien." },
  { name: "Qualitätsprüfgeräte", count: "Labor", desc: "Vollausgestattetes QS-Labor für Zug-, Dehnung- und Beständigkeitsprüfungen." },
] as const;

const QUALITY_STEPS = [
  { icon: FlaskConical, title: "Eingangsprüfung", desc: "Alle Rohstoffe werden bei Wareneingang auf Qualität und Echtheit geprüft." },
  { icon: Cog, title: "Prozessüberwachung", desc: "Kontinuierliche Überwachung aller Produktionsparameter in Echtzeit." },
  { icon: Award, title: "Fertigwarenprüfung", desc: "Jede Partie wird nach DIN-Normen geprüft bevor sie das Haus verlässt." },
  { icon: Zap, title: "ISO 9001:2015", desc: "Unser QM-System ist vollständig nach ISO 9001:2015 zertifiziert und auditiert." },
] as const;

export default function KompetenzPage() {
  const t = useTranslations("Kompetenz");
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".kompetenz-headline", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.elements, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.08,
              ease: "entrance",
            });
          },
        });

        gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 30,
            filter: "blur(6px)",
            duration: 0.8,
            ease: "entrance",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        ScrollTrigger.batch(".machine-card, .quality-card", {
          onEnter: (els) =>
            gsap.from(els, {
              opacity: 0,
              y: 40,
              filter: "blur(8px)",
              duration: 0.7,
              stagger: 0.1,
              ease: "entrance",
            }),
          start: "top 88%",
          once: true,
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".kompetenz-headline, .section-reveal, .machine-card, .quality-card", { opacity: 1 });
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark-deep pt-[var(--space-3xl)] pb-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(231,49,55,0.12),transparent_60%)]" aria-hidden="true" />
        <YarnLines color="rgba(231,49,55,0.15)" />

        <div className="container-fluid relative z-10">
          <div className="mb-[var(--space-sm)] flex items-center gap-3">
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
            <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
              {t("tagline")}
            </span>
          </div>
          <h1
            className="kompetenz-headline max-w-[22ch] font-heading text-[var(--text-hero)] font-black leading-[0.95] tracking-[-0.03em] text-white"
            style={{ visibility: "hidden" }}
          >
            {t("heroTitle")}
          </h1>
          <p className="mt-[var(--space-lg)] max-w-[50ch] font-body text-[var(--text-lg)] text-white/60">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="bg-red py-[var(--space-lg)]">
        <div className="container-fluid">
          <div className="grid grid-cols-2 gap-[var(--space-md)] lg:grid-cols-4">
            {[
              { value: "75+", label: "Jahre Erfahrung" },
              { value: "50.000", label: "Spindeln" },
              { value: "200+", label: "Maschinen" },
              { value: "20.000 m²", label: "Produktionsfläche" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center text-white">
                <div className="font-heading text-[var(--text-3xl)] font-black">{value}</div>
                <div className="font-body text-[var(--text-sm)] text-white/80">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Maschinenpark ────────────────────────────────────────────────── */}
      <section className="bg-cream py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                Technologie
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {t("machinesTitle")}
            </h2>
          </div>

          <div className="grid gap-[var(--space-md)] sm:grid-cols-2">
            {MACHINES.map((m) => (
              <div
                key={m.name}
                className="machine-card group rounded-[var(--radius-xl)] border border-dark/8 bg-white p-[var(--space-lg)] transition-shadow duration-300 hover:shadow-lg"
                style={{ opacity: 0 }}
              >
                <div className="mb-[var(--space-sm)] flex items-center justify-between">
                  <h3 className="font-heading text-[var(--text-xl)] font-bold text-dark-deep">{m.name}</h3>
                  <span className="font-heading text-[var(--text-2xl)] font-black text-red">{m.count}</span>
                </div>
                <p className="font-body text-[var(--text-base)] leading-relaxed text-gray-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Qualitätssicherung ───────────────────────────────────────────── */}
      <section className="bg-cream-dark py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                Qualität
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {t("qualityTitle")}
            </h2>
          </div>

          <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY_STEPS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="quality-card relative overflow-hidden rounded-[var(--radius-xl)] bg-white p-[var(--space-lg)] shadow-sm"
                style={{ opacity: 0 }}
              >
                <div className="mb-[var(--space-md)] flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-red/10">
                  <Icon className="h-5 w-5 text-red" />
                </div>
                <h3 className="font-heading text-[var(--text-lg)] font-bold text-dark-deep">{title}</h3>
                <p className="mt-2 font-body text-[var(--text-sm)] leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LYCRA Partnership Highlight ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark py-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(231,49,55,0.1),transparent_60%)]" aria-hidden="true" />
        <div className="container-fluid relative z-10">
          <div className="section-reveal max-w-[65ch]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                Partnerschaft
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-white">
              Erster LYCRA® 962L Partner in der DACH-Region
            </h2>
            <p className="mt-[var(--space-md)] font-body text-[var(--text-lg)] leading-relaxed text-white/60">
              Wir haben als erstes Unternehmen in Deutschland, Österreich und der Schweiz in 11 neue
              Umwindemaschinen für die innovative LYCRA® 962L Faser investiert. Diese Technologie
              ermöglicht Garne mit verbesserter Chlorresistenz, höherer Beständigkeit und überlegenem
              Tragekomfort.
            </p>
            <Link
              href="/produkte#wrapped"
              className="mt-[var(--space-lg)] inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3"
            >
              Zu den umwundenen Garnen <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
