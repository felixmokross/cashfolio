import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { authorize } from "~/auth.server";
import {
  getLocales,
  getLocalesWithDisplayName,
  getSuggestedCurrencyForLocale,
} from "~/locales.server";
import { createUser, getUserIdByAuth0UserId } from "~/models/users.server";
import { getSession } from "~/session.server";
import { safeRedirect, getTitle } from "~/utils";
import { pick } from "accept-language-parser";
import type { FormErrors } from "~/components/forms/types";
import { hasErrors } from "~/utils.server";
import type { SignupValues } from "./types";
import { Page } from "./page";

type ActionData = {
  errors: FormErrors<SignupValues>;
  values: SignupValues;
};

export async function loader({ request }: DataFunctionArgs) {
  const session = await getSession(request);
  const userId = session.get("userId");
  if (!userId) {
    return await authorize(request, "signup");
  }

  const user = await getUserIdByAuth0UserId(userId);
  if (user) {
    return redirect(
      safeRedirect(new URL(request.url).searchParams.get("redirectTo"))
    );
  }

  const suggestedLocale = getSuggestedLocale(request);

  return json({
    locales: getLocalesWithDisplayName(),
    suggestedLocale: suggestedLocale || "en",
    suggestedCurrency:
      (suggestedLocale && getSuggestedCurrencyForLocale(suggestedLocale)) ||
      "USD",
  });
}

export const action = async ({ request }: DataFunctionArgs) => {
  const formData = await request.formData();

  const redirectTo = safeRedirect(
    new URL(request.url).searchParams.get("redirectTo")
  );

  const values = getSignupValues(formData);
  const errors = validateSignupValues(values);

  if (hasErrors(errors)) {
    return json<ActionData>({ errors, values }, { status: 400 });
  }

  const session = await getSession(request);
  const userId = session.get("userId");

  await createUser({
    auth0UserId: userId,
    refCurrency: values.refCurrency!,
    preferredLocale: values.preferredLocale!,
  });

  return redirect(redirectTo);
};

function getSignupValues(formData: FormData) {
  const preferredLocale = formData.get("preferredLocale");
  const refCurrency = formData.get("refCurrency");
  return {
    preferredLocale:
      typeof preferredLocale === "string" ? preferredLocale : undefined,
    refCurrency: typeof refCurrency === "string" ? refCurrency : undefined,
  } as SignupValues;
}

function validateSignupValues({ preferredLocale, refCurrency }: SignupValues) {
  const errors: FormErrors<SignupValues> = {};

  if (!preferredLocale || preferredLocale.length === 0) {
    errors.preferredLocale = "Preferred locale is required";
  }

  if (!refCurrency || refCurrency.length === 0) {
    errors.refCurrency = "Main currency is required";
  }

  return errors;
}

export const meta: V2_MetaFunction = () => [
  { title: getTitle("Complete Signup") },
];

export default function Route() {
  const { locales, suggestedLocale, suggestedCurrency } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <Page
      suggestedLocale={suggestedLocale}
      suggestedCurrency={suggestedCurrency}
      locales={locales}
      values={actionData?.values}
      errors={actionData?.errors}
    />
  );
}

function getSuggestedLocale(request: Request) {
  const acceptLanguageHeader = request.headers.get("accept-language");
  if (!acceptLanguageHeader) return undefined;

  return pick(getLocales(), acceptLanguageHeader) || undefined;
}
