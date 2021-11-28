import { DishCover } from "@entities/payment/components/DishCover/DishCover";
import { OrderOverview } from "@entities/payment/components/OrderOverview";

export function PaymentPage() {
  return (
    <div>
      <DishCover />
      <OrderOverview />
    </div>
  );
}
