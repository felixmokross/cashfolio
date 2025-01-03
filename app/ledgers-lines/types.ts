import type { SerializeFrom } from "react-router";
import type { getReverseLedgerDateGroups } from "~/ledgers-lines/functions.server";

export type GetReverseLedgerDateGroupsResultDto = SerializeFrom<
  Awaited<ReturnType<typeof getReverseLedgerDateGroups>>
>;
export type LedgerDateGroupDto =
  GetReverseLedgerDateGroupsResultDto["groups"][number];
export type LedgerLineDto = LedgerDateGroupDto["lines"][number];
export type LedgerLineTransactionDto = LedgerLineDto["transaction"];
export type LedgerLineBookingDto = LedgerLineTransactionDto["bookings"][number];
