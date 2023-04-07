import { createContext, useContext } from "react";
import invariant from "tiny-invariant";

const LocaleContext = createContext<string | undefined>(undefined);

export type LocaleProviderProps = { locale: string; children: React.ReactNode };

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const locale = useContext(LocaleContext);
  invariant(locale, "useLocale must be used within a LocaleProvider");
  return locale;
}
