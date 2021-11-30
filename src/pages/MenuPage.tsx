import { PromotionSlider } from "@entities/promotions/components/PromotionSlider/PromotionSlider";
import { ChooseDishes } from "../features/choose-dishes/ui";

export function MenuPage() {
  return (
    <div>
      <PromotionSlider />
      <ChooseDishes />
    </div>
  );
}
