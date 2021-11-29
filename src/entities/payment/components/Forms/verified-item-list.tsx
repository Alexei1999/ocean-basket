import { Key } from "react";
import Coupon from "./coupon";
import usePrice from "@entities/cart/lib/use-price";
import { CloseIcon } from "@entities/cart/components/icons/close-icon";
import EmptyCartIcon from "./empty-cart";
import { PlaceOrderAction } from "./place-order-action";
import PaymentGrid from "./payment-grid";
import { ItemInfoRow } from "./item-info-row";
import ItemCard from "./item-card";
import { Product } from "@entities/dishes/components/DishesContainer/DishesContainer";

interface Props {
  className?: string;
}
const VerifiedItemList: React.FC<Props> = ({ className }) => {
  const { items, isEmpty: isEmptyCart } = { items: [], isEmpty: true } as any;
  const [verifiedResponse] = [{}] as any;
  const [coupon, setCoupon] = [{}, () => null] as any;
  const [discount] = [100] as any;

  const available_items = items?.filter(
    (item: { id: any }) =>
      !verifiedResponse?.unavailable_products?.includes(item.id)
  );

  const { price: tax } = usePrice(
    verifiedResponse && {
      amount: verifiedResponse.total_tax ?? 0,
    }
  );

  const { price: shipping } = usePrice(
    verifiedResponse && {
      amount: verifiedResponse.shipping_charge ?? 0,
    }
  );

  const base_amount = 1100;
  const { price: sub_total } = usePrice(
    verifiedResponse && {
      amount: base_amount,
    }
  );

  const { price: discountPrice } = usePrice(
    //@ts-ignore
    discount && {
      amount: Number(discount),
    }
  );

  const { price: total } = usePrice(
    verifiedResponse && {
      amount: 20000,
    }
  );
  return (
    <div className={className}>
      <div className="flex flex-col border-b pb-2 border-border-200">
        {!isEmptyCart ? (
          items?.map(
            (item: { id: any; count: number; product: Product }) => {
              const notAvailable = verifiedResponse?.unavailable_products?.find(
                (d: any) => d === item.id
              );
              return (
                <ItemCard
                  item={item}
                  key={item.id}
                  notAvailable={!!notAvailable}
                />
              );
            }
          )
        ) : (
          <EmptyCartIcon />
        )}
      </div>

      <div className="space-y-2 mt-4">
        <ItemInfoRow title={"text-sub-total"} value={sub_total} />
        <ItemInfoRow title={"text-tax"} value={tax} />
        <ItemInfoRow title={"text-shipping"} value={shipping} />
        {discount && coupon ? (
          <div className="flex justify-between">
            <p className="text-sm text-body me-4">{"text-discount"}</p>
            <span className="text-xs font-semibold text-red-500 flex items-center me-auto">
              ({coupon?.code})
              <button onClick={() => setCoupon(null)}>
                <CloseIcon className="w-3 h-3 ms-2" />
              </button>
            </span>
            <span className="text-sm text-body">{discountPrice}</span>
          </div>
        ) : (
          <div className="flex justify-between mt-5 mb-4">
            <Coupon />
          </div>
        )}
        <div className="flex justify-between border-t-4 border-double border-border-200 pt-4">
          <p className="text-base font-semibold text-heading">{"text-total"}</p>
          <span className="text-base font-semibold text-heading">{total}</span>
        </div>
      </div>
      <PaymentGrid className="bg-light p-5 border border-gray-200 mt-10" />
      <PlaceOrderAction>{"text-place-order"}</PlaceOrderAction>
    </div>
  );
};

export default VerifiedItemList;
