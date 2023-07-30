import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { type PropsWithChildren } from "react";
import { cn } from "./classnames";

type AlertProps = PropsWithChildren<{
  className?: string;
  onDismiss: () => void;
}>;

export function Alert({ children, className, onDismiss }: AlertProps) {
  return (
    <div className={cn("rounded-md bg-emerald-50 p-4", className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-emerald-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-emerald-800">{children}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-emerald-50 p-1.5 text-emerald-500 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-emerald-50"
              onClick={() => onDismiss()}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
