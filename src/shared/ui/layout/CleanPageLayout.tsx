
import { Navbar } from "@/features/navigation/ui/Navbar";
import { Dictionary } from "@/domain/i18n/types";

interface CleanPageLayoutProps {
    lang: string;
    dict: Dictionary;
    children: React.ReactNode;
}

export function CleanPageLayout({ dict, children }: CleanPageLayoutProps) {
    return (
        <>
            <Navbar dict={dict} />
            <main className="min-h-screen bg-[--bg]">
                {children}
            </main>
            {/* Footer can be added here if needed, or kept minimal */}
        </>
    );
}








