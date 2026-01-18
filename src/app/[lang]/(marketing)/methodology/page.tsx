import React from 'react';
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { Shield, Layers, Box } from "lucide-react";

export default async function MethodologyPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const icons = [<Shield key="0" />, <Layers key="1" />, <Box key="2" />];

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 max-w-6xl mx-auto">
            <header className="mb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#F8FAFC] mb-4">
                    {dict.methodology.title}
                </h1>
                <p className="text-xl text-[#38BDF8] font-mono uppercase tracking-widest">
                    {dict.methodology.subtitle}
                </p>
            </header>

            <section className="space-y-12">
                {Object.entries(dict.methodology.layers).map(([key, layer]: [string, { name: string; type: string; description: string }]) => (
                    <div
                        key={key}
                        className="flex flex-col md:flex-row gap-8 items-stretch"
                    >
                        <div className="w-full md:w-1/3 p-12 rounded-2xl border border-[#1E3A5F]/30 bg-[#0A1A2F]/60 flex items-center justify-center text-[#38BDF8]">
                            {/* Icon Visualization */}
                            <div className="w-24 h-24 border-2 border-[#1E3A5F] rounded-full flex items-center justify-center">
                                {React.cloneElement(icons[Object.keys(dict.methodology.layers).indexOf(key)] as React.ReactElement<{ size: number }>, { size: 40 })}
                            </div>
                        </div>

                        <div className="flex-1 p-12 rounded-2xl border border-[#1E3A5F]/30 bg-[#0A1A2F]/20 backdrop-blur-sm relative group hover:border-[#38BDF8]/30 transition-colors">
                            0{Object.keys(dict.methodology.layers).indexOf(key) + 1}
                            <p className="text-[#38BDF8] font-mono text-sm uppercase mb-2">
                                {layer.type}
                            </p>
                            <h2 className="text-3xl font-bold text-[#F8FAFC] mb-4">
                                {layer.name}
                            </h2>
                            <p className="text-[#CBD5E1] text-xl leading-relaxed">
                                {layer.description}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Flow Diagram Hint */}
            <div className="mt-20 p-12 rounded-3xl border border-dashed border-[#1E3A5F] text-center">
                <p className="text-[#475569] font-mono text-sm mb-4 uppercase">System Logic Flow</p>
                <div className="flex items-center justify-center gap-8 text-[#1E3A5F]">
                    <span className="font-bold">Layer 1</span>
                    <div className="w-12 h-[1px] bg-[#1E3A5F]" />
                    <span className="font-bold">Layer 2</span>
                    <div className="w-12 h-[1px] bg-[#1E3A5F]" />
                    <span className="font-bold">Layer 3</span>
                </div>
            </div>
        </main>
    );
}
