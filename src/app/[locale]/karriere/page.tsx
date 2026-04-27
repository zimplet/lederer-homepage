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
  Coffee,
  Clock,
  MapPin,
  Send,
  ChevronRight,
} from "lucide-react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/motion";
import { YarnLines } from "@/components/animations/yarn-lines";

const BENEFITS = [
  { icon: Shield, title: "Sichere Arbeitsplätze", desc: "Seit über 75 Jahren ein stabiler Arbeitgeber – auch in Krisenzeiten kein Stellenabbau." },
  { icon: Dumbbell, title: "Fitness-Zuschuss", desc: "Vergünstigte Mitgliedschaft im Revitalzentrum Amstetten für aktive Erholung." },
  { icon: GraduationCap, title: "Weiterbildung", desc: "Kontinuierliche Schulungen, Seminare und Entwicklungsmöglichkeiten für alle Mitarbeiter:innen." },
  { icon: Heart, title: "Familiäres Umfeld", desc: "Geringe Fluktuation, starker Zusammenhalt, gemeinsame Kantine für Austausch auf Augenhöhe." },
  { icon: Zap, title: "Tradition & Innovation", desc: "Modernste Technologie in einer traditionsreichen Branche – das Beste aus zwei Welten." },
  { icon: Coffee, title: "Zusammengehörigkeit", desc: "Gemeinsame Events, kurze Entscheidungswege und ein Team, das zusammenhält." },
] as const;

const JOBS = [
  {
    id: "maschinen-einrichter",
    title: "Maschinen-Einrichter:in (m/w/d)",
    type: "Vollzeit",
    department: "Produktion",
    location: "Amstetten",
    summary: "Du richtest und wartest unsere Garnumwinde- und Luftverwirbelungsmaschinen und stellst reibungslose Produktionsabläufe sicher.",
  },
  {
    id: "qualitaetspruefung",
    title: "Mitarbeiter:in Qualitätsprüfung (m/w/d)",
    type: "Vollzeit",
    department: "Qualitätssicherung",
    location: "Amstetten",
    summary: "Du prüfst unsere Garnprodukte nach definierten Standards und dokumentierst Ergebnisse in unserem Qualitätsmanagementsystem.",
  },
  {
    id: "ausbildung-textil",
    title: "Auszubildende:r Textiltechnologie (m/w/d)",
    type: "Ausbildung",
    department: "Produktion",
    location: "Amstetten",
    summary: "Lerne das textile Handwerk von Grund auf in einem modernen Familienunternehmen mit 75-jähriger Erfahrung.",
  },
] as const;

const PROCESS_STEPS = [
  { num: "01", title: "Bewerbung einreichen", desc: "Sende uns deine Unterlagen per E-Mail oder nutze unser Online-Formular.", icon: Send },
  { num: "02", title: "Erstes Gespräch", desc: "Wir melden uns schnell. Meist telefonisch oder per Videokonferenz.", icon: Clock },
  { num: "03", title: "Kennenlerntag", desc: "Du erlebst unsere Produktion und dein künftiges Team hautnah.", icon: MapPin },
  { num: "04", title: "Willkommen bei Lederer", desc: "Du startest mit einem strukturierten Einarbeitungsplan und einem starken Team.", icon: Heart },
] as const;

export default function KarrierePage() {
  const t = useTranslations("CareerPage");
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".career-headline", {
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

        ScrollTrigger.batch(".benefit-card", {
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

        ScrollTrigger.batch(".job-card", {
          onEnter: (els) =>
            gsap.from(els, {
              opacity: 0,
              y: 30,
              duration: 0.6,
              stagger: 0.1,
              ease: "entrance",
            }),
          start: "top 88%",
          once: true,
        });

        ScrollTrigger.batch(".process-step", {
          onEnter: (els) =>
            gsap.from(els, {
              opacity: 0,
              y: 40,
              duration: 0.7,
              stagger: 0.12,
              ease: "entrance",
            }),
          start: "top 88%",
          once: true,
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".career-headline, .section-reveal, .benefit-card, .job-card, .process-step", { opacity: 1 });
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark-deep pt-[var(--space-3xl)] pb-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(231,49,55,0.15),transparent_60%)]" aria-hidden="true" />
        <YarnLines color="rgba(231,49,55,0.15)" />

        <div className="container-fluid relative z-10">
          <div className="mb-[var(--space-sm)] flex items-center gap-3">
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
            <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
              Karriere
            </span>
          </div>
          <h1
            className="career-headline max-w-[20ch] font-heading text-[var(--text-hero)] font-black leading-[0.95] tracking-[-0.03em] text-white"
            style={{ visibility: "hidden" }}
          >
            {t("heroTitle")}
          </h1>
          <p className="mt-[var(--space-lg)] max-w-[50ch] font-body text-[var(--text-lg)] text-white/60">
            {t("heroSubtitle")}
          </p>
          <div className="mt-[var(--space-xl)] flex flex-wrap gap-[var(--space-sm)]">
            <Link
              href="#stellen"
              className="inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3"
            >
              {t("applyNow")} <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#initiative"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              {t("initiativeApply")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                Deine Vorteile
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              Warum Lederer?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="benefit-card group rounded-[var(--radius-xl)] border border-dark/8 bg-white p-[var(--space-lg)] transition-shadow duration-300 hover:shadow-lg"
                style={{ opacity: 0 }}
              >
                <div className="mb-[var(--space-md)] flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-red/10 transition-colors duration-300 group-hover:bg-red/20">
                  <Icon className="h-5 w-5 text-red" />
                </div>
                <h3 className="font-heading text-[var(--text-lg)] font-bold text-dark-deep">{title}</h3>
                <p className="mt-2 font-body text-[var(--text-sm)] leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="mx-auto mt-[var(--space-xl)] max-w-[65ch] border-l-2 border-red pl-[var(--space-md)]">
            <p className="font-heading text-[var(--text-xl)] italic leading-relaxed text-dark">
              &ldquo;Wir verfolgen weiter stringent unsere Strategie, werden junge Führungskräfte nachziehen
              und im Zusammenspiel mit unseren langjährigen Mitarbeitenden die Zukunftsfähigkeit des
              Unternehmens sichern.&rdquo;
            </p>
            <cite className="mt-3 block font-body text-[var(--text-sm)] not-italic text-gray-400">
              — Beatrice Lederer & Bernd Grupp, Geschäftsführung
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ── Open Positions ───────────────────────────────────────────────── */}
      <section id="stellen" className="bg-cream-dark py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                {t("jobsSubtitle")}
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {t("jobsTitle")}
            </h2>
          </div>

          <div className="space-y-[var(--space-md)]">
            {JOBS.map((job) => (
              <div
                key={job.id}
                className="job-card group flex flex-col justify-between gap-[var(--space-md)] rounded-[var(--radius-xl)] border border-dark/8 bg-white p-[var(--space-lg)] transition-shadow duration-300 hover:shadow-lg sm:flex-row sm:items-center"
                style={{ opacity: 0 }}
              >
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-red/10 px-3 py-0.5 font-body text-[var(--text-xs)] font-medium text-red">
                      {job.type}
                    </span>
                    <span className="rounded-full bg-dark/8 px-3 py-0.5 font-body text-[var(--text-xs)] text-gray-500">
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1 font-body text-[var(--text-xs)] text-gray-400">
                      <MapPin className="h-3 w-3" /> {job.location}
                    </span>
                  </div>
                  <h3 className="font-heading text-[var(--text-xl)] font-bold text-dark-deep">{job.title}</h3>
                  <p className="mt-1 font-body text-[var(--text-sm)] text-gray-500">{job.summary}</p>
                </div>
                <Link
                  href={`/kontakt?stelle=${job.id}`}
                  className="flex flex-shrink-0 items-center gap-2 rounded-full border border-red px-[var(--space-md)] py-[var(--space-xs)] font-heading text-[var(--text-sm)] font-semibold text-red transition-all duration-300 group-hover:bg-red group-hover:text-white"
                >
                  Bewerben <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Process ──────────────────────────────────────────── */}
      <section className="bg-cream py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                {t("processTagline")}
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {t("processTitle")}
            </h2>
          </div>

          <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map(({ num, title, desc, icon: Icon }) => (
              <div
                key={num}
                className="process-step relative rounded-[var(--radius-xl)] border border-dark/8 bg-white p-[var(--space-lg)]"
                style={{ opacity: 0 }}
              >
                <div className="mb-[var(--space-md)] flex items-center justify-between">
                  <span className="font-heading text-[var(--text-3xl)] font-black text-dark/10">
                    {num}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-red/10">
                    <Icon className="h-4 w-4 text-red" />
                  </div>
                </div>
                <h3 className="font-heading text-[var(--text-lg)] font-bold text-dark-deep">{title}</h3>
                <p className="mt-2 font-body text-[var(--text-sm)] leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Initiative Apply CTA ─────────────────────────────────────────── */}
      <section id="initiative" className="relative overflow-hidden bg-dark py-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(231,49,55,0.1),transparent_60%)]" aria-hidden="true" />
        <div className="container-fluid relative z-10 text-center">
          <div className="section-reveal" style={{ opacity: 0 }}>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight text-white">
              {t("trainingTitle")}
            </h2>
            <p className="mx-auto mt-[var(--space-md)] max-w-[55ch] font-body text-[var(--text-lg)] text-white/60">
              Kein passendes Stellenangebot dabei? Kein Problem – wir freuen uns jederzeit über
              Initiativbewerbungen und Anfragen für Praktika oder Ausbildungsplätze.
            </p>
            <div className="mt-[var(--space-xl)] flex flex-wrap justify-center gap-[var(--space-sm)]">
              <a
                href="mailto:bewerbung@lederer-elastic.de"
                className="inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3"
              >
                <Send className="h-5 w-5" /> {t("initiativeApply")}
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                Kontaktformular
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
