import { PlusIcon } from "@heroicons/react/20/solid";
import { AccountList } from "./account-list";
import { LinkButton } from "~/components/link-button";
import type { AccountDto } from "~/accounts/types";

export type PageProps = {
  accounts: AccountDto[];
};

export function Page({ accounts }: PageProps) {
  return (
    <div className="px-4 sm:px-6">
      <div className="mt-4 flex items-baseline justify-between ">
        <h2 className="text-lg font-medium text-gray-800">Accounts</h2>

        <LinkButton to="new" icon={PlusIcon}>
          New
        </LinkButton>
      </div>

      <AccountList
        className="mt-4"
        accounts={accounts.map((a) => ({
          account: a,
          balance: "10000",
          balanceInRefCurrency: "11000",
        }))}
      />
    </div>
  );
}
