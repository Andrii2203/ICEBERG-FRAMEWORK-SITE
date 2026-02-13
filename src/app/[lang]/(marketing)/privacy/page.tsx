
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { generatePageMetadata } from "@/shared/utils/seo/generatePageMetadata";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return generatePageMetadata(
        lang,
        "privacy",
        dict.legal.privacy.title,
        "Iceberg OS Privacy Policy"
    );
}

import { generateSchema } from "@/shared/utils/seo";

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const jsonLd = generateSchema.breadcrumbs(lang, [
        { name: dict.common.title, url: "" },
        { name: dict.legal.privacy.title, url: "/privacy" },
    ]);

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <header className="mb-20">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-brand mb-4">
                    {dict.legal.privacy.title}
                </h1>
                <p className="text-sm font-mono text-text-brand/40 uppercase tracking-widest">
                    Last Updated: {dict.legal.privacy.lastUpdated}
                </p>
            </header>

            <div className="space-y-16">
                {dict.legal.privacy.sections.map((section: { title: string; content: string }, idx: number) => (
                    <section key={idx} className="relative">
                        <div className="absolute -left-12 top-0 text-accent-brand/20 font-mono text-4xl font-black select-none">
                            {idx + 1}
                        </div>
                        <h2 className="text-2xl font-bold text-text-brand mb-6">{section.title}</h2>
                        <div className="text-text-brand/60 leading-relaxed text-lg max-w-3xl">
                            {section.content}
                        </div>
                    </section>
                ))}
            </div>

            <footer className="mt-32 pt-12 border-t border-border-brand/10 text-center">
                <p className="text-text-brand/40 text-sm">
                    For privacy inquiries: <a href="https://www.linkedin.com/in/andrii-shavel-976485187/" target="_blank" rel="noopener noreferrer" className="text-accent-brand hover:underline">LinkedIn Profile</a>
                </p>
            </footer>
        </main>
    );
}
