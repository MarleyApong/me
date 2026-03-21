import { fr } from "./fr";
import { en } from "./en";

export const supportedLanguages = {
  fr: { name: "Francais", label: "FR" },
  en: { name: "English", label: "EN" },
} as const;

export type SupportedLanguage = keyof typeof supportedLanguages;

export const translations = { fr, en };

export const DEFAULT_LANGUAGE: SupportedLanguage = "fr";
