import type {
  DataFunctionArgs,
  MetaFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUser } from "~/auth.server";
import { getTitle } from "~/utils";

export const loader = async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  return json({ user: user.auth0UserId });
};

export const meta: V2_MetaFunction = () => [{ title: getTitle("Other") }];

export default function Other() {
  return <h1>Other</h1>;
}
