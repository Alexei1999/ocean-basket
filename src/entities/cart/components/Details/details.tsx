import { Dish, DishStatus, EMPTY_STRING } from "@shared/api/common";
import classNames from "classnames";
import { scroller } from "react-scroll";
import { Waypoint } from "react-waypoint";
import productSvg from "@assets/product.svg";
import Truncate from "./truncate";
import VariationPrice, { filterPrices } from "./variation-price";
import { useRef, useState } from "react";
import ModifierGroups from "./variation-groups";
import {
  $isRestaurantOpen,
  ModifierType,
  PickedDish,
  PickedModifier,
} from "@features/choose-dishes/models";
import { AddToCartBig } from "../Buttons/AddToCartBig";
import { hostUrl } from "@shared/api/base";

import styles from "./styles.module.scss";
import { useStore } from "effector-react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import TextArea from "@shared/components/text-area";
import { stringifyValueSafely } from "@shared/lib/functional-utils";

export const filterCartObjects = (
  isRub: boolean,
  items: Partial<PickedDish[]>
): PickedDish[] => {
  if (!Array.isArray(items)) return [];

  return items.filter((item) => {
    if (!item) {
      return false;
    }
    if (item.product.status !== DishStatus.Active) {
      return false;
    }
    if (!item.count || item.count <= 0) return false;

    if (
      isRub &&
      (!item.priceObj?.rouble_price ||
        item.priceObj.rouble_price === EMPTY_STRING)
    ) {
      return false;
    }
    if (
      !isRub &&
      (!item.priceObj?.tenge_price ||
        item.priceObj.tenge_price === EMPTY_STRING)
    ) {
      return false;
    }

    if (!item.priceObj?.weight || item.priceObj.weight === EMPTY_STRING) {
      return false;
    }

    if (!Array.isArray(item.modifiers)) {
      item.modifiers = [];
    }

    return true;
  }) as PickedDish[];
};

export const isDishValid = (
  isRub: boolean,
  dish?: Partial<Dish>
): dish is Dish => {
  if (!dish || !dish.prices || !dish.id) {
    console.warn("isDishValid: ", dish?.name, " is not valid");
    console.warn(
      `isDishValid: in dish ${stringifyValueSafely(dish)} prices: ${
        dish?.prices
      } or id: ${dish?.id} is not valid`
    );
    return false;
  }

  const filteredPrices = filterPrices(dish.prices, isRub);

  const isValid =
    filteredPrices.length > 0 && dish.status === DishStatus.Active;

  if (!isValid) {
    console.warn("isDishValid: ", dish?.name, " is not valid");
    console.warn(
      `isDishValid: in dish ${stringifyValueSafely(
        dish
      )} valid prices length is zero: ${filteredPrices.length} or dish status ${
        dish.status
      } is not valid`
    );
  }

  return isValid;
};

type Props = {
  product: Dish;
  backBtn?: boolean;
  isModal?: boolean;
  modifiers: ModifierType[];
  setShowStickyShortDetails: (arg: boolean) => void;
};
const Details: React.FC<Props> = ({
  product,
  isModal = false,
  modifiers,
  setShowStickyShortDetails,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isError, setIsError] = useState(false);
  const [comment, setComment] = useState<string | undefined>(undefined);
  const [failedPhotos, setFailedPhotos] = useState<string[]>([]);

  const isOpen = useStore($isRestaurantOpen);

  const {
    name,
    description,
    prices,
    photo,
    photo2,
    photo3,
    photo4,
    calories,
    proteins,
    fats,
    carbohydrates,
  } = product ?? {};

  const photos = [photo, photo2, photo3, photo4].filter(
    (photo) => Boolean(photo) && !failedPhotos.includes(photo!)
  ) as string[];

  const isNutritional = calories || proteins || fats || carbohydrates;

  const [activePrice, setActivePrice] = useState<
    null | (Dish["prices"][number] & { idx: number })
  >(null);

  const [activeModifier, setActiveModifier] = useState<{
    [id: string]: PickedModifier;
  }>({});

  const scrollDetails = () => {
    scroller.scrollTo("details", {
      smooth: true,
      offset: -80,
    });
  };

  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      setShowStickyShortDetails(true);
    }
  };

  return (
    <article className="rounded-lg bg-light w-full">
      <div
        className={classNames(
          "flex flex-col gap-x-16 md:flex-row border-b border-border-200 border-opacity-70 p-6 lg:p-14 xl:p-16 max-h-full"
        )}
      >
        <div
          className={classNames(
            "flex flex-col md:w-1/2 pt-10 lg:pt-0",
            styles.dishImage
          )}
        >
          <div className="mb-8 lg:mb-10">
            <h1
              className={classNames(
                `font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-body`
              )}
            >
              {name}
            </h1>

            {(description || isNutritional) && (
              <div
                className="mt-3 md:mt-4 text-body text-base leading-7"
                style={{ whiteSpace: "pre-line" }}
              >
                <Truncate
                  character={150}
                  subBlock={
                    isNutritional ? (
                      <div className="flex flex-col">
                        <span className="text-gray-400">
                          {[
                            calories && `К: ${calories}`,
                            proteins && `Б: ${proteins}`,
                            fats && `Ж: ${fats}`,
                            carbohydrates && `У: ${carbohydrates}`,
                          ]
                            .filter((str) => str)
                            .join(" ")}
                        </span>
                        <span className="text-gray-400 text-xs">
                          *КБЖУ рассчитано исходя из стандартного набора
                          модификаторов
                        </span>
                      </div>
                    ) : undefined
                  }
                  {...(!isModal && {
                    onClick: scrollDetails,
                  })}
                >
                  {description}
                </Truncate>
              </div>
            )}
          </div>

          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {photos.length > 1 ? (
              <Swiper
                style={{ position: "relative" }}
                className="h-full"
                modules={[Navigation]}
                id="details"
                spaceBetween={25}
                slidesPerView={1}
                navigation={{}}
                loop
              >
                {photos.map((photo) => (
                  <SwiperSlide className="my-auto flex" key={photo}>
                    <img
                      onError={() => setFailedPhotos([...failedPhotos, photo])}
                      className={classNames(
                        "rounded-lg max-h-full w-full object-cover my-auto"
                      )}
                      src={`${hostUrl}/${photo}`}
                      alt={name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                className={classNames(
                  "rounded-lg max-h-full w-full object-cover"
                )}
                src={!isError && photo ? `${hostUrl}/${photo}` : productSvg}
                onError={() => setIsError(true)}
                alt={name}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between items-start md:w-1/2 pt-10 lg:pt-0">
          <Waypoint
            onLeave={() => setShowStickyShortDetails(true)}
            onEnter={() => setShowStickyShortDetails(false)}
            onPositionChange={onWaypointPositionChange}
          >
            <div className="w-full h-full flex flex-col">
              <div className="mb-5 md:mb-10 flex items-center">
                <VariationPrice
                  active={activePrice}
                  onChange={setActivePrice}
                  prices={prices}
                />
              </div>
              <ModifierGroups
                setActiveModifier={setActiveModifier}
                activeModifier={activeModifier}
                modifiers={modifiers}
              />
              <TextArea
                ref={textAreaRef}
                value={comment ?? ""}
                onChange={(e) => setComment(e.target.value ?? undefined)}
                className="pt-3 mt-auto"
                inputClassName="max-h-[70px]"
                maxLength={70}
                placeholder="Не длиннее 70 символов"
                label="Комментарий к блюду"
                name="comment"
              />
            </div>
          </Waypoint>
          <div className="mt-4 w-full md:mt-6 flex flex-col items-center justify-between">
            {isNutritional && (
              <div className="w-full">
                <span className="text-gray-400 text-xs">
                  {[
                    calories && `К: ${calories}`,
                    proteins && `Б: ${proteins}`,
                    fats && `Ж: ${fats}`,
                    carbohydrates && `У: ${carbohydrates}`,
                  ]
                    .filter((str) => str)
                    .join(" ")}
                </span>
              </div>
            )}
            <div className="mb-3 lg:mb-0 w-full">
              <AddToCartBig
                onAdd={() => {
                  setComment(undefined);
                  comment && textAreaRef.current?.focus();
                }}
                active={activePrice}
                product={{ ...product, comment }}
                activeModifiers={activeModifier}
                disabled={
                  product.status !== DishStatus.Active ||
                  !prices.length ||
                  isOpen === false
                }
              />
            </div>

            {/* <div className="flex">
                <span className="text-sm font-semibold text-heading capitalize me-6 py-1">
                  Категория
                </span> */}
            {/* <button
                onClick={
                  () => {}
                  // handleClick(`${basePath}?category=${category.slug}`)
                }
                className="lowercase text-sm text-heading tracking-wider whitespace-nowrap py-1 px-2.5 bg-transparent border border-border-200 rounded transition-colors hover:border-accent hover:text-accent focus:outline-none focus:bg-opacity-100"
              >
                {product.category}
              </button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Details;
