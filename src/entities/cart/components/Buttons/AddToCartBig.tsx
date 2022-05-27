import { AddToCartBtnBig } from "@entities/dishes/components/Card/AddToCartBtnBig";
import { createPickedDish } from "@features/choose-dishes/lib";
import {
  $cartSizes,
  $rus,
  addProductToCart,
  deleteLastProductFromCart,
  PickedModifier,
} from "@features/choose-dishes/models";
import { Dish } from "@shared/api/dishes";

import cn from "classnames";
import { useStore } from "effector-react";
import { Counter } from "../../../dishes/components/Counter/Counter";
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
  onAdd?: () => void;
}

export const AddToCartBig = ({
  counterClass,
  product,
  active,
  disabled,
  activeModifiers,
  onAdd,
}: Props) => {
  const isRub = useStore($rus);
  const { unicItemsNumber } = useStore($cartSizes);

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    // if (!active) return;
    // if (disabled) return;

    active = {
      idx: 20,
      rouble_price: "1500",
      tenge_price: "1500",
      weight: "1",
    };

    addProductToCart(
      createPickedDish(
        product,
        {
          rouble_price: active.rouble_price,
          tenge_price: active.tenge_price,
          weight: active.weight,
        },
        Object.values(activeModifiers).filter((modifier) => modifier),
        isRub
      )
    );

    onAdd?.();
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
