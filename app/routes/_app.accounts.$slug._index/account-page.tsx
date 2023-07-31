import { PencilIcon } from "@heroicons/react/20/solid";
import type { Account } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { LinkButton } from "~/components/link-button";

export type AccountPageProps = {
  account: SerializeFrom<Account>;
};

export function AccountPage({ account }: AccountPageProps) {
  return (
    <div className="px-4">
      <div className="mt-4 flex items-baseline justify-between ">
        <h2 className="text-lg font-medium text-slate-800">{account.name}</h2>

        <LinkButton to="edit" icon={PencilIcon}>
          Edit
        </LinkButton>
      </div>
      Content
    </div>
  );
}
