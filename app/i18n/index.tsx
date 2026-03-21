"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_LANGUAGE,
  supportedLanguages,
  translations,
  type SupportedLanguage,
} from "./locales";

const LANGUAGE_STORAGE_KEY = "lang";

interface I18nContextType {
  lang: SupportedLanguage;
  changeLang: (language: SupportedLanguage) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && saved in supportedLanguages) {
        setLang(saved as SupportedLanguage);
      }
    } catch {
      // ignore
    }
  }, []);

  const changeLang = (language: SupportedLanguage) => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      setLang(language);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[lang];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return context;
};

export { supportedLanguages, type SupportedLanguage };
