import cn from "classnames";
import { AddToCart } from "./add-to-cart";
import productLogo from "../../../../app/assets/product.svg";
import { GiftIcon } from "./GiftIcon";

import styles from "./styles.module.scss";

type HeliumProps = {
  product: any;
  className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {
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
          src={image?.original ?? productLogo}
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
          className="text-md text-heading font-semibold truncate mb-2"
        >
          {name}
        </h3>
        <p className="text-muted text-xs mb-3">{ingridients?.join(", ")}</p>
        <h3
          onClick={handleProductQuickView}
          className="text-md font-semibold truncate mb-2"
        >
          {deliveryFee ? `${deliveryFee}$ доставка` : "Бесплатная доставка"}
        </h3>
        {/* End of product info */}

        <div className="flex items-center justify-between min-h-6 mt-7 md:mt-8 relative">
          <div className="relative">
            {discount && (
              <del className="text-xs text-muted text-opacity-75 absolute -top-4 md:-top-5 italic">
                {discount}
              </del>
            )}
            <span className="text-heading text-sm md:text-lg font-semibold">
              {isApproximate ? `от ${price} ₽` : `${price} ₽`}
            </span>
          </div>
          {isAvailable && <AddToCart data={product} variant="big" />}
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

export default Helium;
