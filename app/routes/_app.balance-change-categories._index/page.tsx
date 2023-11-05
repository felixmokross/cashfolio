import { PlusIcon } from "@heroicons/react/20/solid";
import type { BalanceChangeCategoryDto } from "~/balance-change-categories/types";
import { LinkButton } from "~/common/base/buttons/link-button";
import { Link } from "~/common/base/link";
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
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Name
            </th>
            <th
              scope="col"
              className="py-3.5 pr-4 pl-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
            >
              Type
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {balanceChangeCategories.map((bcc) => (
            <tr key={bcc.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <Link to={bcc.id}>{bcc.name}</Link>
              </td>
              <td className="whitespace-nowrap py-4 pr-4 pl-3 text-sm text-gray-500 sm:pr-6">
                {bcc.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
