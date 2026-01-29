import { Navbar } from "@/features/navigation/ui/Navbar";
import { Dictionary } from "@/domain/i18n/types";
import styles from "./CleanPageLayout.module.scss";

interface CleanPageLayoutProps {
    lang: string;
    dict: Dictionary;
    children: React.ReactNode;
}

export function CleanPageLayout({ dict, children }: CleanPageLayoutProps) {
    return (
        <>
            <Navbar dict={dict} />
            <main className={styles.main}>
                {children}
            </main>
        </>
    );
}
