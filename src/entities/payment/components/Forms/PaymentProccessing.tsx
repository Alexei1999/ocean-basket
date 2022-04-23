import { onScrollPage } from "@shared/components/ScrollContainer";
import { formatPrice } from "@entities/cart/components/Details/variation-groups";
import { getFromStorage, setToStorage } from "@features/choose-dishes/api";
import { $cartSizes } from "@features/choose-dishes/models";
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
import { $rus } from "@features/choose-dishes/models";

export const FREE_DELIVERY_SUM = 5000;

export const makeTelegrammDescription = (
  size?: number,
  unicItemsNumber?: {
    [key: string]: number;
  }
) => {
  if (!size || !unicItemsNumber) {
    return null;
  }

  return `количество блюд - ${size}, количество уникальных блюд - ${
    Object.keys(unicItemsNumber).length
  }`;
  // return encodeURIComponent(
  //   dishes
  //     .map(
  //       ({ product: { name }, modifiers, count, totalPrice }) =>
  //         `${name}, ${modifiers.map(
  //           ({ name, option }) => `${name} ${option}`
  //         )} — ${count} шт, ${formatRub(totalPrice)}`
  //     )
  //     .join(";")
  // );
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

export const getDeliveryFee = (locationInitial: boolean | null): number => {
  return locationInitial === true
    ? LOCATION_TRUE_SUM
    : locationInitial === false
    ? LOCATION_FALSE_SUM
    : 0;
};
export const getDeliveryFeeName = (
  totalAmount: number | null,
  isRub: boolean,
  location?: boolean | null
): string => {
  return (totalAmount ?? 0) >= FREE_DELIVERY_SUM
    ? "Бесплатно"
    : location === true
    ? formatPrice(LOCATION_TRUE_SUM, isRub)
    : location === false
    ? formatPrice(LOCATION_FALSE_SUM, isRub)
    : "";
};

const locationInitial = $location.getState();
const deliveryInitial = getDeliveryFee(locationInitial);

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
  const cartSizes = useStore($cartSizes);
  const isRub = useStore($rus);

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
    (
      {
        InvoiceId,
        OutSum,
        SignatureValue,
        order_id,
      }: Partial<PaymentArguments> & {
        order_id?: number | undefined;
      },
      newTab?: Window | null
    ) => {
      const url = getPaymentLink(
        `${OutSum}`,
        `${InvoiceId}`,
        SignatureValue,
        makeTelegrammDescription(cartSizes.size, cartSizes.unicItemsNumber),
        order_id
      );

      if (newTab && !newTab.closed) {
        newTab.location.replace(url);
        newTab.focus();
      } else {
        console.log("cant open new tab");
        newTab?.close();

        try {
          window.location.replace(url);
        } catch (e) {
          console.error(e);
          toast.error("Ошибка при совершении оплаты, попробуйте еще раз");
        }
        return;
      }

      setOrderNumber(order_id);
      setOrderDate(dayjs());
      setIsOrdered(true);
      onScrollPage();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return !isOrdered ? (
    <>
      <div className="py-8 sm:px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
        <div className="flex flex-col lg:flex-row items-center lg:items-start m-auto w-full max-w-6xl">
          <div className="lg:max-w-2xl w-full space-y-6 order-1 lg:order-0">
            <BlocksGrid
              addLabel="Добавить адрес"
              editLabel="Изменить адрес"
              className="shadow-700 bg-light p-5 md:p-8"
              label="Адрес доставки"
              subLabel="Мы доставляем наши блюда по всей Москве в пределах МКАД. Если ваш адрес доставки находится за пределами МКАД, ресторан оформит возврат денежных средств и отменит заказ. Заказы за МКАД оформляются по номеру телефона в индивидуальном порядке. Благодарим за понимание."
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
                        {formatPrice(LOCATION_TRUE_SUM, isRub)}.
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
                        {formatPrice(LOCATION_FALSE_SUM, isRub)}.
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
          <div className="mb-10 sm:mb-12 lg:mb-0 lg:mt-10 lg:ml-16 order-0 lg:order-1 px-5 sm:px-0 max-w-full min-w-full md:min-w-[450px]">
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
