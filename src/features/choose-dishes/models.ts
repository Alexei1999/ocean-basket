import { filterCartObjects } from "@entities/cart/components/Details/details";
import { fetchCategoriesFx } from "@entities/сategories/components/Categories/Categories";
import { onCategorySelect } from "@entities/сategories/components/TreeMenu/TreeMenuItem";
import {
  Category,
  Dish,
  DishStatus,
  EMPTY_STRING,
  getDishes,
  getPopular,
  getPromotions,
  getTimeValidate,
  Promotion,
} from "@shared/api/dishes";
import { createEffect, createEvent, createStore, forward } from "effector";
import { createGate } from "effector-react";
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
  option1_price: string | "0";
  option2: string | null;
  option2_price: string | "0";
  option3: string | null;
  option3_price: string | "0";
  option4: string | null;
  option4_price: string | "0";
  option5: string | null;
  option5_price: string | "0";
  option6: string | null;
  option6_price: string | "0";
  created_at: string | null;
  updated_at: string | null;
};

export const gateChooseDishes = createGate();

export type PickedModifier = Pick<ModifierType, "id" | "dish_id" | "name"> & {
  option?: string;
  price?: number;
};
export const fetchDishesFx = createEffect(getDishes);
export const fetchTimeValidateFx = createEffect(async () => {
  if ((window as any).isMock) {
    console.log("time mock enabled");
    return true;
  }
  return getTimeValidate();
});
export const fetchPopularDishesFx = createEffect(getPopular);
export const fetchPomotionsFx = createEffect(getPromotions);

// export const $isRestaurantOpen = restore(fetchTimeValidateFx.doneData, null);
export const $isRestaurantOpen = createStore(true);

forward({
  from: gateChooseDishes.open,
  to: [fetchDishesFx, fetchPopularDishesFx, fetchPomotionsFx],
});

const flattedDishes = fetchDishesFx.doneData.map((data) =>
  Object.entries(data)
    .map(([key, value]) => value.map((dish) => ({ ...dish, category: key })))
    .flat()
);

export const $dishes = createStore<Dish[] | null>(null).on(
  flattedDishes,
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

export const addProductToCart = createEvent<Omit<PickedDish, "count">>();
export const removeProductFromCart = createEvent<PickedDish>();
export const deleteLastProductFromCart = createEvent<Dish>();
export const dropProductFromCart = createEvent<PickedDish>();
export const dropCart = createEvent();

export type PickedPrice = {
  weight: string;
  tenge_price: string;
  rouble_price: string;
};

export type PickedDish = {
  count: number;
  product: Dish;
  priceObj: PickedPrice;
  modifiers: PickedModifier[];
  totalPrice: number;
};

export const $cart = createStore<PickedDish[]>(
  filterCartObjects(getFromStorage("cart"))
)
  .on(flattedDishes, (state, dishes) => {
    const ids = dishes.map((dish) => dish.id);
    return state.filter(({ product: { id } }) => {
      return ids.includes(id);
    });
  })
  .on(addProductToCart, (state, pickedDish) => {
    if (pickedDish.product.status !== DishStatus.Active) return;
    if (
      !pickedDish.priceObj?.rouble_price ||
      pickedDish.priceObj.rouble_price === EMPTY_STRING
    )
      return;
    if (
      !pickedDish.priceObj?.weight ||
      pickedDish.priceObj.weight === EMPTY_STRING
    )
      return;

    const indexOfItem = state.findIndex((item: PickedDish) =>
      isTwoPickedDishesEqual(item, pickedDish)
    );

    if (indexOfItem === -1) {
      return [...state, { ...pickedDish, count: 1 }];
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

    if (indexOfItem === -1) {
      return state;
    }

    return [...state.slice(0, indexOfItem), ...state.slice(indexOfItem + 1)];
  })
  .on(deleteLastProductFromCart, (state, product) => {
    const indexRight = [...state]
      .reverse()
      .findIndex((item: PickedDish) => item.product.id === product.id);

    if (indexRight === -1) {
      return state;
    }

    const reversedIndex = state.length - indexRight - 1;

    if (state[reversedIndex].count === 1) {
      return [
        ...state.slice(0, reversedIndex),
        ...state.slice(reversedIndex + 1),
      ];
    }

    return [
      ...state.slice(0, reversedIndex),
      {
        ...state[reversedIndex],
        count: state[reversedIndex].count - 1,
      },
      ...state.slice(reversedIndex + 1),
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
        const amount = (item.totalPrice ?? 0) * item.count;

        return {
          size: obj.size + item!.count,
          totalAmount:
            amount && !isNaN(amount)
              ? (obj.totalAmount ?? 0) + amount
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
  .on(onCategorySelect, (_, category) => category)
  .on(onResetCategory, () => POPULAR_CATEGORY.category);

export const $cartItems = $cart.map<{
  unicItemsList: Dish[];
}>((state) => {
  const unicItems = state.reduce<{ [key: number]: Dish }>((obj, item) => {
    return {
      ...obj,
      [item.product.id]: item.product,
    };
  }, {});

  return {
    unicItemsList: Object.values(unicItems),
  };
});

forward({
  from: gateChooseDishes.close,
  to: onResetCategory,
});
