import { RadioGroup } from "@headlessui/react";
import { createEvent, createStore } from "effector";
import { ReactNode, useState } from "react";
import { onSubmitForm } from "./address-form";
import { AddressHeader } from "./address-header";
import Modal from "./modal";
import ModalSimple from "./modal-simple";

export type Address = {
  [key: string]: any;
};

interface AddressesProps<T> {
  label: string;
  subLabel?: ReactNode;
  className?: string;
  addLabel?: string;
  editLabel?: string;
  isLoading?: boolean;
  isSimple?: boolean;
  data?: T;
  form: React.FC<{ onSubmit: (...args: any[]) => void; isLoading?: boolean }>;
  card: React.FC<{ checked: boolean; data: T; onEdit: () => void }>;
  isModalOpen: boolean;
  onEdit: () => void;
  onSubmit: (...args: any[]) => void;
  emptyMessage?: string;
  count: number;
  after?: ReactNode;
}

export const onSetEditModalOpen = createEvent<boolean>();
export const $editModalState = createStore(false)
  .on(onSetEditModalOpen, (_, value) => value)
  .on(onSubmitForm, () => false);

export function BlocksGrid<T>({
  label,
  subLabel,
  className,
  addLabel,
  editLabel,
  data,
  isSimple = false,
  isLoading = false,
  form: Form,
  card: Card,
  onEdit: onAdd,
  isModalOpen,
  onSubmit: onClose,
  emptyMessage,
  count,
  after,
}: AddressesProps<T>) {
  const [selectedAddress, setAddress] = useState<Address | undefined>(
    undefined
  );

  return (
    <div className={className}>
      {isSimple ? (
        <ModalSimple open={isModalOpen} onClose={onClose} showClose>
          <Form onSubmit={onClose} isLoading={isLoading} />
        </ModalSimple>
      ) : (
        <Modal open={isModalOpen} onClose={onClose} showClose>
          <Form onSubmit={onClose} isLoading={isLoading} />
        </Modal>
      )}

      <AddressHeader
        count={count}
        addLabel={addLabel}
        editLabel={editLabel}
        onAdd={onAdd}
        isEdit={Boolean(data)}
        label={label}
      />
      {subLabel && (
        <div className="text-red-500 text-sm mt-3 md:mt-5 max-w-lg">
          {subLabel}
        </div>
      )}
      <div className="mt-5 md:mt-8">
        {data ? (
          <RadioGroup value={selectedAddress} onChange={setAddress}>
            <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <RadioGroup.Option value={selectedAddress}>
                {({ checked }) => (
                  <Card checked={checked} data={data} onEdit={onAdd} />
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <span className="relative px-5 py-6 text-base text-center bg-gray-100 rounded border border-border-200">
              {emptyMessage}
            </span>
          </div>
        )}
      </div>
      {after && (
        <div className="pt-5 mt-5 border-t border-border-200 border-opacity-70">
          {after}
        </div>
      )}
    </div>
  );
}
