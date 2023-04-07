import type { DetailedHTMLProps, PropsWithChildren } from "react";
import { useState } from "react";
import { useId } from "react";
import {
  Combobox as HeadlessCombobox,
  RadioGroup as HeadlessRadioGroup,
} from "@headlessui/react";
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { cn } from "./classnames";
import { currencyItems } from "~/currencies";
import type { SerializeFrom } from "@remix-run/node";
import type { NumericFormatProps } from "react-number-format";
import { NumericFormat } from "react-number-format";
import { decimalSeparator, thousandSeparator } from "~/utils";

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
  className,
  adornment,
  ...props
}: InputProps) {
  const id = `input-${useId()}`;
  const errorId = `input-error-${useId()}`;
  return (
    <div className={groupClassName}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-1">
        {adornment && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-16 items-center pl-3 text-slate-500 sm:w-12 sm:text-sm">
            {adornment}
          </div>
        )}
        <input
          type={type || "text"}
          id={id}
          className={cn(
            "block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50 sm:text-sm",
            adornment && "pl-14 sm:pl-12",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
      </div>
      <ErrorMessage error={error} errorId={errorId} />
    </div>
  );
};

export type InputProps = {
  name?: string;
  label: string;
  error?: string;
  groupClassName?: string;
  adornment?: string;
} & DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type FormattedNumberInputProps = NumericFormatProps<InputProps>;

export function FormattedNumberInput({
  name,
  defaultValue,
  ...props
}: FormattedNumberInputProps) {
  const [value, setValue] = useState<number | undefined>(
    defaultValue != null ? Number(defaultValue) : undefined
  );
  return (
    <>
      <NumericFormat
        {...props}
        valueIsNumericString={true}
        defaultValue={defaultValue}
        onValueChange={({ floatValue }) => setValue(floatValue)}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        customInput={Input}
      />
      <input name={name} value={value} type="hidden" />
    </>
  );
}

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

export function Combobox({
  groupClassName,
  label,
  name,
  error,
  defaultValue,
  options,
  autoFocus,
  onChange,
}: ComboboxProps) {
  const [value, setValue] = useState(defaultValue || "");
  const [query, setQuery] = useState("");
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return (
            option.primaryText.toLowerCase().includes(query.toLowerCase()) ||
            (option.secondaryText &&
              option.secondaryText.toLowerCase().includes(query.toLowerCase()))
          );
        });

  const errorId = `combobox-error-${useId()}`;
  return (
    <HeadlessCombobox
      as="div"
      value={value}
      onChange={(v) => {
        setValue(v);
        onChange && onChange(v);
      }}
      name={name}
      className={groupClassName}
    >
      <HeadlessCombobox.Label className={labelClassName}>
        {label}
      </HeadlessCombobox.Label>
      <div className="relative mt-1">
        <HeadlessCombobox.Input
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50 sm:text-sm"
          displayValue={getDisplayName}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          autoFocus={autoFocus}
        />
        <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
          <ChevronUpDownIcon
            className="h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
        </HeadlessCombobox.Button>
        {filteredOptions.length > 0 && (
          <HeadlessCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <HeadlessCombobox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  cn(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-sky-600 text-white" : "text-slate-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={cn("truncate", selected && "font-semibold")}
                      >
                        {option.primaryText}
                      </span>
                      {option.secondaryText && (
                        <span
                          className={cn(
                            "ml-2 truncate text-slate-500",
                            active ? "text-sky-100" : "text-slate-500"
                          )}
                        >
                          {option.secondaryText}
                        </span>
                      )}
                    </div>

                    {selected && (
                      <span
                        className={cn(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-sky-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </HeadlessCombobox.Option>
            ))}
          </HeadlessCombobox.Options>
        )}
      </div>
      <ErrorMessage error={error} errorId={errorId} />
    </HeadlessCombobox>
  );

  function getDisplayName(v: string) {
    if (!v) return "";

    const option = options.find((o) => o.value === v);

    if (!option) return v;
    if (!option.secondaryText) return option.primaryText;

    return `${option.primaryText} (${option.secondaryText})`;
  }
}

export type ComboboxProps = {
  groupClassName?: string;
  label: string;
  name: string;
  error?: string;
  options: ComboboxOption[];
  onChange?: (value: string | number | readonly string[]) => void;
} & Pick<
  DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "defaultValue" | "ref" | "autoFocus"
>;

export type ComboboxOption = {
  primaryText: string;
  secondaryText?: string;
  value: string;
};

export function CurrencyCombobox({
  groupClassName,
  label,
  name,
  error,
  defaultValue,
  ...props
}: CurrencyComboboxProps) {
  return (
    <Combobox
      label={label}
      name={name}
      error={error}
      defaultValue={defaultValue}
      groupClassName={groupClassName}
      options={currencyItems.map((c) => ({
        primaryText: c.name,
        secondaryText: c.code,
        value: c.code,
      }))}
      {...props}
    />
  );
}

export type CurrencyComboboxProps = Omit<ComboboxProps, "options">;

export function RadioGroup<TValue extends string | undefined>({
  groupClassName,
  label,
  name,
  error,
  onChange,
  defaultValue,
  options,
  disabled = false,
}: RadioGroupProps<TValue>) {
  const [value, setValue] = useState(defaultValue);
  const errorId = `radio-group-error-${useId()}`;
  return (
    <HeadlessRadioGroup
      value={value}
      onChange={(value) => {
        setValue(value);
        onChange && onChange(value as TValue);
      }}
      className={groupClassName}
      name={name}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? errorId : undefined}
      disabled={disabled}
    >
      <HeadlessRadioGroup.Label className={labelClassName}>
        {label}
      </HeadlessRadioGroup.Label>
      <div className="mt-1 grid grid-cols-2 gap-x-3">
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ active, checked }) =>
              cn(
                "focus:outline-none",
                active ? "ring-2 ring-sky-500 ring-offset-2" : "",
                checked
                  ? "border-transparent bg-sky-600 text-white"
                  : "border-slate-200 bg-white text-slate-900",
                "flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium sm:flex-1",
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                !disabled && checked && "hover:bg-sky-700",
                !disabled && !checked && "hover:bg-slate-50"
              )
            }
          >
            <HeadlessRadioGroup.Label as="span">
              {option.label}
            </HeadlessRadioGroup.Label>
          </HeadlessRadioGroup.Option>
        ))}
      </div>
      <ErrorMessage error={error} errorId={errorId} />
    </HeadlessRadioGroup>
  );
}

export type RadioGroupProps<TValue extends string | undefined> = {
  groupClassName?: string;
  label: string;
  name: string;
  error?: string;
  defaultValue?: string;
  onChange?: (value: TValue) => void;
  options: { label: string; value: TValue }[];
  disabled?: boolean;
};

export function DetailedRadioGroup<TValue extends string | undefined>({
  defaultValue,
  onChange,
  groupClassName,
  label,
  options,
  error,
  name,
  disabled = false,
}: DetailedRadioGroupProps<TValue>) {
  const [value, setValue] = useState(defaultValue);
  const errorId = `detailed-radio-group-error-${useId()}`;
  return (
    <HeadlessRadioGroup
      value={value}
      onChange={(value) => {
        setValue(value);
        onChange && onChange(value as TValue);
      }}
      className={groupClassName}
      name={name}
      disabled={disabled}
    >
      <HeadlessRadioGroup.Label className={labelClassName}>
        {label}
      </HeadlessRadioGroup.Label>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ checked, active }) =>
              cn(
                checked ? "border-transparent" : "border-slate-300",
                active ? "border-sky-500 ring-2 ring-sky-500" : "",
                "relative flex rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <HeadlessRadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-slate-900"
                    >
                      {option.label}
                    </HeadlessRadioGroup.Label>
                    <HeadlessRadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-slate-500"
                    >
                      {option.description}
                    </HeadlessRadioGroup.Description>
                  </span>
                </span>
                <CheckCircleIcon
                  className={cn(
                    !checked ? "invisible" : "",
                    "h-5 w-5 text-sky-600"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    active ? "border" : "border-2",
                    checked ? "border-sky-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </div>
      <ErrorMessage error={error} errorId={errorId} />
    </HeadlessRadioGroup>
  );
}

export type DetailedRadioGroupProps<TValue extends string | undefined> = {
  groupClassName?: string;
  label: string;
  name: string;
  error?: string;
  defaultValue?: string;
  onChange?: (value: TValue) => void;
  options: { label: string; description: string; value: TValue }[];
  disabled?: boolean;
};

export type FormActionData<TValues> = {
  ok: boolean;
  values?: TValues;
  errors?: FormErrors<TValues>;
};

export type FormProps<TValues, TFormLoaderData> = {
  values?: TValues;
  errors?: FormErrors<TValues>;
  disabled: boolean;
  data: SerializeFrom<TFormLoaderData>;
};

// inspired by Formik
export type FormErrors<Values> = {
  [K in keyof Values]?: Values[K] extends unknown[]
    ? Values[K][number] extends object
      ? FormErrors<Values[K][number]>[]
      : string
    : Values[K] extends object
    ? FormErrors<Values[K]>
    : string;
} & { form?: string };
