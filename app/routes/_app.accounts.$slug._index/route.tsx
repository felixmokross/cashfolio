import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/common/auth.server";
import { getAccount } from "~/accounts/functions.server";
import { Page } from "./page";
import { useLoaderData } from "@remix-run/react";
import { getReverseLedgerDateGroups } from "~/ledgers-lines/functions.server";
import { getTitle } from "~/common/utils";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.slug, "slug is required");
  const userId = await requireUserId(request);

  const account = await getAccount(params.slug, userId);
  if (!account) throw new Response("Not found", { status: 404 });

  const ledgerDateGroups = await getReverseLedgerDateGroups({
    account,
    page: 0, // TODO support pagination
    userId,
  });

  return {
    account,
    ledgerDateGroups,
  };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: getTitle(data!.account.name) },
];

export default function Route() {
  const { account, ledgerDateGroups } = useLoaderData<typeof loader>();

  return <Page account={account} ledgerDateGroups={ledgerDateGroups} />;
}
