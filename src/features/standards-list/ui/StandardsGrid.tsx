import React from "react";
import {
    FileCode,
    Globe,
    Search,
    Accessibility,
    Smartphone,
    Zap,
} from "lucide-react";
import styles from "./StandardsGrid.module.scss";

interface StandardsGridProps {
    list: {
        architecture: string;
        quality: string;
        seo: string;
        a11y: string;
        pwa: string;
        api: string;
    };
}

export const StandardsGrid = ({ list }: StandardsGridProps) => {
    const icons = {
        architecture: <FileCode className={styles.icon} />,
        quality: <Globe className={styles.icon} />,
        seo: <Search className={styles.icon} />,
        a11y: <Accessibility className={styles.icon} />,
        pwa: <Smartphone className={styles.icon} />,
        api: <Zap className={styles.icon} />,
    };

    return (
        <div className={styles.grid}>
            {Object.entries(list).map(([key, label]) => (
                <div key={key} className={styles.card}>
                    <div className={styles.iconWrap}>
                        {icons[key as keyof typeof icons]}
                    </div>
                    <h3 className={styles.title}>{label}</h3>
                    <div className={styles.line} />
                </div>
            ))}
        </div>
    );
};
