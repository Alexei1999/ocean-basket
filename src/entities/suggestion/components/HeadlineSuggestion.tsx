import usePrice from "@entities/cart/lib/use-price";
import { Product } from "@entities/dishes/components/DishesContainer/DishesContainer";

export function HeadlineSuggestion({ item }: { item: Product }) {
  const { price: totalPrice } = usePrice({
    amount: item.price ?? 0,
  });

  const { price: deliveryFee } = usePrice({
    amount: item.deliveryFee ?? 0,
  });

  return (
    <div className="md:px-4 lg:px-8 xl:px-32 bg-light py-6 w-full flex justify-between border-b border-border-200  border-opacity-75">
      <div>
        <div className="text-body font-bold text-2xl mb-2">{item.name}</div>
        <div className="text-gray-400 text-sm">{item.description}</div>
      </div>
      <div className="flex">
        <div>
          <div className="text-gray-400 text-sm mb-2">Готовое предложение</div>
          <div className="text-body text-sm">
            {item.ingridients.join(", ")}
          </div>
        </div>
        <div className="ml-8">
          <div className="text-gray-400 text-sm mb-2">Стоимость</div>
          <div className="text-body text-base">{totalPrice}</div>
        </div>
        {!item.deliveryFee ? (
          <div className="ml-8 mb-2 flex flex-col items-center justify-center rounded-md border border-solid w-24 h-14 border-green-500 ">
            <span className="text-xs text-green-500">Бесплатная</span>
            <span className="text-xs text-green-500">доставка</span>
          </div>
        ) : (
          <div className="ml-8">
            <div className="text-gray-300 text-sm mb-2">Доставка</div>
            <div className="text-body text-base">{deliveryFee}</div>
          </div>
        )}
      </div>
    </div>
  );
}
