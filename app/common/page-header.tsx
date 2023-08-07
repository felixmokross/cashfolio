import type { PropsWithChildren, ReactNode } from "react";
import { PageHeading } from "./page-heading";

export type PageHeaderProps = PropsWithChildren<{
  actions?: ReactNode;
}>;

export function PageHeader({ children, actions }: PageHeaderProps) {
  return (
    <div className="flex items-baseline justify-between pt-4">
      <PageHeading>{children}</PageHeading>
      <div className="flex items-baseline gap-2">{actions}</div>
    </div>
  );
}
