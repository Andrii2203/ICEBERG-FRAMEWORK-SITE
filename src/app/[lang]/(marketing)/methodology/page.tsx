import React from "react";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { Shield, Layers, Box } from "lucide-react";
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
        "methodology",
        dict.methodology.title,
        dict.methodology.subtitle
    );
}

export default async function MethodologyPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const icons = [
        <Shield key="0" className={styles.layerIcon} />,
        <Layers key="1" className={styles.layerIcon} />,
        <Box key="2" className={styles.layerIcon} />,
    ];

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>{dict.methodology.title}</h1>
                <p className={styles.subtitle}>{dict.methodology.subtitle}</p>
            </header>

            <section className={styles.section}>
                {Object.entries(dict.methodology.layers).map(
                    ([key, layer]: [
                        string,
                        { name: string; type: string; description: string }
                    ]) => {
                        const idx = Object.keys(dict.methodology.layers).indexOf(key);
                        return (
                            <div key={key} className={styles.row}>
                                <div className={styles.iconCol}>
                                    <div className={styles.iconCircle}>
                                        {icons[idx]}
                                    </div>
                                </div>

                                <div className={styles.contentCol}>
                                    <span className={styles.layerNum}>
                                        0{idx + 1}
                                    </span>
                                    <div className={styles.layerContent}>
                                        <p className={styles.layerType}>
                                            {layer.type}
                                        </p>
                                        <h2 className={styles.layerName}>
                                            {layer.name}
                                        </h2>
                                        <p className={styles.layerDesc}>
                                            {layer.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </section>

            <div className={styles.flowBox}>
                <p className={styles.flowLabel}>System Logic Flow</p>
                <div className={styles.flowItems}>
                    <span className={styles.flowText}>Layer 1</span>
                    <div className={styles.flowLine} />
                    <span className={styles.flowText}>Layer 2</span>
                    <div className={styles.flowLine} />
                    <span className={styles.flowText}>Layer 3</span>
                </div>
            </div>
        </div>
    );
}
