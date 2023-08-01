import { PencilIcon } from "@heroicons/react/20/solid";
import { BookingType } from "@prisma/client";
import type { BalanceChangeCategory, Account } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Fragment } from "react";
import { LinkButton } from "~/components/link-button";
import type { getReverseLedgerDateGroups } from "~/models/ledger-lines.server";
import { NewTransactionForm } from "./new-transaction-form";
import { Link } from "~/components/link";
import { Button } from "~/components/button";
import { useDeleteTransactionModal } from "./delete-transaction-modal";

export type AccountPageProps = {
  account: SerializeFrom<Account>;
  ledgerDateGroups: SerializeFrom<
    Awaited<ReturnType<typeof getReverseLedgerDateGroups>>
  >;
  targetAccounts: SerializeFrom<Account>[];
  balanceChangeCategories: SerializeFrom<BalanceChangeCategory>[];
};

export function AccountPage({
  account,
  targetAccounts,
  ledgerDateGroups,
  balanceChangeCategories,
}: AccountPageProps) {
  const { deleteTransactionModal, deleteTransaction } =
    useDeleteTransactionModal();

  return (
    <>
      <div className="px-4 sm:px-6">
        <div className="mt-4 flex items-baseline justify-between ">
          <h2 className="text-lg font-medium text-gray-800">{account.name}</h2>

          <LinkButton to="edit" icon={PencilIcon}>
            Edit
          </LinkButton>
        </div>

        <NewTransactionForm
          account={account}
          targetAccounts={targetAccounts}
          balanceChangeCategories={balanceChangeCategories}
        />
      </div>
      <table className="mt-8 w-full">
        <tbody>
          {ledgerDateGroups.groups.map((group) => (
            <Fragment key={group.date}>
              <tr className="border-t border-gray-200">
                <th className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">
                  {group.dateFormatted}
                </th>
                <td className="bg-gray-50 py-2 pl-3 pr-1 text-right text-sm font-medium text-gray-500">
                  {group.balanceFormatted}
                </td>
                <td> </td>
              </tr>
              {group.lines.map((line) => (
                <tr key={line.id} className="border-t border-gray-300">
                  <td className="py-4 pl-4 pr-3 text-sm  sm:pl-6">
                    <div className="text-gray-800">
                      {line.transaction.bookings
                        .filter((b) => b.id !== line.id)
                        .map((b) => {
                          switch (b.type) {
                            case BookingType.ACCOUNT_CHANGE:
                              return (
                                <Link
                                  key={b.id}
                                  to={`../accounts/${b.account!.slug}`}
                                >
                                  {b.account!.name}
                                </Link>
                              );
                            default:
                              return ""; // TODO support all booking types
                          }
                        })}
                    </div>
                    <div className="text-gray-500">{line.transaction.note}</div>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-1 text-right text-sm font-medium text-positive-600">
                    {line.amountFormatted}
                  </td>
                  <td className="w-20">
                    <Button
                      variant="secondary"
                      size="compact"
                      onClick={() => deleteTransaction(line.transaction.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
          <tr className="border-t border-gray-200">
            <th className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"></th>
            <td className="bg-gray-50 py-2 pl-3 pr-1 text-right text-sm font-medium text-gray-500">
              {ledgerDateGroups.initialPageBalanceFormatted}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      {deleteTransactionModal}
    </>
  );
}
