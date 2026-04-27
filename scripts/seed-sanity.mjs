/**
 * Sanity seed script – migrates static content into the CMS.
 * Run: node scripts/seed-sanity.mjs
 */

const PROJECT_ID = "xf2aizn9";
const DATASET = "production";
const TOKEN =
  "skpp5thyRVb3dJ4Ar2xkvoxyXyDgI2r4WcTZXdnwnrfubBqcLswNFbOpZnc1W0V8vE9HYy5xxjFfCSIMk7aI8SuOiKomFNO5i1LkTMVeud5rzLKbW05JD8BAlb47z1CTI5K7LWzqrLAzpesmL4eo5DdEqx3QVILK0Tr3svVX65FT6sVMJBHU";
const ENDPOINT = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`;

// ─── Portable Text helpers ────────────────────────────────────────────────────

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: uid(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: uid(), text, marks: [] }],
  };
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Very lightweight HTML → Portable Text conversion */
function htmlToBlocks(html) {
  const blocks = [];
  // Strip outer whitespace
  const clean = html.replace(/\s+/g, " ").trim();
  // Split by block-level tags
  const parts = clean.split(/(?=<(?:p|h2|h3|blockquote|ul|li)[^>]*>)|(?<=<\/(?:p|h2|h3|blockquote|ul|li)>)/gi);

  for (const raw of parts) {
    const text = raw.replace(/<[^>]+>/g, "").trim();
    if (!text) continue;

    if (/<h2/i.test(raw)) {
      blocks.push(block(text, "h2"));
    } else if (/<h3/i.test(raw)) {
      blocks.push(block(text, "h3"));
    } else if (/<blockquote/i.test(raw)) {
      blocks.push(block(text, "blockquote"));
    } else if (/<li/i.test(raw)) {
      // list items – skip individual li tags, handled below
    } else if (text.length > 0) {
      blocks.push(block(text));
    }
  }

  // Separate pass for list items
  const liMatches = [...clean.matchAll(/<li[^>]*>(.*?)<\/li>/gi)];
  for (const m of liMatches) {
    const liText = m[1].replace(/<[^>]+>/g, "").trim();
    if (liText) {
      // Insert before the last block if it looks like a list
      blocks.push({
        _type: "block",
        _key: uid(),
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [{ _type: "span", _key: uid(), text: liText, marks: [] }],
      });
    }
  }

  return blocks.length ? blocks : [block("(Inhalt wird noch eingepflegt)")];
}

// ─── Blog posts ──────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  {
    slug: "lycra-962l-dach-partner",
    title: "Lederer als erster LYCRA® 962L Partner in der DACH-Region",
    excerpt:
      "Wir haben als erstes Unternehmen in Deutschland, Österreich und der Schweiz in die innovative LYCRA® 962L Faser investiert und 11 neue Umwindemaschinen in Betrieb genommen.",
    tag: "Partnerschaft",
    date: "2024-03-15",
    author: "Beatrice Lederer",
    featured: true,
    readingTime: 4,
    contentHtml: `<p>Die Jörg Lederer GmbH hat einen bedeutenden Schritt vollzogen: Als erstes Unternehmen in der DACH-Region ist Lederer offizieller Partner für die revolutionäre LYCRA® 962L Faser von The LYCRA Company.</p><h2>Was ist LYCRA® 962L?</h2><p>LYCRA® 962L ist eine weiterentwickelte Generation der bewährten Elasthan-Faser mit verbesserter Chlorresistenz, höherer UV-Beständigkeit und überlegenem Tragekomfort.</p><h2>Investition in die Zukunft</h2><p>Um diese Technologie optimal nutzen zu können, haben wir gezielt in 11 neue, hochmoderne Umwindemaschinen investiert.</p><blockquote>„Wir haben große Produktkompetenz und viele erfahrene Mitarbeiter – das birgt extremes Potenzial." – Bernd Grupp</blockquote>`,
  },
  {
    slug: "grs-zertifizierung-recycelte-garne",
    title: "GRS-Zertifizierung: Unsere Garne aus recycelten Materialien",
    excerpt:
      "Jörg Lederer GmbH erhält die Global Recycled Standard Zertifizierung und setzt damit ein weiteres Zeichen für nachhaltiges Wirtschaften in der Textilindustrie.",
    tag: "Nachhaltigkeit",
    date: "2024-01-20",
    author: "Bernd Grupp",
    featured: false,
    readingTime: 3,
    contentHtml: `<p>Nachhaltigkeit ist bei Lederer kein Marketingbegriff, sondern gelebte Unternehmensverantwortung. Mit der GRS-Zertifizierung machen wir jetzt auch offiziell sichtbar, was wir schon lange praktizieren.</p><h2>Was bedeutet der GRS?</h2><p>Der Global Recycled Standard ist ein internationaler Standard, der die Verwendung von recycelten Materialien in Produkten zertifiziert und die Lieferkette lückenlos nachweist.</p><h2>Unser Nachhaltigkeitsweg</h2><p>Wir beziehen rund 90 % unserer Rohstoffe aus Europa, betreiben eine eigene Photovoltaikanlage und haben unsere Produktion vollständig auf LED-Beleuchtung umgestellt.</p>`,
  },
  {
    slug: "fuehrungstrio-zukunft",
    title: "Starkes Führungstrio: Beatrice Lederer, Bernd Grupp und Jörg Lederer",
    excerpt:
      "Drei Persönlichkeiten, ein Ziel: Das Führungstrio der Jörg Lederer GmbH trägt gemeinsam Verantwortung für die Zukunft des Unternehmens.",
    tag: "Unternehmen",
    date: "2023-10-05",
    author: "Redaktion",
    featured: false,
    readingTime: 3,
    contentHtml: `<p>Seit 2022 wird die Jörg Lederer GmbH von einem erfahrenen Dreiergespann geführt: Beatrice Lederer, Bernd Grupp und Jörg Lederer vereinen Kontinuität und frischen Wind.</p><h2>Beatrice Lederer – die dritte Generation</h2><blockquote>„Die Überlegung, im eigenen Familienunternehmen Verantwortung zu übernehmen, fühlte sich im Bauch einfach richtig an."</blockquote><h2>Bernd Grupp – Erfahrung und Operative Exzellenz</h2><blockquote>„Wir haben große Produktkompetenz und viele erfahrene Mitarbeiter – das birgt extremes Potenzial."</blockquote><h2>Gemeinsame Vision</h2><p>Das Führungstrio verfolgt eine klare Strategie: Junge Führungskräfte nachziehen, in Technologie investieren und die emotionale Bindung aller Mitarbeiter erhalten.</p>`,
  },
  {
    slug: "iso-50001-energiemanagement",
    title: "ISO 50001 – Energiemanagement auf höchstem Niveau",
    excerpt:
      "Lederer erfüllt die strengen Anforderungen der internationalen Norm ISO 50001 und zeigt damit Verantwortungsbewusstsein für Ressourcen und Umwelt.",
    tag: "Zertifizierungen",
    date: "2023-06-12",
    author: "Bernd Grupp",
    featured: false,
    readingTime: 3,
    contentHtml: `<p>Energieeffizienz ist für produzierende Unternehmen nicht nur eine ökologische, sondern auch eine ökonomische Notwendigkeit. Die Jörg Lederer GmbH hat sich dieser Aufgabe mit der Zertifizierung nach ISO 50001 gestellt.</p><h2>Was ist ISO 50001?</h2><p>ISO 50001 ist ein international anerkannter Standard für Energiemanagementsysteme. Er hilft Organisationen, Energie effizienter zu nutzen, Kosten zu senken und den CO₂-Ausstoß zu reduzieren.</p><h2>Unsere Maßnahmen</h2><li>Eigene Photovoltaikanlage auf dem Produktionsgebäude</li><li>Vollständige Umstellung auf LED-Beleuchtung</li><li>Kontinuierliches Energie-Monitoring aller Maschinen</li>`,
  },
  {
    slug: "produktion-verwaltung-zusammen",
    title: "Eine gemeinsame Kantine – Austausch auf Augenhöhe",
    excerpt:
      "Mit der Zusammenführung von Produktion und Verwaltung in einem gemeinsamen Küchenbereich setzt Lederer ein starkes Zeichen für gelebte Unternehmenskultur.",
    tag: "Unternehmenskultur",
    date: "2022-11-08",
    author: "Beatrice Lederer",
    featured: false,
    readingTime: 2,
    contentHtml: `<p>Bei vielen Unternehmen gibt es eine unsichtbare Grenze zwischen Produktion und Verwaltung. Wir haben diese Grenze 2022 bewusst aufgehoben.</p><h2>Die Idee</h2><p>Eine gemeinsame Kantine für alle 130 Mitarbeiterinnen und Mitarbeiter – von der Textilmacherin an der Maschine bis zur Buchhalterin im Büro.</p><blockquote>„Wir verfolgen weiter stringent unsere Strategie, werden junge Führungskräfte nachziehen und die Zukunftsfähigkeit des Unternehmens sichern." – Beatrice Lederer & Bernd Grupp</blockquote>`,
  },
  {
    slug: "ausbildung-textiltechnologie-2024",
    title: "Ausbildungsplätze 2024: Textiltechnologie bei Lederer",
    excerpt:
      "Wir suchen engagierte Auszubildende, die einen traditionsreichen Beruf in modernem Umfeld erlernen wollen. Bewerbungen für 2024 sind jetzt offen.",
    tag: "Karriere",
    date: "2024-02-01",
    author: "HR Team",
    featured: false,
    readingTime: 3,
    contentHtml: `<p>Textiltechnologie ist eine Zukunftsbranche. Hochwertige Garne werden in medizinischen Anwendungen, Funktionssportbekleidung und technischen Textilien eingesetzt.</p><h2>Die Ausbildung bei Lederer</h2><li>Funktion und Einrichtung moderner Garnumwinde- und Luftverwirbelungsmaschinen</li><li>Qualitätsprüfung nach DIN-Normen im hauseigenen Labor</li><li>Grundlagen der Rohstoffkunde und Garncharakteristik</li><li>Produktionsplanung und Prozessoptimierung</li><h2>Was wir bieten</h2><p>Als Ausbildungsbetrieb legen wir großen Wert auf eine persönliche Betreuung. Jede:r Auszubildende hat eine:n feste:n Ausbilder:in.</p>`,
  },
];

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

  // 2. Blog posts
  console.log("\n📝 Blog posts...");
  const blogMutations = BLOG_POSTS.map((post) => ({
    createOrReplace: {
      _id: `post-${post.slug}`,
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      content: htmlToBlocks(post.contentHtml),
      tag: post.tag,
      date: post.date,
      author: post.author,
      readingTime: post.readingTime,
      featured: post.featured,
    },
  }));
  await mutate(blogMutations);
  console.log(`   ✓ ${BLOG_POSTS.length} posts`);

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
