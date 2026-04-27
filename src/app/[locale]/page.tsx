import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Hero");

  return (
    <main>
      <section className="min-h-screen flex items-center justify-center">
        <div className="container-fluid text-center">
          <h1 className="mb-[var(--space-md)]">{t("title")}</h1>
          <p className="mx-auto text-gray-500">{t("subtitle")}</p>
        </div>
      </section>
    </main>
  );
}
