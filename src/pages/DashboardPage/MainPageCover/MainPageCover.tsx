import styles from "./styles.module.scss";
import classNames from "classnames";

import { ReactComponent as LogoMini } from "@assets/logo-mini.svg";
import logoMWriting from "@assets/logo-writing.svg";
import deliveryLogo from "@assets/delivery-logo.svg";

import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";
import Button from "@shared/button";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import React, { useEffect, useRef } from "react";
import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";
import { covers } from "./images";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react/effector-react.cjs";
import { Autoplay } from "swiper";

import footer from "@assets/footer.png";

const onSlideChange = createEvent<number>();

const $slide = createStore(0).on(onSlideChange, (_, slide) => slide);

export const ImageWithPreview = ({
  image,
  thumb,
  ...props
}: {
  image: string;
  thumb: string;
} & Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "src" | "ref"
>) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      if (!imageRef.current) return;
      imageRef.current.src = img.src;
    };

    img.src = image;

    return () => {
      img.onload = null;
    };
  }, []);

  return <img ref={imageRef} src={thumb} {...props} />;
};

export function MainPageCover() {
  const navigate = useNavigate();

  const initialSlide = useStore($slide);

  const swiperRef = React.useRef(null);

  const backgroundLeft = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      if (!backgroundLeft.current) return;
      backgroundLeft.current.style.backgroundImage = `url(${img.src})`;
    };

    img.src = footer;

    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <div className={classNames("flex relative", styles.container)}>
      <div
        ref={backgroundLeft}
        className={classNames(
          styles.containerLeft,
          "flex-grow relative sm:max-w-[40%]"
        )}
      >
        <div
          className={classNames("flex flex-col h-full justify-between p-[10%]")}
        >
          <LogoMini
            className={classNames(
              styles.logoMini,
              "ml-auto mr-auto sm:ml-0 sm:mr-0 w-[150px] h-[150px] sm:w-full sm:h-full sm:max-w-[125px] sm:max-h-[125px] pb-7"
            )}
          />
          <span className="w-full pb-7 font-friends text-light text-4xl lg:text-[41px] leading-10 font-normal">
            Океан доставки на дом из ресторана морепродкуктов
          </span>
          <div className="relative">
            <img className="w-full pb-7" src={deliveryLogo} />
            <span className="absolute bottom-3 left-[25%] font-bold text-xl text-light">
              в пределах МКАД
            </span>
          </div>
          <Button
            className={classNames(
              styles.button,
              "w-full text-accent hover:text-accent-hover lg:max-w-[200px]"
            )}
            onClick={() => navigate(RoutesConfig.Menu)}
          >
            Меню
          </Button>
        </div>
        <div className="hidden lg:flex absolute right-12 bottom-14">
          <ArrowLeft
            className="translate-y-[40%]"
            //@ts-ignore
            onClick={() => swiperRef.current.swiper.slidePrev()}
          />
          <ArrowRight
            className="ml-4 translate-y-[-40%]"
            //@ts-ignore
            onClick={() => swiperRef.current.swiper.slideNext()}
          />
        </div>
      </div>
      <div
        className={classNames("sm:flex-grow sm:max-w-[60%] hidden sm:block")}
      >
        <Swiper
          loop
          initialSlide={initialSlide}
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
          }}
          onSlideChange={(swiper) => {
            onSlideChange(swiper.realIndex);
          }}
          // @ts-ignore
          ref={swiperRef}
          className="h-full w-full"
        >
          {covers.map((cover, idx) => (
            <SwiperSlide key={idx}>
              <ImageWithPreview
                className="w-full h-full object-cover"
                {...cover}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

// right-12 bottom-14
