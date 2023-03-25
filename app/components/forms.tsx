import type { DetailedHTMLProps, PropsWithChildren } from "react";
import { useId } from "react";

const labelClassName = "block text-sm font-medium text-slate-700";

function Label({ htmlFor, children }: PropsWithChildren<LabelProps>) {
  return (
    <label htmlFor={htmlFor} className={labelClassName}>
      {children}
    </label>
  );
}

type LabelProps = {
  htmlFor: string;
};

function ErrorMessage({ error, errorId }: ErrorMessageProps) {
  if (!error) return null;
  return (
    <p className="mt-2 text-sm text-rose-600" id={errorId}>
      {error}
    </p>
  );
}

type ErrorMessageProps = { error?: string; errorId: string };

export const Input = function Input({
  label,
  error,
  groupClassName,
  type,
  ...props
}: InputProps) {
  const id = `input-${useId()}`;
  const errorId = `input-error-${useId()}`;
  return (
    <div className={groupClassName}>
      <Label htmlFor={id}>{label}</Label>
      <input
        type={type || "text"}
        id={id}
        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50 sm:text-sm"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      <ErrorMessage error={error} errorId={errorId} />
    </div>
  );
};

export type InputProps = {
  name: string;
  label: string;
  error?: string;
  groupClassName?: string;
} & DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

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
  return (
    <div className={groupClassName}>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        name={name}
        className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50 sm:text-sm"
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
      >
        {children}
      </select>
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
