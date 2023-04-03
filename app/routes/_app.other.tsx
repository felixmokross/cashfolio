import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/auth.server";
import { getTitle } from "~/utils";

export const loader = async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  return json({ userId });
};

export const meta: V2_MetaFunction = () => [{ title: getTitle("Other") }];

export default function Other() {
  return <h1>Other</h1>;
}
