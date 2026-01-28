import { getDictionary, SupportedLanguage } from "@/infrastructure/i18n/dictionaries";
import { CleanPageLayout } from "@/shared/ui/layout/CleanPageLayout";
import { AuditClient } from "@/features/audit/ui/AuditClient";
import { AuditShowcase } from "@/features/audit/ui/AuditShowcase";
import { generatePageMetadata } from "@/shared/utils/seo/generatePageMetadata";
import type { Metadata } from "next";

import path from "path";
import { promises as fs } from "fs";

interface AuditPageProps {
    params: { lang: string };
}

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

export async function generateMetadata({
    params,
}: AuditPageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as SupportedLanguage);
    return generatePageMetadata(
        lang,
        "audit",
        dict.audit.title,
        dict.audit.description
    );
}

export default async function AuditPage({ params }: AuditPageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as SupportedLanguage);
    const caseStudyFiles = await getCaseStudyFiles();

    return (
        <CleanPageLayout lang={lang} dict={dict}>
            <section className="min-h-screen pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto flex flex-col gap-20">
                    <AuditClient featureDict={dict.audit} />
                    <AuditShowcase caseStudyFiles={caseStudyFiles} />
                </div>
            </section>
        </CleanPageLayout>
    );
}
