import ItemCard from "./item-card";
import { ItemInfoRow } from "./item-info-row";
import usePrice from "@entities/cart/lib/use-price";
import {
  $promocode,
  EmptyCartPanel,
} from "@entities/cart/components/cart-sidebar-view";
import { useStore } from "effector-react";
import { $cartSizes, $cart } from "@features/choose-dishes/models";
import { DishStatus } from "@shared/api/dishes";
import {
  $grandTotal,
  $location,
  getDeliveryFeeName,
} from "./PaymentProccessing";

export const RightSideView = () => {
  const cartSizes = useStore($cartSizes);
  const cart = useStore($cart);
  const promocode = useStore($promocode);

  const location = useStore($location);
  const grandTotal = useStore($grandTotal);

  // const { price: discount } = usePrice({
  //   amount: 0,
  // });
  const { price: total } = usePrice({
    amount: grandTotal,
  });
  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-s-4 mb-3">
        <span className="text-base font-bold text-body">Твой заказ</span>
      </div>
      <div className="flex flex-col py-3 border-b border-border-200 font-normal">
        {!cartSizes.size ? (
          <div className="h-full flex flex-col items-center justify-center mb-4">
            <EmptyCartPanel noGutters />
          </div>
        ) : (
          cart.map((item, idx) => (
            <ItemCard
              item={item}
              key={`${item.product.id}-${idx}`}
              notAvailable={item.product.status !== DishStatus.Active}
            />
          ))
        )}
      </div>

      <div className="space-y-2 mt-4">
        {promocode && (
          <div className="max-w-full">
            <ItemInfoRow
              keyClassName="text-gray-500"
              valueClassName="text-body text-sm font-medium"
              title="Промокод"
              value={promocode?.promocode}
            />
            <p className="text-body text-sm text-end font-medium pt-1 ">
              {promocode?.promocodeText}
            </p>
          </div>
        )}
        <ItemInfoRow
          keyClassName="text-gray-500"
          title={"Доставка"}
          value={getDeliveryFeeName(cartSizes.totalAmount, location)}
        />
        {/* <ItemInfoRow
          keyClassName="text-gray-500"
          title={"Скидка"}
          value={discount}
        /> */}
        <ItemInfoRow
          className="text-body text-base font-medium"
          title="Итого"
          value={total}
        />
      </div>
    </div>
  );
};
