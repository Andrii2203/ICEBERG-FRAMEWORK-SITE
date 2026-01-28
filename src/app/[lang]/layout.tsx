import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { Navbar } from "@/features/navigation/ui/Navbar";

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
        <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme');
                                    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                    if (theme === 'dark' || (!theme && systemTheme === 'dark')) {
                                        document.documentElement.classList.add('dark');
                                    } else {
                                        document.documentElement.classList.remove('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className="antialiased" suppressHydrationWarning>
                <div className={inter.className}>
                    <Navbar dict={dict} />
                    {children}
                </div>
            </body>
        </html>
    );
}








