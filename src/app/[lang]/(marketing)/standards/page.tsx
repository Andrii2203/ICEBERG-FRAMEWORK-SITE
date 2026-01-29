import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { StandardsGrid } from "@/features/standards-list/ui/StandardsGrid";
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
        "standards",
        dict.standards.title,
        dict.standards.description
    );
}

export default async function StandardsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);



    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>{dict.standards.title}</h1>
                <p className={styles.subtitle}>{dict.standards.subtitle}</p>
            </header>

            <p className={styles.description}>{dict.standards.description}</p>

            <StandardsGrid list={dict.standards.list} />
        </div>
    );
}








