
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
        "solo-pack",
        dict.solo.title,
        dict.solo.description
    );
}

export default async function SoloPackPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen pt-24 md:pt-40 pb-20 px-6 max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="flex flex-col items-center text-center mb-24">
                <div className="inline-block px-4 py-1 mb-6 rounded-full border border-accent-brand/30 bg-accent-brand/5 text-accent-brand text-sm font-mono uppercase tracking-widest">
                    Available Now
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-brand mb-8 max-w-4xl">
                    {dict.solo.title}
                </h1>
                <p className="text-xl md:text-2xl text-text-brand/60 max-w-2xl leading-relaxed mb-12">
                    {dict.solo.description}
                </p>
                <StripeCheckoutButton
                    product="solo"
                    label={dict.solo.cta}
                    className="bg-accent-brand text-background-brand shadow-[0_0_40px_rgba(var(--accent-brand),0.3)] hover:shadow-[0_0_60px_rgba(var(--accent-brand),0.5)]"
                />
            </div>

            {/* Benefits Grid */}
            <section className="mb-32">
                <h2 className="text-3xl font-bold text-text-brand mb-12 text-center">{dict.solo.benefits.title}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(dict.solo.benefits).filter(([key]) => key !== 'title').map(([key, value]) => (
                        <div key={key} className="p-8 rounded-2xl border border-border-brand/30 bg-surface-brand/40 backdrop-blur-md">
                            <div className="text-accent-brand mb-4 font-mono text-sm uppercase">Feature</div>
                            <p className="text-text-brand font-bold text-lg">{value as string}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Setup Guide */}
            <section className="mb-32 p-12 rounded-3xl border border-border-brand/20 bg-grid-border-brand/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <div className="text-8xl font-black">YAML</div>
                </div>

                <h2 className="text-3xl font-bold text-text-brand mb-12">{dict.solo.setup.title}</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {['step1', 'step2', 'step3', 'step4'].map((stepKey, idx) => (
                            <div key={stepKey} className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-brand text-background-brand flex items-center justify-center font-bold">
                                    {idx + 1}
                                </div>
                                <div>
                                    <p className="text-text-brand font-medium text-lg leading-tight">
                                        {(dict.solo.setup as Record<string, string>)[stepKey]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-2xl border border-border-brand/30 bg-background-brand p-6 font-mono text-sm text-text-brand/50 shadow-2xl">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <p className="text-accent-brand mb-2">{`// Copy into System Prompt`}</p>
                        <p className="mb-1">iceberg_mode: active</p>
                        <p className="mb-1">determinism: 100%</p>
                        <p className="mb-1">standard_v: 1.0</p>
                        <p className="mb-1 text-text-brand/30">...</p>
                        <p className="mt-4 text-text-brand/80">/audit [ui_screenshot]</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
