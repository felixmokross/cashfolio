import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ActionData, SettingsValues } from "./settings-page";
import { SettingsPage } from "./settings-page";
import { getLocalesWithDisplayName } from "~/locales.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
import { updateUser } from "~/models/users.server";
import { getSession } from "~/session.server";
import { sessionStorage } from "~/session.server";
import type { FormErrors } from "~/components/forms/types";
import { hasErrors } from "~/utils.server";

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
  const session = await getSession(request);

  const values = getSettingsValues(formData);
  const errors = validateSettingsValues(values);

  if (hasErrors(errors)) {
    return json<ActionData>({ errors, values }, { status: 400 });
  }

  const userId = await requireUserId(request);
  await updateUser(userId, {
    preferredLocale: values.preferredLocale!,
    refCurrency: values.refCurrency!,
  });

  session.flash("message", "Settings updated successfully");

  return redirect(".", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

function getSettingsValues(formData: FormData) {
  const preferredLocale = formData.get("preferredLocale");
  const refCurrency = formData.get("refCurrency");
  return {
    preferredLocale:
      typeof preferredLocale === "string" ? preferredLocale : undefined,
    refCurrency: typeof refCurrency === "string" ? refCurrency : undefined,
  } as SettingsValues;
}

function validateSettingsValues({
  preferredLocale,
  refCurrency,
}: SettingsValues) {
  const errors: FormErrors<SettingsValues> = {};

  if (!preferredLocale || preferredLocale.length === 0) {
    errors.preferredLocale = "Preferred locale is required";
  }

  if (!refCurrency || refCurrency.length === 0) {
    errors.refCurrency = "Main currency is required";
  }

  return errors;
}

export default function Route() {
  const { message, locales } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <SettingsPage message={message} locales={locales} actionData={actionData} />
  );
}
