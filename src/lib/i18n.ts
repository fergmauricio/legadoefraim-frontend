export type Locale = "pt" | "en";

export const otherLocale = (locale: Locale): Locale =>
  locale === "pt" ? "en" : "pt";
