import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { Cpu, Database, CheckCircle } from "lucide-react";
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
        "enterprise",
        dict.enterprise.title,
        dict.enterprise.subtitle
    );
}

export default async function EnterprisePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const icons = {
        executor: <Cpu className={styles.icon} />,
        memory: <Database className={styles.icon} />,
        validation: <CheckCircle className={styles.icon} />,
    };

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>{dict.enterprise.title}</h1>
                <p className={styles.subtitle}>{dict.enterprise.subtitle}</p>
            </header>

            <div className={styles.grid}>
                {Object.entries(dict.enterprise.modules).map(([key, label]: [string, string]) => (
                    <div key={key} className={styles.card}>
                        <div className={styles.iconWrap}>
                            {icons[key as keyof typeof icons]}
                        </div>
                        <h3 className={styles.cardTitle}>{label}</h3>
                        <div className={styles.line} />
                    </div>
                ))}
            </div>

            <div className={styles.ctaSection}>
                <div className={styles.ctaBg} />
                <h2 className={styles.ctaTitle}>Ready for Enterprise Governance?</h2>
                <p className={styles.ctaDesc}>
                    The Iceberg Enterprise suite provides the necessary guardrails and
                    tools for large-scale AI implementation.
                </p>
                <a
                    href="https://www.linkedin.com/in/andrii-shavel-976485187/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaButton}
                >
                    Contact Sales
                </a>
            </div>
        </div>
    );
}
