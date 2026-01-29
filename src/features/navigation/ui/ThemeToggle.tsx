"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
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

    if (!mounted) return <div className={styles.placeholder} />;

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={styles.root}
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon className={styles.icon} />
            ) : (
                <Sun className={styles.icon} />
            )}
        </button>
    );
};
