import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import {
    ClipboardList,
    FastForward,
    Play,
    ShieldCheck,
} from "lucide-react";
import { generatePageMetadata } from "@/shared/utils/seo/generatePageMetadata";
import type { Metadata } from "next";
import React from "react";
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
        "protocols",
        dict.protocols.title,
        dict.protocols.subtitle
    );
}

export default async function ProtocolsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const icons = {
        planning: <ClipboardList className={styles.cardIcon} />,
        migration: <FastForward className={styles.cardIcon} />,
        execution: <Play className={styles.cardIcon} />,
        validation: <ShieldCheck className={styles.cardIcon} />,
    };

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>{dict.protocols.title}</h1>
                <p className={styles.subtitle}>{dict.protocols.subtitle}</p>
            </header>

            <p className={styles.description}>
                {dict.protocols.description}
            </p>

            <div className={styles.grid}>
                {Object.entries(dict.protocols.list).map(
                    ([key, label]: [string, string]) => {
                        const idx =
                            Object.keys(dict.protocols.list).indexOf(key) + 1;
                        return (
                            <div key={key} className={styles.card}>
                                <div className={styles.cardInner}>
                                    <div className={styles.cardIconWrap}>
                                        {icons[key as keyof typeof icons]}
                                    </div>
                                    <div>
                                        <div className={styles.cardMeta}>
                                            Protocol 0{idx}
                                        </div>
                                        <h3 className={styles.cardTitle}>
                                            {label}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>

            <div className={styles.quote}>
                &quot;Standardization is the prerequisite for predictable
                outcome.&quot;
            </div>
        </div>
    );
}
