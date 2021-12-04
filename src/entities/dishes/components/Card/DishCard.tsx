import cn from "classnames";
import { AddToCart } from "../../../cart/components/Buttons/AddToCart";
import productIcon from "@assets/product.svg";

import styles from "./styles.module.scss";
import usePrice from "@entities/cart/lib/use-price";
import { Dish, DishStatus } from "@shared/api/dishes";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";

type DishCardProps = {
  product: Dish;
  className?: string;
};

export const DishCard = React.memo(({ product, className }: DishCardProps) => {
  const { name, photo, description, status, prices } = product ?? {};

  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const [isStartLoading, setIsStartLoading] = useState<boolean>(false);

  const [oberver, setObserver] = useState<IntersectionObserver | null>(null);

  const updateRef = useCallback(
    (ref: HTMLElement | null) => {
      if (oberver && ref) {
        oberver.unobserve(ref);
        oberver.observe(ref);
      }
    },
    [oberver]
  );

  useEffect(() => {
    const intObs = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setIsDisplayed(true);
        setIsStartLoading(true);
      } else {
        setIsDisplayed(false);
      }
    });

    setObserver(intObs);

    return () => {
      intObs.disconnect();
    };
  }, []);

  const onImgaeErrorHandle = useCallback(() => {
    console.log("error");

    setIsDisplayed(false);
  }, []);

  function handleProductQuickView() {}

  // const { price: deliveryPrice } = usePrice({
  //   amount: deliveryFee ?? 0,
  // });
  // const { price: discountPrice } = usePrice({
  //   amount: discount ?? 0,
  // });
  const { price: dishPrice } = usePrice({
    amount: parseInt(prices?.[0].rouble_price) ?? 0,
  });

  return (
    <article
      ref={updateRef}
      className={cn(
        "product-card cart-type-helium border border-border-200 h-full bg-light overflow-hidden transition-shadow duration-200 hover:shadow-sm flex flex-col",
        styles.roundedXl,
        className
      )}
    >
      <div
        onClick={handleProductQuickView}
        className="relative flex items-center justify-center w-auto h-48 sm:h-52"
      >
        <span className="sr-only">{name}</span>
        <img
          src={isStartLoading && photo ? photo : productIcon}
          onError={onImgaeErrorHandle}
          alt={name}
          className={classNames(
            "product-image w-full h-full object-cover",
            !isDisplayed && "hidden",
            styles.image
          )}
        />
        {/* {isDiscount && (
          <div className="absolute top-3 end-3 md:top-4 md:end-4">
            <GiftIcon />
          </div>
          )} */}
      </div>
      {/* End of product image */}

      <header className="p-3 md:py-6 md:p-5 relative flex flex-col justify-between flex-grow">
        <div>
          <h3
            onClick={handleProductQuickView}
            className="text-md text-body font-bold truncate mb-1"
          >
            {name}
          </h3>
          <p
            className={classNames(
              "text-muted text-xs mb-3 font-medium",
              styles.description
            )}
          >
            {description}
          </p>
        </div>
        {/* <h3
          onClick={handleProductQuickView}
          className="text-md font-bold truncate mb-2"
        >
          {deliveryFee ? `${deliveryPrice} доставка` : "Бесплатная доставка"}
        </h3> */}
        {/* End of product info */}

        <div className="flex items-center justify-between min-h-6 mt-7 md:mt-6 relative">
          <div className="relative">
            {/* {discount && (
              <del className="text-xs text-muted text-opacity-75 absolute -top-4 md:-top-5 italic">
                {discountPrice}
              </del>
            )} */}
            <span className="text-body font-medium text-sm  md:text-lg">
              {false ? `от ${dishPrice}` : dishPrice}
              {/* {isApproximate ? `от ${dishPrice}` : dishPrice} */}
            </span>
          </div>
          {status === DishStatus.Active ? (
            <AddToCart data={product} />
          ) : (
            <div className="bg-red-500 rounded text-xs text-light px-2 py-1">
              Нет в наличии
            </div>
          )}
          {/* End of product price */}
        </div>
      </header>
    </article>
  );
});
