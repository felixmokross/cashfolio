import type { User } from "@prisma/client";
import type { SerializeFrom } from "react-router";
import type { ExtendedUser } from "~/common/auth.server";

export type UserDto = SerializeFrom<User>;
export type ExtendedUserDto = SerializeFrom<ExtendedUser>;
