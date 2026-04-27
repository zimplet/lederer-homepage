"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Layers, Wind, Repeat2, CheckCircle2 } from "lucide-react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/motion";
import { YarnLines } from "@/components/animations/yarn-lines";

const PRODUCTS = [
  {
    key: "wrapped",
    icon: Layers,
    color: "from-red/15 to-red/5",
    borderColor: "border-red/20",
    applications: [
      "Strumpfwaren & Strumpfhosen",
      "Kompressionsstrümpfe & Bandagen",
      "Seamless-Wäsche",
      "Medizinische Textilien",
    ],
    specs: [
      "Single Cover & Double Cover",
      "LYCRA® 962L Faser (erster DACH-Partner)",
      "Kern: Elasthan / Lycra",
      "Umwicklung: Polyamid, Polyester, Baumwolle",
    ],
    description:
      "Umwundene Garne sind die Kernkompetenz von Lederer seit 1948. Beim Umwinden wird ein elastischer Kern (Elasthan oder Lycra) mit einer oder zwei Deckengarnen umwickelt – das ergibt ein Garn mit herausragender Elastizität, Formstabilität und Tragekomfort. Als erster Garnumwinder in der DACH-Region mit der innovativen LYCRA® 962L Faser setzen wir Maßstäbe.",
  },
  {
    key: "airjet",
    icon: Wind,
    color: "from-dark/15 to-dark/5",
    borderColor: "border-dark/20",
    applications: [
      "Sportstrümpfe & Funktionswäsche",
      "Technische Textilien",
      "Laufmaschen-resistente Strümpfe",
      "Günstigere Elastikgarne",
    ],
    specs: [
      "Air-Jet Verwirbelungstechnik",
      "Kern: Elasthan verschiedener Stärken",
      "Deckgarn: Polyamid, Polyester",
      "Wirtschaftliche Alternative zu umwundenen Garnen",
    ],
    description:
      "Bei der Luftverwirbelung wird ein Elasthan-Kern durch Druckluft mit dem Deckgarn verwirbelt – ohne mechanisches Umwinden. Das Ergebnis: gleichmäßige, wirtschaftliche Elastikgarne mit guter Rückstellkraft. Ideal für Anwendungen, bei denen Kosteneffizienz bei gleichzeitig hoher Qualität gefragt ist.",
  },
  {
    key: "elastotwist",
    icon: Repeat2,
    color: "from-gray-400/20 to-gray-400/5",
    borderColor: "border-gray-300",
    applications: [
      "Webgarne & Wirkwaren",
      "Technische Textilien",
      "Spezialanwendungen",
      "Individualentwicklungen",
    ],
    specs: [
      "Hohlspindel-Zwirnmaschinen",
      "Diverse Fasermaterialien möglich",
      "Angepasste Zwirnungen",
      "Individuelle Entwicklung auf Anfrage",
    ],
    description:
      "Elasto Twist bezeichnet unsere Hohlspindel-Zwirnmaschinen-Technologie, mit der wir Webgarne aus einer Vielzahl verschiedener Fasermaterialien fertigen. Diese Technologie erlaubt besonders flexible Lösungen für Spezialanwendungen und individuelle Kundenwünsche – von technischen Textilien bis zu Webwaren.",
  },
] as const;

export default function ProduktePage() {
  const t = useTranslations("ProductsPage");
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".products-headline", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: () =>
            gsap.from(split.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.08,
              ease: "entrance",
            }),
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

        ScrollTrigger.batch(".spec-item", {
          onEnter: (els) =>
            gsap.from(els, {
              opacity: 0,
              x: -20,
              duration: 0.5,
              stagger: 0.06,
              ease: "entrance",
            }),
          start: "top 90%",
          once: true,
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".products-headline, .section-reveal, .spec-item", { opacity: 1 });
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark-deep pt-[var(--space-3xl)] pb-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(231,49,55,0.12),transparent_60%)]" aria-hidden="true" />
        <YarnLines color="rgba(231,49,55,0.15)" />

        <div className="container-fluid relative z-10">
          <div className="mb-[var(--space-sm)] flex items-center gap-3">
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
            <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
              {t("tagline")}
            </span>
          </div>
          <h1
            className="products-headline max-w-[22ch] font-heading text-[var(--text-hero)] font-black leading-[0.95] tracking-[-0.03em] text-white"
            style={{ visibility: "hidden" }}
          >
            {t("heroTitle")}
          </h1>
          <p className="mt-[var(--space-lg)] max-w-[50ch] font-body text-[var(--text-lg)] text-white/60">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ── Product Sections ─────────────────────────────────────────────── */}
      {PRODUCTS.map(({ key, icon: Icon, color, borderColor, applications, specs, description }, i) => (
        <section
          key={key}
          id={key}
          className={`py-[var(--space-section)] ${i % 2 === 0 ? "bg-cream" : "bg-cream-dark"}`}
        >
          <div className="container-fluid">
            <div className="grid items-start gap-[var(--space-xl)] lg:grid-cols-2">
              {/* Text side */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="section-reveal" style={{ opacity: 0 }}>
                  <div className="mb-[var(--space-sm)] flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br ${color}`}>
                      <Icon className="h-6 w-6 text-red" />
                    </div>
                  </div>
                  <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
                    {t(`${key}Title`)}
                  </h2>
                  <p className="mt-[var(--space-md)] font-body text-[var(--text-lg)] leading-relaxed text-gray-500">
                    {description}
                  </p>
                  <Link
                    href="/kontakt"
                    className="mt-[var(--space-lg)] inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3"
                  >
                    {t("inquiryCta")} <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Specs side */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className={`rounded-[var(--radius-xl)] border ${borderColor} bg-white p-[var(--space-lg)] shadow-sm`}>
                  {/* Applications */}
                  <div className="mb-[var(--space-lg)]">
                    <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-base)] font-bold uppercase tracking-wider text-gray-400">
                      Anwendungen
                    </h3>
                    <ul className="space-y-2">
                      {applications.map((app) => (
                        <li key={app} className="spec-item flex items-start gap-3" style={{ opacity: 0 }}>
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                          <span className="font-body text-[var(--text-base)] text-dark">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical specs */}
                  <div className="border-t border-gray-100 pt-[var(--space-md)]">
                    <h3 className="mb-[var(--space-sm)] font-heading text-[var(--text-base)] font-bold uppercase tracking-wider text-gray-400">
                      Technische Details
                    </h3>
                    <ul className="space-y-2">
                      {specs.map((spec) => (
                        <li key={spec} className="spec-item flex items-start gap-3" style={{ opacity: 0 }}>
                          <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red" />
                          <span className="font-body text-[var(--text-sm)] text-gray-500">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Individual Yarn CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark py-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(231,49,55,0.1),transparent_60%)]" aria-hidden="true" />
        <div className="container-fluid relative z-10 text-center">
          <div className="section-reveal" style={{ opacity: 0 }}>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight text-white">
              Ihr individuelles Garn
            </h2>
            <p className="mx-auto mt-[var(--space-md)] max-w-[55ch] font-body text-[var(--text-lg)] text-white/60">
              Kein Standardgarn trifft Ihre Anforderungen? Wir entwickeln maßgeschneiderte Lösungen –
              vom ersten Gespräch bis zur Serienproduktion.
            </p>
            <div className="mt-[var(--space-xl)] flex flex-wrap justify-center gap-[var(--space-sm)]">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3"
              >
                {t("inquiryCta")} <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/kompetenz"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                Unsere Kompetenz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
