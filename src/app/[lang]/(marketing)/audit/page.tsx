import { getDictionary, SupportedLanguage } from "@/infrastructure/i18n/dictionaries";
import { CleanPageLayout } from "@/shared/ui/layout/CleanPageLayout";
import { AuditClient } from "@/features/audit/ui/AuditClient";
import { AuditShowcase } from "@/features/audit/ui/AuditShowcase";
import { generatePageMetadata } from "@/shared/utils/seo/generatePageMetadata";
import type { Metadata } from "next";

import path from "path";
import { promises as fs } from "fs";

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

async function getPrivacyPolicy() {
    const filePath = path.join(process.cwd(), "docs", "PRIVACY_POLICY.md");
    try {
        return await fs.readFile(filePath, "utf-8");
    } catch (error) {
        console.error("[AuditPage] Failed to read Privacy Policy:", error);
        return "";
    }
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
    const privacyPolicy = await getPrivacyPolicy();

    return (
        <CleanPageLayout lang={lang} dict={dict}>
            <section className="min-h-screen pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto flex flex-col gap-20">
                    <AuditClient featureDict={dict.audit} privacyPolicy={privacyPolicy} />
                    <AuditShowcase caseStudyFiles={caseStudyFiles} />
                </div>
            </section>
        </CleanPageLayout>
    );
}








