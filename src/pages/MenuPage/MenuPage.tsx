import { AddDishModal } from "@entities/cart/components/Details/add-dish-modal";
import { PromotionSlider } from "@entities/promotions/components/PromotionSlider/PromotionSlider";
import { onRemoveAnimationConfig } from "@shared/components/LoadingContainer/FishAnimationContainer";
import { RoutesConfig } from "@shared/lib/routes-config";
import FilterBar from "@widgets/filter-bar/filter-bar";
import { ShopClosedModal } from "@widgets/ShopClosedModal";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { YMInitializer } from "react-yandex-metrika";
import { ChooseDishes } from "../../features/choose-dishes/ui";

export function MenuPage() {
  useEffect(() => {
    onRemoveAnimationConfig(RoutesConfig.Menu);
  }, []);
  const canSticky = useMemo(() => {
    return false;
    try {
      return CSS.supports("position", "sticky");
    } catch {
      return false;
    }
  }, []);

  return (
    <>
      <YMInitializer
        accounts={[87286996]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: "dataLayer",
        }}
      />
      <AddDishModal />
      <div className={classNames(!canSticky && "pt-14 md:pt-16 xl:pt-0")}>
        <ShopClosedModal />
        <PromotionSlider />
        <div className="relative">
          <FilterBar />
          <ChooseDishes />
        </div>
      </div>
    </>
  );
}
