import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ActionData } from "./settings-page";
import { SettingsPage } from "./settings-page";
import { getLocalesWithDisplayName } from "~/locales.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
import { updateUser } from "~/models/users.server";
import { getSession } from "~/session.server";
import { sessionStorage } from "~/session.server";

export async function loader({ request }: DataFunctionArgs) {
  const session = await getSession(request);
  const message = session.get("message") as string | undefined;
  console.log("hello ");

  return json(
    {
      message,
      locales: getLocalesWithDisplayName(),
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    }
  );
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const preferredLocale = formData.get("preferredLocale");
  const refCurrency = formData.get("refCurrency");
  const session = await getSession(request);

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

  session.flash("message", "Settings updated successfully");

  return redirect(".", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function Route() {
  const { message, locales } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <SettingsPage message={message} locales={locales} actionData={actionData} />
  );
}
