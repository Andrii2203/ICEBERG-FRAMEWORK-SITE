
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
        "tos",
        dict.legal.tos.title,
        "Iceberg OS Terms of Service"
    );
}

export default async function TOSPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto">
            <header className="mb-20">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-brand mb-4">
                    {dict.legal.tos.title}
                </h1>
                <p className="text-sm font-mono text-text-brand/40 uppercase tracking-widest">
                    Last Updated: {dict.legal.tos.lastUpdated}
                </p>
            </header>

            <div className="space-y-16">
                {dict.legal.tos.sections.map((section: { title: string; content: string }, idx: number) => (
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

            <div className="mt-32 p-12 rounded-[40px] border border-border-brand/20 bg-grid-border-brand/5">
                <p className="text-text-brand/40 text-sm font-mono leading-relaxed">
                    By purchasing or downloading Iceberg OS products, you acknowledge that you have read,
                    understood, and agreed to be bound by these Terms of Service.
                </p>
            </div>
        </main>
    );
}
