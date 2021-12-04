import {
  $category,
  $dishes,
  $popularDishes,
  fetchDishesFx,
  POPULAR_CATEGORY,
} from "@features/choose-dishes/models";
import { Dish } from "@shared/api/dishes";
import cn from "classnames";
import { useStore } from "effector-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DishCard } from "../Card/DishCard";
import { NotFound } from "../NotFound";
import { ProductLoader } from "./ProductLoader";

export function DishesContainer() {
  const selectedCategory = useStore($category);

  const dishes = useStore($dishes);
  const popular = useStore($popularDishes);

  const isDishesLoading = useStore(fetchDishesFx.pending);
  const isPopularDishesLoading = useStore(fetchDishesFx.pending);

  const filteredDishes = useMemo(() => {
    if (selectedCategory === POPULAR_CATEGORY.category) return popular;
    return dishes?.filter((dish) => dish.category === selectedCategory);
  }, [dishes, selectedCategory]);

  const isLoading =
    selectedCategory === POPULAR_CATEGORY.category
      ? isPopularDishesLoading
      : isDishesLoading;

  if (!filteredDishes?.length) {
    //TODO: Уточнить текстовки у бизнеса
    return (
      <div className="bg-gray-100 flex-grow min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound
          text="Меню для данной категории отсутствует"
          className="w-7/12 mx-auto"
        />
      </div>
    );
  }

  return (
    <div className={cn("flex-1 bg-gray-100 pt-6 pb-8 pl-4 lg:p-8 xl:pr-32")}>
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7")}
      >
        {isLoading ? (
          <>
            {Array(20)
              .fill(null)
              .map((_, i) => (
                <ProductLoader key={i} uniqueKey={`product-${i}`} />
              ))}
          </>
        ) : (
          filteredDishes?.map((product) => (
            <div key={product.id}>
              <DishCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
