import { PlusIcon, PresentationChartLineIcon } from "@heroicons/react/20/solid";
import { BanknotesIcon, BuildingOffice2Icon } from "@heroicons/react/20/solid";
import type { Account } from "@prisma/client";
import type {
  DataFunctionArgs,
  SerializeFrom,
  V2_MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
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

      <ul className="mt-4 space-y-4">
        {accounts.map((a) => (
          <AccountListItem
            key={a.id}
            account={a}
            balance="EUR 10'000"
            balanceInRefCurrency="CHF 11'000"
          />
        ))}
      </ul>
    </div>
  );
}

type AccountListItemProps = {
  account: Pick<SerializeFrom<Account>, "name" | "slug" | "unit">;
  balance: string;
  balanceInRefCurrency: string | undefined;
};

function AccountListItem({
  account,
  balance,
  balanceInRefCurrency,
}: AccountListItemProps) {
  return (
    <li className="">
      <Link
        to={account.slug}
        className="group inline-flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="text-slate-400 group-hover:text-slate-500">
            {account.unit === "CURRENCY" ? (
              <BanknotesIcon className="h-8 w-8" />
            ) : account.unit === "STOCK" ? (
              <PresentationChartLineIcon className="h-8 w-8" />
            ) : null}
          </div>
          <h3 className="text-sm font-semibold text-slate-700 group-hover:text-slate-800">
            {account.name}
          </h3>
        </div>
        <div className="text-right">
          <div className="text-lg text-slate-700">{balance}</div>
          {balanceInRefCurrency && (
            <div className="text-sm text-slate-400">{balanceInRefCurrency}</div>
          )}
        </div>
      </Link>
    </li>
  );
}
