import { onScrollPage } from "@app/";
import { PaymentArguments } from "@shared/api/dishes";
import dayjs, { Dayjs } from "dayjs";
import { useStore } from "effector-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { OrderDescriptionContainerCart } from "../OrderDescription/OrderDescriptionContainerCart";
import AddOrUpdateCheckoutContact, { $phone } from "./add-or-update";
import AddressCard from "./address-card";
import AddressForm, { $form } from "./address-form";
import { BlocksGrid } from "./address-grid";
import { CheckAvailabilityAction } from "./check-availability-action";
import ContactCard from "./contact-card";
import ScheduleGrid from "./schedule-grid";
import { RightSideView } from "./unverified-item-list";

export const MerchantLogin = "Ocean_Basket";

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

  const onSubmitHandler = useCallback(
    ({
      InvoiceId,
      OutSum,
      SignatureValue,
      order_id,
    }: Partial<PaymentArguments> & {
      order_id?: number | undefined;
    }) => {
      const paymentWindow = window.open(
        `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${MerchantLogin}&InvoiceID=${InvoiceId}&Culture=ru&Encoding=utf-8&DefaultSum=${OutSum}&SignatureValue=${SignatureValue}`,
        "_blank"
      );

      if (!paymentWindow || paymentWindow.closed) {
        toast.error("Ошибка при совершении оплаты, попробуйте еще раз");
        paymentWindow?.close();
        return;
      }

      setOrderNumber(order_id);
      setOrderDate(dayjs());
      setIsOrdered(true);
      onScrollPage();
    },
    []
  );

  return !isOrdered ? (
    <>
      <div className="py-8 sm:px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
        <div className="flex flex-col lg:flex-row items-center lg:items-start m-auto w-full max-w-6xl">
          <div className="lg:max-w-3xl w-full space-y-6 order-1 lg:order-0">
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
            <CheckAvailabilityAction onSubmit={onSubmitHandler}>
              Оформить заказ
            </CheckAvailabilityAction>
          </div>
          <div className="w-full lg:w-96 mb-10 sm:mb-12 lg:mb-0 lg:mt-10 lg:ml-16 order-0 lg:order-1 px-5 sm:px-0">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  ) : (
    <OrderDescriptionContainerCart
      orderNumber={orderNumber}
      orderDate={orderDate}
    />
  );
}
