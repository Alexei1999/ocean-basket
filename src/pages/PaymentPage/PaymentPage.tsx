import { DishCover } from "@entities/payment/components/DishCover/DishCover";
import { OrderOverview } from "@entities/payment/components/OrderOverview";
import { SuggestionCategories } from "@entities/suggestion/components/SuggestionCategories";
import { HeadlineSuggestion } from "@entities/suggestion/components/HeadlineSuggestion";
import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";
import { useStore } from "effector-react";
import { $dishes } from "@features/choose-dishes/models";

export function PaymentPage() {
  const navigate = useNavigate();

  const dishes = useStore($dishes);

  return (
    <div>
      <DishCover />
      {/* <HeadlineSuggestion item={dishes?.[0]} /> */}

      <OrderOverview onSubmit={() => navigate(RoutesConfig.Checkout)} />
    </div>
  );
}
