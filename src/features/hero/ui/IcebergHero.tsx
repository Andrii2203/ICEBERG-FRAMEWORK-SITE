"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

interface IcebergHeroProps {
    dict: {
        hero: {
            visibleTip: string;
            submergedMass: string;
            waterline: string;
            description: string;
        };
        common: {
            tagline: string;
        };
    };
}

export const IcebergHero = ({ dict }: IcebergHeroProps) => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617] py-20 px-6">
            {/* Background Orbs & Effects */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/50 to-transparent" />
            <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-[#1E3A5F]/10 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-[#0EA5E9]/5 rounded-full blur-[150px] animate-pulse" />

            {/* Hero Text Content */}
            <div className="relative z-20 text-center mb-16 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E3A5F]/30 border border-[#38BDF8]/30 text-[#38BDF8] font-mono text-[10px] tracking-[0.3em] uppercase mb-6 backdrop-blur-md">
                        {dict.common.tagline}
                    </span>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-[#F8FAFC] leading-[0.8] drop-shadow-[0_0_30px_rgba(248,250,252,0.1)]">
                        ICEBERG<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#F8FAFC] to-[#38BDF8]/50">FRAMEWORK</span>
                    </h1>
                </motion.div>
            </div>

            {/* The Iceberg Visualization */}
            <div className="relative w-full max-w-5xl h-[500px] mt-12 perspective-1000">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    {/* Floating Container */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full h-full flex flex-col items-center"
                    >
                        {/* THE ICEBERG SHAPE (SVG) */}
                        <div className="relative w-[300px] h-[450px]">
                            {/* Visible Tip Shape */}
                            <svg className="absolute top-0 left-0 w-full h-[150px] drop-shadow-[0_-5px_15px_rgba(56,189,248,0.2)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="tipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#F8FAFC" />
                                        <stop offset="100%" stopColor="#CBD5E1" />
                                    </linearGradient>
                                </defs>
                                <path d="M50 5 L85 95 L15 95 Z" fill="url(#tipGradient)" className="opacity-90" />
                                <path d="M50 5 L65 95 L35 95 Z" fill="#F8FAFC" className="opacity-50" />
                            </svg>

                            {/* Waterline Glow */}
                            <div className="absolute top-[148px] left-[-100px] right-[-100px] h-[4px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent shadow-[0_0_20px_#38BDF8] z-30 opacity-50" />

                            {/* Submerged Part Shape */}
                            <svg className="absolute top-[150px] left-[-20px] w-[340px] h-[300px]" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="submergedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#1E3A5F" />
                                        <stop offset="100%" stopColor="#020617" />
                                    </linearGradient>
                                </defs>
                                <path d="M15 0 L85 0 L95 20 L70 95 L30 95 L5 20 Z" fill="url(#submergedGradient)" className="opacity-60" />
                                <path d="M15 0 L85 0 L75 85 L25 85 Z" fill="#0EA5E9" className="opacity-5" />
                                <path d="M50 0 L60 95 L40 95 Z" fill="#38BDF8" className="opacity-10" />
                            </svg>

                            {/* Submerged Content */}
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                {/* Visible Tip Label */}
                                <div className="absolute top-[100px] left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                                    <span className="text-[#020617] font-bold text-[10px] uppercase tracking-widest bg-[#F8FAFC] px-3 py-1 rounded-full shadow-lg">
                                        {dict.hero.visibleTip}
                                    </span>
                                </div>

                                {/* Waterline Label */}
                                <div className="absolute top-[140px] right-[-140px] flex items-center gap-2">
                                    <div className="w-12 h-px bg-[#38BDF8]" />
                                    <span className="text-[#38BDF8] font-mono text-[9px] uppercase tracking-[0.2em]">{dict.hero.waterline}</span>
                                </div>

                                {/* Submerged Label & Description */}
                                <div className="absolute top-[220px] left-1/2 -translate-x-1/2 w-80 text-center">
                                    <span className="text-[#38BDF8]/40 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 block animate-pulse">
                                        {dict.hero.submergedMass}
                                    </span>
                                    <p className="text-[#CBD5E1]/80 text-sm leading-relaxed font-light">
                                        {dict.hero.description}
                                    </p>
                                </div>

                                {/* Bubble Particles */}
                                {[...Array(6)].map((_, i) => {
                                    // Deterministic offsets based on index i
                                    const leftOffset = (20 + (i * 123) % 61);
                                    const topOffset = (160 + (i * 456) % 201);
                                    const duration = (4 + (i * 789) % 5);
                                    const delay = (i * 321) % 6;

                                    return (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-[#38BDF8]/30 rounded-full"
                                            style={{
                                                left: `${leftOffset}%`,
                                                top: `${topOffset}px`
                                            }}
                                            animate={{
                                                y: [-20, -100],
                                                x: [-5, 5, -5],
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{
                                                duration: duration,
                                                repeat: Infinity,
                                                delay: delay
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <span className="text-[#475569] font-mono text-[9px] uppercase tracking-widest">Explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-[#38BDF8] to-transparent" />
            </motion.div>
            {/* Integrated Side Footer */}
            <div className="absolute bottom-6 left-8 z-30 hidden md:block">
                <p className="text-[#1E3A5F] font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                    © 2026 Iceberg Framework <br />
                    <span className="text-[#38BDF8]/50">v1.2.0 Stable (MIT)</span>
                </p>
            </div>

            <div className="absolute bottom-6 right-8 z-30 hidden md:flex items-center gap-6">
                <a href="https://github.com/Andrii2203/" target="_blank" rel="noopener noreferrer" className="text-[#1E3A5F] hover:text-[#38BDF8] transition-colors group">
                    <span className="sr-only">GitHub</span>
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.linkedin.com/in/andrii-shavel-976485187/" target="_blank" rel="noopener noreferrer" className="text-[#1E3A5F] hover:text-[#38BDF8] transition-colors group">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
            </div>
        </section>
    );
};
