import { getDictionary, SupportedLanguage } from "@/infrastructure/i18n/dictionaries";
import { AuditClient } from "@/features/audit/ui/AuditClient";
import { AuditShowcase } from "@/features/audit/ui/AuditShowcase";
import { generatePageMetadata } from "@/shared/utils/seo/generatePageMetadata";
import type { Metadata } from "next";
import path from "path";
import { promises as fs } from "fs";
import styles from "./page.module.scss";

async function getCaseStudyFiles() {
    const docsPath = path.join(process.cwd(), "docs", "ICEBERG_AUDIT_1769538584665");
    const filenames = [
        "SUMMARY.md",
        "UI_UX_AUDIT.md",
        "COMPONENT_MAP.md",
        "UX_HEURISTICS.md",
        "VISUAL_HIERARCHY.md",
        "audit.json"
    ];

    const files: Record<string, string> = {};
    for (const name of filenames) {
        try {
            const content = await fs.readFile(path.join(docsPath, name), "utf-8");
            files[name] = content;
        } catch (error) {
            console.error(`[AuditPage] Failed to read ${name}:`, error);
            files[name] = `# Error\nFailed to load ${name}`;
        }
    }
    return files;
}

export async function generateMetadata(
    { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as SupportedLanguage);
    return generatePageMetadata(
        lang,
        "audit",
        dict.audit.title,
        dict.audit.description
    );
}

export default async function AuditPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as SupportedLanguage);
    const caseStudyFiles = await getCaseStudyFiles();

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <AuditClient featureDict={dict.audit} />
                <AuditShowcase caseStudyFiles={caseStudyFiles} />
            </div>
        </section>
    );
}








