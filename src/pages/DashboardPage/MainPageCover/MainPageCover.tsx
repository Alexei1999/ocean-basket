import styles from "./styles.module.scss";
import classNames from "classnames";

import { ReactComponent as LogoMini } from "@assets/logo-mini.svg";
import deliveryLogo from "@assets/delivery-logo.svg";

import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";
import Button from "@shared/button";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import React, { forwardRef, useEffect, useRef } from "react";
import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";
import { covers } from "./images";
import { createEffect, createEvent, createStore, restore } from "effector";
import { useStore } from "effector-react/effector-react.cjs";
import { Autoplay } from "swiper";

import footer from "@assets/footer.png";
import footerZip from "@assets/footer.zip.png";

import { onScrollPage } from "@shared/components/ScrollContainer";
import {
  onChangeAnimationConfig,
  onRemoveAnimationConfig,
} from "@shared/components/LoadingContainer/FishAnimationContainer";
import { ImageWithPreview } from "@shared/components/ImageWithPreview";
import { getSlider } from "@shared/api/dishes";
import { toTranslit } from "@entities/dishes/components/Card/DishCard";
import { usePropRef } from "@shared/lib/usePropRef";

const onSlideChange = createEvent<number>();
const $slide = createStore(0).on(onSlideChange, (_, slide) => slide);

const loadImageFx = createEffect<() => Promise<string>>(
  () =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img.src);
      img.onerror = reject;
      img.src = footer;
    })
);

const $image = createStore<null | string>(null).on(
  loadImageFx.doneData,
  (_, image) => image
);
const $failed = restore(loadImageFx.fail, null).map<boolean>((_, data) =>
  Boolean(data)
);

const onBackgroundLoaded = createEvent<void>();

const backgroundZipImage = new Image();
backgroundZipImage.src = footerZip;
backgroundZipImage.onload = () => onBackgroundLoaded();
backgroundZipImage.onerror = () => onBackgroundLoaded();

const $backgroundZipLoaded = createStore(false).on(
  onBackgroundLoaded,
  () => true
);

const getSlidersFx = createEffect(getSlider);

const onRemoveDish = createEvent<number>();
const $dishes = restore(getSlidersFx, null).on(onRemoveDish, (state, id) =>
  !state ? null : state.filter((dish) => dish.id !== id)
);

export function MainPageCover() {
  const navigate = useNavigate();

  const swiperRef = React.useRef(null);
  const backgroundLeftRef = useRef<HTMLDivElement | null>(null);

  const initialSlide = useStore($slide);
  const image = useStore($image);
  const isFailed = useStore($failed);
  const isPending = useStore(loadImageFx.pending);
  const isBackgroundZipLoaded = useStore($backgroundZipLoaded);

  const dishes = useStore($dishes);

  const dishesRef = usePropRef(dishes);

  useEffect(() => {
    if (dishesRef.current) return;

    getSlidersFx();
  }, []);

  useEffect(() => {
    if (!isBackgroundZipLoaded) return;

    onRemoveAnimationConfig(RoutesConfig.Dashboard);
  }, [isBackgroundZipLoaded]);

  useEffect(() => {
    if (!backgroundLeftRef.current) return;

    backgroundLeftRef.current.style.backgroundImage = `url(${backgroundZipImage.src})`;
  }, []);

  useEffect(() => {
    if (!image && !isFailed && !isPending) {
      loadImageFx();
    }
  }, [image, isFailed, isPending]);

  useEffect(() => {
    if (!backgroundLeftRef.current) return;
    if (!image) return;

    backgroundLeftRef.current.style.backgroundImage = `url(${image})`;
  }, [image]);

  return (
    <div className={classNames("flex relative", styles.container)}>
      <div
        ref={backgroundLeftRef}
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
            <span className="absolute bottom-3 left-[25%] font-bold text-lg lg:text-xl text-light">
              в пределах МКАД
            </span>
          </div>
          <Button
            className={classNames(
              styles.button,
              "w-full text-accent hover:text-accent-hover lg:max-w-[200px]"
            )}
            onClick={() => {
              navigate(RoutesConfig.Menu);
              onScrollPage();
            }}
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
          {dishes && dishes.length > 0
            ? dishes
                .filter((dish) => dish.photo)
                .map((dish) => (
                  <SwiperSlide key={dish.id}>
                    <img
                      className="w-full h-full object-cover cursor-pointer"
                      onError={() => onRemoveDish(dish.id)}
                      src={dish.photo!}
                      onClick={() => {
                        navigate(
                          RoutesConfig.Menu +
                            "/" +
                            dish.id +
                            "/" +
                            toTranslit(dish.name)
                        );
                      }}
                    />
                  </SwiperSlide>
                ))
            : covers.map(({ src }, idx) => (
                <SwiperSlide key={idx}>
                  <img className="w-full h-full object-cover" src={src} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
