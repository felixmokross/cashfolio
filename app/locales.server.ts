import { availableLocales } from "cldr-core/availableLocales.json";

export function getLocales() {
  // Note that some locales might not be supported in the browser
  // In case that the user chooses such a locale, there might be differences in rendering between server and client
  // Consider to improve the user experience
  return Intl.NumberFormat.supportedLocalesOf(availableLocales.modern);
}

const displayNames = new Intl.DisplayNames("en", {
  type: "language",
  languageDisplay: "standard",
});

export function getLocalesWithDisplayName() {
  return getLocales()
    .map((locale) => [locale, displayNames.of(locale)] as [string, string])
    .sort((a, b) => a[1].localeCompare(b[1]));
}
