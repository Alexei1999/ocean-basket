import { CloseIcon } from "@entities/cart/components/icons/close-icon";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

export default function ModalSimple({
  open,
  onClose,
  children,
  showClose,
}: any) {
  const cancelButtonRef = useRef(null);

  return (
    open && (
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={onClose}
      >
        <div className="min-h-full md:p-5 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 w-full h-full" />

          <div className="inline-block min-w-content max-w-full text-start align-middle transition-all relative">
            {showClose && (
              <button
                onClick={onClose}
                aria-label="Close panel"
                ref={cancelButtonRef}
                className="inline-block outline-none focus:outline-none absolute end-4 top-4 z-[60]"
              >
                <span className="sr-only">{"text-close"}</span>
                <CloseIcon className="w-4 h-4" />
              </button>
            )}
            {children}
          </div>
        </div>
      </Dialog>
    )
  );
}
