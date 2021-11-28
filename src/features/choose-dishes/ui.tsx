import { DishesContainer } from "../../entities/dishes/components/DishesContainer/DishesContainer";
import { Categories } from "../../entities/сategories/components/Categories/Categories";
import { Element } from "react-scroll";
import { categories } from "./config/categories";
import { dishes } from "./config/dishes";
import { useMemo } from "react";
import { createStore } from "effector";
import { useStore } from "effector-react";
import { onCategoryClick } from "@entities/сategories/components/TreeMenu/TreeMenuItem";

const $category = createStore<string>(categories[0].category).on(
  onCategoryClick,
  (_, category) => category
);

export function ChooseDishes() {
  const selectedCategory = useStore($category);

  const filteredDishes = useMemo(() => {
    if (selectedCategory === "popular") return dishes;

    return dishes.filter(({ category }) => category === selectedCategory);
  }, [selectedCategory]);

  return (
    <Element
      name="grid"
      className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
    >
      <Categories categories={categories} />
      <DishesContainer dishes={filteredDishes} />
    </Element>
  );
}
