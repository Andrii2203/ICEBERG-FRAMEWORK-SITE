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
        "philosophy",
        dict.philosophy.title,
        dict.philosophy.subtitle
    );
}

import { generateSchema } from "@/shared/utils/seo";

export default async function PhilosophyPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const jsonLd = generateSchema.breadcrumbs(lang, [
        { name: dict.common.title, url: "" },
        { name: dict.nav.philosophy, url: "/philosophy" },
    ]);

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-5xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <header className="mb-16">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-brand mb-4">
                    {dict.philosophy.title}
                </h1>
                <p className="text-xl text-accent-brand font-mono uppercase tracking-widest">
                    {dict.philosophy.subtitle}
                </p>
            </header>

            <section className="mb-20">
                <p className="text-2xl text-text-brand/80 leading-relaxed mb-12 border-l-4 border-border-brand pl-8">
                    {dict.philosophy.intro}
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(dict.philosophy.principles).map(([key, principle]: [string, { title: string; text: string }]) => (
                        <div
                            key={key}
                            className="p-8 rounded-xl border border-border-brand/30 bg-surface-brand/40 backdrop-blur-sm group hover:border-accent-brand/50 transition-colors"
                        >
                            <h3 className="text-text-brand text-xl font-bold mb-4 group-hover:text-accent-brand transition-colors">
                                {principle.title}
                            </h3>
                            <p className="text-text-brand/60 group-hover:text-text-brand/80 transition-colors leading-relaxed">
                                {principle.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Philosophy Illustration / Decoration */}
            <div className="relative h-64 w-full rounded-2xl border border-border-brand/20 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-border-brand/5" />
                <div className="text-border-brand font-mono text-sm uppercase tracking-[1em]">Predictability · Structure · Flow</div>
            </div>
        </main>
    );
}








