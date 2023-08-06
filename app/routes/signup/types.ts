import type { User } from "@prisma/client";

export type SignupValues = Partial<
  Pick<User, "refCurrency" | "preferredLocale">
>;
