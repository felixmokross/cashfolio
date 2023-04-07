import type { User } from "@prisma/client";
import type {
  ActionFunction,
  DataFunctionArgs,
  V2_MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { Form, Link } from "react-router-dom";
import { authorize } from "~/auth.server";
import { Button } from "~/components/button";
import type { FormErrors } from "~/components/forms";
import { Combobox } from "~/components/forms";
import { CurrencyCombobox } from "~/components/forms";
import { LogoSmall } from "~/components/logo";
import { getLocales, getLocalesWithDisplayName } from "~/locales.server";
import { createUser, getUserIdByAuth0UserId } from "~/models/users.server";
import { getSession } from "~/session.server";
import { safeRedirect } from "~/utils";
import { getTitle } from "~/utils";
import { pick } from "accept-language-parser";

type ActionData = {
  errors: FormErrors<SignupValues>;
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

  return json({
    locales: getLocalesWithDisplayName(),
    suggestedLocale: getSuggestedLocale(request) || "en",
  });
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const preferredLocale = formData.get("preferredLocale");
  const refCurrency = formData.get("refCurrency");

  const redirectTo = safeRedirect(
    new URL(request.url).searchParams.get("redirectTo")
  );

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

  const session = await getSession(request);
  const userId = session.get("userId");

  await createUser({
    auth0UserId: userId,
    refCurrency,
    preferredLocale,
  });

  return redirect(redirectTo);
};

export const meta: V2_MetaFunction = () => [
  { title: getTitle("Complete Signup") },
];

export default function Signup() {
  const { locales, suggestedLocale } = useLoaderData<typeof loader>();
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
          <Combobox
            label="Preferred Locale"
            name="preferredLocale"
            options={locales.map(([locale, displayName]) => ({
              value: locale,
              primaryText: displayName,
              secondaryText: locale,
            }))}
            defaultValue={suggestedLocale}
            autoFocus={true}
            error={actionData?.errors?.preferredLocale}
          />

          <CurrencyCombobox
            label="Main Currency"
            name="refCurrency"
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
