import { useMemo, useState } from "react";
import { ValidationError } from "./place-order-action";
import Button, { ButtonProps } from "@shared/button";
import { createGate, useGate, useStore } from "effector-react";
import { $cart, $cartSizes } from "@features/choose-dishes/models";
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
import { $promocode } from "@entities/cart/components/cart-sidebar-view";
import { toast } from "react-toastify";
import { $restaurant } from "@widgets/header/components/AddressSelection";
import { MerchantLogin } from "./PaymentProccessing";
import { createEvent, createStore } from "effector";

type SubmitFormParams = {
  form: Omit<OrderTypeParams, "InvoiceID" | "Signature">;
  paymentArguments: PaymentArgumentsParams;
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
const submitError = () => {
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
    {
      onSuccess: (
        params: Partial<PaymentArguments> & {
          order_id?: number | undefined;
        }
      ) => void;
    }
  ],
  void
>(([$0, { onSuccess }]) => {
  if ($0) onSuccess($0);
});

sample({
  source: [$submitInfo, actionGate.state],
  clock: submitFormFx.done,
  target: submitHandleFx,
});

actionGate.state.on(submitFormFx.fail, ({ onFail }) => onFail());

const $pending = combine({
  submitFormFx: submitFormFx.pending,
  postDetailsFx: postDetailsFx.pending,
}).map(({ submitFormFx, postDetailsFx }) => submitFormFx || postDetailsFx);

export const CheckAvailabilityAction: React.FC<
  Omit<ButtonProps, "onSubmit"> & {
    onSubmit: (
      params: Partial<PaymentArguments> & {
        order_id?: number | undefined;
      }
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

  const isLoading = useStore($pending);

  const [errorMessage, setError] = useState<string>();
  const [isShownError, setIsShownError] = useState<boolean>();

  const isValid = useMemo(() => {
    setIsShownError(false);
    if (!cart) {
      setError("Выберите блюда");
      return false;
    }

    if (!form) {
      setError("Необходимо заполнить адрес");
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
  }, [cart, form, schedule, phone]);

  function handleVerifyCheckout() {
    if (!isValid) {
      setIsShownError(true);
      return;
    }
    if (isLoading) return;

    const formattedDishes = cart.map(({ product, priceObj, modifiers }) => {
      const parsedWeight = parseInt(priceObj.weight);
      const parsedRoublePrice = parseInt(priceObj.rouble_price);
      const parsedTengePrice = parseInt(priceObj.tenge_price);

      return {
        name: product.name,
        weight: (isNaN(parsedWeight) ? EMPTY_STRING : parsedWeight) as number,
        rouble_price: (isNaN(parsedRoublePrice)
          ? EMPTY_STRING
          : parsedRoublePrice) as number,
        tenge_price: (isNaN(parsedTengePrice)
          ? EMPTY_STRING
          : parsedTengePrice) as number,
        modifiers: modifiers
          .map(({ option }) => option)
          .filter((option) => option) as string[],
      };
    });

    onSubmitForm({
      form: {
        ...form!,
        payment: "payment",
        restaurant: restaurant as string,
        time: schedule!.title,
        phone: `+${phone!}`,
        persons_number: 2,
        promocode: promocode?.promocode!,
        dishes: formattedDishes,
        MerchantLogin: MerchantLogin,
      },
      paymentArguments: {
        OutSum: totalAmount ?? 0,
      },
    });

    // onSubmit?.();
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
