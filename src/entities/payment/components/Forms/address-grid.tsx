import { RadioGroup } from "@headlessui/react";
import { createEvent, createStore } from "effector";
import { createGate, useGate, useStore } from "effector-react";
import { useState } from "react";
import AddressForm, { $form, onSubmitForm } from "./address-form";
import { AddressHeader } from "./address-header";
import Modal from "./modal";

export type Address = {
  [key: string]: any;
};

interface AddressesProps<T> {
  label: string;
  className?: string;
  addLabel?: string;
  editLabel?: string;
  data?: T;
  form: React.FC<{ onSubmit: () => void }>;
  card: React.FC<{ checked: boolean; data: T; onEdit: () => void }>;
  isModalOpen: boolean;
  onEdit: () => void;
  onClose: () => void;
  emptyMessage?: string;
  count: number;
}

export const onSetEditModalOpen = createEvent<boolean>();
export const $editModalState = createStore(false)
  .on(onSetEditModalOpen, (_, value) => value)
  .on(onSubmitForm, () => false);

export function BlocksGrid<T>({
  label,
  className,
  addLabel,
  editLabel,
  data,
  form: Form,
  card: Card,
  onEdit: onAdd,
  isModalOpen,
  onClose,
  emptyMessage,
  count,
}: AddressesProps<T>) {
  const [selectedAddress, setAddress] = useState<Address | undefined>(
    undefined
  );

  return (
    <div className={className}>
      <Modal open={isModalOpen} onClose={onClose}>
        <Form onSubmit={onClose} />
      </Modal>
      <AddressHeader
        count={count}
        addLabel={addLabel}
        editLabel={editLabel}
        onAdd={onAdd}
        isEdit={Boolean(data)}
        label={label}
      />

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
  );
}
