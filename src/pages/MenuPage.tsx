import { DishesContainer } from "../entities/dishes/components/DishesContainer/DishesContainer";
import { PromotionSlider } from "../entities/promotions/components/ui";
import { Element } from "react-scroll";
import { Categories } from "../features/select-category/components/Categories/Categories";

export function MenuPage() {
  return (
    <div>
      <PromotionSlider />
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
