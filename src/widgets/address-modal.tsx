import AddressForm from "@entities/payment/components/Forms/address-form";
import Modal from "@entities/payment/components/Forms/modal";
import { getRestaurant } from "@shared/api/common";
import { createEffect, createEvent, createStore, forward } from "effector";
import { useStore } from "effector-react";
import { toast } from "react-toastify";
import { getIsKz } from "@shared/lib/functional-utils";

const onConfirm = createEvent();

export const $isConfirmed = createStore(getIsKz());

export const getRestaurantFx = createEffect(getRestaurant);

getRestaurantFx.failData.watch(() => {
  toast.error("Ошибка при отправке адреса");
});

export const getRestaurantFiltered = getRestaurantFx.doneData.filterMap(
  (props) => {
    if (typeof props?.prefix !== "string") {
      return;
    }

    return props.prefix;
  }
);

getRestaurantFiltered.watch((sss) => "filtered: " + sss);

forward({
  from: getRestaurantFiltered,
  to: onConfirm,
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
