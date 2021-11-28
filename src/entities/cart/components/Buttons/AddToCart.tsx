import { Product } from "@entities/dishes/components/DishesContainer/DishesContainer";
import {
  $cart,
  addProductToCart,
  removeProductFromCart,
} from "@features/choose-dishes/ui";
import cn from "classnames";
import { useStore } from "effector-react";
import { AddToCartBtn } from "../../../dishes/components/Card/AddToCartBtn";
import { Counter } from "../../../dishes/components/Counter/Counter";
import styles from "./styles.module.scss";

interface Props {
  data: Product;
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
}

export const AddToCart = ({ data, counterClass, disabled }: Props) => {
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
      // disabled={disabled || outOfStock}
      disabled={disabled || false}
      onClick={handleAddClick}
    />
  );
};
