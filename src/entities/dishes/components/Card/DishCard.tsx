import cn from "classnames";
import { AddToCart } from "../../../cart/components/Buttons/AddToCart";
import { GiftIcon } from "../../config/GiftIcon";
import productIcon from "@assets/product.svg";

import styles from "./styles.module.scss";
import usePrice from "@entities/cart/lib/use-price";

type DishCardProps = {
  product: any;
  className?: string;
};

export const DishCard: React.FC<DishCardProps> = ({ product, className }) => {
  const {
    name,
    image,
    ingridients,
    isAvailable,
    discount,
    deliveryFee,
    isApproximate,
    isDiscount,
    price,
  } = product ?? {};

  function handleProductQuickView() {}

  const { price: deliveryPrice } = usePrice({
    amount: deliveryFee ?? 0,
  });
  const { price: discountPrice } = usePrice({
    amount: discount ?? 0,
  });
  const { price: dishPrice } = usePrice({
    amount: price ?? 0,
  });

  return (
    <article
      className={cn(
        "product-card cart-type-helium border border-border-200 h-full bg-light overflow-hidden transition-shadow duration-200 hover:shadow-sm",
        styles.roundedXl,
        className
      )}
    >
      <div
        onClick={handleProductQuickView}
        className="relative flex items-center justify-center w-auto h-48 sm:h-64"
        role="button"
      >
        <span className="sr-only">{name}</span>
        <img
          src={image?.original ?? productIcon}
          alt={name}
          className="product-image h-full object-fill"
        />
        {isDiscount && (
          <div className="absolute top-3 end-3 md:top-4 md:end-4 px-1.5 sm:px-2 md:px-2.5">
            <GiftIcon />
          </div>
        )}
      </div>
      {/* End of product image */}

      <header className="p-3 md:py-6 md:p-5 relative">
        <h3
          onClick={handleProductQuickView}
          className="text-md text-heading font-bold truncate mb-2"
        >
          {name}
        </h3>
        <p className="text-muted text-xs mb-3 font-medium">
          {ingridients?.join(", ")}
        </p>
        <h3
          onClick={handleProductQuickView}
          className="text-md font-bold truncate mb-2"
        >
          {deliveryFee ? `${deliveryPrice} доставка` : "Бесплатная доставка"}
        </h3>
        {/* End of product info */}

        <div className="flex items-center justify-between min-h-6 mt-7 md:mt-8 relative">
          <div className="relative">
            {discount && (
              <del className="text-xs text-muted text-opacity-75 absolute -top-4 md:-top-5 italic">
                {discountPrice}
              </del>
            )}
            <span className="text-heading font-medium text-sm  md:text-lg">
              {isApproximate ? `от ${dishPrice}` : dishPrice}
            </span>
          </div>
          {isAvailable && <AddToCart data={product} />}
          {!isAvailable && (
            <div className="bg-red-500 rounded text-xs text-light px-2 py-1">
              Нет в наличии
            </div>
          )}
          {/* End of product price */}
        </div>
      </header>
    </article>
  );
};
