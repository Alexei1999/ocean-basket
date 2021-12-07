import { useEffect, useMemo, useState } from "react";
import { ValidationError } from "./place-order-action";
import Button, { ButtonProps } from "@shared/button";
import { createGate, useGate, useStore } from "effector-react";
import { $cart, $cartSizes } from "@features/choose-dishes/models";
import { $form } from "./address-form";
import { $schedule } from "./schedule-grid";
import { $phone } from "./add-or-update";
import { createEffect } from "effector";
import { OrderType, postOrder } from "@shared/api/dishes";
import { $promocode } from "@entities/cart/components/cart-sidebar-view";
import { toast } from "react-toastify";

const submitFormFx = createEffect<OrderType, { order_id?: number }>(
  (params: OrderType) => postOrder(params)
);

submitFormFx.watch(() => {
  toast.error("Ошибка при отправке заказа, попробуйте еще раз");
});

const actionGate = createGate<{
  onSuccess: (orderNumber?: number) => void;
  onFail: () => void;
}>();
actionGate.state.on(submitFormFx.doneData, ({ onSuccess }, reponse) =>
  onSuccess(reponse?.order_id)
);
actionGate.state.on(submitFormFx.fail, ({ onFail }) => onFail());

const errorToast = () => toast.error("Ошибка при отправке заказа");

export const CheckAvailabilityAction: React.FC<
  Omit<ButtonProps, "onSubmit"> & { onSubmit: (orderNumber?: number) => void }
> = ({ onSubmit, ...props }) => {
  useGate(actionGate, { onSuccess: onSubmit, onFail: () => {} });

  const { size } = useStore($cartSizes);
  const cart = useStore($cart);
  const form = useStore($form);
  const schedule = useStore($schedule);
  const phone = useStore($phone);
  const promocode = useStore($promocode);

  const isLoading = useStore(submitFormFx.pending);

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

    submitFormFx({
      ...form!,
      time: schedule!.title,
      phone: `+${phone!}`,
      persons_number: 2,
      payment: "payment",
      promocode: promocode?.promocode!,
      // dishes: cart,
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
