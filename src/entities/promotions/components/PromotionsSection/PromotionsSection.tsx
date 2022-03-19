import { useCallback, useState } from "react";
import { PromotionModal } from "./PromotionModal";
import { PageWaveHeader } from "../PageWaveHeader";
import { createGate, useGate, useStore } from "effector-react";
import { Promotion } from "@shared/api/dishes";
import { $promotions, fetchPomotionsFx } from "@features/choose-dishes/models";
import classNames from "classnames";
import { forward } from "effector";
import { hostUrl } from "@shared/api/base";
import { useObserver } from "@shared/lib/functional-utils";
import productSvg from "@assets/product.svg";

import styles from "../styles.module.scss";

function PromotionImage({
  name,
  src,
  onClick,
}: {
  name?: string;
  src: string;
  onClick: () => void;
}) {
  const { containerRef, isStartLoading } = useObserver();

  const [isError, setIsError] = useState(false);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={classNames(
        isError && styles.promotionWrapperBackground,
        "relative cursor-pointer"
      )}
    >
      <img
        className={classNames("h-full w-full cursor-pointer")}
        onError={() => setIsError(true)}
        src={
          isError
            ? productSvg
            : isStartLoading
            ? `${hostUrl}/${src}`
            : undefined
        }
      />
      {isError && name && (
        <>
          <div
            className={classNames(
              isError && styles.promotionWrapperBackground,
              "absolute w-full h-full top-0 left-0"
            )}
          />
          <div
            className={classNames(
              "absolute left-12 top-10 opacity-100 flex flex-col justify-between max-w-[50%] max-h-[60%] h-full"
            )}
          >
            <div
              className={classNames("text-white text-2xl font-bold leading-7")}
            >
              {name}
            </div>
            {/* {discount && (
            <div className={cn("text-white font-bold text-4xl")}>
              {discount}%
            </div>
          )} */}
          </div>
        </>
      )}
    </div>
  );
}

const gatePromotionsSection = createGate();

forward({
  from: gatePromotionsSection.open,
  to: [fetchPomotionsFx],
});

export function PromotionsSection() {
  useGate(gatePromotionsSection);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const openModal = useCallback((promotion: Promotion) => {
    setPromotion(promotion);
    setIsModalOpen(true);
  }, []);

  const promotions = useStore($promotions);
  const isLoading = useStore(fetchPomotionsFx.pending);

  return (
    <div className="pt-12 pb-12 xl:pb-32 bg-light">
      <PromotionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        promotion={promotion}
      />
      <PageWaveHeader text="Акции" />
      <div className="grid lg:grid-cols-2 3xl:grid-cols-3 gap-2 md:gap-4 lg:gap-6 lg:px-4 xl:px-32 pt-12">
        {promotions?.length
          ? promotions.map((promotion) => (
              <PromotionImage
                key={promotion.id}
                name={promotion.title}
                onClick={() => openModal(promotion)}
                src={promotion.photo}
              />
            ))
          : !isLoading && (
              <div className="col-span-4 flex justify-center">
                <span className="text-xl font-semibold text-body">
                  Акций нет
                </span>
              </div>
            )}
      </div>
    </div>
  );
}
