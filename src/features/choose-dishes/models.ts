import { OrderOverviewGate } from "@entities/payment/components/OrderOverview";
import { onCategoryClick } from "@entities/сategories/components/TreeMenu/TreeMenuItem";
import {
  Category,
  Dish,
  DishStatus,
  EMPTY_STRING,
  getCategories,
  getDishes,
  getPopular,
  getPromotions,
  Promotion,
} from "@shared/api/dishes";
import { createEffect, createEvent, createStore, forward } from "effector";
import { getFromStorage } from "./api";
import { isTwoPickedDishesEqual } from "./lib";

export const POPULAR_CATEGORY = {
  id: -1,
  category: "Популярные",
  created_at: "",
  updated_at: "",
};

export type ModifierType = {
  id: number;
  dish_id: number;
  name: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  option4: string | null;
  option5: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type PickedModifier = Pick<ModifierType, "id" | "dish_id" | "name"> & {
  option?: string;
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

export const addProductToCart = createEvent<PickedDish>();
export const removeProductFromCart = createEvent<PickedDish>();
export const deleteLastProductFromCart = createEvent<Dish>();
export const dropProductFromCart = createEvent<PickedDish>();
export const dropCart = createEvent();

const items = getFromStorage("cart");

export type PickedDish = {
  count: number;
  product: Dish;
  weight: string;
  price: string;
  modifiers: PickedModifier[];
};

export const $cart = createStore<PickedDish[]>(
  Array.isArray(items) ? items : []
)
  .on(fetchDishesFx.doneData, (state, dishes) => {
    const ids = dishes.map((dish) => dish.id);
    return state.filter(({ product: { id } }) => {
      return ids.includes(id);
    });
  })
  .on(addProductToCart, (state, pickedDish) => {
    if (pickedDish.product.status !== DishStatus.Active) return;
    if (!pickedDish.price || pickedDish.price === EMPTY_STRING) return;
    if (!pickedDish.weight || pickedDish.weight === EMPTY_STRING) return;

    const indexOfItem = state.findIndex((item: PickedDish) =>
      isTwoPickedDishesEqual(item, pickedDish)
    );

    if (indexOfItem === -1) {
      return [...state, pickedDish];
    }

    return [
      ...state.slice(0, indexOfItem),
      {
        ...state[indexOfItem],
        count: state[indexOfItem].count + 1,
      },
      ...state.slice(indexOfItem + 1),
    ];
  })
  .on(removeProductFromCart, (state, product) => {
    const indexOfItem = state.findIndex((item: PickedDish) =>
      isTwoPickedDishesEqual(item, product)
    );

    if (indexOfItem === -1) {
      return state;
    }

    if (state[indexOfItem].count === 1) {
      return [...state.slice(0, indexOfItem), ...state.slice(indexOfItem + 1)];
    }

    return [
      ...state.slice(0, indexOfItem),
      {
        ...state[indexOfItem],
        count: state[indexOfItem].count - 1,
      },
      ...state.slice(indexOfItem + 1),
    ];
  })
  .on(dropProductFromCart, (state, product) => {
    const indexOfItem = state.findIndex((item: PickedDish) =>
      isTwoPickedDishesEqual(item, product)
    );

    return [...state.slice(0, indexOfItem), ...state.slice(indexOfItem + 1)];
  })
  .on(deleteLastProductFromCart, (state, product) => {
    const indexRight =
      state.length -
      state
        .reverse()
        .findIndex((item: PickedDish) => item.product.id === product.id);

    if (indexRight === -1) {
      return state;
    }

    if (state[indexRight].count === 1) {
      return [...state.slice(0, indexRight), ...state.slice(indexRight + 1)];
    }

    return [
      ...state.slice(0, indexRight),
      {
        ...state[indexRight],
        count: state[indexRight].count - 1,
      },
      ...state.slice(indexRight + 1),
    ];
  })
  .on(dropCart, () => []);

export const $cartSizes = $cart.map((state) => {
  return state
    .filter((item) => item !== undefined && item.count > 0)
    .reduce<{
      size: number;
      totalAmount: number | null;
      unicItemsNumber: {
        [key: string]: number;
      };
    }>(
      (obj, item) => {
        const amount = parseInt(item.price) * item.count;

        return {
          size: obj.size + item!.count,
          totalAmount:
            !isNaN(amount) && typeof amount === "number"
              ? (obj.totalAmount ?? 0) + amount * item!.count
              : obj.totalAmount,
          unicItemsNumber: {
            ...obj.unicItemsNumber,
            [item.product.id]:
              (obj.unicItemsNumber[item.product.id] ?? 0) + item.count,
          },
        };
      },
      {
        size: 0,
        totalAmount: null,
        unicItemsNumber: {},
      }
    );
});

$cart.watch((state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
});

export const onResetCategory = createEvent<void>();
export const $category = createStore<string>(POPULAR_CATEGORY.category)
  .on(onCategoryClick, (_, category) => category)
  .on(onResetCategory, () => POPULAR_CATEGORY.category);

export const $cartItems = $cart.map((state) => Object.values(state));
