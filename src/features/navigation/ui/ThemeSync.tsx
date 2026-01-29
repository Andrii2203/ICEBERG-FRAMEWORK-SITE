"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const DARK_BG = "#020617";
const LIGHT_BG = "#F8FAFC";

function applyTheme() {
    try {
        const theme = localStorage.getItem("theme");
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
        const shouldBeDark =
            theme === "dark" || (!theme && systemTheme === "dark");
        const root = document.documentElement;
        if (shouldBeDark) {
            root.classList.add("dark");
            root.style.backgroundColor = DARK_BG;
        } else {
            root.classList.remove("dark");
            root.style.backgroundColor = LIGHT_BG;
        }
    } catch {
        // ignore
    }
}

/**
 * Re-applies theme from localStorage to document.documentElement whenever
 * the route changes (e.g. language switch). Uses useLayoutEffect so the
 * theme is restored before the browser paints, avoiding a white flash.
 */
export function ThemeSync() {
    const pathname = usePathname();

    useLayoutEffect(() => {
        applyTheme();
    }, [pathname]);

    return null;
}
