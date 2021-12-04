import { addProductToCart } from "@features/choose-dishes/models";
import { Dish } from "@shared/api/dishes";
import React, { useEffect } from "react";
import { SuggestionsAction } from "./SuggestionsAction";
import { SuggestionsCategory } from "./SuggestionsCategory";

export function SuggestionsBlock({ dishes }: { dishes: Dish[] }) {
  console.log("dishes", dishes);

  const [filteredDishes, setFilteredDishes] = React.useState<{
    [key: string]: Dish[];
  }>({});

  useEffect(() => {
    setFilteredDishes(
      dishes.reduce<{ [key: string]: Dish[] }>((acc, dish) => {
        if (dish.category) {
          if (!acc[dish.category]) {
            acc[dish.category] = [];
          }
          acc[dish.category].push(dish);
        }
        return acc;
      }, {})
    );
  }, [dishes]);

  const entries = Object.entries(filteredDishes);

  console.log("entries", entries);

  return (
    <div>
      {Boolean(dishes[0]) && (
        <>
          <SuggestionsCategory name="Наше предложение" />
          <SuggestionsAction item={dishes[0]} onClick={addProductToCart} />
        </>
      )}
      {Boolean(entries.length) &&
        entries.map(([category, dishes], idx) => (
          <React.Fragment key={idx}>
            <SuggestionsCategory name={category} />
            {dishes.map((item, idx) => (
              <SuggestionsAction
                key={idx}
                item={item}
                onClick={addProductToCart}
              />
            ))}
          </React.Fragment>
        ))}
    </div>
  );
}
