import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { Navbar } from "@/features/navigation/ui/Navbar";
import { Footer } from "@/features/navigation/ui/Footer";

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

export default async function LangLayout({
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
        <>
            <div className={inter.className}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Navbar dict={dict} />
                {children}
                <Footer dict={dict} />
            </div>
        </>
    );
}