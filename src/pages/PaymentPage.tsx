import { DishCover } from "@entities/payment/components/DishCover/DishCover";
import { OrderOverview } from "@entities/payment/components/OrderOverview";
import { SuggestionCategories } from "@entities/suggestion/components/SuggestionCategories";
import { HeadlineSuggestion } from "@entities/suggestion/components/HeadlineSuggestion";
import { dishes } from "@features/choose-dishes/config/dishes";
import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";

export function PaymentPage() {
  const navigate = useNavigate();

  return (
    <div>
      <DishCover />
      <HeadlineSuggestion item={dishes[0]} />
      <SuggestionCategories
        items={["Блюда из яйц", "Салаты", "Сендвичи", "Напитки"]}
      />
      <OrderOverview onSubmit={() => navigate(RoutesConfig.Checkout)} />
    </div>
  );
}
