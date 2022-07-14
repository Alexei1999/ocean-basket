import { Dish, EMPTY_STRING } from "@shared/api/common";
import { $rus } from "@features/choose-dishes/models";
import { useStore } from "effector-react";
import { useEffect, useMemo } from "react";
import Attribute from "./attribute";
import { formatPrice } from "./variation-groups";

export const filterPrices = (prices: Dish["prices"], isRub: boolean) => {
  return (prices || [])
    .map((price, idx) => {
      const { weight, rouble_price, tenge_price } = price;
      return {
        weight: weight === EMPTY_STRING ? null : weight,
        rouble_price: parseInt(rouble_price),
        tenge_price: parseInt(tenge_price),
        price: {
          ...price,
          idx,
        },
      };
    })
    .filter(({ weight, rouble_price, tenge_price }) => {
      if (!weight?.length) return false;
      if (isRub) return !isNaN(rouble_price);
      return !isNaN(tenge_price);
    })
    .sort((a, b) => {
      if (isRub) return a.rouble_price - b.rouble_price;
      return a.tenge_price - b.tenge_price;
    });
};

export const useSortedPrices = (prices: Dish["prices"], isRub: boolean) => {
  return useMemo(() => filterPrices(prices, isRub), [isRub, prices]);
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
  const isRub = useStore($rus);
  const mappedPrices = useSortedPrices(prices, isRub);

  useEffect(() => {
    if (!active && mappedPrices.length > 0) {
      onChange(mappedPrices[0].price);
    }
  }, [mappedPrices, onChange, active]);

  if (mappedPrices.length === 0) return null;

  return (
    <span className="flex flex-col">
      <span className="font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-body leading-none capitalize min-w-[60px] inline-block">
        Вес:
      </span>

      <div className="pt-3 w-full flex flex-wrap">
        {mappedPrices?.map?.(({ weight, rouble_price, tenge_price, price }) => (
          <Attribute
            className="mt-3 mr-3"
            key={`${weight}`}
            id={`${weight}`}
            type="radio"
            active={price.idx === active?.idx}
            onClick={() => onChange(price)}
            value={
              <div className="flex justify-between font-medium">
                <span className="whitespace-nowrap">{weight}</span>
                <span className="pl-4">—</span>
                <span className="whitespace-nowrap pl-4">
                  {formatPrice(isRub ? rouble_price : tenge_price, isRub)}
                </span>
              </div>
            }
          />
        ))}
      </div>
    </span>
  );
}
