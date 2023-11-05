import { PencilIcon, PlusIcon } from "@heroicons/react/20/solid";
import { BookingType } from "@prisma/client";
import type { BalanceChangeCategory } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Fragment, useState } from "react";
import { LinkButton } from "~/common/base/buttons/link-button";
import { Link } from "~/common/base/link";
import Modal from "~/common/base/modal";
import { useFetcher } from "@remix-run/react";
import type { GetReverseLedgerDateGroupsResultDto } from "~/ledgers-lines/types";
import type { AccountDto } from "~/accounts/types";
import { PageHeader } from "~/common/page-header";
import { Dropdown, DropdownItem } from "~/common/base/dropdown";

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
            <>
              <LinkButton
                variant="primary"
                to={`/transactions/new?account=${account.slug}`}
                icon={PlusIcon}
              >
                New Transaction
              </LinkButton>
              <LinkButton to="edit" icon={PencilIcon}>
                Edit
              </LinkButton>
            </>
          }
        >
          {account.name}
        </PageHeader>
      </div>
      <table className="mt-4 w-full">
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
                  <td className="w-6 pl-1">
                    <Dropdown>
                      <DropdownItem
                        onClick={() =>
                          setTransactionToDelete(line.transaction.id)
                        }
                      >
                        Delete
                      </DropdownItem>
                    </Dropdown>
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
