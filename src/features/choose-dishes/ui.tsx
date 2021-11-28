import { DishesContainer } from "../../entities/dishes/components/DishesContainer/DishesContainer";
import { Categories } from "../../entities/сategories/components/Categories/Categories";
import { Element } from "react-scroll";
import { categories } from "./config/categories";
import { dishes } from "./config/dishes";
import { useMemo, useState } from "react";

export function ChooseDishes() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].category
  );

  const filteredDishes = useMemo(() => {
    if (selectedCategory === "popular") return dishes;

    return dishes.filter(({ category }) => category === selectedCategory);
  }, [selectedCategory]);

  return (
    <Element
      name="grid"
      className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
    >
      <Categories categories={categories} onClick={setSelectedCategory} />
      <DishesContainer dishes={filteredDishes} />
    </Element>
  );
}
