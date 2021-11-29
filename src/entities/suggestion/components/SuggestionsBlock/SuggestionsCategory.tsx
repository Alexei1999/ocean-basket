import usePrice from "@entities/cart/lib/use-price";
import { Product } from "@entities/dishes/components/DishesContainer/DishesContainer";
import classNames from "classnames";
import { Eclipse } from "./Eclipse";

//@ts-ignore
export function SuggestionsCategory({ name }: { name: string }) {
  return (
    <div className="bg-light w-full flex">
      <div className="w-full border-b border-border-200 border-opacity-75">
        <header
          className={classNames(
            "w-full py-9 md:px-4 lg:px-8 flex items-center justify-center"
          )}
        >
          <Eclipse className="mr-5" />
          <span className="text-xl font-bold">{name}</span>
          <Eclipse className="ml-5" />
        </header>
      </div>
    </div>
  );
}
