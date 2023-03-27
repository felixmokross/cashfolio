import { defaultContent } from "cldr-core/defaultContent.json";
import { availableLocales } from "cldr-core/availableLocales.json";
import { difference } from "./utils.server";

export function getLocales() {
  const baseLocales = defaultContent.map((l) =>
    l.split("-").slice(0, -1).join("-")
  );
  return difference(availableLocales.modern, baseLocales).concat(
    defaultContent
  );
}
