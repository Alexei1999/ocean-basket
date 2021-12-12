import { onScrollPage } from "@app/";
import dayjs, { Dayjs } from "dayjs";
import { useStore } from "effector-react";
import { useState } from "react";
import { OrderDescription } from "../OrderDescription/OrderDescription";
import AddOrUpdateCheckoutContact, { $phone } from "./add-or-update";
import AddressCard from "./address-card";
import AddressForm, { $form } from "./address-form";
import { BlocksGrid } from "./address-grid";
import { CheckAvailabilityAction } from "./check-availability-action";
import ContactCard from "./contact-card";
import ScheduleGrid from "./schedule-grid";
import { RightSideView } from "./unverified-item-list";

export enum AddressType {
  Billing = "billing",
  Shipping = "shipping",
}

export function CheckoutPage() {
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState<undefined | number>(undefined);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [orderDate, setOrderDate] = useState<Dayjs | null>(null);

  const form = useStore($form);
  const phone = useStore($phone);

  return !isOrdered ? (
    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
      <div className="flex flex-col lg:flex-row items-center lg:items-start m-auto w-full max-w-6xl">
        <div className="lg:max-w-2xl w-full space-y-6 order-1 lg:order-0">
          <BlocksGrid
            addLabel="Добавить адрес"
            editLabel="Изменить адрес"
            className="shadow-700 bg-light p-5 md:p-8"
            label="Адрес доставки"
            count={1}
            form={AddressForm}
            data={form}
            card={AddressCard}
            isModalOpen={isAddressModalOpen}
            onEdit={() => setIsAddressModalOpen(true)}
            onClose={() => setIsAddressModalOpen(false)}
            emptyMessage="Адрес не заполнен"
          />
          <ScheduleGrid
            className="shadow-700 bg-light p-5 md:p-8"
            label="Время доставки"
            count={2}
          />
          <BlocksGrid
            addLabel="Добавить телефон"
            editLabel="Изменить телефон"
            className="shadow-700 bg-light p-5 md:p-8"
            count={3}
            label="Контактный телефон"
            card={ContactCard}
            form={AddOrUpdateCheckoutContact}
            data={phone}
            isModalOpen={isPhoneModalOpen}
            onEdit={() => setIsPhoneModalOpen(true)}
            onClose={() => setIsPhoneModalOpen(false)}
            emptyMessage="Телефон не заполнен"
          />
          <CheckAvailabilityAction
            onSubmit={(orderNumber?: number) => {
              // window
              //   .open(
              //     "",
              //     "_blank"
              //   )
              //   ?.focus();
              setOrderNumber(orderNumber);
              setOrderDate(dayjs());
              setIsOrdered(true);
              onScrollPage();
            }}
          >
            Оформить заказ
          </CheckAvailabilityAction>
        </div>
        <div className="w-full lg:w-96 mb-10 sm:mb-12 lg:mb-0 mt-10 lg:ml-16 order-0 lg:order-1">
          <RightSideView />
        </div>
      </div>
    </div>
  ) : (
    <OrderDescription orderNumber={orderNumber} orderDate={orderDate} />
  );
}
