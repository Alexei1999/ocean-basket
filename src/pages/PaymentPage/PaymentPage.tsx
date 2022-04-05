import { OrderOverview } from "@entities/payment/components/OrderOverview";
import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";
import { onScrollPage } from "@shared/components/ScrollContainer";
import { AddDishModal } from "@entities/cart/components/Details/add-dish-modal";

export function PaymentPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* <DishCover /> */}
      {/* <HeadlineSuggestion item={dishes?.[0]} /> */}

      <AddDishModal />
      <OrderOverview
        onSubmit={() => {
          navigate(RoutesConfig.Checkout);
          onScrollPage();
        }}
      />
    </div>
  );
}
