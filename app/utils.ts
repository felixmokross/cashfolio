import type { ComponentPropsWithoutRef, ElementType } from "react";
import invariant from "tiny-invariant";

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

export type PolymorphicComponentProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function getTitle(pageTitle: string) {
  return `${pageTitle} · Cashfolio`;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  invariant(process.env.BASE_URL, "BASE_URL must be set");

  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith(`${process.env.BASE_URL}/`)) {
    return defaultRedirect;
  }

  return to;
}
