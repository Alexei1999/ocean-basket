import { getFromStorage, setToStorage } from "@features/choose-dishes/api";
import Button from "@shared/button";
import classNames from "classnames";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";

const RUS_PHONE_REGEXP = /^7\d{10}$/;
const isNumberValid = (value?: string | null) =>
  RUS_PHONE_REGEXP.test(value as string);

const storageNumber = getFromStorage<string | null>("phone", false);

export const onPhoneSubmit = createEvent<string | null>();
export const $phone = createStore<string | null>(
  isNumberValid(storageNumber) ? storageNumber : null
).on(onPhoneSubmit, (_, phone) => phone);

$phone.watch((phone) => {
  setToStorage("phone", phone);
});

const AddOrUpdateCheckoutContact: React.FC<{ onSubmit: () => void }> = ({
  onSubmit,
}) => {
  const phone = useStore($phone);
  const [number, setNumber] = useState<string | null>(phone);

  const isValid = isNumberValid(number);

  return (
    <div className="p-5 sm:p-8 bg-light md:rounded-xl min-h-screen flex flex-col justify-center md:min-h-0">
      <h1 className="text-body font-semibold text-sm text-center mb-5 sm:mb-6">
        {phone ? "Обновить" : "Добавить"} телефон
      </h1>
      <div className="flex items-end">
        <PhoneInput
          specialLabel={""}
          value={phone}
          isValid={isValid}
          onChange={setNumber}
          masks={["+7 (999) 999-99-99"]}
          inputClass="!p-0 !pe-4 !ps-14 !flex !items-end !w-full !appearance-none !transition !duration-300 !ease-in-out !text-body !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !border-e-0 !rounded !rounded-e-none focus:!border-accent !h-12"
          dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
        />
        <Button
          onClick={() => {
            if (!isValid) return;
            onPhoneSubmit(number);
            onSubmit();
          }}
          className={classNames(
            "!rounded-s-none text-body hover:text-accent",
            !isValid &&
              "bg-gray-300 hover:bg-gray-300 border-border-400 cursor-not-allowed"
          )}
        >
          {phone ? "Обновить" : "Добавить"}
        </Button>
      </div>
    </div>
  );
};

export default AddOrUpdateCheckoutContact;
