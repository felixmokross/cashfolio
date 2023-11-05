import type { Prisma } from "@prisma/client";
import { isToday, isTomorrow, isYesterday } from "date-fns";

export function formatDate(value: Date, locale: string) {
  if (isTomorrow(value)) return "Tomorrow";
  if (isToday(value)) return "Today";
  if (isYesterday(value)) return "Yesterday";

  return getDateFormat(locale).format(value);
}

function getDateFormat(locale: string) {
  // TODO support cache
  // const cachedFormat = cache.dateFormat.read(locale);
  // if (cachedFormat) return cachedFormat;

  const format = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  // cache.dateFormat.write(locale, format);

  return format;
}

export function formatMoney(
  value: Prisma.Decimal,
  currency: string | null,
  locale: string,
  style: CurrencyFormatStyle = "normal",
) {
  if (!currency) return value.toString();

  return getMoneyFormat(locale, currency, style).format(value.toNumber());
}

export type CurrencyFormatStyle = "compact" | "normal" | "sign-always";

function getMoneyFormat(
  locale: string,
  currency: string,
  style: CurrencyFormatStyle,
) {
  // TODO support cache
  //   const cachedFormat = cache.currencyFormat.read(locale, currency, style);
  //   if (cachedFormat) return cachedFormat;

  const format = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: style === "compact" ? 0 : undefined,
    signDisplay: style === "sign-always" ? "always" : undefined,
  });

  //   cache.currencyFormat.write(locale, currency, style, format);
  return format;
}
