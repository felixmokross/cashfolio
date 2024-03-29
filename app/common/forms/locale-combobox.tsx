import { useMemo, useState } from "react";
import type { ComboboxProps } from "../base/forms/combobox";
import { Combobox } from "../base/forms/combobox";

export type LocaleComboboxProps = Omit<
  ComboboxProps,
  "options" | "onChange"
> & {
  defaultValue?: string;
  locales: [string, string][];
  formattingSampleDate: Date;
};

export function LocaleCombobox({
  locales,
  defaultValue,
  groupClassName,
  formattingSampleDate,
  ...props
}: LocaleComboboxProps) {
  const [locale, setLocale] = useState(defaultValue);
  const formattingSamples = useMemo(
    () => [
      new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
        formattingSampleDate,
      ),
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
      }).format(45_678.9),
    ],
    [locale, formattingSampleDate],
  );

  return (
    <div className={groupClassName}>
      <Combobox
        {...props}
        defaultValue={defaultValue}
        options={locales.map(([locale, displayName]) => ({
          value: locale,
          primaryText: displayName,
          secondaryText: locale,
        }))}
        onChange={(value) => setLocale(value as string)}
      />
      <div className="mt-4 flex justify-center gap-3 text-xs text-gray-500">
        <div>{formattingSamples[0]}</div>
        <div>$ {formattingSamples[1]}</div>
      </div>
    </div>
  );
}
