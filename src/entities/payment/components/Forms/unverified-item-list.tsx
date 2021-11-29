import ItemCard from "./item-card";
import { ItemInfoRow } from "./item-info-row";
import usePrice from "@entities/cart/lib/use-price";
import { EmptyCartPanel } from "@entities/cart/components/cart-sidebar-view";
import { useStore } from "effector-react";
import { $cartItems, $cartSizes } from "@features/choose-dishes/ui";

export const UnverifiedItemList = () => {
  const cartSizes = useStore($cartSizes);
  const cartItems = useStore($cartItems);

  const { price: delivery } = usePrice({
    amount: 0,
  });
  const { price: discount } = usePrice({
    amount: 0,
  });
  const { price: total } = usePrice({
    amount: cartSizes.totalAmount ?? 0,
  });
  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-s-4 mb-4">
        <span className="text-base font-bold text-heading">Твой заказ</span>
      </div>
      <div className="flex flex-col py-3 border-b border-border-200 font-normal">
        {!cartSizes.size ? (
          <div className="h-full flex flex-col items-center justify-center mb-4">
            <EmptyCartPanel noGutters />
          </div>
        ) : (
          cartItems.map((item) => (
            <ItemCard item={item} key={item.product.id} />
          ))
        )}
      </div>
      <div className="space-y-2 mt-4">
        <ItemInfoRow title={"Доставка"} value={delivery} />
        <ItemInfoRow title={"Скидка"} value={discount} />
        <ItemInfoRow
          className="text-heading text-base font-medium"
          title="Итого"
          value={total}
        />
      </div>
    </div>
  );
};
