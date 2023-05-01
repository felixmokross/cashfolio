import type { Account } from "@prisma/client";
import { AccountUnit } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { useLocale } from "../locale-context";
import { Link } from "@remix-run/react";
import { currenciesByCode } from "~/currencies";

export type AccountCardProps = {
  account: Pick<SerializeFrom<Account>, "name" | "slug" | "unit" | "currency">;
  balance: string;
  balanceInRefCurrency: string;
  refCurrency: string;
};

export function AccountCard({
  account,
  balance,
  balanceInRefCurrency,
  refCurrency,
}: AccountCardProps) {
  const locale = useLocale();
  const numberFormat = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  });

  const currencySymbol = account.currency
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: account.currency,
      })
        .formatToParts(0)
        .find(({ type }) => type === "currency")!.value
    : undefined;

  const refCurrencySymbol = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: refCurrency,
  })
    .formatToParts(0)
    .find(({ type }) => type === "currency")!.value;
  const isForeignCurrency =
    account.unit === AccountUnit.CURRENCY && account.currency !== refCurrency;

  return (
    <Link
      to={account.slug}
      className="group flex h-24 justify-between rounded-lg border border-slate-200 px-4 py-2 shadow-md hover:bg-slate-50 hover:shadow-sm"
    >
      <div className="flex flex-col-reverse gap-1 self-end overflow-hidden">
        <div className="truncate text-sm font-semibold text-sky-600 group-hover:text-sky-800">
          {account.name}
        </div>
        {isForeignCurrency && (
          <div className="truncate text-sm text-slate-500">
            {currenciesByCode[account.currency!]}
          </div>
        )}
      </div>
      <div className="flex flex-shrink-0 flex-col items-end gap-1">
        <div className="text-slate-700">
          <span className="text-sm text-slate-500">
            {account.unit === AccountUnit.CURRENCY ? currencySymbol : "pc."}
          </span>
          <span className="text-2xl">
            {" "}
            {numberFormat.format(Number(balance))}
          </span>
        </div>
        {(isForeignCurrency || account.unit === AccountUnit.STOCK) && (
          <div className="text-sm text-slate-500">
            {refCurrencySymbol}{" "}
            {numberFormat.format(Number(balanceInRefCurrency))}
          </div>
        )}
      </div>
    </Link>
  );
}
