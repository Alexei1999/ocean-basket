import { saveChoosenDish } from "@entities/cart/components/Details/add-dish-modal";
import { isDishValid } from "@entities/cart/components/Details/details";
import { toTranslit } from "@entities/dishes/components/Card/DishCard";
import { $cartItems } from "@features/choose-dishes/models";
import { Dish } from "@shared/api/common";
import { RoutesConfig } from "@shared/lib/routes-config";
import { $rus } from "@features/choose-dishes/models";
import { useStore } from "effector-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SuggestionsAction } from "./SuggestionsAction";
import { SuggestionsCategory } from "./SuggestionsCategory";

export function SuggestionsBlock({
  className,
  hideOnEmpty,
}: {
  className?: string;
  hideOnEmpty?: boolean;
}) {
  const isRub = useStore($rus);
  const { unicItemsList } = useStore($cartItems);

  const [categorizedDishes, setCategorizedDishes] = useState<{
    [key: string]: Omit<Dish, "recommended_dishes">[];
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const reccomendedDishes = unicItemsList
      .filter((item) => item.recommended_dishes?.length)
      .map((item) => item.recommended_dishes)
      .flat(1)
      .filter((dish) => isDishValid(isRub, dish))
      .reduce<{ [K in string]: Omit<Dish, "recommended_dishes"> }>(
        (acc, dish) => {
          if (!dish?.id) return acc;

          acc[dish.id] = dish;
          return acc;
        },
        {}
      );

    const categorizedDishes = Object.values(reccomendedDishes).reduce<{
      [key: string]: Omit<Dish, "recommended_dishes">[];
    }>((acc, dish) => {
      if (!dish.category) {
        dish.category = "Без категории";
      }

      if (!acc[dish.category]) {
        acc[dish.category] = [];
      }

      acc[dish.category].push(dish);

      return acc;
    }, {});

    setCategorizedDishes(categorizedDishes);
  }, [isRub, unicItemsList]);

  const entries = useMemo(
    () => Object.entries(categorizedDishes),
    [categorizedDishes]
  );

  return (
    <div className={className}>
      {Boolean(entries.length) ? (
        entries.map(([category, dishes], idx) => (
          <React.Fragment key={idx}>
            <SuggestionsCategory name={category} />
            {dishes.map((item, idx) => (
              <SuggestionsAction
                key={idx}
                item={item}
                onClick={() => {
                  saveChoosenDish(item);
                  navigate(
                    (window.location.pathname.startsWith(RoutesConfig.Payment)
                      ? RoutesConfig.Payment
                      : RoutesConfig.Menu) +
                      "/" +
                      item.id +
                      "/" +
                      toTranslit(item.name)
                  );
                }}
              />
            ))}
          </React.Fragment>
        ))
      ) : hideOnEmpty ? null : (
        <div className="w-full flex justify-center py-7 px-3 border-b border-border-200 border-opacity-75">
          <h1 className="text-body text-lg font-bold">
            Нет подходящих блюд для рекомендации
          </h1>
        </div>
      )}
    </div>
  );
}
