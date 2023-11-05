import type { DetailedHTMLProps } from "react";
import { useId, useRef } from "react";
import { Label } from "./label";
import { ErrorMessage } from "./error-message";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { cn } from "../../classnames";

export function Select({
  name,
  label,
  error,
  groupClassName,
  defaultValue,
  disabled,
  children,
}: SelectProps) {
  const id = `select-${useId()}`;
  const errorId = `select-error-${useId()}`;
  const selectRef = useRef<HTMLSelectElement>(null);
  return (
    <div className={groupClassName}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-1">
        <select
          id={id}
          name={name}
          className="block w-full rounded-md border-gray-300 bg-none py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 sm:text-sm"
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          ref={selectRef}
        >
          {children}
        </select>
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 flex items-center rounded-r-md px-2",
            disabled && "opacity-50",
          )}
        >
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <ErrorMessage error={error} errorId={errorId} />
    </div>
  );
}

export type SelectProps = {
  name: string;
  label: string;
  error?: string;
  groupClassName?: string;
} & Pick<
  DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
  "defaultValue" | "disabled" | "children" | "ref"
>;
