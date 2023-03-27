import type { User } from "@prisma/client";
import type {
  ActionFunction,
  DataFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { Form, Link } from "react-router-dom";
import { authorize } from "~/auth.server";
import { Button } from "~/components/button";
import { Input } from "~/components/forms";
import { LogoSmall } from "~/components/logo";
import { createUser, getUserByAuth0UserId } from "~/models/users.server";
import { getSession } from "~/session.server";
import type { FormErrors } from "~/utils";
import { safeRedirect } from "~/utils";
import { getTitle } from "~/utils";

type ActionData = {
  errors: FormErrors<SignupValues>;
};

type SignupValues = Partial<Pick<User, "preferredLocale">>;

export async function loader({ request }: DataFunctionArgs) {
  const session = await getSession(request);
  const userId = session.get("userId");
  if (!userId) {
    return authorize(request, "signup");
  }

  const user = await getUserByAuth0UserId(userId);
  if (user) {
    return redirect(
      safeRedirect(new URL(request.url).searchParams.get("redirectTo"))
    );
  }

  return null;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const preferredLocale = formData.get("preferredLocale");
  const redirectTo = safeRedirect(
    new URL(request.url).searchParams.get("redirectTo")
  );

  if (typeof preferredLocale !== "string" || preferredLocale.length < 2) {
    return json<ActionData>(
      {
        errors: {
          preferredLocale: "Preferred locale must have at least 2 characters",
        },
      },
      { status: 400 }
    );
  }

  const session = await getSession(request);
  const userId = session.get("userId");

  await createUser({ auth0UserId: userId, preferredLocale });

  return redirect(redirectTo);
};

export const meta: MetaFunction = () => ({ title: getTitle("Sign Up") });

export default function Signup() {
  const actionData = useActionData() as ActionData;
  return (
    <div className=" w-full px-4 py-10">
      <Form method="post" noValidate className="mx-auto flex max-w-sm flex-col">
        <Link to="/" aria-label="Home">
          <LogoSmall className="h-10 w-auto" />
        </Link>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Get Started with Cashfolio
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            label="Preferred Locale"
            type="text"
            name="preferredLocale"
            autoFocus={true}
            error={actionData?.errors?.preferredLocale}
          />
        </div>
        <Button type="submit" variant="primary" className="mt-10">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
