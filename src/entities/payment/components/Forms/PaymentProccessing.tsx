import { onScrollPage } from "@app/";
import { formatRub } from "@entities/cart/components/Details/variation-groups";
import { getFromStorage, setToStorage } from "@features/choose-dishes/api";
import {
  $cart,
  $cartItems,
  $cartSizes,
  PickedDish,
} from "@features/choose-dishes/models";
import { PaymentArguments } from "@shared/api/dishes";
import dayjs, { Dayjs } from "dayjs";
import { createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { OrderDescriptionContainerCart } from "../OrderDescription/OrderDescriptionContainerCart";
import { getPaymentLink } from "../OrderDescription/OrderDescriptionContainerFetch";
import AddOrUpdateCheckoutContact, { $phone } from "./add-or-update";
import AddressCard from "./address-card";
import AddressForm, { $form } from "./address-form";
import { BlocksGrid } from "./address-grid";
import { CheckAvailabilityAction } from "./check-availability-action";
import ContactCard from "./contact-card";
import Radio from "./forms/radio/radio";
import ScheduleGrid from "./schedule-grid";
import { RightSideView } from "./unverified-item-list";

export const FREE_DELIVERY_SUM = 5000;

export const makeTelegrammDescription = (dishes: PickedDish[]) => {
  return dishes
    .map(
      ({ product: { name }, modifiers, count, totalPrice }) =>
        `${name}, ${modifiers.map(
          ({ name, option }) => `${name} - ${option}`
        )}, ${count} шт., ${formatRub(totalPrice)}`
    )
    .join(";");
};

export const MerchantLogin = "Ocean_Basket";

export enum AddressType {
  Billing = "billing",
  Shipping = "shipping",
}

export const LOCATION_FALSE_SUM = 500;
export const LOCATION_TRUE_SUM = 250;

const onLocation = createEvent<boolean>();
export const $location = createStore<boolean | null>(
  getFromStorage("location", false)
).on(onLocation, (_, value) => value);

$location.watch((value) => setToStorage("location", value));

const locationInitial = $location.getState();
const deliveryInitial =
  locationInitial === true
    ? LOCATION_TRUE_SUM
    : locationInitial === false
    ? LOCATION_FALSE_SUM
    : 0;

export const $grandTotal = createStore<number>(
  ($cartSizes.getState().totalAmount ?? 0) + deliveryInitial
);

sample({
  source: [$cartSizes, $location],
  clock: [$cartSizes, $location],
  fn: ([cartSizes, location]) => {
    const totalAmount = cartSizes.totalAmount ?? 0;

    if (totalAmount >= FREE_DELIVERY_SUM) {
      return totalAmount;
    }

    const locationFee =
      location === true
        ? LOCATION_TRUE_SUM
        : location === false
        ? LOCATION_FALSE_SUM
        : 0;

    return totalAmount + locationFee;
  },
  target: $grandTotal,
});

export function PaymentProccessing() {
  const cartItems = useStore($cartItems);

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState<undefined | number>(undefined);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [orderDate, setOrderDate] = useState<Dayjs | null>(null);

  const form = useStore($form);
  const phone = useStore($phone);
  const location = useStore($location);
  const { totalAmount } = useStore($cartSizes);

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
        getPaymentLink(
          `${OutSum}`,
          `${InvoiceId}`,
          SignatureValue,
          makeTelegrammDescription(cartItems.list),
          order_id
        ),
        "_blank"
      );

      if (!paymentWindow || paymentWindow.closed) {
        toast.error("Ошибка при совершении оплаты, попробуйте еще раз");
        paymentWindow?.close();
        return;
      }

      paymentWindow.focus();

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
              after={
                (totalAmount ?? 0) >= FREE_DELIVERY_SUM ? undefined : (
                  <div className="flex gap-3 flex-wrap">
                    <div className="w-[16rem] text-xs flex justify-between">
                      <Radio
                        checked={location === true}
                        onClick={() => onLocation(true)}
                        className="pt-2"
                        isBig
                        name={"inside TTK"}
                        id={"inside TTK"}
                      />
                      <div
                        className="cursor-pointer"
                        onClick={() => onLocation(true)}
                      >
                        Указанный адрес входит в зону доставки ВНУТРИ ТТК +{" "}
                        {formatRub(LOCATION_TRUE_SUM)}.
                      </div>
                    </div>
                    <div className="w-[16rem] text-xs flex justify-between">
                      <Radio
                        checked={location === false}
                        onClick={() => onLocation(false)}
                        className="pt-2"
                        isBig
                        name={"outside TTK"}
                        id={"outside TTK"}
                      />
                      <div
                        className="cursor-pointer"
                        onClick={() => onLocation(false)}
                      >
                        Указанный адрес входит в зону доставки от МКАД до ТТК +{" "}
                        {formatRub(LOCATION_FALSE_SUM)}.
                      </div>
                    </div>
                  </div>
                )
              }
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
