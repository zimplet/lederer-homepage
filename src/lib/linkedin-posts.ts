// Hand-picked LinkedIn posts for the homepage, newest first.
// `date` is the publish date (ISO); the URLs carry no tracking parameters.
// `excerpt` is the verbatim start of the post, without emojis and hashtag marks.
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
    excerpt: "Starke Produkte entstehen durch starke Partnerschaften. Auf den PERFORMANCE DAYS in München nutzten wir die Gelegenheit, uns mit unseren Partnern von Lenzing Group und Peter Müller GmbH - innovative knitting solutions persönlich auszutauschen, um die nächsten Schritte unseres gemeinsamen Projekts zu besprechen: die Entwicklung einer biologisch abbaubaren Kniebandage …"
  },
  {
    url: "https://www.linkedin.com/posts/lederer-elastic-yarns_techtextil-textilbranche-vielseitigkeit-activity-7455147964043247618-i2BE",
    date: "2026-04-29",
    excerpt: "Zurück von der Techtextil – mit vielen Eindrücken, spannenden Gesprächen und klaren Signalen für die Zukunft. Ein großes Dankeschön an das Team von Baden-Württemberg International (BW_i) für die hervorragende Organisation des Gemeinschaftsstandes und an die Messe Frankfurt GmbH dafür, dass sie eine so wertvolle Plattform für die Textilbranche schafft."
  },
  {
    url: "https://www.linkedin.com/posts/lederer-elastic-yarns_techtextil-umwindegarne-techtextil-activity-7449713286453002240-1Qvt",
    date: "2026-04-14",
    excerpt: "Der Countdown läuft! Kommende Woche startet die Techtextil in Frankfurt – und wir stecken mitten in den finalen Vorbereitungen. Muster werden vorbereitet, Gespräche geplant und die neuesten Entwicklungen im Bereich Umwindegarne stehen bereit."
  }
];
