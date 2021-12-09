import { formatPrice } from "@entities/cart/lib/use-price";
import { Dish } from "@shared/api/dishes";
import { useEffect, useMemo } from "react";
import Attribute from "./attribute";

export const useSortedPrices = (prices: Dish["prices"]) => {
  return useMemo(
    () =>
      (prices || [])
        .map((price, idx) => {
          const { weight, rouble_price } = price;
          return {
            weight: parseInt(weight),
            rouble_price: parseInt(rouble_price),
            price: {
              ...price,
              idx,
            },
          };
        })
        .filter(
          ({ weight, rouble_price }) => !isNaN(weight) && !isNaN(rouble_price)
        )
        .sort((a, b) => a.rouble_price - b.rouble_price),
    [prices]
  );
};

export default function VariationPrice({
  prices,
  active,
  onChange,
}: {
  prices: Dish["prices"];
  active: null | (Dish["prices"][number] & { idx: number });
  onChange: (price: Dish["prices"][number] & { idx: number }) => void;
}) {
  const mappedPrices = useSortedPrices(prices);

  useEffect(() => {
    if (!active && mappedPrices.length > 0) {
      onChange(mappedPrices[0].price);
    }
  }, [mappedPrices, onChange, active]);

  if (mappedPrices.length === 0) return null;

  return (
    <span className="flex flex-col">
      <span className="text-xl font-bold text-body leading-none capitalize min-w-[60px] inline-block">
        Вес:
      </span>

      <div className="pt-3 w-full flex flex-wrap">
        {mappedPrices?.map?.(({ weight, rouble_price, price }) => (
          <Attribute
            className="mt-3 mr-3"
            key={`${weight}`}
            id={`${weight}`}
            type="radio"
            active={price.idx === active?.idx}
            onClick={() => onChange(price)}
            value={
              <div className="flex justify-between font-medium">
                <span className="whitespace-nowrap">{weight} гр.</span>
                <span className="pl-4">—</span>
                <span className="whitespace-nowrap pl-4">
                  {formatPrice({
                    amount: rouble_price,
                    currencyCode: "RUB",
                    locale: "ru",
                  })}
                </span>
              </div>
            }
          />
        ))}
      </div>
    </span>
  );
}
