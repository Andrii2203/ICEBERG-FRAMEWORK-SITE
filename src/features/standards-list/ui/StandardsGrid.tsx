import React from 'react';
import { FileCode, Globe, Search, Accessibility, Smartphone, Zap } from "lucide-react";

interface StandardsGridProps {
    list: {
        architecture: string;
        quality: string;
        seo: string;
        a11y: string;
        pwa: string;
        api: string;
    }
}

export const StandardsGrid = ({ list }: StandardsGridProps) => {
    const icons = {
        architecture: <FileCode className="w-8 h-8" />,
        quality: <Globe className="w-8 h-8" />,
        seo: <Search className="w-8 h-8" />,
        a11y: <Accessibility className="w-8 h-8" />,
        pwa: <Smartphone className="w-8 h-8" />,
        api: <Zap className="w-8 h-8" />
    };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(list).map(([key, label]) => (
                <div
                    key={key}
                    className="p-8 rounded-2xl border border-[#1E3A5F]/30 bg-[#0A1A2F]/40 backdrop-blur-sm group hover:border-[#38BDF8]/50 transition-all hover:-translate-y-1"
                >
                    <div className="text-[#38BDF8] mb-6 group-hover:scale-110 transition-transform origin-left">
                        {icons[key as keyof typeof icons]}
                    </div>
                    <h3 className="text-[#F8FAFC] text-xl font-bold mb-2">
                        {label}
                    </h3>
                    <div className="w-12 h-[2px] bg-[#1E3A5F] group-hover:w-full transition-all duration-500" />
                </div>
            ))}
        </div>
    );
};
