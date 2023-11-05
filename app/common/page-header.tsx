import type { PropsWithChildren, ReactNode } from "react";
import { PageHeading } from "./page-heading";
import { cn } from "./base/classnames";

export type PageHeaderProps = PropsWithChildren<{
  actions?: ReactNode;
  className?: string;
}>;

export function PageHeader({ children, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-baseline justify-between pt-4", className)}>
      <PageHeading>{children}</PageHeading>
      <div className="flex items-baseline gap-2">{actions}</div>
    </div>
  );
}
