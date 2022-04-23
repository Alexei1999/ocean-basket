import usePrice from "@entities/cart/lib/use-price";
import { $rus } from "@features/choose-dishes/models";
import { Dish } from "@shared/api/dishes";
import { useStore } from "effector-react";

export function HeadlineSuggestion({ item }: { item?: Dish | null }) {
  const isRur = useStore($rus);

  const { price: totalPrice } = usePrice({
    amount:
      parseInt(
        isRur
          ? (item?.prices[0].rouble_price as string)
          : (item?.prices[0].tenge_price as string)
      ) ?? 0,
  });

  // const { price: deliveryFee } = usePrice({
  //   amount: item.deliveryFee ?? 0,
  // });

  return (
    <div className="md:px-4 lg:px-8 xl:px-32 bg-light py-6 w-full flex justify-between border-b border-border-200 border-opacity-75 shadow-2xl">
      <div>
        {item?.name && (
          <div className="text-body font-bold text-2xl mb-2">{item.name}</div>
        )}
        {item?.description && (
          <div className="text-gray-400 text-sm">{item.description}</div>
        )}
      </div>
      <div className="flex">
        <div>
          <div className="text-gray-400 text-sm mb-2">Готовое предложение</div>
          {item?.description && (
            <div className="text-body text-sm">{item.description}</div>
          )}
        </div>
        <div className="ml-8">
          <div className="text-gray-400 text-sm mb-2">Стоимость</div>
          <div className="text-body text-base">{totalPrice}</div>
        </div>
        {/* {!item.deliveryFee ? ( */}
        {false ? (
          <div className="ml-8 mb-2 flex flex-col items-center justify-center rounded-md border border-solid w-24 h-14 border-green-500 ">
            <span className="text-xs text-green-500">Бесплатная</span>
            <span className="text-xs text-green-500">доставка</span>
          </div>
        ) : (
          <div className="ml-8">
            <div className="text-gray-300 text-sm mb-2">Доставка</div>
            {/* <div className="text-body text-base">{deliveryFee}</div> */}
          </div>
        )}
      </div>
    </div>
  );
}
