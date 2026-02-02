"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Use setTimeout to avoid synchronous setState in effect (lint)
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" || theme === "system" ? "light" : "dark")}
            className={cn(
                "p-2 rounded-lg transition-all active:scale-90",
                "bg-surface-brand border border-border-brand text-text-brand hover:text-accent-brand"
            )}
            aria-label="Toggle theme"
        >
            {theme === "dark" || theme === "system" ? (
                <Moon className="w-4 h-4" />
            ) : (
                <Sun className="w-4 h-4" />
            )}
        </button>
    );
};
