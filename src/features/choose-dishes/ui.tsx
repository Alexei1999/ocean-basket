import { DishesContainer } from "../../entities/dishes/components/DishesContainer/DishesContainer";
import { Categories } from "../../entities/сategories/components/Categories/Categories";
import { Element } from "react-scroll";
import { createEffect, createStore, forward } from "effector";
import { createGate, useGate, useStore } from "effector-react";
import {
  $category,
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
import { useEffect, useRef } from "react";
import { SuggestionsBlock } from "@entities/suggestion/components/SuggestionsBlock/SuggestionsBlock";

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

  const caetgory = useStore($category);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [caetgory]);

  return (
    <div ref={ref}>
      <Element
        name="grid"
        className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
      >
        <Categories />
        <DishesContainer />
      </Element>
    </div>
  );
}
