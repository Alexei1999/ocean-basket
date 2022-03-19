import { Navigation } from "swiper";

import "swiper/swiper-bundle.css";
import "./buttons.scss";

import styles from "../styles.module.scss";

import productSvg from "@assets/product.svg";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import cn from "classnames";
import { useState } from "react";
import { PromotionModal } from "../PromotionsSection/PromotionModal";
import { Promotion } from "@shared/api/dishes";
import { useStore } from "effector-react";
import { $promotions, fetchPomotionsFx } from "@features/choose-dishes/models";
import { hostUrl } from "@shared/api/base";
import classNames from "classnames";
import ContentLoader from "react-content-loader";

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
  const isLoading = useStore(fetchPomotionsFx.pending);

  const onPromotion = ({ id, photo, title: name, ...props }: Promotion) => {
    const isError = errorObj[id];

    return (
      <SwiperSlide key={id}>
        <div
          className={cn(
            "flex items-center rounded-xl justify-center w-full h-[250px] cursor-pointer",
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
              "-z-1 w-full cursor-pointer rounded-xl overflow-hidden"
            )}
          >
            <img
              className={classNames(
                "-z-1 object-contain object-left w-full h-full"
              )}
              src={!isError && photo ? `${hostUrl}/${photo}` : productSvg}
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
              <div className={cn("text-white text-2xl font-bold leading-7")}>
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
  };

  return (
    <div className="px-6 py-5 xl:py-14 xl:px-32 border-t border-border-200 bg-light">
      <PromotionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        promotion={promotion}
      />
      <div className="relative">
        <Swiper
          className="swiper-promotions"
          style={{ position: "static" }}
          modules={[Navigation]}
          id="promotions"
          spaceBetween={25}
          slidesPerView={3}
          navigation={{}}
          loop
          breakpoints={offerSliderBreakpoints}
        >
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <SwiperSlide key={index}>
                    <ContentLoader
                      speed={2}
                      width="100%"
                      height="250px"
                      viewBox="0 0 480 480"
                      backgroundColor="#e0e0e0"
                      foregroundColor="#cecece"
                      preserveAspectRatio="none"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="12"
                        ry="12"
                        width="100%"
                        height="100%"
                      />
                    </ContentLoader>
                  </SwiperSlide>
                ))
            : promotions?.map(onPromotion)}
        </Swiper>
      </div>
    </div>
  );
}
