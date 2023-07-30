import type { User } from "@prisma/client";
import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect , json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { Form, Link } from "react-router-dom";
import { authorize } from "~/auth.server";
import { Button } from "~/components/button";
import { LogoSmall } from "~/components/icons/logo-small";
import {
  getLocales,
  getLocalesWithDisplayName,
  getSuggestedCurrencyForLocale,
} from "~/locales.server";
import { createUser, getUserIdByAuth0UserId } from "~/models/users.server";
import { getSession } from "~/session.server";
import { safeRedirect , getTitle } from "~/utils";
import { pick } from "accept-language-parser";
import { CurrencyCombobox } from "~/components/forms/currency-combobox";
import type { FormErrors } from "~/components/forms/types";
import { LocaleCombobox } from "~/components/forms/locale-combobox";
import { hasErrors } from "~/utils.server";

type ActionData = {
  errors: FormErrors<SignupValues>;
  values: SignupValues;
};

type SignupValues = Partial<Pick<User, "refCurrency" | "preferredLocale">>;

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

export default function Signup() {
  const { locales, suggestedLocale, suggestedCurrency } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className=" w-full px-4 py-10">
      <Form method="post" noValidate className="mx-auto flex max-w-sm flex-col">
        <Link to="/" aria-label="Home">
          <LogoSmall className="h-10 w-auto" />
        </Link>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">
          Complete Signup
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          <LocaleCombobox
            label="Currency and Date Format"
            name="preferredLocale"
            defaultValue={actionData?.values.preferredLocale || suggestedLocale}
            autoFocus={true}
            error={actionData?.errors?.preferredLocale}
            locales={locales}
          />

          <CurrencyCombobox
            label="Main Currency"
            name="refCurrency"
            defaultValue={actionData?.values.refCurrency || suggestedCurrency}
            error={actionData?.errors?.refCurrency}
          />
        </div>
        <Button type="submit" variant="primary" className="mt-10">
          Start Using Cashfolio
        </Button>
      </Form>
    </div>
  );
}

function getSuggestedLocale(request: Request) {
  const acceptLanguageHeader = request.headers.get("accept-language");
  if (!acceptLanguageHeader) return undefined;

  return pick(getLocales(), acceptLanguageHeader) || undefined;
}
