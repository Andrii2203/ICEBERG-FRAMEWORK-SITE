import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { IcebergHero } from "@/features/hero/ui/IcebergHero";

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="relative bg-[#020617]">
            <IcebergHero dict={dict} />

            {/* Scroll Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
                <div className="w-1 h-12 bg-gradient-to-b from-[#38BDF8] to-transparent rounded-full" />
            </div>

            {/* Next sections will follow */}
        </main>
    );
}
