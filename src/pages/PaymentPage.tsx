import { DishCover } from "@entities/payment/components/DishCover/DishCover";
import { OrderOverview } from "@entities/payment/components/OrderOverview";
import { SuggestionCategories } from "@entities/suggestion/components/SuggestionCategories";
import { HeadlineSuggestion } from "@entities/suggestion/components/HeadlineSuggestion";
import { dishes } from "@features/choose-dishes/config/dishes";
import { useEffect } from "react";
import { animateScroll } from "react-scroll";

export function PaymentPage() {
  return (
    <div>
      <DishCover />
      <HeadlineSuggestion item={dishes[0]} />
      <SuggestionCategories
        items={["Блюда из яйц", "Салаты", "Сендвичи", "Напитки"]}
      />
      <OrderOverview />
    </div>
  );
}
