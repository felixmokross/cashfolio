import { PlusIcon } from "@heroicons/react/20/solid";
import type { Account } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/button";
import { AccountList } from "./account-list";

export type AccountListPageProps = {
  accounts: SerializeFrom<Account>[];
};

export function AccountListPage({ accounts }: AccountListPageProps) {
  return (
    <div className="px-4">
      <div className="mt-4 flex items-baseline justify-between ">
        <h2 className="text-lg font-medium text-slate-800">Accounts</h2>

        <Button as={Link} to="new" icon={PlusIcon}>
          New
        </Button>
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
