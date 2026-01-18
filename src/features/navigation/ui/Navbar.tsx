"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface NavbarProps {
    dict: {
        nav: {
            philosophy: string;
            methodology: string;
            standards: string;
            protocols: string;
            enterprise: string;
            language: string;
        };
    };
}

const locales = [
    { id: "en", label: "English" },
    { id: "ua", label: "Українська" },
    { id: "pl", label: "Polski" },
    { id: "de", label: "Deutsch" },
    { id: "es", label: "Español" },
    { id: "fr", label: "Français" },
    { id: "it", label: "Italiano" },
    { id: "pt", label: "Português" },
];

export const Navbar = ({ dict }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();
    const currentLang = params.lang as string;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLangChange = (langId: string) => {
        const newPathname = pathname.replace(`/${currentLang}`, `/${langId}`);
        router.push(newPathname);
        setIsLangOpen(false);
    };

    const navLinks = [
        { href: `/${currentLang}/philosophy`, label: dict.nav.philosophy },
        { href: `/${currentLang}/methodology`, label: dict.nav.methodology },
        { href: `/${currentLang}/standards`, label: dict.nav.standards },
        { href: `/${currentLang}/protocols`, label: dict.nav.protocols },
        { href: `/${currentLang}/enterprise`, label: dict.nav.enterprise },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled
                    ? "bg-[#020617]/80 backdrop-blur-md border-[#1E3A5F]/30 py-4"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href={`/${currentLang}`}
                    className="text-[#F8FAFC] font-bold text-xl tracking-tighter flex items-center gap-2 group"
                >
                    <div className="w-8 h-8 bg-[#38BDF8] rounded flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                        <span className="text-[#020617] font-black text-xs">IB</span>
                    </div>
                    <span className="hidden sm:inline">ICEBERG</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-[#CBD5E1] hover:text-[#38BDF8] text-sm font-medium transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-2 text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors text-sm font-medium"
                        >
                            <Globe className="w-4 h-4 text-[#38BDF8]" />
                            <span className="uppercase">{currentLang}</span>
                            <ChevronDown className={cn("w-3 h-3 transition-transform", isLangOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isLangOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-4 w-48 bg-[#0A1A2F] border border-[#1E3A5F] rounded-lg shadow-2xl overflow-hidden"
                                >
                                    <div className="py-2">
                                        {locales.map((locale) => (
                                            <button
                                                key={locale.id}
                                                onClick={() => handleLangChange(locale.id)}
                                                className={cn(
                                                    "w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between",
                                                    currentLang === locale.id
                                                        ? "bg-[#1E3A5F] text-[#38BDF8]"
                                                        : "text-[#CBD5E1] hover:bg-[#1E3A5F]/50 hover:text-[#F8FAFC]"
                                                )}
                                            >
                                                {locale.label}
                                                {currentLang === locale.id && <div className="w-1 h-1 bg-[#38BDF8] rounded-full" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-[#CBD5E1] hover:text-[#F8FAFC]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-[#020617] border-b border-[#1E3A5F]/30 overflow-hidden"
                    >
                        <div className="flex flex-col gap-4 p-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-[#CBD5E1] hover:text-[#38BDF8] text-lg font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
