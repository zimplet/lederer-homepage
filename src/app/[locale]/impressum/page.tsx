export default function ImpressumPage() {
  return (
    <div className="bg-cream py-[var(--space-3xl)]">
      <div className="container-fluid max-w-[65ch]">
        <h1 className="mb-[var(--space-xl)] font-heading text-[var(--text-4xl)] font-black text-dark-deep">
          Impressum
        </h1>

        <div className="space-y-[var(--space-lg)] font-body text-[var(--text-base)] leading-relaxed text-dark">
          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              Angaben gemäß § 5 TMG
            </h2>
            <address className="not-italic">
              <strong>Jörg Lederer GmbH</strong><br />
              Hauptstraße 115<br />
              73340 Amstetten<br />
              Deutschland
            </address>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              Kontakt
            </h2>
            <p>
              Telefon: <a href="tel:+497331200060" className="text-red hover:underline">+49 (0) 7331 2006-0</a><br />
              Telefax: +49 (0) 7331 2006-29<br />
              E-Mail: <a href="mailto:info@lederer-elastic.de" className="text-red hover:underline">info@lederer-elastic.de</a>
            </p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              Handelsregister
            </h2>
            <p>
              Registergericht: Amtsgericht Ulm<br />
              Registernummer: HRB 720534
            </p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              Umsatzsteuer-ID
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
              DE 145 887 282
            </p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              Geschäftsführung
            </h2>
            <p>Beatrice Lederer, Bernd Grupp, Jörg Lederer</p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Beatrice Lederer<br />
              Hauptstraße 115<br />
              73340 Amstetten
            </p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen.
            </p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
