"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  defaultLanguage,
  languages,
  translations,
  type Language,
  type TranslationKey,
} from "@/app/i18n/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey | string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const languageStorageKey = "uzhavan-language";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "ta";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return defaultLanguage;
    }

    const savedLanguage = window.localStorage.getItem(languageStorageKey);

    return isLanguage(savedLanguage) ? savedLanguage : defaultLanguage;
  });

  const value = useMemo<LanguageContextValue>(() => {
    function setLanguage(nextLanguage: Language) {
      setLanguageState(nextLanguage);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(languageStorageKey, nextLanguage);
      }

      if (typeof document !== "undefined") {
        document.documentElement.lang = nextLanguage === "ta" ? "ta" : "en";
      }
    }

    function t(key: TranslationKey | string) {
      const translationKey = key as TranslationKey;

      return (
        translations[language][translationKey] ||
        translations.en[translationKey] ||
        key
      );
    }

    return { language, setLanguage, t };
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language === "ta" ? "ta" : "en";
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }

  return context;
}

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  function chooseLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setIsOpen(false);
  }

  return (
    <div className="relative justify-self-end">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={t("nav.language")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[11px] font-bold leading-none text-white shadow-sm transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        <span className="grid place-items-center">
          <span>A</span>
          <span className="-mt-1 text-sm">அ</span>
        </span>
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-emerald-950/10 bg-white py-2 text-sm text-slate-800 shadow-xl">
          {(Object.keys(languages) as Language[]).map((option) => {
            const isActive = language === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => chooseLanguage(option)}
                aria-current={isActive ? "true" : undefined}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left font-semibold transition ${
                  isActive
                    ? "bg-yellow-50 text-emerald-900"
                    : "hover:bg-emerald-50"
                }`}
              >
                <span>{languages[option]}</span>
                <span className="text-xs text-slate-500">
                  {option === "en" ? "EN" : "TA"}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function T({ k }: { k: TranslationKey }) {
  const { t } = useLanguage();

  return t(k);
}

export function CategoryName({ category }: { category: string }) {
  const { t } = useLanguage();

  return t(`category.${category}`);
}
