import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ActionData } from "./settings-page";
import { SettingsPage } from "./settings-page";
import { getLocalesWithDisplayName } from "~/locales.server";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
import { updateUser } from "~/models/users.server";

export async function loader() {
  return json({
    locales: getLocalesWithDisplayName(),
  });
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const preferredLocale = formData.get("preferredLocale");
  const refCurrency = formData.get("refCurrency");

  if (typeof preferredLocale !== "string" || preferredLocale.length === 0) {
    return json<ActionData>(
      { errors: { preferredLocale: "Preferred locale is required" } },
      { status: 400 }
    );
  }

  if (typeof refCurrency !== "string" || refCurrency.length === 0) {
    return json<ActionData>(
      { errors: { refCurrency: "Main currency is required" } },
      { status: 400 }
    );
  }

  const userId = await requireUserId(request);
  await updateUser(userId, { preferredLocale, refCurrency });

  return redirect(".");
}

export default function Route() {
  const { locales } = useLoaderData<typeof loader>();
  const actionData = useLoaderData<ActionData>();
  return <SettingsPage locales={locales} actionData={actionData} />;
}
