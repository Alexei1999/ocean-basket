import { PromotionsSection } from "@entities/promotions/components/PromotionsSection/PromotionsSection";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";

export function PromotionsPage() {
  return (
    <div>
      <PromotionsSection />
      <SubscriptionSection />
    </div>
  );
}
