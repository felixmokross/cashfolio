import { PlusIcon } from "@heroicons/react/20/solid";
import { AccountList } from "./account-list";
import { LinkButton } from "~/common/base/buttons/link-button";
import type { AccountDto } from "~/accounts/types";
import { PageHeader } from "~/common/page-header";

export type PageProps = {
  accounts: AccountDto[];
};

export function Page({ accounts }: PageProps) {
  return (
    <div className="px-4 sm:px-6">
      <PageHeader
        actions={
          <LinkButton to="new" icon={PlusIcon}>
            New
          </LinkButton>
        }
      >
        Accounts
      </PageHeader>

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
