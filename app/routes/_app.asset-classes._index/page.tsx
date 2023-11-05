import { PlusIcon } from "@heroicons/react/20/solid";
import type { AssetClassDto } from "~/asset-classes/types";
import { LinkButton } from "~/common/base/buttons/link-button";
import { Link } from "~/common/base/link";
import { PageHeader } from "~/common/page-header";

export type PageProps = {
  assetClasses: AssetClassDto[];
};

export default function Page({ assetClasses }: PageProps) {
  return (
    <div className="px-4 sm:px-6">
      <PageHeader
        actions={
          <LinkButton to="new" icon={PlusIcon}>
            New
          </LinkButton>
        }
      >
        Asset Classes
      </PageHeader>
      <ul className="mt-4 space-y-4">
        {assetClasses.map((a) => (
          <li key={a.id}>
            <Link to={a.id}>{a.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
