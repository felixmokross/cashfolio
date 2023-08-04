import type { Account } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

export type AccountDto = SerializeFrom<Account>;
