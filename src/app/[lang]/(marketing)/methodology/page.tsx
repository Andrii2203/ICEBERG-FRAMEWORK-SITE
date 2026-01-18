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
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-brand mb-4">
                    {dict.methodology.title}
                </h1>
                <p className="text-xl text-accent-brand font-mono uppercase tracking-widest">
                    {dict.methodology.subtitle}
                </p>
            </header>

            <section className="space-y-12">
                {Object.entries(dict.methodology.layers).map(([key, layer]: [string, { name: string; type: string; description: string }]) => (
                    <div
                        key={key}
                        className="flex flex-col md:flex-row gap-8 items-stretch"
                    >
                        <div className="w-full md:w-1/3 p-12 rounded-2xl border border-border-brand/30 bg-surface-brand/60 flex items-center justify-center text-accent-brand">
                            {/* Icon Visualization */}
                            <div className="w-24 h-24 border-2 border-border-brand rounded-full flex items-center justify-center">
                                {React.cloneElement(icons[Object.keys(dict.methodology.layers).indexOf(key)] as React.ReactElement<{ size: number }>, { size: 40 })}
                            </div>
                        </div>

                        <div className="flex-1 p-12 rounded-2xl border border-border-brand/30 bg-surface-brand/20 backdrop-blur-sm relative group hover:border-accent-brand/30 transition-colors text-text-brand/20 font-black text-6xl">
                            0{Object.keys(dict.methodology.layers).indexOf(key) + 1}
                            <div className="relative z-10 -mt-10">
                                <p className="text-accent-brand font-mono text-sm uppercase mb-2">
                                    {layer.type}
                                </p>
                                <h2 className="text-3xl font-bold text-text-brand mb-4">
                                    {layer.name}
                                </h2>
                                <p className="text-text-brand/80 text-xl leading-relaxed">
                                    {layer.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Flow Diagram Hint */}
            <div className="mt-20 p-12 rounded-3xl border border-dashed border-border-brand text-center">
                <p className="text-text-brand/60 font-mono text-sm mb-4 uppercase">System Logic Flow</p>
                <div className="flex items-center justify-center gap-8 text-border-brand">
                    <span className="font-bold">Layer 1</span>
                    <div className="w-12 h-[1px] bg-border-brand" />
                    <span className="font-bold">Layer 2</span>
                    <div className="w-12 h-[1px] bg-border-brand" />
                    <span className="font-bold">Layer 3</span>
                </div>
            </div>
        </main>
    );
}
