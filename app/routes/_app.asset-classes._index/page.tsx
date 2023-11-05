import { PlusIcon } from "@heroicons/react/20/solid";
import type { AssetClassDto } from "~/asset-classes/types";
import { LinkButton } from "~/common/base/buttons/link-button";
import { Link } from "~/common/base/link";
import { PageHeader } from "~/common/page-header";

export type PageProps = {
  assetClasses: AssetClassDto[];
};

export function Page({ assetClasses }: PageProps) {
  return (
    <div className="space-y-2">
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
      <table className="min-w-full divide-y divide-gray-300">
        <tbody className="divide-y divide-gray-200 bg-white">
          {assetClasses.map((a) => (
            <tr key={a.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <Link to={a.id}>{a.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
