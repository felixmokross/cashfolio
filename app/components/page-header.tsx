import type { PropsWithChildren, ReactNode } from "react";
import { PageHeading } from "./page-heading";

export type PageHeaderProps = PropsWithChildren<{
  actions?: ReactNode;
}>;

export function PageHeader({ children, actions }: PageHeaderProps) {
  return (
    <div className="mt-4 flex items-baseline justify-between">
      <PageHeading>{children}</PageHeading>
      {actions}
    </div>
  );
}
