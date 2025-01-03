import type { User } from "@prisma/client";
import type { ExtendedUser } from "~/common/auth.server";
import { SerializeFrom } from "~/common/base/utils";

export type UserDto = SerializeFrom<User>;
export type ExtendedUserDto = SerializeFrom<ExtendedUser>;
