import invariant from "tiny-invariant";

export function getNumberFormatSymbols(locale: string) {
  const numberFormat = new Intl.NumberFormat(locale);

  const thousandSeparator = numberFormat
    .formatToParts(10_000)
    .find((x) => x.type === "group")?.value;
  const decimalSeparator = numberFormat
    .formatToParts(1.1)
    .find((x) => x.type === "decimal")?.value;

  invariant(
    decimalSeparator,
    `decimalSeparator not found for locale ${locale}`,
  );

  return { thousandSeparator, decimalSeparator };
}
