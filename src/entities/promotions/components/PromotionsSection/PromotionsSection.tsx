import promotionsHeader from "./promotions-header.svg";
import { useCallback, useState } from "react";
import { PromotionModal } from "./PromotionModal";
import { setIsDrawerOpen } from "@shared/components/drawer/managed-drawer";
import { PageWaveHeader } from "../PageWaveHeader";
import { createGate, useStore } from "effector-react";
import { Promotion } from "@shared/api/dishes";
import { $promotions } from "@features/choose-dishes/models";

export function PromotionsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const openModal = useCallback((promotion: Promotion) => {
    setPromotion(promotion);
    setIsModalOpen(true);
  }, []);

  const promotions = useStore($promotions);

  return (
    <div className="pt-12 pb-2 lg:pb-4 xl:pb-32 bg-light">
      <PromotionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        promotion={promotion}
      />
      <PageWaveHeader src={promotionsHeader} />
      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 lg:px-4 xl:px-32 pt-12">
        {promotions?.map((promotion) => (
          <img
            className="h-full w-full cursor-pointer"
            onClick={() => openModal(promotion)}
            src={promotion.photo}
          />
        ))}
      </div>
    </div>
  );
}
