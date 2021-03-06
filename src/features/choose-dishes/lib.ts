import { Dish } from "@shared/api/common";
import {
  ModifierType,
  PickedDish,
  PickedModifier,
  PickedPrice,
} from "./models";

export const isTwoPickedDishesEqual = (
  dish1: Partial<PickedDish>,
  dish2: Partial<PickedDish>
) => {
  if (dish1.product?.comment !== dish2.product?.comment) {
    return false;
  }

  if (dish1.product?.id !== dish2.product?.id) {
    return false;
  }

  if (dish1.priceObj?.weight !== dish2.priceObj?.weight) {
    return false;
  }

  if (dish1.modifiers?.length !== dish2.modifiers?.length) {
    return false;
  }

  if (
    dish1.modifiers?.some(({ id, option }) => {
      return !dish2.modifiers?.find(
        ({ id: id2, option: option2 }) => id === id2 && option === option2
      );
    })
  ) {
    return false;
  }

  return true;
};

export const createModifier = (
  modifier: ModifierType,
  option: string
): PickedModifier => ({
  ...modifier,
  option,
});

export const createPickedDish = (
  dish: Dish,
  priceObj: PickedPrice,
  modifiers: PickedModifier[] = [],
  isRub: boolean
): Omit<PickedDish, "count"> => {
  return {
    product: dish,
    priceObj,
    modifiers,
    totalPrice:
      (parseInt(isRub ? priceObj.rouble_price : priceObj.tenge_price) ?? 0) +
      modifiers.reduce((acc, { price }) => acc + (price ?? 0), 0),
  };
};
