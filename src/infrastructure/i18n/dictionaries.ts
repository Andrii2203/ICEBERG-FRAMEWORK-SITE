import { Dictionary } from "@/domain/i18n/types";

const dictionaries = {
    en: () => import("./dictionaries/en.json").then((module) => module.default as Dictionary),
    ua: () => import("./dictionaries/ua.json").then((module) => module.default as Dictionary),
    pl: () => import("./dictionaries/pl.json").then((module) => module.default as Dictionary),
    de: () => import("./dictionaries/de.json").then((module) => module.default as Dictionary),
    es: () => import("./dictionaries/es.json").then((module) => module.default as Dictionary),
    fr: () => import("./dictionaries/fr.json").then((module) => module.default as Dictionary),
    it: () => import("./dictionaries/it.json").then((module) => module.default as Dictionary),
    pt: () => import("./dictionaries/pt.json").then((module) => module.default as Dictionary),
};

export type SupportedLanguage = keyof typeof dictionaries;

export const getDictionary = async (locale: string): Promise<Dictionary> => {
    return dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.en();
};
