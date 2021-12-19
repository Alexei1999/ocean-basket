import { isDishValid } from "@entities/cart/components/Details/details";
import { filterPrices } from "@entities/cart/components/Details/variation-price";
import Modal from "@entities/payment/components/Forms/modal";
import { addProductToCart, PickedDish } from "@features/choose-dishes/models";
import { Dish, Promotion } from "@shared/api/dishes";
import Button from "@shared/button";
import { useMemo } from "react";

export const pickDishForce = (dish: Dish): Omit<PickedDish, "count"> => {
  const filteredPrice = filterPrices(dish.prices);

  return {
    priceObj: {
      weight: `${filteredPrice[0].weight}`,
      rouble_price: `${filteredPrice[0].rouble_price}`,
      tenge_price: `${filteredPrice[0].tenge_price}`,
    },
    product: dish,
    modifiers: [],
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
  const filteredBasket = useMemo(
    () => (promotion?.basket ?? []).filter((dish) => isDishValid(dish)),
    [promotion]
  );

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)} showClose>
      <div className="flex flex-col justify-items-start items-start p-5 sm:p-8 bg-light min-h-screen md:min-h-0 max-w-3xl md:rounded-2xl">
        <div className="flex justify-between">
          <h1 className="text-body font-bold text-xl mb-4 sm:mb-6 pr-10">
            {promotion?.title}
          </h1>
        </div>
        <p className="text-body max-w-lg pr-8 whitespace-pre-line">
          {promotion?.description}
        </p>
        {Boolean(promotion?.basket.length) && (
          <Button
            className="mt-auto w-full md:w-auto md:mt-16 text-accent hover:text-accent-hover"
            disabled={filteredBasket.length === 0}
            onClick={() => {
              filteredBasket.forEach((basket: Dish) => {
                setIsOpen(false);
                addProductToCart(pickDishForce(basket));
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
