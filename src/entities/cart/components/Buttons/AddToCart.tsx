import Modal from "@entities/payment/components/Forms/modal";
import {
  $cart,
  $cartSizes,
  addProductToCart,
  deleteLastProductFromCart,
  removeProductFromCart,
} from "@features/choose-dishes/models";
import { Dish, DishStatus } from "@shared/api/dishes";

import cn from "classnames";
import { useStore } from "effector-react";
import { AddToCartBtn } from "../../../dishes/components/Card/AddToCartBtn";
import { Counter } from "../../../dishes/components/Counter/Counter";
import { onDishModalOpen } from "../Details/add-dish-modal";
import Popup from "../Details/popup";
import styles from "./styles.module.scss";

interface Props {
  data: Dish;
  counterClass?: string;
  variation?: any;
}

export const AddToCart = ({ data, counterClass }: Props) => {
  const { unicItemsNumber } = useStore($cartSizes);

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    onDishModalOpen(data);
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    deleteLastProductFromCart(data);
  };

  const count = unicItemsNumber[data.id];

  return (
    <>
      {typeof count === "number" && count > 0 ? (
        <Counter
          value={count ?? 0}
          variant="argon"
          onDecrement={handleRemoveClick}
          className={cn(styles.counter, "max-h-8", counterClass)}
          onIncrement={handleAddClick}
          disabled={false}
        />
      ) : (
        <AddToCartBtn
          className={cn(styles.button, "max-h-8")}
          disabled={data.status !== DishStatus.Active}
          onClick={handleAddClick}
        />
      )}
    </>
  );
};
