export default function DatenschutzPage() {
  return (
    <div className="bg-cream py-[var(--space-3xl)]">
      <div className="container-fluid max-w-[65ch]">
        <h1 className="mb-[var(--space-xl)] font-heading text-[var(--text-4xl)] font-black text-dark-deep">
          Datenschutzerklärung
        </h1>

        <div className="space-y-[var(--space-lg)] font-body text-[var(--text-base)] leading-relaxed text-dark">
          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="mb-2 font-heading text-[var(--text-lg)] font-semibold text-dark-deep">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              2. Allgemeine Hinweise und Pflichtinformationen
            </h2>
            <h3 className="mb-2 font-heading text-[var(--text-lg)] font-semibold text-dark-deep">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
              behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <h3 className="mb-2 mt-4 font-heading text-[var(--text-lg)] font-semibold text-dark-deep">
              Verantwortliche Stelle
            </h3>
            <address className="not-italic">
              Jörg Lederer GmbH<br />
              Hauptstraße 115<br />
              73340 Amstetten<br />
              E-Mail:{" "}
              <a href="mailto:info@lederer-elastic.de" className="text-red hover:underline">
                info@lederer-elastic.de
              </a>
            </address>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              3. Datenerfassung auf dieser Website
            </h2>
            <h3 className="mb-2 font-heading text-[var(--text-lg)] font-semibold text-dark-deep">Cookies</h3>
            <p>
              Unsere Website verwendet Cookies. Soweit diese Cookies technisch notwendig sind, werden
              sie ohne Ihre Einwilligung gesetzt (Art. 6 Abs. 1 lit. f DSGVO). Für alle anderen Cookies
              holen wir Ihre Einwilligung ein.
            </p>
            <h3 className="mb-2 mt-4 font-heading text-[var(--text-lg)] font-semibold text-dark-deep">
              Server-Log-Dateien
            </h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in
              Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und
              Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden
              Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
            </p>
            <h3 className="mb-2 mt-4 font-heading text-[var(--text-lg)] font-semibold text-dark-deep">
              Kontaktformular
            </h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
              wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              4. Analyse-Tools und Werbung
            </h2>
            <p>
              Wir verwenden Google Analytics und Vercel Analytics nur nach Ihrer ausdrücklichen
              Einwilligung (Cookie Consent). Die Daten werden anonymisiert verarbeitet und nach 14
              Monaten gelöscht. IP-Adressen werden vor der Übermittlung anonymisiert.
            </p>
          </section>

          <section>
            <h2 className="mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              5. Ihre Rechte
            </h2>
            <p>Sie haben jederzeit das Recht auf:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Zur Ausübung Ihrer Rechte wenden Sie sich an:{" "}
              <a href="mailto:info@lederer-elastic.de" className="text-red hover:underline">
                info@lederer-elastic.de
              </a>
            </p>
            <p className="mt-2">
              Ferner haben Sie das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren.
              Zuständig ist der Landesbeauftragte für Datenschutz und Informationsfreiheit
              Baden-Württemberg.
            </p>
          </section>

          <p className="mt-[var(--space-xl)] border-t border-gray-200 pt-[var(--space-lg)] font-body text-[var(--text-sm)] text-gray-400">
            Stand: April 2026
          </p>
        </div>
      </div>
    </div>
  );
}
