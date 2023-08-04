import type { Meta, StoryObj } from "@storybook/react";
import { App } from "./app";
import { unstable_createRemixStub } from "@remix-run/testing";
import { Navigate } from "react-router-dom";
import { AccountListPage } from "../_app.accounts._index/account-list-page";
import { NewAccountPage } from "../_app.accounts.new/new-account-page";
import type { SerializeFrom } from "@remix-run/node";
import type { ExtendedUser } from "~/auth.server";
import { buildAccountDto } from "~/accounts/builders";
import { buildExtendedUserDto } from "~/users/builders";

const meta: Meta<typeof App> = {
  title: "routes/_app/App",
  component: App,
  decorators: [
    (Story) => {
      const RemixStub = unstable_createRemixStub([
        {
          element: <Story />,
          children: [
            { path: "/", element: <Navigate to="/accounts" /> },
            {
              path: "/accounts",
              element: (
                <AccountListPage
                  accounts={[
                    buildAccountDto({ name: "Checking" }),
                    buildAccountDto({ name: "Savings" }),
                    buildAccountDto({ name: "Foreign", currency: "EUR" }),
                  ]}
                />
              ),
            },
            {
              path: "/accounts/new",
              element: (
                <NewAccountPage
                  data={{ assetClasses: [] }}
                  errors={{}}
                  values={undefined}
                />
              ),
            },
            {
              path: "/*",
              element: <p>Unsupported route</p>,
            },
          ],
        },
      ]);
      return <RemixStub />;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof App>;

export const Default: Story = {
  args: {
    user: buildExtendedUserDto(),
  },
};
