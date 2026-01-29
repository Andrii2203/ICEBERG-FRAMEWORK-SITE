import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/shared/utils/cn";
import "@/app/globals.css";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { Navbar } from "@/features/navigation/ui/Navbar";
import { ThemeSync } from "@/features/navigation/ui/ThemeSync";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL("https://iceberg-framework-site.vercel.app"),
        manifest: "/manifest.webmanifest",
    };
}

export function generateViewport() {
    return {
        themeColor: "#0A1A2F",
        width: "device-width",
        initialScale: 1,
    };
}

import { getJsonLd } from "@/shared/utils/seo";

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const jsonLd = getJsonLd(lang);

    return (
        <html lang={lang} className={styles.htmlRoot} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme');
                                    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                    var isDark = theme === 'dark' || (!theme && systemTheme === 'dark');
                                    var el = document.documentElement;
                                    if (isDark) {
                                        el.classList.add('dark');
                                        el.style.backgroundColor = '#020617';
                                    } else {
                                        el.classList.remove('dark');
                                        el.style.backgroundColor = '#F8FAFC';
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={styles.bodyRoot} suppressHydrationWarning>
                <ThemeSync />
                <div className={cn(inter.className, styles.wrapper)}>
                    <Navbar dict={dict} />
                    {children}
                </div>
            </body>
        </html>
    );
}








