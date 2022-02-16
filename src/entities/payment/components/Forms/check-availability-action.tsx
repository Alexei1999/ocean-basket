import { useMemo, useState } from "react";
import { ValidationError } from "./place-order-action";
import Button, { ButtonProps } from "@shared/button";
import { createGate, useGate, useStore } from "effector-react";
import {
  $cart,
  $cartItems,
  $cartSizes,
  $isRestaurantOpen,
  fetchTimeValidateFx,
  PickedDish,
} from "@features/choose-dishes/models";
import { $form } from "./address-form";
import { $schedule } from "./schedule-grid";
import { $phone } from "./add-or-update";
import { combine, createEffect, forward, restore, sample } from "effector";
import {
  EMPTY_STRING,
  OrderTypeParams,
  PaymentArguments,
  postOrder,
  postPaymentArguments,
  PaymentArgumentsParams,
} from "@shared/api/dishes";
import {
  $promocode,
  MIN_SUM,
} from "@entities/cart/components/cart-sidebar-view";
import { toast } from "react-toastify";
import { $restaurant } from "@widgets/header/components/AddressSelection";
import {
  $grandTotal,
  $location,
  FREE_DELIVERY_SUM,
  MerchantLogin,
} from "./PaymentProccessing";
import { createEvent, createStore } from "effector";
import { formatRub } from "@entities/cart/components/Details/variation-groups";

type SubmitFormParams = {
  form: Omit<OrderTypeParams, "InvoiceID" | "Signature">;
  paymentArguments: PaymentArgumentsParams;
  newTab: Window | null;
};

const actionGate = createGate<{
  onSuccess: (
    params: Partial<PaymentArguments> & {
      order_id?: number | undefined;
    }
  ) => void;
  onFail: () => void;
}>();

const postDetailsFx = createEffect<PaymentArgumentsParams, PaymentArguments>(
  postPaymentArguments
);
const submitFormFx = createEffect<OrderTypeParams, { order_id?: number }>(
  postOrder
);
const submitError = (error: { error: Error }) => {
  console.error(error);
  toast.error("Ошибка при отправке заказа, попробуйте еще раз");
};
postDetailsFx.fail.watch(submitError);
submitFormFx.fail.watch(submitError);

const onSubmitForm = createEvent<SubmitFormParams>();
const $submitForm = restore(onSubmitForm, null);

sample({
  source: $submitForm,
  clock: onSubmitForm,
  fn: (props) => {
    const { paymentArguments } = props ?? {};
    return paymentArguments as PaymentArgumentsParams;
  },
  target: postDetailsFx,
});

const errorHandlerFx = createEffect((newtab?: Window | null) =>
  newtab?.close()
);

sample({
  source: $submitForm,
  clock: [postDetailsFx.fail, submitFormFx.fail],
  fn: (props) => {
    const { newTab } = props ?? {};
    return newTab;
  },
  target: errorHandlerFx,
});

const $paymentArguments = restore(postDetailsFx.doneData, null);

sample({
  source: [$submitForm, $paymentArguments],
  clock: postDetailsFx.done,
  fn: ([$0, $1]) => {
    const { form } = $0 ?? {};
    const { InvoiceId, SignatureValue } = $1 ?? {};
    return {
      ...form,
      InvoiceID: InvoiceId,
      Signature: SignatureValue,
    } as OrderTypeParams;
  },
  target: submitFormFx,
});

const $submitInfo = createStore<
  (Partial<PaymentArguments> & { order_id?: number }) | null
>(null)
  .on(postDetailsFx.doneData, (store, response) => ({
    ...store,
    ...response,
  }))
  .on(submitFormFx.doneData, (store, response) => ({
    ...store,
    order_id: response?.order_id,
  }));

const submitHandleFx = createEffect<
  [
    (
      | (Partial<PaymentArguments> & {
          order_id?: number | undefined;
        })
      | null
    ),
    SubmitFormParams | null,
    {
      onSuccess: (
        params: Partial<PaymentArguments> & {
          order_id?: number | undefined;
        },
        newTab?: Window | null
      ) => void;
    }
  ],
  void
>(([$0, form, { onSuccess }]) => {
  const { newTab } = form ?? {};
  if ($0) onSuccess($0, newTab);
});

sample({
  source: [$submitInfo, $submitForm, actionGate.state],
  clock: submitFormFx.done,
  target: submitHandleFx,
});

actionGate.state.on(submitFormFx.fail, ({ onFail }) => onFail());

const $pending = combine({
  submitFormPending: submitFormFx.pending,
  postDetailsPending: postDetailsFx.pending,
  timeFetchingPending: fetchTimeValidateFx.pending,
}).map((store) => Object.values(store).some((value) => value === true));

const formatDish = ({
  product,
  priceObj,
  modifiers,
  count,
}: PickedDish): OrderTypeParams["dishes"] => {
  const parsedWeight = parseInt(priceObj.weight);
  const parsedRoublePrice = parseInt(priceObj.rouble_price);
  const parsedTengePrice = parseInt(priceObj.tenge_price);

  const dish = {
    name: product.name,
    weight: (isNaN(parsedWeight) ? EMPTY_STRING : parsedWeight) as number,
    rouble_price: (isNaN(parsedRoublePrice)
      ? EMPTY_STRING
      : parsedRoublePrice) as number,
    tenge_price: (isNaN(parsedTengePrice)
      ? EMPTY_STRING
      : parsedTengePrice) as number,
    modifiers: modifiers
      .filter(({ option }) => option)
      .map(({ option, name, price }) => ({
        key: name,
        value: option,
        amount: price as number,
      })),
  };

  return Array(count)
    .fill(dish)
    .map((obj) => ({ ...obj }));
};

export const CheckAvailabilityAction: React.FC<
  Omit<ButtonProps, "onSubmit"> & {
    onSubmit: (
      params: Partial<PaymentArguments> & {
        order_id?: number | undefined;
      },
      newTab?: Window | null
    ) => void;
  }
> = ({ onSubmit, ...props }) => {
  useGate(actionGate, { onSuccess: onSubmit, onFail: () => {} });

  const { size, totalAmount } = useStore($cartSizes);
  const cart = useStore($cart);
  const form = useStore($form);
  const schedule = useStore($schedule);
  const phone = useStore($phone);
  const promocode = useStore($promocode);
  const restaurant = useStore($restaurant);
  const location = useStore($location);
  const grandTotal = useStore($grandTotal);
  const isOpen = useStore($isRestaurantOpen);

  const isLoading = useStore($pending);

  const [errorMessage, setError] = useState<string>();
  const [isShownError, setIsShownError] = useState<boolean>();

  const isValid = useMemo(() => {
    setIsShownError(false);

    if (isOpen === false) {
      setError("Ресторан закрыт до 10:00");
      return false;
    }

    if (!cart) {
      setError("Выберите блюда");
      return false;
    }

    if ((totalAmount ?? 0) < MIN_SUM) {
      setError(`Заказ должен быть на сумму от ${formatRub(MIN_SUM)}`);
      return false;
    }

    if (!form) {
      setError("Необходимо заполнить адрес");
      return false;
    }

    if ((totalAmount ?? 0) < FREE_DELIVERY_SUM && location === null) {
      setError("Необходимо выбрать зону доставки");
      return false;
    }

    if (!phone) {
      setError("Необходимо ввести телефонный номер");
      return false;
    }

    if (!schedule) {
      setError("Необходимо выбрать время доставки");
      return false;
    }

    return true;
  }, [cart, form, schedule, phone, totalAmount, isOpen, location]);

  function handleVerifyCheckout() {
    if (!isValid) {
      setIsShownError(true);
      return;
    }
    if (isLoading) return;

    const newTab = window.open();

    const formattedDishes = cart.flatMap(formatDish);

    if ((window as any).isMock) {
      console.log("price mock enabled");
    }

    onSubmitForm({
      form: {
        ...form!,
        payment: "payment",
        restaurant: restaurant as string,
        time: schedule!.title,
        phone: `+${phone!}`,
        promocode: promocode?.promocode!,
        dishes: formattedDishes,
        MerchantLogin: MerchantLogin,
        location: (totalAmount ?? 0) >= FREE_DELIVERY_SUM ? null : location,
      },
      paymentArguments: {
        OutSum: (window as any).isMock ? 1 : grandTotal,
      },
      newTab,
    });
  }

  return (
    <>
      <Button
        loading={isLoading}
        className="text-body hover:bg-accent w-full mt-5"
        onClick={handleVerifyCheckout}
        disabled={!size}
        {...props}
      />
      {isShownError && !isValid && (
        <div className="mt-3">
          <ValidationError message={errorMessage} />
        </div>
      )}
    </>
  );
};
