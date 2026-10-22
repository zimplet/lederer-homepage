// Hand-picked LinkedIn posts for the homepage, newest first.
// `date` is the publish date (ISO); the URLs carry no tracking parameters.
// ponytail: static list, move to Sanity if editors should maintain it.
export interface LinkedInPost {
  url: string;
  date: string;
  excerpt: string;
}

export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    url: "https://www.linkedin.com/posts/lederer-elastic-yarns_performancedays-innovation-sustainability-activity-7518235054611935232-Qgo5",
    date: "2026-10-20",
    excerpt:
      "Starke Produkte entstehen durch starke Partnerschaften: Auf den PERFORMANCE DAYS in München haben wir mit der Lenzing Group und der Peter Müller GmbH die nächsten Schritte für unsere gemeinsame, biologisch abbaubare Kniebandage besprochen.",
  },
  {
    url: "https://www.linkedin.com/posts/lederer-elastic-yarns_techtextil-textilbranche-vielseitigkeit-activity-7455147964043247618-i2BE",
    date: "2026-04-29",
    excerpt:
      "Zurück von der Techtextil – mit vielen Eindrücken und guten Gesprächen. Der Markt entwickelt sich dynamisch, vor allem bei funktionalen Textilien. Danke an Baden-Württemberg International und die Messe Frankfurt.",
  },
  {
    url: "https://www.linkedin.com/posts/lederer-elastic-yarns_techtextil-umwindegarne-techtextil-activity-7449713286453002240-1Qvt",
    date: "2026-04-14",
    excerpt:
      "Nächste Woche startet die Techtextil in Frankfurt. Wir zeigen Neuheiten bei umwundenen elastischen Garnen – Halle 12.1, Stand D81, am Gemeinschaftsstand von Baden-Württemberg International. Termine gern vorab vereinbaren.",
  },
];
