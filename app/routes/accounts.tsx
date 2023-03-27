import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getUser } from "~/auth.server";
import { Button } from "~/components/button";
import { Input } from "~/components/forms";
import { prisma } from "~/prisma.server";

export async function action({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  const form = await request.formData();
  const name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  await prisma.account.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return json({ ok: true });
}

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  return json({
    accounts: await prisma.account.findMany({ where: { userId: user.id } }),
  });
}

export default function Accounts() {
  const { accounts } = useLoaderData<typeof loader>();
  return (
    <div className="h-screen bg-slate-50">
      <h2 className="mt-4 text-center text-lg font-medium text-slate-700">
        Accounts
      </h2>

      <ul className="mt-4 space-y-4">
        {accounts.map((a) => (
          <Account
            key={a.id}
            name={a.name}
            balance="EUR 10'000"
            balanceInRefCurrency="CHF 11'000"
          />
        ))}
      </ul>

      <Form method="post">
        <Input name="name" label="Name" />
        <Button type="submit">Create</Button>
      </Form>
    </div>
  );
}

type AccountProps = {
  name: string;
  balance: string;
  balanceInRefCurrency?: string;
};

function Account({ name, balance, balanceInRefCurrency }: AccountProps) {
  return (
    <li className="mx-2 flex h-20 items-stretch justify-between rounded-md border border-slate-300 bg-white px-4 py-2">
      <h3 className="text-sm font-medium text-slate-700">{name}</h3>
      <div className="text-right">
        <div className="text-lg text-slate-700">{balance}</div>
        {balanceInRefCurrency && (
          <div className="text-sm text-slate-400">{balanceInRefCurrency}</div>
        )}
      </div>
    </li>
  );
}
