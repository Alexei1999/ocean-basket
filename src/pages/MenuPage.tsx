import { DishesContainer } from "../entities/dishes/components/Container/DishesContainer";
import { PromotionSlider } from "../entities/promotions/components/ui";
import { Element } from "react-scroll";
import { Categories } from "../features/select-category/components/categories";

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
