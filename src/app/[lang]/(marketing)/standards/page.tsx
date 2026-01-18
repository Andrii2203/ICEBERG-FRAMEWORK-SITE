import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { StandardsGrid } from "@/features/standards-list/ui/StandardsGrid";
import React from 'react';

export default async function StandardsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);



    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto">
            <header className="mb-16">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#F8FAFC] mb-4">
                    {dict.standards.title}
                </h1>
                <p className="text-xl text-[#38BDF8] font-mono uppercase tracking-widest">
                    {dict.standards.subtitle}
                </p>
            </header>

            <p className="text-2xl text-[#CBD5E1] leading-relaxed mb-16 max-w-3xl">
                {dict.standards.description}
            </p>

            <StandardsGrid list={dict.standards.list} />
        </main>
    );
}
