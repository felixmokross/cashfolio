import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import type { ActionData, SettingsValues } from "./page";
import { Page } from "./page";
import { getLocalesWithDisplayName } from "~/common/locales.server";
import {
  data,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router";
import { requireUserId } from "~/common/auth.server";
import { updateUser } from "~/users/functions.server";
import { getSession, sessionStorage } from "~/common/session.server";
import type { FormErrors } from "~/common/forms/types";
import { hasErrors } from "~/common/utils.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const message = session.get("message") as string | undefined;

  return data(
    {
      message,
      locales: getLocalesWithDisplayName(),
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const session = await getSession(request);

  const values = getSettingsValues(formData);
  const errors = validateSettingsValues(values);

  if (hasErrors(errors)) {
    return data<ActionData>({ errors, values }, { status: 400 });
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
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const { state } = useNavigation();
  return (
    <Page
      message={loaderData.message}
      locales={loaderData.locales}
      actionData={actionData}
      onAlertDismiss={() => navigate(".", { replace: true })}
      state={state}
      formattingSampleDate={new Date()}
    />
  );
}
