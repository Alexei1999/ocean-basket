import { Navigation } from "swiper";

import "swiper/swiper-bundle.css";
import "./buttons.scss";

import styles from "./styles.module.scss";

import productSvg from "@assets/product.svg";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import cn from "classnames";
import { useState } from "react";
import { PromotionModal } from "../PromotionsSection/PromotionModal";
import { Promotion } from "@shared/api/dishes";
import { useStore } from "effector-react";
import { $promotions } from "@features/choose-dishes/models";
import { hostUrl } from "@shared/api/base";
import classNames from "classnames";

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
  const [errorObj, setErrorObj] = useState<{ [id: string]: boolean }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  const promotions = useStore($promotions);

  if (!promotions?.length) {
    return null;
  }

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
          {promotions?.map(({ id, photo, title: name, ...props }, idx) => {
            const isError = errorObj[id];

            return (
              <SwiperSlide key={id}>
                <div
                  className={cn(
                    "relative flex items-center rounded-xl justify-center w-full h-[250px] cursor-pointer",
                    isError && styles.promotionWrapperBackground
                  )}
                  onClick={() => {
                    setPromotion({
                      id,
                      photo: photo,
                      title: name,
                      ...props,
                    });
                    setIsModalOpen(true);
                  }}
                >
                  <div
                    className={classNames(
                      styles.promotion,
                      "w-full cursor-pointer rounded-xl overflow-hidden"
                    )}
                  >
                    <img
                      className={classNames(
                        "object-contain object-left w-full h-full",
                        styles.promotion
                      )}
                      src={
                        !isError && photo ? `${hostUrl}/${photo}` : productSvg
                      }
                      onError={() => setErrorObj({ ...errorObj, [id]: true })}
                      alt={id}
                    />
                  </div>

                  {isError && name && (
                    <div
                      className={cn(
                        "absolute left-12 top-10 opacity-100 flex flex-col justify-between max-w-[50%] max-h-[60%] h-full"
                      )}
                    >
                      <div
                        className={cn(
                          "text-white text-2xl font-bold leading-7"
                        )}
                      >
                        {name}
                      </div>
                      {/* {discount && (
                      <div className={cn("text-white font-bold text-4xl")}>
                        {discount}%
                      </div>
                    )} */}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
