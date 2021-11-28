import {
  DishesContainer,
  Product,
} from "../../entities/dishes/components/DishesContainer/DishesContainer";
import { Categories } from "../../entities/сategories/components/Categories/Categories";
import { Element } from "react-scroll";
import { categories } from "./config/categories";
import { dishes } from "./config/dishes";
import { useMemo } from "react";
import { createEvent, createStore, forward } from "effector";
import { createGate, useGate, useStore } from "effector-react";
import { onCategoryClick } from "@entities/сategories/components/TreeMenu/TreeMenuItem";

export type CartItemType = { count: number; product: Product };

const onResetCategory = createEvent<void>();
export const $category = createStore<string>(categories[0].category)
  .on(onCategoryClick, (_, category) => category)
  .on(onResetCategory, () => categories[0].category);

export const addProductToCart = createEvent<Product>();
export const removeProductFromCart = createEvent<Product>();
export const dropProductFromCart = createEvent<string | number>();

export const $cart = createStore<{
  [id in string]: CartItemType;
}>({})
  .on(addProductToCart, (state, product) => {
    const isProductInCart = Boolean(state[product.id]);

    if (!isProductInCart) {
      return {
        ...state,
        [product.id]: { count: 1, product },
      };
    }

    return {
      ...state,
      [product.id]: { count: state[product.id]!.count + 1, product },
    };
  })
  .on(removeProductFromCart, (state, product) => {
    const isProductInCart = Boolean(state[product.id]);

    if (!isProductInCart) return state;

    const count = state[product.id]!.count;

    if (count === 1) {
      const { [product.id]: _, ...rest } = state;

      return rest;
    }

    return {
      ...state,
      [product.id]: { count: count - 1, product },
    };
  })
  .on(dropProductFromCart, (state, id) => {
    const { [id]: _, ...rest } = state;

    return rest;
  });

export const $cartSizes = $cart.map((state) =>
  Object.values(state)
    .filter((value) => value !== undefined && value.count > 0)
    .reduce<{ size: number; totalAmount: number | null }>(
      (acc, value) => {
        const amount = value!.product.price;
        return {
          size: acc.size + value!.count,
          totalAmount:
            typeof amount === "number"
              ? (acc.totalAmount ?? 0) + amount * value!.count
              : null,
        };
      },
      {
        size: 0,
        totalAmount: null,
      }
    )
);

const ChooseDishesGate = createGate();
forward({
  from: ChooseDishesGate.close,
  to: onResetCategory,
});

export function ChooseDishes() {
  useGate(ChooseDishesGate);
  const selectedCategory = useStore($category);
  const filteredDishes = useMemo(() => {
    if (selectedCategory === "popular") return dishes;

    return dishes.filter(({ category }) => category === selectedCategory);
  }, [selectedCategory]);

  return (
    <Element
      name="grid"
      className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
    >
      <Categories categories={categories} />
      <DishesContainer dishes={filteredDishes} />
    </Element>
  );
}
