import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/common/auth.server";
import { getAccounts } from "~/accounts/functions.server";
import { getTitle } from "~/common/utils";
import { Page } from "./page";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  return { accounts: await getAccounts(userId) };
}

export const meta: MetaFunction = () => [{ title: getTitle("Accounts") }];

export default function Route() {
  const { accounts } = useLoaderData<typeof loader>();
  return <Page accounts={accounts} />;
}
