import styles from "./styles.module.scss";
import classNames from "classnames";

import { ReactComponent as LogoMini } from "@assets/logo-mini.svg";
import logoMWriting from "@assets/logo-writing.svg";
import deliveryLogo from "@assets/delivery-logo.svg";

import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";
import Button from "@shared/button";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import React, { useEffect } from "react";
import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";
import { covers } from "./images";
import { createEvent, createStore } from "effector/effector.cjs";
import { useStore } from "effector-react/effector-react.cjs";
import { Autoplay } from "swiper";

const onSlideChange = createEvent<number>();

const $slide = createStore(0).on(onSlideChange, (_, slide) => slide);

export function MainPageCover() {
  const navigate = useNavigate();

  const initialSlide = useStore($slide);

  const swiperRef = React.useRef(null);

  return (
    <div className={classNames("flex relative", styles.container)}>
      <div className={classNames(styles.containerLeft, "flex-grow relative")}>
        <div
          className={classNames(
            styles.containerLeftWrapper,
            "flex flex-col h-full justify-between"
          )}
        >
          <LogoMini className={classNames(styles.logoMini, "w-full h-full")} />
          <img className="w-full" src={logoMWriting} />
          <img className="w-full" src={deliveryLogo} />
          <Button
            className={classNames(
              styles.button,
              "w-full text-accent hover:text-accent-hover"
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
      <div className={classNames(styles.containerRight, "flex-grow")}>
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
          {covers.map((cover) => (
            <SwiperSlide>
              <img className="w-full h-full object-cover" src={cover} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

// right-12 bottom-14
