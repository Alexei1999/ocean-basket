import {
  $cartSizes,
  $isRestaurantOpen,
  deleteLastProductFromCart,
} from "@features/choose-dishes/models";
import { Dish, DishStatus } from "@shared/api/dishes";

import cn from "classnames";
import { useStore } from "effector-react";
import { AddToCartBtn } from "../../../dishes/components/Card/AddToCartBtn";
import { Counter } from "../../../dishes/components/Counter/Counter";
import { onDishModalOpen } from "../Details/add-dish-modal";
import styles from "./styles.module.scss";

interface Props {
  data: Dish;
  counterClass?: string;
  variation?: any;
}

export const AddToCart = ({ data, counterClass }: Props) => {
  const { unicItemsNumber } = useStore($cartSizes);

  const isOpen = useStore($isRestaurantOpen);

  const isDisabled = data.status !== DishStatus.Active || isOpen === false;

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    if (isDisabled) return;

    onDishModalOpen(data);
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    deleteLastProductFromCart(data);
  };

  const count = unicItemsNumber[data.id];

  return (
    <>
      {false ? (
        <Counter
          value={count ?? 0}
          variant="argon"
          onDecrement={handleRemoveClick}
          className={cn(
            styles.counter,
            "max-h-8 sm:max-w-[8rem]",
            counterClass
          )}
          onIncrement={handleAddClick}
          disabled={false}
        />
      ) : (
        <AddToCartBtn
          className={cn(styles.button, "rounded-3xl max-h-8 sm:max-w-[6rem]")}
          disabled={isDisabled}
          onClick={handleAddClick}
        />
      )}
    </>
  );
};
