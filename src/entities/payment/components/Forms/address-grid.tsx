import { RadioGroup } from "@headlessui/react";
import { createEvent, createStore } from "effector";
import { createGate, useGate, useStore } from "effector-react";
import { useEffect, useState } from "react";
import AddressCard from "./address-card";
import AddressForm, { $form, onSubmitForm } from "./address-form";
import { AddressHeader } from "./address-header";
import Modal from "./modal";

export type Address = {
  [key: string]: any;
};

interface AddressesProps {
  addresses: Address[] | undefined;
  label: string;
  className?: string;
  addLabel?: string;
  count: number;
}

export const onSetEditModalOpen = createEvent<boolean>();
export const $editModalState = createStore(false)
  .on(onSetEditModalOpen, (_, value) => value)
  .on(onSubmitForm, () => false);

export const AddressGrid: React.FC<AddressesProps> = ({
  label,
  className,
  addLabel,
  count,
}) => {
  const form = useStore($form);

  const [selectedAddress, setAddress] = useState<Address | undefined>(
    undefined
  );

  const isModalOpen = useStore($editModalState);

  // useEffect(() => {
  //   onValidateError([
  //     label,
  //     !selectedAddress
  //       ? `Необходимо выбрать ${label?.toLowerCase()}`
  //       : undefined,
  //   ]);
  // }, [selectedAddress]);

  function onAdd() {
    onSetEditModalOpen(true);
  }

  return (
    <div className={className}>
      <Modal open={isModalOpen} onClose={() => onSetEditModalOpen(false)}>
        <AddressForm />
      </Modal>
      <AddressHeader
        count={count}
        addLabel={addLabel}
        onAdd={onAdd}
        isShown={true}
        label={label}
      />

      {form ? (
        <RadioGroup value={selectedAddress} onChange={setAddress}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <RadioGroup.Option value={selectedAddress}>
              {({ checked }) => <AddressCard checked={checked} form={form} />}
            </RadioGroup.Option>
          </div>
        </RadioGroup>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <span className="relative px-5 py-6 text-base text-center bg-gray-100 rounded border border-border-200">
            Адрес не заполнен
          </span>
        </div>
      )}
    </div>
  );
};
