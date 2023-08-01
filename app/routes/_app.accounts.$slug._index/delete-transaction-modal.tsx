import type { Transaction } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useMemo, useReducer, useState } from "react";
import Modal from "~/components/modal";

export function useDeleteTransactionModal() {
  const [state, dispatch] = useReducer(deleteTransactionModalReducer, {
    open: false,
    transactionId: undefined,
  });
  const deleteTransactionModal = useMemo(
    () => (
      <DeleteTransactionModal
        {...state}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      />
    ),
    [state]
  );
  return {
    deleteTransactionModal,
    deleteTransaction: (
      transactionId: SerializeFrom<Transaction>["id"] | undefined
    ) => dispatch({ type: "OPEN_MODAL", transactionId }),
  };
}

type DeleteTransactionModalState = {
  open: boolean;
  transactionId: SerializeFrom<Transaction>["id"] | undefined;
};

type DeleteTransactionModalAction =
  | {
      type: "OPEN_MODAL";
      transactionId: SerializeFrom<Transaction>["id"] | undefined;
    }
  | {
      type: "CLOSE_MODAL";
    };

function deleteTransactionModalReducer(
  state: DeleteTransactionModalState,
  action: DeleteTransactionModalAction
): DeleteTransactionModalState {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, transactionId: action.transactionId };
    case "CLOSE_MODAL":
      return { ...state, open: false };
  }
}

type DeleteTransactionModalProps = {
  open: boolean;
  transactionId: SerializeFrom<Transaction>["id"] | undefined;
  onClose: () => void;
};

function DeleteTransactionModal({
  open,
  transactionId,
  onClose,
}: DeleteTransactionModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher.state === "idle" && isSubmitted) {
      onClose();
    }
  }, [fetcher.state, isSubmitted, onClose]);

  // reset when transactionId changes
  const [prevTransactionId, setPrevTransactionId] = useState(transactionId);
  if (prevTransactionId !== transactionId) {
    setIsSubmitted(false);
    setPrevTransactionId(transactionId);
  }

  return (
    <Modal
      title="Delete Transaction"
      confirmButtonText="Delete"
      open={open}
      onDismiss={onClose}
      onConfirm={() => {
        fetcher.submit(null, {
          action: `/transactions/${transactionId}`,
          method: "DELETE",
        });
        setIsSubmitted(true);
      }}
      isBusy={isSubmitted}
    >
      <p className="text-sm text-gray-500">
        Are you sure that you want to delete this transaction?
      </p>
    </Modal>
  );
}
