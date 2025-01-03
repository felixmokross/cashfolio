import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link } from "react-router";
import { LogoSmall } from "./base/icons/logo-small";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { MainMenu } from "./main-menu";
import type { ExtendedUserDto } from "~/users/types";

export type NavBarProps = {
  user?: ExtendedUserDto;
};

export function NavBar({ user }: NavBarProps) {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
            <div>
              <Link to="/">
                <span className="sr-only">Home</span>
                <LogoSmall className="h-8 w-8" />
              </Link>
            </div>
            <div>
              {user && (
                <DisclosureButton className="rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                  <span className="sr-only">Open Main Menu</span>
                  {open ? (
                    <XMarkIcon className="h-5 w-5" />
                  ) : (
                    <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                  )}
                </DisclosureButton>
              )}
            </div>
          </div>
          {user && (
            <DisclosurePanel>
              <MainMenu user={user} />
            </DisclosurePanel>
          )}
        </>
      )}
    </Disclosure>
  );
}
