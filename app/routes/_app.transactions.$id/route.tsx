import type { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { requireUserId } from "~/common/auth.server";
import { deleteTransaction } from "~/transactions/functions.server";

export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await requireUserId(request);

  invariant(typeof params.id === "string", "id is required");
  await deleteTransaction(params.id, userId);

  return null;
}
