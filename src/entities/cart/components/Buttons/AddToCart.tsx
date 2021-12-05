import {
  $cart,
  addProductToCart,
  removeProductFromCart,
} from "@features/choose-dishes/models";
import { Dish, DishStatus } from "@shared/api/dishes";

import cn from "classnames";
import { useStore } from "effector-react";
import { AddToCartBtn } from "../../../dishes/components/Card/AddToCartBtn";
import { Counter } from "../../../dishes/components/Counter/Counter";
import styles from "./styles.module.scss";

interface Props {
  data: Dish;
  counterClass?: string;
  variation?: any;
}

export const AddToCart = ({ data, counterClass }: Props) => {
  const cart = useStore($cart);

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    addProductToCart(data);
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeProductFromCart(data);
  };

  const count = cart[data.id]?.count;

  return typeof count === "number" && count > 0 ? (
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
  );
};
