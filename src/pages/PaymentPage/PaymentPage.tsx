import { DishCover } from "@entities/payment/components/DishCover/DishCover";
import { OrderOverview } from "@entities/payment/components/OrderOverview";
import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";
import { onScrollPage } from "@app/";

export function PaymentPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* <DishCover /> */}
      {/* <HeadlineSuggestion item={dishes?.[0]} /> */}

      <OrderOverview
        onSubmit={() => {
          navigate(RoutesConfig.Checkout);
          onScrollPage();
        }}
      />
    </div>
  );
}
