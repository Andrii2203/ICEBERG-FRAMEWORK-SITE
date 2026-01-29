import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { IcebergHero } from "@/features/hero/ui/IcebergHero";
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
    return generatePageMetadata(lang, "", dict.common.title, dict.common.tagline);
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className={styles.main}>
            <IcebergHero dict={dict} />

            {/* Next sections will follow here*/}
        </main>
    );
}








