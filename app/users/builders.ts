import { createId } from "@paralleldrive/cuid2";
import type { ExtendedUserDto, UserDto } from "./types";

export function buildUserDto(values: Partial<UserDto> = {}) {
  return {
    id: createId(),
    auth0UserId: createId(),
    preferredLocale: "en",
    refCurrency: "CHF",
    createdAt: new Date(2020, 5, 3),
    updatedAt: new Date(2020, 5, 3),
    ...values,
  } as UserDto;
}

export function buildExtendedUserDto(values: Partial<ExtendedUserDto> = {}) {
  return {
    ...buildUserDto(values),
    email: "user@example.com",
    pictureUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ...values,
  } as ExtendedUserDto;
}
