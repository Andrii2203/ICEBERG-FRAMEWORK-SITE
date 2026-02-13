import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { StandardsGrid } from "@/features/standards-list/ui/StandardsGrid";
import { generatePageMetadata } from "@/shared/utils/seo/generatePageMetadata";
import type { Metadata } from "next";
import React from 'react';

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

import { generateSchema } from "@/shared/utils/seo";

export default async function StandardsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const jsonLd = generateSchema.breadcrumbs(lang, [
        { name: dict.common.title, url: "" },
        { name: dict.nav.standards, url: "/standards" },
    ]);

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <header className="mb-16">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-brand mb-4">
                    {dict.standards.title}
                </h1>
                <p className="text-xl text-accent-brand font-mono uppercase tracking-widest">
                    {dict.standards.subtitle}
                </p>
            </header>

            <p className="text-2xl text-text-brand/80 leading-relaxed mb-16 max-w-3xl">
                {dict.standards.description}
            </p>

            <StandardsGrid list={dict.standards.list} />
        </main>
    );
}








