import { RadioGroup } from "@headlessui/react";
import { createEvent, createStore } from "effector";
import { useEffect, useState } from "react";
import AddressCard from "./address-card";
import { AddressHeader } from "./address-header";
import CreateOrUpdateAddressForm from "./create-or-update";
import Modal from "./modal";

export type Address = {
  [key: string]: any;
};

interface AddressesProps {
  addresses: Address[] | undefined;
  label: string;
  className?: string;
  userId: string;
  addLabel?: string;
  count: number;
}

export const onValidateError = createEvent<[string, string | undefined]>();
const $validateErrors = createStore<Record<string, string | undefined>>({}).on(
  onValidateError,
  (state, [id, value]) => ({
    ...state,
    [id]: value,
  })
);
export const $validateErrorsList = $validateErrors.map((state) =>
  Object.values(state).filter((state) => state && typeof state === "string")
);

export const AddressGrid: React.FC<AddressesProps> = ({
  addresses,
  label,
  className,
  userId,
  addLabel,
  count,
}) => {
  const [selectedAddress, setAddress] = useState<Address | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    onValidateError([
      label,
      !selectedAddress
        ? `Необходимо выбрать ${label?.toLowerCase()}`
        : undefined,
    ]);
  }, [selectedAddress]);

  useEffect(() => {
    if (addresses?.length) {
      if (selectedAddress?.id) {
        const index = addresses.findIndex((a) => a.id === selectedAddress.id);
        setAddress(addresses[index]);
      } else {
        setAddress(addresses?.[0]);
      }
    }
  }, [addresses, addresses?.length, selectedAddress?.id, setAddress]);
  function onAdd() {
    setIsModalOpen(true);
  }
  return (
    <div className={className}>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateOrUpdateAddressForm />
      </Modal>
      <AddressHeader
        addLabel={addLabel}
        onAdd={onAdd}
        count={count}
        label={label}
      />

      {addresses && addresses?.length ? (
        <RadioGroup value={selectedAddress} onChange={setAddress}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {addresses?.map((address) => (
              <RadioGroup.Option value={address} key={(address as any).id}>
                {({ checked }) => (
                  <AddressCard
                    checked={checked}
                    address={address}
                    userId={userId}
                  />
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <span className="relative px-5 py-6 text-base text-center bg-gray-100 rounded border border-border-200">
            Адреса отсутствуют
          </span>
        </div>
      )}
    </div>
  );
};
