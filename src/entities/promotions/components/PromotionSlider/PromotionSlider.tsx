import { Navigation } from "swiper";

import "swiper/swiper-bundle.css";
import "./buttons.scss";

import styles from "./styles.module.scss";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import cn from "classnames";
import { useState } from "react";
import { PromotionModal } from "../PromotionsSection/PromotionModal";
import { Promotion } from "@shared/api/dishes";
import { useStore } from "effector-react";
import { $promotions } from "@features/choose-dishes/models";

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

export function PromotionSlider() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  const promotions = useStore($promotions);

  return (
    <div className="px-6 py-5 xl:py-14 xl:px-32 border-t border-border-200 bg-light">
      <PromotionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        promotion={promotion}
      />
      <div className="relative">
        <Swiper
          style={{ position: "static" }}
          modules={[Navigation]}
          id="offer"
          spaceBetween={25}
          slidesPerView={3}
          navigation={{}}
          loop
          breakpoints={offerSliderBreakpoints}
        >
          {promotions?.map(({ id, photo: original, title: name, ...props }) => (
            <SwiperSlide key={id}>
              <div
                className={cn("cursor-pointer", styles.promotionContainer)}
                onClick={() => {
                  setPromotion({
                    id,
                    photo: original,
                    title: name,
                    ...props,
                  });
                  setIsModalOpen(true);
                }}
              >
                <div className={cn("flex", styles.promotionWrapperBackground)}>
                  <img
                    className={styles.promotion}
                    src={original}
                    alt={id}
                    width="580"
                    height="270"
                  />
                  <div
                    className={cn(
                      "absolute left-12 top-10 opacity-100 flex flex-col justify-between",
                      styles.promotionDescription
                    )}
                  >
                    {/* {name && (
                      <div
                        className={cn(
                          "text-white text-2xl font-bold",
                          styles.promotionDescriptionText
                        )}
                      >
                        {name}
                      </div>
                    )} */}
                    {/* {discount && (
                      <div
                        className={cn(
                          "text-white font-bold",
                          styles.promotionDiscount
                        )}
                      >
                        {discount}%
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
