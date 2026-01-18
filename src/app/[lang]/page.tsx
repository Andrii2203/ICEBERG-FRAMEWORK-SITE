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
        <main className="relative bg-bg-brand">
            <IcebergHero dict={dict} />

            {/* Next sections will follow here*/}
        </main>
    );
}
