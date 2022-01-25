import { SuggestionsBlock } from "@entities/suggestion/components/SuggestionsBlock/SuggestionsBlock";
import {
  $category,
  $dishes,
  $popularDishes,
  fetchDishesFx,
  fetchPopularDishesFx,
  fetchTimeValidateFx,
  POPULAR_CATEGORY,
} from "@features/choose-dishes/models";
import cn from "classnames";
import { useStore } from "effector-react";
import { useEffect, useMemo, useState } from "react";
import { DishCard } from "../Card/DishCard";
import { NotFound } from "../NotFound";
import { ProductLoader } from "./ProductLoader";

export function DishesContainer() {
  const selectedCategory = useStore($category);

  const dishes = useStore($dishes);
  const popular = useStore($popularDishes);

  const isDishesLoading = useStore(fetchDishesFx.pending);
  const isPopularDishesLoading = useStore(fetchPopularDishesFx.pending);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const dishesSubscribe = fetchDishesFx.fail.watch((error) => {
      console.error(error);
      setIsError(true);
    });
    const timeValidateSubscribe = fetchTimeValidateFx.fail.watch((error) => {
      console.error(error);
      setIsError(true);
    });

    return () => {
      dishesSubscribe();
      timeValidateSubscribe();
    };
  }, []);

  const filteredDishes = useMemo(() => {
    if (selectedCategory === POPULAR_CATEGORY.category) return popular;
    return dishes?.filter((dish) => dish.category === selectedCategory);
  }, [dishes, popular, selectedCategory]);

  const isLoading =
    selectedCategory === POPULAR_CATEGORY.category
      ? isPopularDishesLoading
      : isDishesLoading;

  if (!isLoading && !filteredDishes?.length) {
    //TODO: Уточнить текстовки у бизнеса
    return (
      <div className="bg-gray-100 flex-grow min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound
          text={
            isError
              ? "Ошибка при получении меню, перезагрузите страницу"
              : "Меню для выбранной категории отсутствует"
          }
          className="w-7/12 mx-auto"
        />
      </div>
    );
  }

  return (
    <>
      <div
        className={cn("flex-1 bg-gray-100 pt-6 pb-8 pl-4 pr-4 lg:p-8 xl:pr-32")}
      >
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-7"
          )}
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
        <SuggestionsBlock className="bg-light rounded-2xl mt-7" hideOnEmpty />
      </div>
    </>
  );
}
