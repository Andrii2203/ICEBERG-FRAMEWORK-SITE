import { getDictionary } from "@/infrastructure/i18n/dictionaries";

export default async function PhilosophyPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-5xl mx-auto">
            <header className="mb-16">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#F8FAFC] mb-4">
                    {dict.philosophy.title}
                </h1>
                <p className="text-xl text-[#38BDF8] font-mono uppercase tracking-widest">
                    {dict.philosophy.subtitle}
                </p>
            </header>

            <section className="mb-20">
                <p className="text-2xl text-[#CBD5E1] leading-relaxed mb-12 border-l-4 border-[#1E3A5F] pl-8">
                    {dict.philosophy.intro}
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(dict.philosophy.principles).map(([key, principle]: [string, { title: string; text: string }]) => (
                        <div
                            key={key}
                            className="p-8 rounded-xl border border-[#1E3A5F]/30 bg-[#0A1A2F]/40 backdrop-blur-sm group hover:border-[#38BDF8]/50 transition-colors"
                        >
                            <h3 className="text-[#F8FAFC] text-xl font-bold mb-4 group-hover:text-[#38BDF8] transition-colors">
                                {principle.title}
                            </h3>
                            <p className="text-[#475569] group-hover:text-[#CBD5E1] transition-colors leading-relaxed">
                                {principle.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Philosophy Illustration / Decoration */}
            <div className="relative h-64 w-full rounded-2xl border border-[#1E3A5F]/20 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-[#1E3A5F]/5" />
                <div className="text-[#1E3A5F] font-mono text-sm uppercase tracking-[1em]">Predictability · Structure · Flow</div>
            </div>
        </main>
    );
}
