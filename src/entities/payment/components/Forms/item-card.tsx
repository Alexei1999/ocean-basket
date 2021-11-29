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
    amount: product.price * count,
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
              notAvailable ? "text-red-500" : "text-heading"
            )}
          >
            {count}
          </div>
          <div className="mx-2">x</div>
          <div className="font-medium text-heading mr-3">
            {Array.isArray(product.setItems) && product.setItems.length
              ? product.setItems.join(", ")
              : product.name}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "text-sm font-medium",
          notAvailable ? "text-red-500" : "text-heading"
        )}
      >
        {!notAvailable ? price : "text-unavailable"}
      </div>
    </div>
  );
};

export default ItemCard;
