import usePrice from "@entities/cart/lib/use-price";
import { $rus } from "@features/choose-dishes/models";
import { Dish } from "@shared/api/dishes";
import { useStore } from "effector-react";
import { AddToCartSuggstionBtn } from "./AddToCartSuggstionBtn";

//@ts-ignore
export function SuggestionsAction({
  item,
  onClick,
}: {
  item: Omit<Dish, "recommended_dishes">;
  onClick: (item: Omit<Dish, "recommended_dishes">) => void;
}) {
  const isRus = useStore($rus);

  const { price } = usePrice({
    amount:
      parseInt(
        isRus ? item.prices?.[0].rouble_price : item.prices?.[0].tenge_price
      ) ?? 0,
  });

  return (
    <div className="bg-light w-full flex py-9 md:px-4 lg:px-8 justify-between border-b border-border-200">
      <div className="pr-9">
        <div className="text-body font-bold text-2xl mb-2">{item.name}</div>
        <div className="text-gray-400 text-sm">{item.description}</div>
      </div>
      <div className="flex items-center">
        <div className="text-gray-400 text-sm ">Стоимость</div>
        <div className="font-bold text-base ml-3 text-body">{price}</div>
        <div className="ml-12 mr-5">
          <AddToCartSuggstionBtn onClick={() => onClick(item)} />
        </div>
      </div>
    </div>
  );
}
