export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string – will be replaced by Portable Text in Phase 5
  tag: string;
  date: string; // ISO 8601
  author: string;
  featured: boolean;
  readingTime: number; // minutes
}

// Static posts – migrated from lederer-elastic.de
// Will be replaced by Sanity CMS queries in Phase 5
export const BLOG_POSTS: BlogPost[] = [
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
    content: `
      <p>Die Jörg Lederer GmbH hat einen bedeutenden Schritt in ihrer Unternehmensgeschichte vollzogen: Als erstes Unternehmen in der DACH-Region (Deutschland, Österreich, Schweiz) ist Lederer offizieller Partner für die revolutionäre LYCRA® 962L Faser von The LYCRA Company.</p>

      <h2>Was ist LYCRA® 962L?</h2>
      <p>LYCRA® 962L ist eine weiterentwickelte Generation der bewährten Elasthan-Faser. Sie bietet gegenüber herkömmlichen Elasthan-Garnen entscheidende Vorteile: eine deutlich verbesserte Chlorresistenz, höhere Beständigkeit gegenüber UV-Strahlung und kosmetischen Substanzen sowie einen überlegenen Tragekomfort durch verbesserte Rückstellkraft.</p>
      <p>Diese Eigenschaften machen sie besonders wertvoll für hochwertige Kompressionsstrümpfe, medizinische Textilien und Schwimmbekleidung – überall dort, wo Garne extremen Belastungen ausgesetzt sind.</p>

      <h2>Investition in die Zukunft</h2>
      <p>Um diese Technologie optimal nutzen zu können, haben wir gezielt in 11 neue, hochmoderne Umwindemaschinen investiert. Diese Maschinen sind speziell auf die verarbeitungstechnischen Anforderungen der LYCRA® 962L Faser abgestimmt und ermöglichen eine Produktionsqualität, die in dieser Form in der DACH-Region bisher nicht verfügbar war.</p>
      <p>Für unsere Kunden bedeutet das: Zugang zu Garnen mit bisher unerreichten Qualitätsmerkmalen – und das aus einer Hand, vom ersten Gespräch bis zur Serienlieferung.</p>

      <h2>Partnerschaft mit The LYCRA Company</h2>
      <p>Die Partnerschaft mit The LYCRA Company ist für uns mehr als eine technische Zusammenarbeit. Sie steht für unser Selbstverständnis als Innovationsführer in einem traditionsreichen Umfeld. Wir zeigen, dass es auch als mittelständisches Familienunternehmen möglich ist, an der vordersten Front technologischer Entwicklungen zu stehen.</p>

      <blockquote>„Wir haben große Produktkompetenz und viele erfahrene Mitarbeiter – das birgt extremes Potenzial." – Bernd Grupp, Geschäftsführer</blockquote>

      <h2>Für unsere Kunden</h2>
      <p>Wenn Sie Interesse an LYCRA® 962L Garnen für Ihre Anwendungen haben oder mehr über die technischen Details erfahren möchten, sprechen Sie uns an. Wir beraten Sie gerne.</p>
    `,
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
    content: `
      <p>Nachhaltigkeit ist bei Lederer kein Marketingbegriff, sondern gelebte Unternehmensverantwortung. Mit der Zertifizierung nach dem Global Recycled Standard (GRS) machen wir jetzt auch offiziell sichtbar, was wir schon lange praktizieren.</p>

      <h2>Was bedeutet der GRS?</h2>
      <p>Der Global Recycled Standard ist ein internationaler Standard, der die Verwendung von recycelten Materialien in Produkten zertifiziert und die Lieferkette lückenlos nachweist. Er umfasst Sozial- und Umweltanforderungen an Produktionsstätten sowie Anforderungen an das Chemikalienmanagement.</p>
      <p>Die Zertifizierung gilt für Garne, bei denen ein definierter Anteil des Rohmaterials aus recycelten Quellen stammt – darunter Post-Consumer-Abfälle wie PET-Flaschen und Post-Industrial-Abfälle aus der Textilindustrie selbst.</p>

      <h2>Unser Nachhaltigkeitsweg</h2>
      <p>Die GRS-Zertifizierung ist Teil einer umfassenderen Nachhaltigkeitsstrategie: Wir beziehen rund 90 % unserer Rohstoffe aus Europa, betreiben eine eigene Photovoltaikanlage und haben unsere Produktion vollständig auf LED-Beleuchtung umgestellt. Seit 2018 sind wir zudem nach ISO 50001 für Energiemanagement zertifiziert.</p>

      <h2>Für unsere Kunden</h2>
      <p>Mit dem GRS-Zertifikat können unsere Kunden das RECYCLED Claim für ihre Produkte nutzen – ein zunehmend wichtiges Kaufargument für nachhaltigkeitsbewusste Endverbraucher. Sprechen Sie uns an, wenn Sie mehr über unsere recycelten Garnoptionen erfahren möchten.</p>
    `,
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
    content: `
      <p>Seit 2022 wird die Jörg Lederer GmbH von einem erfahrenen Dreiergespann geführt: Beatrice Lederer, Bernd Grupp und Jörg Lederer vereinen Kontinuität und frischen Wind – Tradition und Aufbruchsgeist in einem.</p>

      <h2>Beatrice Lederer – die dritte Generation</h2>
      <p>Beatrice Lederer ist als Tochter von Jörg Lederer in das Familienunternehmen eingetreten. Nach ihrer Ausbildung und beruflichen Stationen außerhalb des Unternehmens hat sie die Führungsverantwortung bewusst übernommen:</p>
      <blockquote>„Die Überlegung, im eigenen Familienunternehmen Verantwortung zu übernehmen, fühlte sich im Bauch einfach richtig an."</blockquote>
      <p>Sie bringt frische Perspektiven in Marketing, HR und Digitalisierung ein und ist das Gesicht des modernen Lederer nach außen.</p>

      <h2>Bernd Grupp – Erfahrung und Operative Exzellenz</h2>
      <p>Bernd Grupp verantwortet die operative und technische Seite des Unternehmens. Als langjähriger Kenner der Branche hat er maßgeblich zur technologischen Weiterentwicklung des Maschinenparks beigetragen:</p>
      <blockquote>„Wir haben große Produktkompetenz und viele erfahrene Mitarbeiter – das birgt extremes Potenzial."</blockquote>

      <h2>Gemeinsame Vision</h2>
      <p>Das Führungstrio verfolgt eine klare Strategie: Junge Führungskräfte nachziehen, in Technologie investieren und die emotionale Bindung aller Mitarbeiterinnen und Mitarbeiter erhalten – auch in wirtschaftlich herausfordernden Zeiten.</p>
      <p>Ein sichtbares Zeichen dieser Kultur: Die Zusammenführung von Produktion und Verwaltung in einer gemeinsamen Kantine, wo alle Beschäftigten täglich auf Augenhöhe miteinander in Kontakt treten.</p>
    `,
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
    content: `
      <p>Energieeffizienz ist für produzierende Unternehmen nicht nur eine ökologische, sondern auch eine ökonomische Notwendigkeit. Die Jörg Lederer GmbH hat sich dieser Aufgabe mit der Zertifizierung nach ISO 50001 gestellt.</p>

      <h2>Was ist ISO 50001?</h2>
      <p>ISO 50001 ist ein international anerkannter Standard für Energiemanagementsysteme. Er hilft Organisationen, Energie effizienter zu nutzen, Kosten zu senken und den CO₂-Ausstoß zu reduzieren. Der Standard verlangt einen systematischen Ansatz: Energieverbrauch messen, Ziele setzen, Maßnahmen umsetzen und die Ergebnisse regelmäßig überprüfen.</p>

      <h2>Unsere Maßnahmen</h2>
      <p>Die Zertifizierung ist kein Selbstzweck – sie dokumentiert echte Maßnahmen:</p>
      <ul>
        <li>Eigene Photovoltaikanlage auf dem Produktionsgebäude</li>
        <li>Vollständige Umstellung auf LED-Beleuchtung in der gesamten Produktion</li>
        <li>Kontinuierliches Energie-Monitoring aller Maschinen und Anlagen</li>
        <li>Regelmäßige interne Audits und Schulungen für Mitarbeiterinnen und Mitarbeiter</li>
      </ul>

      <h2>Langfristige Verpflichtung</h2>
      <p>Die ISO 50001-Zertifizierung ist für uns kein einmaliges Ereignis, sondern eine Selbstverpflichtung zur kontinuierlichen Verbesserung. Wir überprüfen unsere Energieziele jährlich und passen sie den neuesten Erkenntnissen und Technologien an.</p>
    `,
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
    content: `
      <p>Bei vielen Unternehmen gibt es eine unsichtbare Grenze zwischen Produktion und Verwaltung – unterschiedliche Aufenthaltsräume, verschiedene Rhythmen, wenig Berührungspunkte im Alltag. Wir haben diese Grenze 2022 bewusst aufgehoben.</p>

      <h2>Die Idee hinter dem Projekt</h2>
      <p>Im Rahmen der Neuorganisation des Unternehmens unter dem neuen Führungstrio wurde auch die Infrastruktur für die tägliche Kommunikation neu gedacht. Eine gemeinsame Kantine für alle 130 Mitarbeiterinnen und Mitarbeiter – von der Textilmacherin an der Maschine bis zur Buchhalterin im Büro.</p>

      <h2>Was das bedeutet</h2>
      <p>Wer täglich zusammen isst, spricht miteinander. Man lernt die Perspektive der anderen kennen, baut Verständnis auf und entwickelt einen stärkeren Zusammenhalt. In einer Branche, die mit demografischem Wandel und Fachkräftemangel kämpft, ist dieses Kapital – gelebte Unternehmenskultur – entscheidend.</p>

      <blockquote>„Wir verfolgen weiter stringent unsere Strategie, werden junge Führungskräfte nachziehen und im Zusammenspiel mit unseren langjährigen Mitarbeitenden die Zukunftsfähigkeit des Unternehmens sichern." – Beatrice Lederer & Bernd Grupp</blockquote>
    `,
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
    content: `
      <p>Textiltechnologie ist eine Zukunftsbranche – trotz oder gerade wegen ihres traditionsreichen Charakters. Hochwertige Garne werden in medizinischen Anwendungen, Funktionssportbekleidung und technischen Textilien eingesetzt, deren Nachfrage stetig wächst. Wer heute eine Ausbildung in der Textilbranche absolviert, hat ausgezeichnete Perspektiven.</p>

      <h2>Die Ausbildung bei Lederer</h2>
      <p>Eine Ausbildung zum Textiltechnologen / zur Textiltechnologin bei Lederer verbindet klassisches Handwerk mit modernster Technologie. Unsere Auszubildenden lernen:</p>
      <ul>
        <li>Die Funktion und Einrichtung moderner Garnumwinde- und Luftverwirbelungsmaschinen</li>
        <li>Qualitätsprüfung nach DIN-Normen im hauseigenen Labor</li>
        <li>Grundlagen der Rohstoffkunde und Garncharakteristik</li>
        <li>Produktionsplanung und Prozessoptimierung</li>
        <li>Betriebswirtschaftliche Grundlagen und Kundenorientierung</li>
      </ul>

      <h2>Was wir bieten</h2>
      <p>Als Ausbildungsbetrieb legen wir großen Wert auf eine persönliche Betreuung. Jede:r Auszubildende hat eine:n feste:n Ausbilder:in, der/die begleitet, erklärt und fördert. Überdurchschnittliche Leistungen werden gefördert und belohnt – gute Auszubildende haben bei uns eine echte Übernahmeperspektive.</p>

      <h2>Bewerben</h2>
      <p>Wir freuen uns auf Ihre Bewerbung! Senden Sie Unterlagen mit Lebenslauf und letzten Zeugnissen an: bewerbung@lederer-elastic.de</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
}

export function getRecentPosts(limit = 3, excludeSlug?: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== excludeSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function formatPostDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
