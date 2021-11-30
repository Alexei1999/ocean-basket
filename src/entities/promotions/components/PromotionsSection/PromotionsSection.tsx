import { promotions } from "@entities/promotions/config/promotions";
import styles from "./styles.module.scss";
import { WavesIcon } from "./WavesIcon";
import promotionsHeader from "./promotions-header.svg";
import Modal from "@entities/payment/components/Forms/modal";
import { useCallback, useState } from "react";
import Button from "@shared/button";
import { CloseIcon } from "@entities/cart/components/icons/close-icon";
import { addProductToCart } from "@features/choose-dishes/ui";
import { setIsDrawerOpen } from "@shared/components/drawer/managed-drawer";

export function PromotionsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotion, setPromotion] = useState<typeof promotions[number] | null>(
    null
  );
  const openModal = useCallback((promotion: typeof promotions[number]) => {
    setPromotion(promotion);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="pt-12 pb-2 lg:pb-4 xl:pb-32 bg-light">
      <Modal
        open={isModalOpen && Boolean(promotion)}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-5 sm:p-8 bg-light min-h-screen md:min-h-0 max-w-3xl">
          <div className="flex justify-between">
            <h1 className="text-heading font-bold text-xl mb-4 sm:mb-6">
              {promotion?.name}
            </h1>
            <CloseIcon
              className="w-3 h-3 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
          <p className="max-w-lg">{promotion?.description}</p>
          {promotion?.product && (
            <Button
              className="mt-16 text-accent hover:text-accent-hover"
              onClick={() => {
                addProductToCart(promotion.product);
                setIsDrawerOpen(true);
                setIsModalOpen(false);
              }}
            >
              Добавить в корзину
            </Button>
          )}
        </div>
      </Modal>
      <div className="flex">
        <WavesIcon />
        <img className="pl-3" src={promotionsHeader} />
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 lg:px-4 xl:px-32 pt-12">
        {promotions.map((promotion, index) => (
          <img
            className="h-full w-full cursor-pointer"
            onClick={() => openModal(promotion)}
            src={promotion.img}
          />
        ))}
      </div>
    </div>
  );
}
