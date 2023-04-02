import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/auth.server";
import { Button } from "~/components/button";
import { prisma } from "~/prisma.server";
import { getTitle } from "~/utils";

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  return json({
    accounts: await prisma.account.findMany({ where: { userId: user.id } }),
  });
}

export const meta: V2_MetaFunction = () => [{ title: getTitle("Accounts") }];

export default function AccountListPage() {
  const { accounts } = useLoaderData<typeof loader>();
  return (
    <div className="h-screen bg-slate-50">
      <h2 className="mt-4 text-center text-lg font-medium text-slate-700">
        Accounts
      </h2>

      <Button as={Link} to="new">
        New Account
      </Button>

      <ul className="mt-4 space-y-4">
        {accounts.map((a) => (
          <Account
            key={a.id}
            slug={a.slug}
            name={a.name}
            balance="EUR 10'000"
            balanceInRefCurrency="CHF 11'000"
          />
        ))}
      </ul>
    </div>
  );
}

type AccountProps = {
  slug: string;
  name: string;
  balance: string;
  balanceInRefCurrency?: string;
};

function Account({ slug, name, balance, balanceInRefCurrency }: AccountProps) {
  return (
    <li className="mx-2 flex h-20 items-stretch justify-between rounded-md border border-slate-300 bg-white px-4 py-2">
      <Link to={slug}>
        <h3 className="text-sm font-medium text-slate-700">{name}</h3>
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
