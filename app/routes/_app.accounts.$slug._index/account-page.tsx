import { PencilIcon } from "@heroicons/react/20/solid";
import { type Account } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Fragment } from "react";
import { LinkButton } from "~/components/link-button";
import type { getReverseLedgerDateGroups } from "~/models/ledger-lines.server";
import { NewTransactionForm } from "./new-transaction-form";

export type AccountPageProps = {
  account: SerializeFrom<Account>;
  ledgerDateGroups: SerializeFrom<
    Awaited<ReturnType<typeof getReverseLedgerDateGroups>>
  >;
  targetAccounts: SerializeFrom<Account>[];
};

export function AccountPage({
  account,
  targetAccounts,
  ledgerDateGroups,
}: AccountPageProps) {
  return (
    <>
      <div className="px-4 sm:px-6">
        <div className="mt-4 flex items-baseline justify-between ">
          <h2 className="text-lg font-medium text-slate-800">{account.name}</h2>

          <LinkButton to="edit" icon={PencilIcon}>
            Edit
          </LinkButton>
        </div>

        <NewTransactionForm
          accountId={account.id}
          targetAccounts={targetAccounts}
        />
      </div>
      <table className="mt-8 w-full">
        <tbody>
          {ledgerDateGroups.groups.map((group) => (
            <Fragment key={group.date}>
              <tr className="border-t border-slate-200">
                <th className="bg-slate-50 px-4 py-2 text-left text-sm font-semibold text-slate-900 sm:px-6">
                  {group.dateFormatted}
                </th>
                <td className="bg-slate-50 py-2 pl-3 pr-1 text-right text-sm font-medium text-slate-500">
                  {group.balanceFormatted}
                </td>
              </tr>
              {group.lines.map((line) => (
                <tr key={line.id} className="border-t border-slate-300">
                  <td className="py-4 pl-4 pr-3 text-sm text-slate-500 sm:pl-6">
                    {line.note}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-1 text-right text-sm font-medium text-emerald-600">
                    {line.amountFormatted}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
          <tr className="border-t border-slate-200">
            <th className="bg-slate-50 px-4 py-2 text-left text-sm font-semibold text-slate-900 sm:px-6"></th>
            <td className="bg-slate-50 py-2 pl-3 pr-1 text-right text-sm font-medium text-slate-500">
              {ledgerDateGroups.initialPageBalanceFormatted}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
