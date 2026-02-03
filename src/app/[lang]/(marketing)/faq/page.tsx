
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
        "faq",
        dict.legal.faq.title,
        dict.legal.faq.subtitle
    );
}

export default async function FAQPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-4xl mx-auto">
            <header className="mb-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-brand mb-6">
                    {dict.legal.faq.title}
                </h1>
                <p className="text-xl text-text-brand/60 uppercase tracking-widest font-mono">
                    {dict.legal.faq.subtitle}
                </p>
            </header>

            <div className="space-y-6">
                {dict.legal.faq.items.map((item: { q: string; a: string }, idx: number) => (
                    <div
                        key={idx}
                        className="p-8 rounded-3xl border border-border-brand/20 bg-surface-brand/40 backdrop-blur-xl transition-all hover:border-accent-brand/30 group"
                    >
                        <h3 className="text-xl font-bold text-text-brand mb-4 group-hover:text-accent-brand transition-colors">
                            {item.q}
                        </h3>
                        <p className="text-text-brand/60 leading-relaxed">
                            {item.a}
                        </p>
                    </div>
                ))}
            </div>

            <footer className="mt-20 p-12 rounded-3xl bg-accent-brand/[0.03] border border-accent-brand/10 text-center">
                <p className="text-text-brand/60 mb-6">Still have questions?</p>
                <a
                    href="https://www.linkedin.com/in/andrii-shavel-976485187/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-bold text-accent-brand hover:underline underline-offset-8"
                >
                    LinkedIn Profile
                </a>
            </footer>
        </main>
    );
}
