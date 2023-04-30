import { Disclosure } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { LogoSmall } from "./icons/logo-small";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import type { MainMenuProps } from "./main-menu";
import { MainMenu } from "./main-menu";

export type NavBarProps = {
  user: MainMenuProps["user"];
};

export function NavBar({ user }: NavBarProps) {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
            <div>
              <Link to="/">
                <span className="sr-only">Home</span>
                <LogoSmall className="h-8 w-8" />
              </Link>
            </div>
            <div>
              <Disclosure.Button className="rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                <span className="sr-only">Open Main Menu</span>
                {open ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>
          <Disclosure.Panel>
            <MainMenu user={user} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
