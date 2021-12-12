import promotionsHeader from "./promotions-header.svg";
import { useCallback, useState } from "react";
import { PromotionModal } from "./PromotionModal";
import { PageWaveHeader } from "../PageWaveHeader";
import { createGate, useGate, useStore } from "effector-react";
import { Promotion } from "@shared/api/dishes";
import { $promotions, fetchPomotionsFx } from "@features/choose-dishes/models";
import { useObserver } from "@entities/dishes/components/Card/DishCard";
import classNames from "classnames";
import { forward } from "effector";
import { hostUrl } from "@shared/api/base";

function PromotionImage({
  src,
  onClick,
}: {
  src: string;
  onClick: () => void;
}) {
  const { containerRef, isStartLoading } = useObserver();

  return (
    <div ref={containerRef}>
      <img
        className={classNames("h-full w-full cursor-pointer")}
        onClick={onClick}
        src={isStartLoading ? `${hostUrl}/${src}` : undefined}
      />
    </div>
  );
}

const promotionsSectionGate = createGate();

forward({
  from: promotionsSectionGate.open,
  to: [fetchPomotionsFx],
});

export function PromotionsSection() {
  useGate(promotionsSectionGate);
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
      <div className="grid lg:grid-cols-2 3xl:grid-cols-3 gap-2 md:gap-4 lg:gap-6 lg:px-4 xl:px-32 pt-12">
        {promotions?.map((promotion) => (
          <PromotionImage
            onClick={() => openModal(promotion)}
            src={promotion.photo}
          />
        ))}
      </div>
    </div>
  );
}
