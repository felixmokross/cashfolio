import { PlusIcon } from "@heroicons/react/20/solid";
import type { AssetClassDto } from "~/asset-classes/types";
import { LinkButton } from "~/common/base/buttons/link-button";
import { Link } from "~/common/base/link";
import { Table } from "~/common/base/table";
import { PageHeader } from "~/common/page-header";

export type PageProps = {
  assetClasses: AssetClassDto[];
};

export function Page({ assetClasses }: PageProps) {
  return (
    <div className="space-y-4">
      <PageHeader
        className="px-4 sm:px-6"
        actions={
          <LinkButton to="new" icon={PlusIcon}>
            New
          </LinkButton>
        }
      >
        Asset Classes
      </PageHeader>
      <Table
        columns={[
          {
            name: "Name",
            field: "name",
            render: (a) => <Link to={a.id}>{a.name}</Link>,
          },
        ]}
        data={assetClasses}
        getRowId={(a) => a.id}
      />
    </div>
  );
}
