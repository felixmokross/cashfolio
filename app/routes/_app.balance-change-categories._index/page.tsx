import { PlusIcon } from "@heroicons/react/20/solid";
import type { BalanceChangeCategoryDto } from "~/balance-change-categories/types";
import { LinkButton } from "~/common/base/buttons/link-button";
import { Link } from "~/common/base/link";
import { Table } from "~/common/base/table";
import { PageHeader } from "~/common/page-header";

export type PageProps = {
  balanceChangeCategories: BalanceChangeCategoryDto[];
};

export function Page({ balanceChangeCategories }: PageProps) {
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
        Balance Change Categories
      </PageHeader>
      <Table
        columns={[
          {
            name: "Name",
            field: "name",
            render: (bcc) => <Link to={bcc.id}>{bcc.name}</Link>,
          },
          {
            name: "Type",
            field: "type",
          },
        ]}
        data={balanceChangeCategories}
        getRowId={(bcc) => bcc.id}
      />
    </div>
  );
}
