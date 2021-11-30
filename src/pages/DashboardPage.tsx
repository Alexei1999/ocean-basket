import { MainPageCover } from "@entities/main-page/components/MainPageCover/MainPageCover";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";

export function DashboardPage() {
  return (
    <div>
      <MainPageCover />
      <SubscriptionSection />
    </div>
  );
}
