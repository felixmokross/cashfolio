import { PlusIcon } from "@heroicons/react/20/solid";
import { LinkButton } from "~/common/base/buttons/link-button";
import { Link } from "~/common/base/link";
import { Table } from "~/common/base/table";
import { PageHeader } from "~/common/page-header";
import type { IncomeCategoryDto } from "~/income-categories/types";

export type PageProps = {
  incomeCategories: IncomeCategoryDto[];
};

export function Page({ incomeCategories }: PageProps) {
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
        Income Categories
      </PageHeader>
      <Table
        columns={[
          {
            name: "Name",
            field: "name",
            render: (bcc) => <Link to={bcc.id.toString()}>{bcc.name}</Link>,
          },
        ]}
        data={incomeCategories}
        getRowId={(bcc) => bcc.id}
      />
    </div>
  );
}
