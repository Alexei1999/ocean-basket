import Modal from "@entities/payment/components/Forms/modal";
import { Dish } from "@shared/api/dishes";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import Popup from "./popup";

export const onDishModalOpen = createEvent<Dish>();
export const onDishModalClose = createEvent();

const $currentDish = createStore<Dish | null>(null).on(
  onDishModalOpen,
  (_, dish) => dish
);

const $isDishModalOpen = createStore(false)
  .on(onDishModalOpen, () => true)
  .on(onDishModalClose, () => false);

export const AddDishModal = () => {
  const isOpen = useStore($isDishModalOpen);
  const currentDish = useStore($currentDish);

  if (!currentDish) return null;

  console.log(currentDish, "currentDish");

  return (
    <Modal showClose open={isOpen} onClose={onDishModalClose}>
      <Popup product={currentDish} />
    </Modal>
  );
};
