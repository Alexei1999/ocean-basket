import usePrice, { formatPrice } from "@entities/cart/lib/use-price";
import { PickedDish } from "@features/choose-dishes/models";
import cn from "classnames";
import { useMemo } from "react";
interface Props {
  item: PickedDish;
  notAvailable?: boolean;
  className?: string;
}

const ItemCard = ({ className, item, notAvailable }: Props) => {
  const { product, count, priceObj, modifiers, totalPrice } = item;
  const { weight } = priceObj;

  const { name, comment } = product;

  const modifiersString = useMemo(
    () => modifiers.map(({ name, option }) => `${name} ${option}`),
    [modifiers]
  );

  const { price: formatedPrice } = usePrice({
    amount: (totalPrice ?? 0) * count,
  });

  return (
    <div
      className={cn(className, "flex justify-between py-2 items-center")}
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
              {name} <span className="whitespace-nowrap">{weight}</span>
            </span>
            <div>
              {Boolean(modifiersString.length) &&
                modifiersString.map((modifier, idx) => (
                  <div key={idx}>{modifier}</div>
                ))}
            </div>
            {comment && (
              <div>
                <span
                  className="text-xs text-gray-400"
                  style={{
                    wordBreak: "break-word",
                  }}
                >
                  {comment}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "pl-2 text-sm font-medium",
          notAvailable ? "text-red-500" : "text-body"
        )}
      >
        {!notAvailable ? formatedPrice : "Недоступно"}
      </div>
    </div>
  );
};

export default ItemCard;
