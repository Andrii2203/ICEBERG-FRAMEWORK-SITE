import { Navbar } from "@/features/navigation/ui/Navbar";
import type { Dictionary } from "@/domain/i18n/types";
import styles from "./GlobalLayout.module.scss";

interface GlobalLayoutProps {
  dict: Dictionary;
  children: React.ReactNode;
}

export function GlobalLayout({ dict, children }: GlobalLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Navbar dict={dict} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
