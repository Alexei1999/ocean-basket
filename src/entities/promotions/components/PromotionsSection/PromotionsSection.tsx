import { promotions } from "@entities/promotions/config/promotions";
import { WavesIcon } from "./WavesIcon";
import promotionsHeader from "./promotions-header.svg";
import { useCallback, useState } from "react";
import { PromotionModal } from "./PromotionModal";
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
      <PromotionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        promotion={promotion}
        onProductAdd={() => {
          setIsDrawerOpen(true);
        }}
      />
      <div className="flex">
        <WavesIcon />
        <img className="pl-3" src={promotionsHeader} />
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 lg:px-4 xl:px-32 pt-12">
        {promotions.map((promotion, index) => (
          <img
            className="h-full w-full cursor-pointer"
            onClick={() => openModal(promotion)}
            src={promotion.original}
          />
        ))}
      </div>
    </div>
  );
}
