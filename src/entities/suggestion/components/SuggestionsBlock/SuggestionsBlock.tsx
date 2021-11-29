import usePrice from "@entities/cart/lib/use-price";
import { Product } from "@entities/dishes/components/DishesContainer/DishesContainer";
import { dishes } from "@features/choose-dishes/config/dishes";
import { addProductToCart } from "@features/choose-dishes/ui";
import React from "react";
import { SuggestionsAction } from "./SuggestionsAction";
import { SuggestionsCategory } from "./SuggestionsCategory";

export function SuggestionsBlock({ items }: { items: Product[] }) {
  return (
    <div>
      <SuggestionsCategory name="Наше предложение" />
      <SuggestionsAction item={dishes[0]} onClick={addProductToCart} />
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <SuggestionsCategory name={item.categoryName} />
          <SuggestionsAction item={item} onClick={addProductToCart} />
        </React.Fragment>
      ))}
    </div>
  );
}
