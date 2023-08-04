import type { User } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { ExtendedUser } from "~/auth.server";

export type UserDto = SerializeFrom<User>;
export type ExtendedUserDto = SerializeFrom<ExtendedUser>;
