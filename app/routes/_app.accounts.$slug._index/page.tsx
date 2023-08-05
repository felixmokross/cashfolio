import { PencilIcon } from "@heroicons/react/20/solid";
import { BookingType } from "@prisma/client";
import type { BalanceChangeCategory } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Fragment, useState } from "react";
import { LinkButton } from "~/components/link-button";
import { NewTransactionForm } from "./new-transaction-form";
import { Link } from "~/components/link";
import { Button } from "~/components/button";
import Modal from "~/components/modal";
import { useFetcher } from "@remix-run/react";
import type { GetReverseLedgerDateGroupsResultDto } from "~/ledgers-lines/types";
import type { AccountDto } from "~/accounts/types";
import { PageHeader } from "~/components/page-header";

export type PageProps = {
  account: AccountDto;
  ledgerDateGroups: GetReverseLedgerDateGroupsResultDto;
  targetAccounts: AccountDto[];
  balanceChangeCategories: SerializeFrom<BalanceChangeCategory>[];
};

export function Page({
  account,
  targetAccounts,
  ledgerDateGroups,
  balanceChangeCategories,
}: PageProps) {
  const deleteTransaction = useFetcher();
  const [transactionToDelete, setTransactionToDelete] = useState<string>();

  return (
    <>
      <div className="px-4 sm:px-6">
        <PageHeader
          actions={
            <LinkButton to="edit" icon={PencilIcon}>
              Edit
            </LinkButton>
          }
        >
          {account.name}
        </PageHeader>

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
                      onClick={() =>
                        setTransactionToDelete(line.transaction.id)
                      }
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
      <Modal
        title="Delete Transaction"
        confirmButtonText="Delete"
        open={!!transactionToDelete || deleteTransaction.state !== "idle"}
        onDismiss={() => setTransactionToDelete(undefined)}
        onConfirm={() => {
          deleteTransaction.submit(null, {
            action: `/transactions/${transactionToDelete}`,
            method: "DELETE",
          });
          setTransactionToDelete(undefined);
        }}
        isBusy={deleteTransaction.state !== "idle"}
      >
        <p className="text-sm text-gray-500">
          Are you sure that you want to delete this transaction?
        </p>
      </Modal>
    </>
  );
}
