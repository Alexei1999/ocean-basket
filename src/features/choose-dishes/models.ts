import { OrderOverviewGate } from "@entities/payment/components/OrderOverview";
import { onCategoryClick } from "@entities/сategories/components/TreeMenu/TreeMenuItem";
import {
  Category,
  Dish,
  getCategories,
  getDishes,
  getPopular,
  getPromotions,
  Promotion,
} from "@shared/api/dishes";
import { createEffect, createEvent, createStore, forward } from "effector";
import { getFromStorage } from "./api";
import { CartItemType, ChooseDishesGate } from "./ui";

export const POPULAR_CATEGORY = {
  id: -1,
  category: "Популярные",
  created_at: "",
  updated_at: "",
};

export const fetchDishesFx = createEffect(getDishes);
export const fetchPopularDishesFx = createEffect(getPopular);
export const fetchCategoriesFx = createEffect(getCategories);
export const fetchPomotionsFx = createEffect(getPromotions);

export const $dishes = createStore<Dish[] | null>(null).on(
  fetchDishesFx.doneData,
  (_, data) => data
);
export const $popularDishes = createStore<Dish[] | null>(null).on(
  fetchPopularDishesFx.doneData,
  (_, data) => data
);
export const $categories = createStore<Category[]>([POPULAR_CATEGORY]).on(
  fetchCategoriesFx.doneData,
  (_, data) => [POPULAR_CATEGORY, ...data]
);

export const $promotions = createStore<Promotion[] | null>(null).on(
  fetchPomotionsFx.doneData,
  (_, data) => data
);

export const addProductToCart = createEvent<Dish>();
export const removeProductFromCart = createEvent<Dish>();
export const dropProductFromCart = createEvent<string | number>();
export const dropCart = createEvent();

export const $cart = createStore<{
  [id in string]: CartItemType;
}>(getFromStorage("cart"))
  .on(fetchDishesFx.doneData, (state, dishes) => {
    const ids = dishes.map((dish) => dish.id);
    Object.keys(state).forEach((id) => {
      if (!ids.includes(parseInt(id))) {
        delete state[id];
      }
    });

    return state;
  })
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
  })
  .on(dropCart, () => ({}));

$cart.watch((state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
});

export const $cartSizes = $cart.map((state) => {
  return Object.values(state)
    .filter((value) => value !== undefined && value.count > 0)
    .reduce<{ size: number; totalAmount: number | null }>(
      (acc, value) => {
        const amount = parseInt(value?.product.prices?.[0].rouble_price);

        return {
          size: acc.size + value!.count,
          totalAmount:
            !isNaN(amount) && typeof amount === "number"
              ? (acc.totalAmount ?? 0) + amount * value!.count
              : acc.totalAmount,
        };
      },
      {
        size: 0,
        totalAmount: null,
      }
    );
});

export const onResetCategory = createEvent<void>();
export const $category = createStore<string>(POPULAR_CATEGORY.category)
  .on(onCategoryClick, (_, category) => category)
  .on(onResetCategory, () => POPULAR_CATEGORY.category);

export const $cartItems = $cart.map((state) => Object.values(state));
