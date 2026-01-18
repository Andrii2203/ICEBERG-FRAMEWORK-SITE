import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { Navbar } from "@/features/navigation/ui/Navbar";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return {
        title: dict.common.title,
        description: dict.common.tagline,
        manifest: "/manifest.webmanifest",
        alternates: {
            canonical: `/${lang}`,
            languages: {
                en: "/en",
                pl: "/pl",
                de: "/de",
                es: "/es",
                fr: "/fr",
                it: "/it",
                pt: "/pt",
            },
        },
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
        <html lang={lang} className="scroll-smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="bg-[#020617] text-[#F8FAFC] antialiased" suppressHydrationWarning>
                <div className={inter.className}>
                    <Navbar dict={dict} />
                    {children}
                </div>
            </body>
        </html>
    );
}
