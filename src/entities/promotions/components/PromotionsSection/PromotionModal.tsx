import { CloseIcon } from "@entities/cart/components/icons/close-icon";
import Modal from "@entities/payment/components/Forms/modal";
import { addProductToCart } from "@features/choose-dishes/models";
import { Dish, Promotion } from "@shared/api/dishes";
import Button from "@shared/button";

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
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="p-5 sm:p-8 bg-light min-h-screen md:min-h-0 max-w-3xl rounded-2xl">
        <div className="flex justify-between">
          <h1 className="text-heading font-bold text-xl mb-4 sm:mb-6 pr-10">
            {promotion?.title}
          </h1>
        </div>
        <p className="max-w-lg pr-8">{promotion?.description}</p>
        {Boolean(promotion?.basket.length) && (
          <Button
            className="mt-16 text-accent hover:text-accent-hover"
            onClick={() => {
              if (promotion!.basket.length) {
                promotion!.basket.forEach(
                  (basket: Dish) => {}
                  // addProductToCart(basket)
                );
              }
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
