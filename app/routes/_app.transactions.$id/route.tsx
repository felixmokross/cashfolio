import type { DataFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { deleteTransaction } from "~/transactions/functions.server";

export async function action({ request, params }: DataFunctionArgs) {
  const userId = await requireUserId(request);

  invariant(typeof params.id === "string", "id is required");
  await deleteTransaction(params.id, userId);

  return null;
}
