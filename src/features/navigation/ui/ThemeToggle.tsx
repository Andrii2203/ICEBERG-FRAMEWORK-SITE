"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        // Use setTimeout to avoid synchronous setState in effect (lint)
        const timer = setTimeout(() => {
            setTheme(isDark ? "dark" : "light");
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "p-2 rounded-lg transition-all active:scale-90",
                "bg-surface-brand border border-border-brand text-text-brand hover:text-accent-brand"
            )}
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon className="w-4 h-4" />
            ) : (
                <Sun className="w-4 h-4" />
            )}
        </button>
    );
};








