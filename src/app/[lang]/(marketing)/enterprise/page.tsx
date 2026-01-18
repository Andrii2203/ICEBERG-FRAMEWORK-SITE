import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { Cpu, Database, CheckCircle } from "lucide-react";

export default async function EnterprisePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const icons = {
        executor: <Cpu className="w-12 h-12" />,
        memory: <Database className="w-12 h-12" />,
        validation: <CheckCircle className="w-12 h-12" />
    };

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto">
            <header className="mb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-brand mb-4">
                    {dict.enterprise.title}
                </h1>
                <p className="text-xl text-accent-brand font-mono uppercase tracking-widest">
                    {dict.enterprise.subtitle}
                </p>
            </header>

            <div className="grid md:grid-cols-3 gap-12 mt-20">
                {Object.entries(dict.enterprise.modules).map(([key, label]: [string, string]) => (
                    <div key={key} className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-3xl bg-surface-brand border border-border-brand flex items-center justify-center text-border-brand group-hover:text-accent-brand group-hover:border-accent-brand/50 transition-all duration-500 transform group-hover:rotate-6 mb-8">
                            {icons[key as keyof typeof icons]}
                        </div>
                        <h3 className="text-text-brand text-2xl font-bold mb-4">
                            {label}
                        </h3>
                        <div className="h-1 w-12 bg-border-brand group-hover:w-24 transition-all" />
                    </div>
                ))}
            </div>

            <div className="mt-32 p-12 rounded-3xl bg-gradient-to-br from-surface-brand to-bg-brand border border-border-brand/50 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-accent-brand/5 [mask-image:radial-gradient(white,transparent)]" />
                <h2 className="text-3xl font-bold text-text-brand mb-6 relative z-10">Ready for Enterprise Governance?</h2>
                <p className="text-text-brand/70 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                    The Iceberg Enterprise suite provides the necessary guardrails and tools for large-scale AI implementation.
                </p>
                <a
                    href="https://www.linkedin.com/in/andrii-shavel-976485187/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 bg-accent-brand hover:bg-accent-brand/80 text-black px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(56,189,248,0.3)] inline-block"
                >
                    Contact Sales
                </a>
            </div>
        </main>
    );
}
