import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { PropsWithChildren } from "react";
import { useRef, useState } from "react";
import { Button } from "./buttons/button";

export type ModalProps = PropsWithChildren<{
  title: string;
  confirmButtonText: string;
  open: boolean;
  isBusy: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}>;

export default function Modal({
  title,
  children,
  open,
  isBusy,
  confirmButtonText,
  onConfirm,
  onDismiss,
}: ModalProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const cancelButtonRef = useRef(null);

  const isDisabled = isBusy || isLeaving;

  return (
    <Transition
      show={open}
      beforeLeave={() => setIsLeaving(true)}
      afterLeave={() => setIsLeaving(false)}
    >
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => onDismiss()}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-negative-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-negative-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </DialogTitle>
                    <div className="mt-2">{children}</div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <Button
                    variant="negative"
                    type="button"
                    onClick={() => onConfirm()}
                    className="ml-3"
                    disabled={isDisabled}
                  >
                    {confirmButtonText}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => onDismiss()}
                    innerRef={cancelButtonRef}
                    disabled={isDisabled}
                  >
                    Cancel
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
