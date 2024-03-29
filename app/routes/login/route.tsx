import type { LoaderFunction } from "react-router";
import { authorize } from "~/common/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return authorize(request);
};
