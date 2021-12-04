import { DishesContainer } from "../../entities/dishes/components/DishesContainer/DishesContainer";
import { Categories } from "../../entities/сategories/components/Categories/Categories";
import { Element } from "react-scroll";
import { createEffect, createStore, forward } from "effector";
import { createGate, useGate } from "effector-react";
import {
  fetchCategoriesFx,
  fetchDishesFx,
  fetchPomotionsFx,
  fetchPopularDishesFx,
  onResetCategory,
} from "./models";
import {
  Category,
  Dish,
  getCategories,
  getDishes,
  getPopular,
  getPromotions,
  Promotion,
} from "@shared/api/dishes";

export type CartItemType = { count: number; product: Dish };

export const ChooseDishesGate = createGate();

forward({
  from: ChooseDishesGate.open,
  to: [
    fetchDishesFx,
    fetchPopularDishesFx,
    fetchCategoriesFx,
    fetchPomotionsFx,
  ],
});

forward({
  from: ChooseDishesGate.close,
  to: onResetCategory,
});

export function ChooseDishes() {
  useGate(ChooseDishesGate);

  // const filteredDishes = useMemo(() => {
  //   if (dishes === "popular") return dishes;

  //   return dishes?.filter(({ category }) => category === dishes);
  // }, [dishes]);

  return (
    <Element
      name="grid"
      className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
    >
      <Categories />
      <DishesContainer />
    </Element>
  );
}
