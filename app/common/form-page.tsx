import { Form } from "@remix-run/react";
import { FormPageHeader } from "./form-page-header";
import { Button } from "./base/buttons/button";
import type { IconComponentType } from "./base/icons/types";
import type { PropsWithChildren } from "react";

export type FormPageProps = PropsWithChildren<{
  title: string;
  icon: IconComponentType;
  variant: "positive" | "neutral";
  submitButtonLabel: string;
  disabled?: boolean;
}>;

export function FormPage({
  icon,
  title,
  variant,
  children,
  submitButtonLabel,
  disabled,
}: FormPageProps) {
  return (
    <div className="flex justify-center">
      <Form method="post" noValidate className="max-w-lg w-full px-4 py-8">
        <fieldset disabled={disabled} className="contents space-y-8">
          <FormPageHeader icon={icon} variant={variant}>
            {title}
          </FormPageHeader>

          {children}

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              {submitButtonLabel}
            </Button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}
