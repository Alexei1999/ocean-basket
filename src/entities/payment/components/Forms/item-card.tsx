import usePrice from "@entities/cart/lib/use-price";
import { PickedDish } from "@features/choose-dishes/models";
import cn from "classnames";
import { useMemo } from "react";
interface Props {
  item: PickedDish;
  notAvailable?: boolean;
}

const ItemCard = ({ item, notAvailable }: Props) => {
  const { product, count, price, weight, modifiers } = item;
  const { name } = product;

  const modifiersString = useMemo(
    () => modifiers.map(({ option }) => option),
    [modifiers]
  );

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
          <div className="font-medium text-body mr-3 flex flex-col">
            <span>
              {name} <span className="whitespace-nowrap">{weight} гр.</span>
            </span>
            <span>
              {Boolean(modifiersString.length) && modifiersString.join(", ")}
            </span>
          </div>
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
