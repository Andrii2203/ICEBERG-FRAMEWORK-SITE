
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { SuccessClient } from "@/features/payments/ui/SuccessClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Success | Iceberg Framework",
    description: "Download your commercial assets.",
    robots: "noindex, nofollow",
};

export default async function SuccessPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    await getDictionary(lang);

    return (
        <main className="min-h-screen pt-24 md:pt-40 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-accent-brand/20 flex items-center justify-center mb-8">
                <div className="w-10 h-10 rounded-full bg-accent-brand animate-pulse" />
            </div>

            <h1 className="text-4xl font-bold text-text-brand mb-4">Payment Verified</h1>
            <p className="text-text-brand/60 mb-12 max-w-md">
                Your high-performance AI asset is ready. Links are temporary and valid for 10 minutes.
            </p>

            <SuccessClient />
        </main>
    );
}
