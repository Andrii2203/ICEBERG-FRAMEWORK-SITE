import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { ClipboardList, FastForward, Play, ShieldCheck } from "lucide-react";
import React from 'react';

export default async function ProtocolsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const icons = {
        planning: <ClipboardList className="w-10 h-10" />,
        migration: <FastForward className="w-10 h-10" />,
        execution: <Play className="w-10 h-10" />,
        validation: <ShieldCheck className="w-10 h-10" />
    };

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto">
            <header className="mb-16">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#F8FAFC] mb-4">
                    {dict.protocols.title}
                </h1>
                <p className="text-xl text-[#38BDF8] font-mono uppercase tracking-widest">
                    {dict.protocols.subtitle}
                </p>
            </header>

            <p className="text-2xl text-[#CBD5E1] leading-relaxed mb-16 max-w-3xl border-l-4 border-[#38BDF8] pl-8">
                {dict.protocols.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(dict.protocols.list).map(([key, label]: [string, string]) => (
                    <div
                        key={key}
                        className="p-10 rounded-2xl border border-[#1E3A5F]/30 bg-gradient-to-br from-[#0A1A2F]/60 to-transparent backdrop-blur-sm group hover:border-[#38BDF8]/50 transition-all"
                    >
                        <div className="flex items-center gap-6">
                            <div className="text-[#38BDF8] p-4 rounded-xl bg-[#0A1A2F] border border-[#1E3A5F] group-hover:scale-110 transition-transform">
                                {icons[key as keyof typeof icons]}
                            </div>
                            <div>
                                <div className="text-[#475569] font-mono text-xs uppercase mb-1">Protocol 0{Object.keys(dict.protocols.list).indexOf(key) + 1}</div>
                                <h3 className="text-[#F8FAFC] text-2xl font-bold">
                                    {label}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 p-8 rounded-2xl bg-[#0A1A2F]/20 border border-[#1E3A5F]/20 text-center italic text-[#475569]">
                &quot;Standardization is the prerequisite for predictable outcome.&quot;
            </div>
        </main>
    );
}
