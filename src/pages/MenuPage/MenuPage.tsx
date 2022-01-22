import { PromotionSlider } from "@entities/promotions/components/PromotionSlider/PromotionSlider";
import FilterBar from "@widgets/filter-bar/filter-bar";
import { ShopClosedModal } from "@widgets/ShopClosedModal";
import { ChooseDishes } from "../../features/choose-dishes/ui";

export function MenuPage() {
  return (
    <div>
      <ShopClosedModal />
      <PromotionSlider />
      <div className="relative">
        <FilterBar />
        <ChooseDishes />
      </div>
    </div>
  );
}
