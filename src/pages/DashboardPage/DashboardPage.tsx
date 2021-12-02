import { MainPageCover } from "@pages/DashboardPage/MainPageCover/MainPageCover";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";

export function DashboardPage() {
  return (
    <div>
      <MainPageCover />
      <SubscriptionSection isWaves />
    </div>
  );
}
