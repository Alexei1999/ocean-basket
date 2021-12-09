import { Dish } from "@shared/api/dishes";
import { ModifierType, PickedDish, PickedModifier } from "./models";

export const isTwoPickedDishesEqual = (
  dish1: PickedDish,
  dish2: PickedDish
) => {
  if (dish1.product.id !== dish2.product.id) {
    return false;
  }

  if (dish1.weight !== dish2.weight) {
    return false;
  }

  if (dish1.modifiers.length !== dish2.modifiers.length) {
    return false;
  }

  if (
    dish1.modifiers.some(({ id, option }) => {
      const found = dish2.modifiers.find(
        ({ id: id2, option: option2 }) => id === id2 && option === option2
      );
      return !found;
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
  weight: string,
  price: string,
  modifiers: PickedModifier[] = []
): PickedDish => {
  return {
    count: 1,
    product: dish,
    weight,
    price,
    modifiers,
  };
};
