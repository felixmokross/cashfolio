import { PlusIcon } from "@heroicons/react/20/solid";
import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
import { AccountList } from "~/components/accounts/account-list";
import { Button } from "~/components/button";
import { getAccounts } from "~/models/accounts.server";
import { getTitle } from "~/utils";

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  return json({
    accounts: await getAccounts(userId),
  });
}

export const meta: V2_MetaFunction = () => [{ title: getTitle("Accounts") }];

export default function AccountListPage() {
  const { accounts } = useLoaderData<typeof loader>();
  return (
    <div className="px-4">
      <div className="mt-4 flex items-baseline justify-between ">
        <h2 className="text-lg font-medium text-slate-800">Accounts</h2>

        {/* TODO Introduce Icon button */}
        <Button as={Link} to="new" className="inline-flex items-center gap-1.5">
          <PlusIcon className="-ml-1.5 h-4 w-4" />
          New
        </Button>
      </div>

      <AccountList
        className="mt-4"
        refCurrency="CHF"
        accounts={accounts.map((a) => ({
          account: a,
          balance: "10000",
          balanceInRefCurrency: "11000",
        }))}
      />
    </div>
  );
}
