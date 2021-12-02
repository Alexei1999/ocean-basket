import usePrice from "@entities/cart/lib/use-price";
import { Product } from "@entities/dishes/components/DishesContainer/DishesContainer";
import { AddToCartSuggstionBtn } from "./AddToCartSuggstionBtn";

//@ts-ignore
export function SuggestionsAction({
  item,
  onClick,
}: {
  item: Product;
  onClick: (item: Product) => void;
}) {
  const { price } = usePrice({
    amount: item.price ?? 0,
  });

  return (
    <div className="bg-light w-full flex py-9 md:px-4 lg:px-8 justify-between border-b border-border-200">
      <div>
        <div className="text-body font-bold text-2xl mb-2">
          {item.ingridients.join(", ")}
        </div>
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
