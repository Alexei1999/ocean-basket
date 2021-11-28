import { PromotionSlider } from "../entities/promotions/components/ui";
import { ChooseDishes } from "../features/choose-dishes/ui";

export function MenuPage() {
  return (
    <div>
      <PromotionSlider />
      <ChooseDishes />
    </div>
  );
}
