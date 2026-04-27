"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, Clock, MapPin, Send, CheckCircle } from "lucide-react";
import { gsap, useGSAP, SplitText } from "@/lib/motion";
import { YarnLines } from "@/components/animations/yarn-lines";

const schema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  company: z.string().optional(),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  phone: z.string().optional(),
  subject: z.string().min(3, "Bitte geben Sie einen Betreff ein."),
  message: z.string().min(20, "Bitte beschreiben Sie Ihr Anliegen kurz (min. 20 Zeichen)."),
  privacy: z.boolean().refine((v) => v === true, "Bitte stimmen Sie der Datenschutzerklärung zu."),
});

type FormValues = z.infer<typeof schema>;

const TEAM = [
  { name: "Beatrice Lederer", role: "Geschäftsführerin", email: "b.lederer@lederer-elastic.de", area: "Unternehmensführung" },
  { name: "Bernd Grupp", role: "Geschäftsführer", email: "b.grupp@lederer-elastic.de", area: "Unternehmensführung" },
  { name: "Vertrieb Inland", role: "Kundenberatung", email: "vertrieb@lederer-elastic.de", area: "Verkauf & Anfragen" },
  { name: "HR / Bewerbungen", role: "Personalwesen", email: "bewerbung@lederer-elastic.de", area: "Karriere" },
] as const;

export default function KontaktPage() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".kontakt-headline", {
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

        gsap.utils.toArray<HTMLElement>(".form-field").forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "entrance",
            delay: i * 0.06,
            scrollTrigger: { trigger: formRef.current, start: "top 80%", once: true },
          });
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".kontakt-headline, .section-reveal, .form-field", { opacity: 1 });
      });
    },
    { scope: pageRef }
  );

  const onSubmit = async (data: FormValues) => {
    setSending(true);
    // Simulated submission — replace with real API route in production
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);
    setSending(false);
    setSubmitted(true);
    reset();
  };

  return (
    <div ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark-deep pt-[var(--space-3xl)] pb-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(231,49,55,0.1),transparent_60%)]" aria-hidden="true" />
        <YarnLines color="rgba(231,49,55,0.12)" />

        <div className="container-fluid relative z-10">
          <div className="mb-[var(--space-sm)] flex items-center gap-3">
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
            <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
              {t("title")}
            </span>
          </div>
          <h1
            className="kontakt-headline max-w-[20ch] font-heading text-[var(--text-hero)] font-black leading-[0.95] tracking-[-0.03em] text-white"
            style={{ visibility: "hidden" }}
          >
            {useTranslations("KontaktPage")("heroTitle")}
          </h1>
          <p className="mt-[var(--space-lg)] max-w-[45ch] font-body text-[var(--text-lg)] text-white/60">
            {useTranslations("KontaktPage")("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="grid items-start gap-[var(--space-xl)] lg:grid-cols-2">
            {/* Contact form */}
            <div>
              <div className="section-reveal mb-[var(--space-lg)]" style={{ opacity: 0 }}>
                <h2 className="font-heading text-[var(--text-3xl)] font-black tracking-tight text-dark-deep">
                  {useTranslations("KontaktPage")("formTitle")}
                </h2>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 rounded-[var(--radius-xl)] border border-green-200 bg-green-50 p-[var(--space-xl)] text-center">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <div>
                    <p className="font-heading text-[var(--text-xl)] font-bold text-dark-deep">
                      {t("success")}
                    </p>
                    <p className="mt-2 font-body text-[var(--text-base)] text-gray-500">
                      Wir melden uns innerhalb von 1–2 Werktagen bei Ihnen.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-body text-[var(--text-sm)] text-red underline"
                  >
                    Neue Nachricht senden
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-[var(--space-sm)]"
                  noValidate
                >
                  <div className="form-field grid gap-[var(--space-sm)] sm:grid-cols-2" style={{ opacity: 0 }}>
                    <div>
                      <label className="mb-1 block font-body text-[var(--text-sm)] font-medium text-dark">
                        {t("name")} <span className="text-red">*</span>
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        autoComplete="name"
                        className="w-full rounded-[var(--radius-md)] border border-gray-200 bg-white px-4 py-3 font-body text-[var(--text-base)] text-dark outline-none transition-all focus:border-red focus:ring-1 focus:ring-red"
                        placeholder="Max Mustermann"
                      />
                      {errors.name && <p className="mt-1 font-body text-[var(--text-xs)] text-red">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="mb-1 block font-body text-[var(--text-sm)] font-medium text-dark">
                        {t("company")}
                      </label>
                      <input
                        {...register("company")}
                        type="text"
                        autoComplete="organization"
                        className="w-full rounded-[var(--radius-md)] border border-gray-200 bg-white px-4 py-3 font-body text-[var(--text-base)] text-dark outline-none transition-all focus:border-red focus:ring-1 focus:ring-red"
                        placeholder="Muster GmbH"
                      />
                    </div>
                  </div>

                  <div className="form-field grid gap-[var(--space-sm)] sm:grid-cols-2" style={{ opacity: 0 }}>
                    <div>
                      <label className="mb-1 block font-body text-[var(--text-sm)] font-medium text-dark">
                        {t("email")} <span className="text-red">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        autoComplete="email"
                        className="w-full rounded-[var(--radius-md)] border border-gray-200 bg-white px-4 py-3 font-body text-[var(--text-base)] text-dark outline-none transition-all focus:border-red focus:ring-1 focus:ring-red"
                        placeholder="max@example.de"
                      />
                      {errors.email && <p className="mt-1 font-body text-[var(--text-xs)] text-red">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="mb-1 block font-body text-[var(--text-sm)] font-medium text-dark">
                        {t("phone")}
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        autoComplete="tel"
                        className="w-full rounded-[var(--radius-md)] border border-gray-200 bg-white px-4 py-3 font-body text-[var(--text-base)] text-dark outline-none transition-all focus:border-red focus:ring-1 focus:ring-red"
                        placeholder="+49 7331 ..."
                      />
                    </div>
                  </div>

                  <div className="form-field" style={{ opacity: 0 }}>
                    <label className="mb-1 block font-body text-[var(--text-sm)] font-medium text-dark">
                      {t("subject")} <span className="text-red">*</span>
                    </label>
                    <input
                      {...register("subject")}
                      type="text"
                      className="w-full rounded-[var(--radius-md)] border border-gray-200 bg-white px-4 py-3 font-body text-[var(--text-base)] text-dark outline-none transition-all focus:border-red focus:ring-1 focus:ring-red"
                      placeholder="Produktanfrage, Musterbestellung..."
                    />
                    {errors.subject && <p className="mt-1 font-body text-[var(--text-xs)] text-red">{errors.subject.message}</p>}
                  </div>

                  <div className="form-field" style={{ opacity: 0 }}>
                    <label className="mb-1 block font-body text-[var(--text-sm)] font-medium text-dark">
                      {t("message")} <span className="text-red">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full resize-none rounded-[var(--radius-md)] border border-gray-200 bg-white px-4 py-3 font-body text-[var(--text-base)] text-dark outline-none transition-all focus:border-red focus:ring-1 focus:ring-red"
                      placeholder="Beschreiben Sie Ihr Anliegen..."
                    />
                    {errors.message && <p className="mt-1 font-body text-[var(--text-xs)] text-red">{errors.message.message}</p>}
                  </div>

                  <div className="form-field" style={{ opacity: 0 }}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        {...register("privacy")}
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 flex-shrink-0 accent-red"
                      />
                      <span className="font-body text-[var(--text-sm)] text-gray-600">
                        {t("privacy")}{" "}
                        <a href="/datenschutz" className="text-red underline hover:no-underline" target="_blank">
                          Datenschutzerklärung
                        </a>
                      </span>
                    </label>
                    {errors.privacy && <p className="mt-1 font-body text-[var(--text-xs)] text-red">{errors.privacy.message}</p>}
                  </div>

                  <div className="form-field" style={{ opacity: 0 }}>
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark disabled:opacity-60"
                    >
                      {sending ? (
                        "Wird gesendet..."
                      ) : (
                        <>
                          <Send className="h-5 w-5" /> {t("send")}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-[var(--space-lg)]">
              {/* Quick contact */}
              <div className="section-reveal rounded-[var(--radius-xl)] border border-dark/8 bg-white p-[var(--space-lg)] shadow-sm" style={{ opacity: 0 }}>
                <h3 className="mb-[var(--space-md)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
                  Schnell-Kontakt
                </h3>
                <div className="space-y-[var(--space-sm)]">
                  <a
                    href="tel:+497331200060"
                    className="flex items-center gap-3 font-body text-[var(--text-base)] text-dark transition-colors hover:text-red"
                  >
                    <Phone className="h-5 w-5 flex-shrink-0 text-red" />
                    +49 (0) 7331 2006-0
                  </a>
                  <a
                    href="mailto:info@lederer-elastic.de"
                    className="flex items-center gap-3 font-body text-[var(--text-base)] text-dark transition-colors hover:text-red"
                  >
                    <Mail className="h-5 w-5 flex-shrink-0 text-red" />
                    info@lederer-elastic.de
                  </a>
                  <div className="flex items-center gap-3 font-body text-[var(--text-base)] text-dark">
                    <Clock className="h-5 w-5 flex-shrink-0 text-red" />
                    {t("hours")}
                  </div>
                  <div className="flex items-start gap-3 font-body text-[var(--text-base)] text-dark">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-red" />
                    <address className="not-italic text-gray-500">
                      Jörg Lederer GmbH<br />
                      Hauptstraße 115<br />
                      73340 Amstetten
                    </address>
                  </div>
                </div>
              </div>

              {/* OpenStreetMap embed */}
              <div className="section-reveal overflow-hidden rounded-[var(--radius-xl)]" style={{ opacity: 0 }}>
                <iframe
                  title="Standort Jörg Lederer GmbH Amstetten"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=9.84,48.56,9.86,48.57&layer=mapnik&marker=48.565,9.850"
                  className="h-64 w-full border-0"
                  loading="lazy"
                  aria-label="Karte: Jörg Lederer GmbH, Hauptstraße 115, Amstetten"
                />
                <a
                  href="https://www.openstreetmap.org/?mlat=48.565&mlon=9.850#map=16/48.565/9.850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white px-4 py-2 font-body text-[var(--text-xs)] text-red hover:underline"
                >
                  Größere Karte anzeigen (OpenStreetMap) →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Contacts ────────────────────────────────────────────────── */}
      <section className="bg-cream-dark py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="section-reveal mb-[var(--space-xl)]" style={{ opacity: 0 }}>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {useTranslations("KontaktPage")("teamTitle")}
            </h2>
          </div>
          <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="section-reveal rounded-[var(--radius-xl)] border border-dark/8 bg-white p-[var(--space-lg)] transition-shadow duration-300 hover:shadow-lg"
                style={{ opacity: 0 }}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red/10 font-heading text-[var(--text-xl)] font-black text-red">
                  {member.name.charAt(0)}
                </div>
                <div className="font-body text-[var(--text-xs)] uppercase tracking-widest text-red">
                  {member.area}
                </div>
                <h3 className="mt-1 font-heading text-[var(--text-base)] font-bold text-dark-deep">
                  {member.name}
                </h3>
                <div className="font-body text-[var(--text-sm)] text-gray-500">{member.role}</div>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-3 block font-body text-[var(--text-sm)] text-red transition-colors hover:underline"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
