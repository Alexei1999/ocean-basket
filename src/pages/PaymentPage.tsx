import { DishCover } from "@entities/payment/components/DishCover/DishCover";
import { OrderOverview } from "@entities/payment/components/OrderOverview";
import { HeadlineSuggestion } from "@entities/suggestion/components/HeadlineSuggestion";
import { dishes } from "@features/choose-dishes/config/dishes";

export function PaymentPage() {
  return (
    <div>
      <DishCover />
      <HeadlineSuggestion item={dishes[0]} />
      <OrderOverview />
    </div>
  );
}
