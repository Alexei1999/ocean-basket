import { Dish, DishStatus } from "@shared/api/dishes";
import classNames from "classnames";
import { scroller } from "react-scroll";
import { Waypoint } from "react-waypoint";
import BackButton from "./back-button";
import productSvg from "@assets/product.svg";
import Truncate from "./truncate";
import VariationPrice from "./variation-price";
import { AddToCart } from "../Buttons/AddToCart";
import { useState } from "react";
import ModifierGroups from "./variation-groups";
import { ModifierType, PickedModifier } from "@features/choose-dishes/models";
import { AddToCartBig } from "../Buttons/AddToCartBig";

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
  const { name, description, prices, photo, status } = product ?? {};

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
    <article className="rounded-lg bg-light">
      <div className="flex flex-col md:flex-row border-b border-border-200 border-opacity-70">
        <div className="flex flex-col md:w-1/2 p-6 pt-10 lg:p-14 xl:p-16">
          <div className="mb-8 lg:mb-10">
            <h1
              className={classNames(
                `font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-body`
              )}
            >
              {name}
            </h1>
            {description && (
              <div className="mt-3 md:mt-4 text-body text-sm leading-7">
                <Truncate
                  character={150}
                  {...(!isModal && {
                    onClick: () => scrollDetails(),
                    compressText: "common:text-see-more",
                  })}
                >
                  {description}
                </Truncate>
              </div>
            )}
          </div>

          <div className="product-gallery">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={photo ?? productSvg}
                alt={name}
                width={450}
                height={450}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start md:w-1/2 p-5 pt-10 lg:p-14 xl:p-16">
          <Waypoint
            onLeave={() => setShowStickyShortDetails(true)}
            onEnter={() => setShowStickyShortDetails(false)}
            onPositionChange={onWaypointPositionChange}
          >
            <div className="w-full">
              <>
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
              </>
            </div>
          </Waypoint>
          {
            <div className="mt-4 w-full md:mt-6 flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-3 lg:mb-0 w-full">
                <AddToCartBig
                  active={activePrice}
                  product={product}
                  activeModifiers={activeModifier}
                  disabled={
                    product.status !== DishStatus.Active && !prices.length
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
          }
        </div>
      </div>
    </article>
  );
};

export default Details;
