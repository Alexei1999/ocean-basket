import { AddToCartBtnBig } from "@entities/dishes/components/Card/AddToCartBtnBig";
import Modal from "@entities/payment/components/Forms/modal";
import { createPickedDish } from "@features/choose-dishes/lib";
import {
  $cart,
  $cartSizes,
  addProductToCart,
  deleteLastProductFromCart,
  PickedModifier,
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
  product: Dish;
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
  active: null | (Dish["prices"][number] & { idx: number });
  activeModifiers: {
    [id: string]: PickedModifier;
  };
}

export const AddToCartBig = ({
  counterClass,
  product,
  active,
  disabled,
  activeModifiers,
}: Props) => {
  const { unicItemsNumber } = useStore($cartSizes);

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    if (!active) return;

    addProductToCart(
      createPickedDish(
        product,
        {
          rouble_price: active.rouble_price,
          tenge_price: active.tenge_price,
          weight: active.weight,
        },
        Object.values(activeModifiers).filter((modifier) => modifier)
      )
    );
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    deleteLastProductFromCart(product);
  };

  const count = unicItemsNumber[product.id];

  return (
    <>
      {typeof count === "number" && count > 0 && !disabled ? (
        <Counter
          value={count ?? 0}
          variant="big"
          onDecrement={handleRemoveClick}
          className={cn(counterClass)}
          onIncrement={handleAddClick}
          disabled={disabled}
        />
      ) : (
        <AddToCartBtnBig
          className={cn(styles.button, "max-h-8")}
          disabled={disabled}
          onClick={handleAddClick}
        />
      )}
    </>
  );
};
