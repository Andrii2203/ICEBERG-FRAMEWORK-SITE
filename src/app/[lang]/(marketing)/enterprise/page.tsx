
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { generatePageMetadata } from "@/shared/utils/seo/generatePageMetadata";
import { StripeCheckoutButton } from "@/features/payments/ui/StripeCheckoutButton";
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
        "enterprise",
        dict.enterprise.title,
        dict.enterprise.description
    );
}

export default async function EnterprisePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen pt-24 md:pt-40 pb-20 px-6 max-w-6xl mx-auto">
            {/* Section: Header */}
            <div className="mb-24 text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-brand mb-8">
                    {dict.enterprise.title}
                </h1>
                <p className="text-xl md:text-2xl text-text-brand/60 max-w-3xl mx-auto leading-relaxed">
                    {dict.enterprise.description}
                </p>
            </div>

            {/* Problem/Solution Pitch */}
            <section className="grid md:grid-cols-2 gap-12 mb-32 items-center">
                <div className="p-12 rounded-3xl bg-red-500/5 border border-red-500/10 backdrop-blur-sm">
                    <h3 className="text-red-500 font-mono uppercase tracking-widest text-sm mb-4">The Problem</h3>
                    <p className="text-3xl font-bold text-text-brand/90 leading-tight">
                        {dict.enterprise.pitch.problem}
                    </p>
                </div>
                <div className="p-12 rounded-3xl bg-accent-brand/5 border border-accent-brand/10 backdrop-blur-sm">
                    <h3 className="text-accent-brand font-mono uppercase tracking-widest text-sm mb-4">The Solution</h3>
                    <p className="text-3xl font-bold text-text-brand/90 leading-tight">
                        {dict.enterprise.pitch.solution}
                    </p>
                </div>
            </section>

            {/* Pricing Tiers */}
            <section className="grid md:grid-cols-2 gap-12 mb-32">
                {/* Agency Tier */}
                <div className="p-12 rounded-[40px] border border-border-brand/30 bg-surface-brand/40 backdrop-blur-xl relative overflow-hidden group hover:border-accent-brand/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                        <div className="text-9xl font-black">50+</div>
                    </div>

                    <h2 className="text-4xl font-bold text-text-brand mb-2">{dict.enterprise.tiers.agency.name}</h2>
                    <p className="text-5xl font-bold text-accent-brand mb-12">{dict.enterprise.tiers.agency.price}</p>

                    <ul className="space-y-6 mb-12">
                        {dict.enterprise.tiers.agency.features.map((feature: string) => (
                            <li key={feature} className="flex items-center gap-4 text-lg text-text-brand/70 border-b border-border-brand/10 pb-4">
                                <div className="w-2 h-2 rounded-full bg-accent-brand" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <StripeCheckoutButton
                        product="agency"
                        label={dict.enterprise.cta_agency}
                        className="w-full bg-accent-brand text-black font-black uppercase tracking-widest hover:scale-[1.02] transition-all"
                    />
                </div>

                {/* Enterprise Tier */}
                <div className="p-12 rounded-[40px] border border-border-brand/30 bg-transparent backdrop-blur-sm flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-text-brand mb-2">{dict.enterprise.tiers.enterprise.name}</h2>
                        <p className="text-5xl font-bold text-text-brand/40 mb-12">{dict.enterprise.tiers.enterprise.price}</p>

                        <ul className="space-y-6 mb-12">
                            {dict.enterprise.tiers.enterprise.features.map((feature: string) => (
                                <li key={feature} className="flex items-center gap-4 text-lg text-text-brand/50 border-b border-border-brand/10 pb-4">
                                    <div className="w-2 h-2 rounded-full bg-border-brand" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <a
                        href="https://www.linkedin.com/in/andrii-shavel-976485187/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 px-8 rounded-full border border-border-brand text-text-brand font-bold text-center hover:bg-surface-brand/20 transition-all"
                    >
                        {dict.enterprise.cta_contact}
                    </a>
                </div>
            </section>
        </main>
    );
}
