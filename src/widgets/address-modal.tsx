import AddressForm from "@entities/payment/components/Forms/address-form";
import Modal from "@entities/payment/components/Forms/modal";
import { getRestaurant } from "@shared/api/common";
import { createEffect, createEvent, createStore, forward } from "effector";
import { useStore } from "effector-react";
import { toast } from "react-toastify";
import { getIsKz } from "@shared/lib/functional-utils";
import { onChangeHostUrl } from "@shared/api/switchable";

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
});

export const $isAdressModalOpen = $isConfirmed.map(
  (isConfirmed) => !isConfirmed
);

export const AddressModal = () => {
  const isOpen = useStore($isAdressModalOpen);
  const isLoading = useStore(getRestaurantFx.pending);

  return (
    <Modal showClose={false} open={isOpen} onClose={() => void 0}>
      <AddressForm
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
