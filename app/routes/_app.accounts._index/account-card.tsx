import { AccountUnit } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { AccountDto } from "~/accounts/types";
import { useUser } from "~/common/user-context";

export type AccountCardProps = {
  account: Pick<AccountDto, "name" | "slug" | "unit" | "currency">;
  balance: string;
  balanceInRefCurrency: string;
};

export function AccountCard({
  account,
  balance,
  balanceInRefCurrency,
}: AccountCardProps) {
  const { preferredLocale, refCurrency } = useUser();
  const numberFormat = new Intl.NumberFormat(preferredLocale, {
    maximumFractionDigits: 0,
  });

  const currencySymbol = account.currency
    ? new Intl.NumberFormat(preferredLocale, {
        style: "currency",
        currency: account.currency,
      })
        .formatToParts(0)
        .find(({ type }) => type === "currency")!.value
    : undefined;

  const refCurrencySymbol = new Intl.NumberFormat(preferredLocale, {
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
      className="group flex h-24 justify-between rounded-lg border border-gray-200 px-4 py-2 shadow-md hover:bg-gray-50 hover:shadow-sm"
    >
      <div className="self-end overflow-hidden truncate text-sm font-semibold text-brand-600 group-hover:text-brand-800">
        {account.name}
      </div>
      <div className="flex flex-shrink-0 flex-col items-end gap-1">
        <div className="text-gray-700">
          <span className="text-sm text-gray-500">
            {account.unit === AccountUnit.CURRENCY ? currencySymbol : "pc."}
          </span>
          <span className="text-2xl">
            {" "}
            {numberFormat.format(Number(balance))}
          </span>
        </div>
        {(isForeignCurrency || account.unit === AccountUnit.STOCK) && (
          <div className="text-sm text-gray-500">
            {refCurrencySymbol}{" "}
            {numberFormat.format(Number(balanceInRefCurrency))}
          </div>
        )}
      </div>
    </Link>
  );
}
