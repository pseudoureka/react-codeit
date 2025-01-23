import { createContext, useContext, useState } from "react";

const LocaleContext = createContext();

export const LocaleProvider = ({ defaultValue = "ko", children }) => {
  const [locale, setLocale] = useState(defaultValue);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
};

export function useLocale() {
  const context = useContext(LocaleContext);
  console.log(context);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context.setLocale;
}
