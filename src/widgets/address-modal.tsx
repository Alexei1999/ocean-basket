import AddressForm from "@entities/payment/components/Forms/address-form";
import Modal from "@entities/payment/components/Forms/modal";
import { getRestaurant } from "@shared/api/common";
import { createEffect, createEvent, createStore, forward } from "effector";
import { useStore } from "effector-react";
import { toast } from "react-toastify";
import { getIsKz } from "@shared/lib/functional-utils";
import { onChangeHostUrl } from "@shared/api/switchable";
import { $rus } from "@features/choose-dishes/models";
import { onSetRestaurant } from "./header/components/AddressSelection";

const onConfirm = createEvent();

export const $isConfirmed = createStore(getIsKz()).on(onConfirm, () => true);

export const getRestaurantFx = createEffect(getRestaurant);

getRestaurantFx.failData.watch(() => {
  toast.error("Ошибка при отправке адреса");
});

getRestaurantFx.doneData.watch((data) => {
  if (typeof data?.prefix === "string") {
    onChangeHostUrl(data?.prefix);
    onConfirm();
  }

  if (typeof data?.restaurant === "string") {
    onSetRestaurant(data.restaurant);
  }
});

export const setAdressModalOpen = createEvent<boolean>();

export const $isAdressModalOpen = createStore(false).on(
  setAdressModalOpen,
  (_, payload) => payload
);

onConfirm.watch(() => {
  setAdressModalOpen(false);
});

export const AddressModal = () => {
  const isRus = useStore($rus);

  const isOpen = useStore($isAdressModalOpen);
  const isLoading = useStore(getRestaurantFx.pending);

  return (
    <Modal showClose={false} open={isOpen} onClose={() => void 0}>
      <AddressForm
        subLabel={
          isRus
            ? "Мы доставляем наши блюда по всей Москве в пределах МКАД. Если ваш адрес доставки находится за пределами МКАД, ресторан оформит возврат денежных средств и отменит заказ. Заказы за МКАД оформляются по номеру телефона в индивидуальном порядке. Благодарим за понимание."
            : "Мы доставляем наши блюда в пределах зоны: пр. Райымбека - ул. Калдаякова - ул. Сатпаева - ул. Ауезова. Если ваш адрес доставки находится вне зоны, ресторан оформит возврат денежных средств и отменит заказ. Заказы вне зоны оформляются по номеру телефона в индивидуальном порядке. Благодарим за понимание."
        }
        isLoading={isLoading}
        switchIconEnabled={false}
        onSubmit={(coords) => {
          if (isLoading) return;
          if (typeof coords[0] !== "number" || typeof coords[1] !== "number") {
            toast.error("Адрес заполнен неккоректно");
            return;
          }

          getRestaurantFx({
            latitude: coords[0]!.toString(),
            longtitude: coords[1]!.toString(),
          });
        }}
      />
    </Modal>
  );
};
