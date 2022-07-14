import { isDishValid } from "@entities/cart/components/Details/details";
import { filterPrices } from "@entities/cart/components/Details/variation-price";
import Modal from "@entities/payment/components/Forms/modal";
import {
  $isRestaurantOpen,
  addProductToCart,
  PickedDish,
} from "@features/choose-dishes/models";
import { Dish } from "@shared/api/common";
import { Promotion } from "@shared/api/switchable";
import Button from "@shared/button";
import { $rus } from "@features/choose-dishes/models";
import { useStore } from "effector-react";
import { useMemo } from "react";

export const pickDishForce = (
  dish: Dish,
  isRus: boolean
): Omit<PickedDish, "count"> => {
  const filteredPrice = filterPrices(dish.prices, isRus);

  return {
    priceObj: {
      weight: `${filteredPrice[0].weight}`,
      rouble_price: `${filteredPrice[0].rouble_price}`,
      tenge_price: `${filteredPrice[0].tenge_price}`,
    },
    product: dish,
    modifiers: [],
    totalPrice: isRus
      ? filteredPrice[0].rouble_price
      : filteredPrice[0].tenge_price,
  };
};

export function PromotionModal({
  isOpen,
  setIsOpen,
  promotion,
  onProductAdd,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onProductAdd?: () => void;
  promotion: Promotion | null;
}) {
  const isRus = useStore($rus);
  const isRestaurantOpen = useStore($isRestaurantOpen);

  const filteredBasket = useMemo(
    () => (promotion?.basket ?? []).filter((dish) => isDishValid(isRus, dish)),
    [isRus, promotion]
  );

  const isDisabled = filteredBasket.length === 0 || isRestaurantOpen === false;

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)} showClose>
      <div className="flex flex-col justify-items-start items-start p-5 sm:p-8 bg-light min-h-screen md:min-h-0 max-w-3xl md:rounded-2xl">
        <div className="flex justify-between">
          <h1 className="text-body font-bold text-xl mb-4 sm:mb-6 pr-10">
            {promotion?.title}
          </h1>
        </div>
        <p className="mb-16 text-body max-w-lg pr-8 whitespace-pre-line">
          {promotion?.description}
        </p>
        {Boolean(promotion?.basket.length) && (
          <Button
            className="mt-auto md:mt-0 w-full md:w-auto text-accent hover:text-accent-hover"
            disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return;
              filteredBasket.forEach((basket: Dish) => {
                setIsOpen(false);
                addProductToCart(pickDishForce(basket, isRus));
              });
              setIsOpen(false);
              onProductAdd?.();
            }}
          >
            Добавить в корзину
          </Button>
        )}
      </div>
    </Modal>
  );
}
