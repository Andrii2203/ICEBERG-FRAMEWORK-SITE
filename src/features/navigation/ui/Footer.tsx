
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Dictionary } from "@/domain/i18n/types";

export function Footer({ dict }: { dict: Dictionary }) {
    const params = useParams();
    const lang = params.lang as string;

    return (
        <footer className="w-full py-20 px-6 border-t border-border-brand/10 bg-background-brand/50 backdrop-blur-3xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
                {/* Brand Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent-brand rounded-lg shadow-[0_0_15px_rgba(var(--accent-brand),0.5)]" />
                        <span className="text-xl font-bold tracking-tighter text-text-brand uppercase">Iceberg OS</span>
                    </div>
                    <p className="max-w-xs text-text-brand/40 text-sm leading-relaxed">
                        The definitive framework for building deterministic AI systems.
                    </p>
                </div>

                {/* Products */}
                <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-text-brand/80">Products</h4>
                    <ul className="space-y-4">
                        <li>
                            <Link href={`/${lang}/solo-pack`} className="text-sm text-text-brand/40 hover:text-accent-brand transition-colors">
                                {dict.nav.solo}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/enterprise`} className="text-sm text-text-brand/40 hover:text-accent-brand transition-colors">
                                {dict.nav.enterprise}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/audit`} className="text-sm text-text-brand/40 hover:text-accent-brand transition-colors">
                                {dict.nav.audit}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Compliance Links */}
                <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-text-brand/80">Compliance</h4>
                    <ul className="space-y-4">
                        <li>
                            <Link href={`/${lang}/faq`} className="text-sm text-text-brand/40 hover:text-accent-brand transition-colors">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/tos`} className="text-sm text-text-brand/40 hover:text-accent-brand transition-colors">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/privacy`} className="text-sm text-text-brand/40 hover:text-accent-brand transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-text-brand/80">Support</h4>
                    <p className="text-sm text-text-brand/40">
                        Technical inquiries:
                    </p>
                    <a href="https://www.linkedin.com/in/andrii-shavel-976485187/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-accent-brand hover:underline">
                        Contact via LinkedIn
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border-brand/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] font-mono text-text-brand/20 uppercase tracking-[0.2em]">
                    © 2026 Iceberg AI Protocols. All Rights Reserved. Standard V1.2.
                </p>
                <div className="flex items-center gap-6 text-[10px] font-mono text-text-brand/20 uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                        Commercial Launch Readiness
                    </span>
                    <span>System: Deterministic</span>
                </div>
            </div>
        </footer>
    );
}
