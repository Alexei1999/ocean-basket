import { CloseIcon } from "@entities/cart/components/icons/close-icon";
import Modal from "@entities/payment/components/Forms/modal";
import { Promotion } from "@entities/promotions/config/promotions";
import { addProductToCart } from "@features/choose-dishes/ui";
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
    <Modal open={isOpen && Boolean(promotion)} onClose={() => setIsOpen(false)}>
      <div className="p-5 sm:p-8 bg-light min-h-screen md:min-h-0 max-w-3xl">
        <div className="flex justify-between">
          <h1 className="text-heading font-bold text-xl mb-4 sm:mb-6">
            {promotion?.name}
          </h1>
          <CloseIcon
            className="w-3 h-3 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <p className="max-w-lg">{promotion?.description}</p>
        {promotion?.product && (
          <Button
            className="mt-16 text-accent hover:text-accent-hover"
            onClick={() => {
              if (promotion.product) addProductToCart(promotion.product);
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
