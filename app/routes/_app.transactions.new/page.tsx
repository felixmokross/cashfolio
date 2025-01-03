import { PlusIcon } from "@heroicons/react/20/solid";
import type { AccountDto } from "~/accounts/types";
import { DateInput } from "~/common/base/forms/date-input";
import { Input } from "~/common/base/forms/input";
// import type { FormErrors } from "~/common/forms/types";
import { FormPage } from "~/common/form-page";
// import { Button } from "~/common/base/buttons/button";
// import { useReducer } from "react";
// import { type BookingType } from "@prisma/client";
import type { IncomeCategoryDto } from "~/income-categories/types";

export type PageProps = {
  account: AccountDto;
  accounts: AccountDto[];
  incomeCategories: IncomeCategoryDto[];
  // values?: TransactionValues;
  // errors?: FormErrors<TransactionValues>;
};

export function Page() {
  // const [bookings, dispatch] = useReducer(bookingsReducer, []);

  return (
    <FormPage
      title="New Transaction"
      icon={PlusIcon}
      variant="positive"
      submitButtonLabel="Create"
    >
      <DateInput
        label="Date"
        groupClassName="col-span-2"
        name="date"
        // defaultValue={values?.date}
        // error={errors?.date}
      />
      <Input
        name="note"
        label="Note (optional)"
        // defaultValue={values?.note}
        // error={errors?.note}
        groupClassName="col-span-4"
      />
      {/* {bookings.map((booking, index) => (
        <div key={index} className="col-span-6">
          {booking.type} – {booking.balanceChangeType}
        </div>
      ))} */}
      <div className="col-span-6 gap-2 flex justify-center">
        {/* <Button
          icon={PlusIcon}
          onClick={() =>
            dispatch({ type: "add", bookingType: "ACCOUNT_CHANGE" })
          }
        >
          Account
        </Button>
        <Button
          icon={PlusIcon}
          onClick={() =>
            dispatch({
              type: "add",
              bookingType: "BALANCE_CHANGE",
              balanceChangeType: "INCOME",
            })
          }
        >
          Income
        </Button>
        <Button
          icon={PlusIcon}
          onClick={() =>
            dispatch({
              type: "add",
              bookingType: "BALANCE_CHANGE",
              balanceChangeType: "EXPENSE",
            })
          }
        >
          Expense
        </Button> */}
      </div>
    </FormPage>
  );
}

// type BookingsState = BookingValues[];

// type BookingValues = {
//   type: BookingType;
//   balanceChangeType?: BalanceChangeType;
// };

// type BookingsAction = {
//   type: "add";
//   bookingType: BookingType;
//   balanceChangeType?: BalanceChangeType;
// };

// function bookingsReducer(
//   state: BookingsState,
//   action: BookingsAction,
// ): BookingsState {
//   switch (action.type) {
//     case "add":
//       return [
//         ...state,
//         {
//           type: action.bookingType,
//           balanceChangeType: action.balanceChangeType,
//         },
//       ];
//   }
// }
