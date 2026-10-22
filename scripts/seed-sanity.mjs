/**
 * Sanity seed script – migrates static content into the CMS.
 * Run: node scripts/seed-sanity.mjs
 */

const PROJECT_ID = "xf2aizn9";
const DATASET = "production";
const TOKEN =
  "skpp5thyRVb3dJ4Ar2xkvoxyXyDgI2r4WcTZXdnwnrfubBqcLswNFbOpZnc1W0V8vE9HYy5xxjFfCSIMk7aI8SuOiKomFNO5i1LkTMVeud5rzLKbW05JD8BAlb47z1CTI5K7LWzqrLAzpesmL4eo5DdEqx3QVILK0Tr3svVX65FT6sVMJBHU";
const ENDPOINT = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`;

// ─── Jobs ────────────────────────────────────────────────────────────────────

const JOBS = [
  {
    title: "Textiltechnologe / Textiltechnologin (m/w/d)",
    type: "Vollzeit",
    department: "Produktion",
    location: "Amstetten, Baden-Württemberg",
    summary:
      "Bedienung und Einrichtung unserer hochmodernen Garnumwinde- und Luftverwirbelungsmaschinen. Qualitätssicherung und Prozessoptimierung in der laufenden Produktion.",
    requirements: [
      "Abgeschlossene Berufsausbildung im Textilbereich oder vergleichbare Qualifikation",
      "Technisches Verständnis und handwerkliches Geschick",
      "Bereitschaft zur Schichtarbeit",
      "Teamfähigkeit und Zuverlässigkeit",
    ],
    benefits: [
      "Sicherer Arbeitsplatz in einem stabilen Familienunternehmen",
      "Leistungsgerechte Vergütung",
      "Kollegiales Team und flache Hierarchien",
      "Weiterbildungsmöglichkeiten",
    ],
    active: true,
    publishedAt: "2024-01-15",
  },
  {
    title: "Vertriebsmitarbeiter / Vertriebsmitarbeiterin Innendienst (m/w/d)",
    type: "Vollzeit",
    department: "Vertrieb",
    location: "Amstetten, Baden-Württemberg",
    summary:
      "Betreuung und Ausbau unseres Kundenstamms im In- und Ausland. Enge Zusammenarbeit mit Produktion und Technik zur optimalen Kundenberatung.",
    requirements: [
      "Kaufmännische Ausbildung oder Studium",
      "Erfahrung im Vertrieb, idealerweise in der Textilbranche",
      "Sehr gute Deutsch- und Englischkenntnisse",
      "Sicherer Umgang mit CRM-Systemen und MS Office",
    ],
    benefits: [
      "Internationales Arbeitsumfeld mit Kunden in ganz Europa",
      "Attraktives Gehaltspaket mit Bonuskomponente",
      "Moderne IT-Ausstattung",
      "Homeoffice-Möglichkeit nach der Einarbeitung",
    ],
    active: true,
    publishedAt: "2024-02-01",
  },
  {
    title: "Auszubildende:r Textiltechnologie (m/w/d)",
    type: "Ausbildung",
    department: "Produktion",
    location: "Amstetten, Baden-Württemberg",
    summary:
      "3-jährige Ausbildung zum/zur Textiltechnologen/-technologin mit moderner Ausrüstung, persönlicher Betreuung und echten Übernahmechancen.",
    requirements: [
      "Mittlere Reife oder (Fach-)Abitur",
      "Interesse an Technik und handwerklicher Arbeit",
      "Neugierde und Lernbereitschaft",
    ],
    benefits: [
      "Persönliche Betreuung durch erfahrene Ausbilder:innen",
      "Überdurchschnittliche Ausbildungsvergütung",
      "Gute Übernahmechancen bei guten Leistungen",
      "Azubi-Events und Teamaktivitäten",
    ],
    active: true,
    publishedAt: "2024-02-15",
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    author: "Beatrice Lederer",
    role: "Geschäftsführerin",
    quote:
      "Die Überlegung, im eigenen Familienunternehmen Verantwortung zu übernehmen, fühlte sich im Bauch einfach richtig an.",
    type: "leadership",
    featured: true,
    order: 1,
  },
  {
    author: "Bernd Grupp",
    role: "Geschäftsführer",
    quote:
      "Wir haben große Produktkompetenz und viele erfahrene Mitarbeiter – das birgt extremes Potenzial.",
    type: "leadership",
    featured: true,
    order: 2,
  },
  {
    author: "Maria K.",
    role: "Textiltechnologin, seit 12 Jahren",
    quote:
      "Was ich an Lederer schätze? Hier kennt jeder jeden. Die Chefetage kennt meinen Namen – das ist heute nicht selbstverständlich.",
    type: "employee",
    featured: true,
    order: 3,
  },
  {
    author: "Thomas B.",
    role: "Produktionsleiter",
    quote:
      "Die Investitionen in neue Technologien zeigen mir, dass das Unternehmen wirklich in die Zukunft denkt – und in uns als Mitarbeiter.",
    type: "employee",
    featured: false,
    order: 4,
  },
  {
    author: "Sandra M.",
    role: "Vertrieb Innendienst",
    quote:
      "Als Quereinsteigerin wurde ich von Tag eins mit offenen Armen empfangen. Das Team zieht wirklich an einem Strang.",
    type: "employee",
    featured: true,
    order: 5,
  },
];

// ─── Certificates ────────────────────────────────────────────────────────────

const CERTIFICATES = [
  { name: "ISO 9001:2015", type: "certificate", order: 1 },
  { name: "ISO 50001", type: "certificate", order: 2 },
  { name: "GRS – Global Recycled Standard", type: "certificate", order: 3 },
  { name: "IHK Ausbildungsbetrieb", type: "membership", order: 4 },
  { name: "LYCRA® Partner", type: "partner", order: 5 },
  { name: "oeko-tex", type: "certificate", order: 6 },
];

// ─── Site settings ────────────────────────────────────────────────────────────

const SITE_SETTINGS = {
  _id: "siteSettings",
  _type: "siteSettings",
  companyName: "Jörg Lederer GmbH",
  email: "info@lederer-elastic.de",
  phone: "+49 7331 9604-0",
  address: {
    street: "Hauptstraße 115",
    city: "Amstetten",
    zip: "73340",
    country: "Deutschland",
  },
  openingHours: "Mo–Do 8:00–17:00, Fr 8:00–12:00",
  seoTitle: "Jörg Lederer GmbH – Elastische Garne seit 1948",
  seoDescription:
    "Familienunternehmen aus Amstetten. Hersteller elastischer Garne für Strumpfwaren, Kompressionsartikel und technische Textilien. ISO 9001 | ISO 50001 | GRS zertifiziert.",
};

// ─── Mutations helper ─────────────────────────────────────────────────────────

async function mutate(mutations) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mutations }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error("Mutation failed:", JSON.stringify(json, null, 2));
    throw new Error(`HTTP ${res.status}`);
  }
  return json;
}

// ─── Run seeding ─────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding Sanity dataset:", DATASET);

  // 1. Site settings (createOrReplace – fixed _id)
  console.log("\n📋 Site settings...");
  await mutate([{ createOrReplace: SITE_SETTINGS }]);
  console.log("   ✓ siteSettings");

  // 3. Jobs
  console.log("\n💼 Job postings...");
  const jobMutations = JOBS.map((job, i) => ({
    createOrReplace: {
      _id: `job-${i + 1}`,
      _type: "jobPosting",
      title: job.title,
      slug: { _type: "slug", current: job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") },
      type: job.type,
      department: job.department,
      location: job.location,
      summary: job.summary,
      requirements: job.requirements,
      benefits: job.benefits,
      active: job.active,
      publishedAt: job.publishedAt,
    },
  }));
  await mutate(jobMutations);
  console.log(`   ✓ ${JOBS.length} job postings`);

  // 4. Testimonials
  console.log("\n💬 Testimonials...");
  const testimonialMutations = TESTIMONIALS.map((t, i) => ({
    createOrReplace: {
      _id: `testimonial-${i + 1}`,
      _type: "testimonial",
      author: t.author,
      role: t.role,
      quote: t.quote,
      type: t.type,
      featured: t.featured,
      order: t.order,
    },
  }));
  await mutate(testimonialMutations);
  console.log(`   ✓ ${TESTIMONIALS.length} testimonials`);

  // 5. Certificates
  console.log("\n🏆 Certificates...");
  const certMutations = CERTIFICATES.map((c, i) => ({
    createOrReplace: {
      _id: `cert-${i + 1}`,
      _type: "certificate",
      name: c.name,
      type: c.type,
      order: c.order,
    },
  }));
  await mutate(certMutations);
  console.log(`   ✓ ${CERTIFICATES.length} certificates`);

  console.log("\n✅ Seeding complete!\n");
  console.log("Open the Studio at: http://localhost:3000/studio");
}

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
