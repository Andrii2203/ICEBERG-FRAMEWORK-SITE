"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  dict: {
    nav: {
      philosophy: string;
      methodology: string;
      standards: string;
      protocols: string;
      enterprise: string;
      audit: string;
      language: string;
    };
  };
}

const locales = [
  { id: "en", label: "English" },
  { id: "ua", label: "Українська" },
  { id: "pl", label: "Polski" },
  { id: "de", label: "Deutsch" },
  { id: "es", label: "Español" },
  { id: "fr", label: "Français" },
  { id: "it", label: "Italiano" },
  { id: "pt", label: "Português" },
];

export const Navbar = ({ dict }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = params.lang as string;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLangChange = (langId: string) => {
    const newPathname = pathname.replace(`/${currentLang}`, `/${langId}`);
    router.push(newPathname);
    setIsLangOpen(false);
  };

  const navLinks = [
    { href: `/${currentLang}/philosophy`, label: dict.nav.philosophy },
    { href: `/${currentLang}/methodology`, label: dict.nav.methodology },
    { href: `/${currentLang}/standards`, label: dict.nav.standards },
    { href: `/${currentLang}/protocols`, label: dict.nav.protocols },
    { href: `/${currentLang}/enterprise`, label: dict.nav.enterprise },
    { href: `/${currentLang}/audit`, label: dict.nav.audit },
  ];

  return (
    <>
      <div className={styles.topLine} />
      <header
        className={cn(styles.header, isScrolled && styles.headerScrolled)}
      >
        <div className={styles.container}>
          <Link href={`/${currentLang}`} className={styles.logoLink}>
            <div className={styles.logoBox}>
              <span className={styles.logoLabel}>IB</span>
            </div>
            <span className={styles.logoText}>ICEBERG</span>
          </Link>

          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  styles.navLink,
                  pathname === link.href && styles.navLinkActive,
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />

            <div className={styles.langWrapper}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={styles.langTrigger}
              >
                <Globe className={styles.globeIcon} />
                <span className={styles.langCode}>{currentLang}</span>
                <ChevronDown
                  className={cn(
                    styles.chevronIcon,
                    isLangOpen && styles.chevronOpen,
                  )}
                />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={styles.dropdown}
                  >
                    <div className={styles.dropdownInner}>
                      {locales.map((locale) => (
                        <button
                          key={locale.id}
                          type="button"
                          onClick={() => handleLangChange(locale.id)}
                          className={cn(
                            styles.localeButton,
                            currentLang === locale.id ?
                              styles.localeButtonActive
                            : styles.localeButtonInactive,
                          )}
                        >
                          {locale.label}
                          {currentLang === locale.id && (
                            <div className={styles.localeDot} />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              className={styles.mobileMenuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ?
                <X className={styles.mobileMenuIcon} />
              : <Menu className={styles.mobileMenuIcon} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={styles.mobileMenu}
            >
              <div className={styles.mobileMenuInner}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      styles.mobileNavLink,
                      pathname === link.href && styles.mobileNavLinkActive,
                    )}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
