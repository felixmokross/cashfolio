import type { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import { Button } from "~/components/button";
import { Input } from "~/components/forms";
import { LogoSmall } from "~/components/logo";
import { getTitle } from "~/utils";

export const meta: MetaFunction = () => ({ title: getTitle("Sign Up") });

export default function Signup() {
  return (
    <div className=" w-full px-4 py-10">
      <div className="mx-auto flex max-w-sm flex-col">
        <Link to="/" aria-label="Home">
          <LogoSmall className="h-10 w-auto" />
        </Link>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Get Started with Cashfolio
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          <Input label="Email Address" type="text" name="email" />
          <Input label="Password" type="password" name="password" />
        </div>
        <Button variant="primary" className="mt-10">
          Sign Up
        </Button>
      </div>
    </div>
  );
}
