import { PromotionSlider } from "@entities/promotions/components/PromotionSlider/PromotionSlider";
import FilterBar from "@widgets/filter-bar/filter-bar";
import { ShopClosedModal } from "@widgets/ShopClosedModal";
import classNames from "classnames";
import { useMemo } from "react";
import { ChooseDishes } from "../../features/choose-dishes/ui";
import { ym } from "./yandex-metrix";

export function MenuPage() {
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
      <div className="metriks" dangerouslySetInnerHTML={{ __html: ym() }} />

      <div className={classNames(!canSticky && "pt-16")}>
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
