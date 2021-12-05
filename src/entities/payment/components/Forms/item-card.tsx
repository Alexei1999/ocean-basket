import usePrice from "@entities/cart/lib/use-price";
import { CartItemType } from "@features/choose-dishes/ui";
import cn from "classnames";
interface Props {
  item: CartItemType;
  notAvailable?: boolean;
}

const ItemCard = ({ item, notAvailable }: Props) => {
  const { product, count } = item;
  const { price } = usePrice({
    amount: parseInt(product.prices?.[0]?.rouble_price ?? 0) * count,
  });
  return (
    <div
      className={cn("flex justify-between py-2 items-center")}
      key={product.id}
    >
      <div className="flex items-center justify-between text-base">
        <div
          className={cn(
            "flex items-center text-sm",
            notAvailable ? "text-red-500" : "text-body"
          )}
        >
          <div
            className={cn(
              "text-sm font-bold",
              notAvailable ? "text-red-500" : "text-body"
            )}
          >
            {count}
          </div>
          <div className="mx-2">x</div>
          <div className="font-medium text-body mr-3">{product.name}</div>
        </div>
      </div>
      <div
        className={cn(
          "text-sm font-medium",
          notAvailable ? "text-red-500" : "text-body"
        )}
      >
        {!notAvailable ? price : "Недоступно"}
      </div>
    </div>
  );
};

export default ItemCard;
