"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  Leaf,
  Users,
  Award,
  Lightbulb,
  Shield,
  Globe,
} from "lucide-react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/motion";
import { YarnLines } from "@/components/animations/yarn-lines";

// ── Data ────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: "1948", title: "Gründung", desc: "Jörg Lederer Senior gründet das Unternehmen in Amstetten als Garnumwinderbetrieb." },
  { year: "1970", title: "Erweiterung", desc: "Erste größere Maschinenpark-Investition und Ausbau der Produktionskapazitäten." },
  { year: "1990", title: "Modernisierung", desc: "Einführung moderner Luftverwirbelungstechnik und Erweiterung des Produktportfolios." },
  { year: "2000", title: "ISO-Zertifizierung", desc: "Zertifizierung nach ISO 9001 – Qualitätsmanagement auf höchstem Niveau." },
  { year: "2018", title: "Energiemanagement", desc: "ISO 50001-Zertifizierung und Investition in Solar- und LED-Technologie." },
  { year: "2021", title: "LYCRA® Partner", desc: "Erster Garnumwinder in der DACH-Region mit LYCRA® 962L Faser, 11 neue Maschinen." },
  { year: "2022", title: "Neue Führung", desc: "Beatrice Lederer und Bernd Grupp übernehmen die Geschäftsführung. Zusammenführung von Produktion und Verwaltung." },
] as const;

const VALUES = [
  { icon: Heart, title: "Leidenschaft", desc: "75 Jahre Hingabe an die Herstellung höchstwertiger elastischer Garne." },
  { icon: Users, title: "Zusammenhalt", desc: "Geringe Fluktuation, starker Teamgeist – wir kennen uns und unterstützen uns." },
  { icon: Award, title: "Qualität", desc: "ISO-zertifizierte Prozesse und kontinuierliche Weiterentwicklung unserer Standards." },
  { icon: Lightbulb, title: "Innovation", desc: "LYCRA® 962L als erste DACH-Firma, Luftverwirbelung, modernste Technologien." },
  { icon: Shield, title: "Verlässlichkeit", desc: "Stabile Arbeitsplätze seit 1948 – auch in wirtschaftlich schwierigen Zeiten." },
  { icon: Leaf, title: "Nachhaltigkeit", desc: "GRS-zertifiziert, 90% europäische Rohstoffe, Solar, LED – Verantwortung für morgen." },
  { icon: Globe, title: "Partnerschaft", desc: "Internationale Vertretungen in IT, TR, FR, ES, PT und enge Kundenbeziehungen." },
] as const;

// ── Component ────────────────────────────────────────────────────────────────

export default function UnternehmenPage() {
  const t = useTranslations("Company");
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero headline
        const split = SplitText.create(".company-headline", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.08,
              ease: "entrance",
              scrollTrigger: {
                trigger: ".company-headline",
                start: "top 85%",
                once: true,
              },
            }),
        });

        // Timeline items
        ScrollTrigger.batch(".timeline-item", {
          onEnter: (els) =>
            gsap.from(els, {
              opacity: 0,
              x: -40,
              filter: "blur(6px)",
              duration: 0.8,
              stagger: 0.12,
              ease: "entrance",
            }),
          start: "top 85%",
          once: true,
        });

        // Timeline yarn line
        gsap.from(".timeline-line", {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.5,
          ease: "entrance",
          scrollTrigger: {
            trigger: ".timeline-line",
            start: "top 80%",
            once: true,
          },
        });

        // Values cards
        ScrollTrigger.batch(".value-card", {
          onEnter: (els) =>
            gsap.from(els, {
              opacity: 0,
              y: 40,
              filter: "blur(8px)",
              duration: 0.7,
              stagger: 0.08,
              ease: "entrance",
            }),
          start: "top 88%",
          once: true,
        });

        // Section headings
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

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".company-headline, .timeline-item, .value-card, .section-reveal", { opacity: 1 });
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark-deep pt-[var(--space-3xl)] pb-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(231,49,55,0.12),transparent_60%)]" aria-hidden="true" />
        <YarnLines color="rgba(231,49,55,0.15)" />

        <div className="container-fluid relative z-10">
          <div className="mb-[var(--space-sm)] flex items-center gap-3">
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
            <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
              {t("tagline")}
            </span>
          </div>
          <h1
            className="company-headline max-w-[18ch] font-heading text-[var(--text-hero)] font-black leading-[0.95] tracking-[-0.03em] text-white"
            style={{ visibility: "hidden" }}
          >
            {t("heroTitle")}
          </h1>
          <p className="mt-[var(--space-lg)] max-w-[50ch] font-body text-[var(--text-lg)] text-white/60">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ── Geschichte / Timeline ────────────────────────────────────────── */}
      <section className="relative bg-cream py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                Geschichte
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {t("timelineTitle")}
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="timeline-line absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-red via-red/50 to-transparent lg:left-1/2 lg:-translate-x-1/2"
              aria-hidden="true"
            />

            <div className="space-y-[var(--space-xl)]">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className="timeline-item relative flex gap-[var(--space-md)] pl-10 lg:pl-0"
                  style={{ opacity: 0 }}
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1 h-4 w-4 flex-shrink-0 rounded-full border-2 border-red bg-cream lg:left-1/2 lg:-translate-x-1/2" />

                  {/* Content – alternating sides on desktop */}
                  <div className={`lg:w-1/2 ${i % 2 === 0 ? "lg:pr-[var(--space-xl)] lg:text-right" : "lg:ml-auto lg:pl-[var(--space-xl)]"}`}>
                    <div className="inline-block rounded-full bg-red px-3 py-1 font-heading text-[var(--text-sm)] font-bold text-white">
                      {item.year}
                    </div>
                    <h3 className="mt-2 font-heading text-[var(--text-xl)] font-bold text-dark-deep">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-body text-[var(--text-base)] text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Führungsteam ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream-dark py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                {t("teamTagline")}
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {t("teamTitle")}
            </h2>
          </div>

          <div className="grid gap-[var(--space-lg)] lg:grid-cols-2">
            {/* Beatrice Lederer */}
            <div className="section-reveal group overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-sm" style={{ opacity: 0 }}>
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/bernd-beatrice.jpg"
                  alt="Beatrice Lederer und Bernd Grupp, Geschäftsführung Jörg Lederer GmbH"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/70 to-transparent" />
                <div className="absolute bottom-[var(--space-md)] left-[var(--space-md)]">
                  <div className="font-heading text-[var(--text-xl)] font-black text-white">Beatrice Lederer</div>
                  <div className="font-body text-[var(--text-sm)] text-white/70">Geschäftsführerin · 3. Generation</div>
                </div>
              </div>
              <div className="p-[var(--space-lg)]">
                <blockquote className="border-l-2 border-red pl-[var(--space-md)]">
                  <p className="font-heading text-[var(--text-lg)] italic leading-relaxed text-dark">
                    &ldquo;Die Überlegung, im eigenen Familienunternehmen Verantwortung zu übernehmen, fühlte sich im Bauch einfach richtig an.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Bernd Grupp */}
            <div className="section-reveal group overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-sm" style={{ opacity: 0 }}>
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/images/Fuehrungsebene-Lederer.jpg"
                  alt="Führungsebene Jörg Lederer GmbH"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/70 to-transparent" />
                <div className="absolute bottom-[var(--space-md)] left-[var(--space-md)]">
                  <div className="font-heading text-[var(--text-xl)] font-black text-white">Bernd Grupp</div>
                  <div className="font-body text-[var(--text-sm)] text-white/70">Geschäftsführer</div>
                </div>
              </div>
              <div className="p-[var(--space-lg)]">
                <blockquote className="border-l-2 border-red pl-[var(--space-md)]">
                  <p className="font-heading text-[var(--text-lg)] italic leading-relaxed text-dark">
                    &ldquo;Wir haben große Produktkompetenz und viele erfahrene Mitarbeiter – das birgt extremes Potenzial.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Werte ────────────────────────────────────────────────────────── */}
      <section className="relative bg-cream py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                {t("valuesTagline")}
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {t("valuesTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="value-card group rounded-[var(--radius-xl)] border border-dark/8 bg-white p-[var(--space-lg)] transition-shadow duration-300 hover:shadow-lg"
                style={{ opacity: 0 }}
              >
                <div className="mb-[var(--space-md)] flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-red/10 transition-colors duration-300 group-hover:bg-red/20">
                  <Icon className="h-5 w-5 text-red" />
                </div>
                <h3 className="font-heading text-[var(--text-lg)] font-bold text-dark-deep">
                  {title}
                </h3>
                <p className="mt-2 font-body text-[var(--text-sm)] leading-relaxed text-gray-500">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nachhaltigkeit ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark py-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(231,49,55,0.08),transparent_60%)]" aria-hidden="true" />
        <div className="container-fluid relative z-10">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                {t("sustainabilityTagline")}
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-white">
              {t("sustainabilityTitle")}
            </h2>
          </div>

          <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Leaf, title: "GRS-zertifiziert", desc: "Unsere recycelten Garne erfüllen den Global Recycled Standard – lückenlos nachgewiesen." },
              { icon: Globe, title: "90% Europäische Rohstoffe", desc: "Kurze Lieferwege, regionale Wertschöpfung und Transparenz in der Lieferkette." },
              { icon: Lightbulb, title: "Solar & LED", desc: "Eigene Photovoltaikanlage und vollständige LED-Beleuchtung reduzieren unseren CO₂-Fußabdruck." },
              { icon: Users, title: "Soziales Engagement", desc: "Sponsoring des SV Amstetten, Integration von Geflüchteten und regionale Gemeinschaftsprojekte." },
              { icon: Shield, title: "ISO 50001", desc: "Energiemanagement nach höchstem Standard – kontinuierliche Verbesserung ist unser Antrieb." },
              { icon: Heart, title: "Faire Arbeitsbedingungen", desc: "Kein Stellenabbau trotz Krise – wir stehen zu unseren Mitarbeiterinnen und Mitarbeitern." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="section-reveal rounded-[var(--radius-xl)] border border-white/5 bg-white/5 p-[var(--space-lg)] backdrop-blur-sm"
                style={{ opacity: 0 }}
              >
                <div className="mb-[var(--space-sm)] flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-red/10">
                  <Icon className="h-5 w-5 text-red" />
                </div>
                <h3 className="font-heading text-[var(--text-lg)] font-bold text-white">{title}</h3>
                <p className="mt-2 font-body text-[var(--text-sm)] leading-relaxed text-white/50">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[var(--space-xl)]">
        <div className="container-fluid text-center">
          <h2 className="section-reveal font-heading text-[var(--text-3xl)] font-black text-dark-deep" style={{ opacity: 0 }}>
            Lernen Sie uns persönlich kennen
          </h2>
          <div className="mt-[var(--space-lg)] flex flex-wrap justify-center gap-[var(--space-sm)]">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3"
            >
              Kontakt aufnehmen <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/karriere"
              className="inline-flex items-center gap-2 rounded-full border border-dark/20 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-dark transition-all duration-300 hover:border-red hover:text-red"
            >
              Karriere bei Lederer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
