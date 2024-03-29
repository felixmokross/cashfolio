import type { SerializeFrom } from "@remix-run/node";

export type FormActionData<TValues> = {
  ok: boolean;
  values?: TValues;
  errors?: FormErrors<TValues>;
};

export type FormProps<TValues, TFormLoaderData> = {
  values?: TValues;
  errors?: FormErrors<TValues>;
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
