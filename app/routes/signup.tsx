import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { Form, Link } from "react-router-dom";
import { Button } from "~/components/button";
import { Input } from "~/components/forms";
import { LogoSmall } from "~/components/logo";
import { createUser, getUserByEmail } from "~/models/users.server";
import { createUserSession } from "~/session.server";
import type { FormErrors } from "~/utils";
import { safeRedirect } from "~/utils";
import { validateEmail } from "~/utils";
import { getTitle } from "~/utils";

type ActionData = {
  errors: FormErrors<SignupValues>;
};

type SignupValues = {
  email?: string;
  password?: string;
};

const defaultRedirectTo = "/";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(
    formData.get("redirectTo"),
    defaultRedirectTo
  );

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email address is invalid" } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "A user already exists with this email" } },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);
  // TODO also create user at IP

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
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
            label="Email Address"
            type="text"
            name="email"
            autoComplete="email"
            autoFocus={true}
            error={actionData?.errors?.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="password"
            error={actionData?.errors.password}
          />
        </div>
        <Button type="submit" variant="primary" className="mt-10">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
