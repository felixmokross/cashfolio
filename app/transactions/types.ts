import type { Booking, Transaction } from "@prisma/client";
import { SerializeFrom } from "~/common/base/utils";

export type TransactionDto = SerializeFrom<Transaction>;
export type BookingDto = SerializeFrom<Booking>;
