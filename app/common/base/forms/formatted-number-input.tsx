import type { NumericFormatProps } from "react-number-format";
import { NumericFormat } from "react-number-format";
import type { InputProps } from "./input";
import { Input } from "./input";
import { useMemo, useState } from "react";
import { getNumberFormatSymbols } from "../utils";

export type FormattedNumberInputProps = NumericFormatProps<InputProps> & {
  locale: string;
};

export function FormattedNumberInput({
  name,
  defaultValue,
  locale,
  ...props
}: FormattedNumberInputProps) {
  const [value, setValue] = useState<number | undefined>(
    defaultValue != null ? Number(defaultValue) : undefined,
  );

  const { thousandSeparator, decimalSeparator } = useMemo(
    () => getNumberFormatSymbols(locale),
    [locale],
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
        inputMode="decimal"
      />
      <input name={name} value={value != null ? value : ""} type="hidden" />
    </>
  );
}
