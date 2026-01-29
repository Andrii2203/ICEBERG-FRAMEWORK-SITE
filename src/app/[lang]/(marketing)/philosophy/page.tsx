import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { generatePageMetadata } from "@/shared/utils/seo/generatePageMetadata";
import type { Metadata } from "next";
import styles from "./page.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return generatePageMetadata(
    lang,
    "philosophy",
    dict.philosophy.title,
    dict.philosophy.subtitle,
  );
}

export default async function PhilosophyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>{dict.philosophy.title}</h1>
        <p className={styles.subtitle}>{dict.philosophy.subtitle}</p>
      </header>

      <section>
        <p className={styles.intro}>{dict.philosophy.intro}</p>

        <div className={styles.grid}>
          {Object.entries(dict.philosophy.principles).map(
            ([key, principle]: [string, { title: string; text: string }]) => (
              <div key={key} className={styles.card}>
                <h3 className={styles.cardTitle}>{principle.title}</h3>
                <p className={styles.cardText}>{principle.text}</p>
              </div>
            ),
          )}
        </div>
      </section>

      <div className={styles.illustration}>
        <div className={styles.illustrationBg} />
        <div className={styles.illustrationText}>
          Predictability · Structure · Flow
        </div>
      </div>
    </div>
  );
}
