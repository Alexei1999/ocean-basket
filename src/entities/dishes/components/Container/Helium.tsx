import cn from "classnames";
import { AddToCart } from "./add-to-cart";
import productLogo from "../../../../app/assets/product.svg";
import { CartIcon } from "./cart";

type HeliumProps = {
  product: any;
  className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {
  // const { name, image, unit, quantity } = product ?? {};
  // const { price, basePrice, discount } = usePrice({
  //   amount: product.sale_price ? product.sale_price : product.price!,
  //   baseAmount: product.price,
  // });

  const { name, image, unit, quantity, min_price, max_price, product_type } =
    product ?? {};
  // const { price, basePrice, discount } = usePrice({
  //   amount: product.sale_price ? product.sale_price : product.price!,
  //   baseAmount: product.price,
  // });

  function handleProductQuickView() {
    // return openModal("PRODUCT_DETAILS", product.slug);
  }

  return (
    <article
      className={cn(
        "product-card cart-type-helium rounded border border-border-200 h-full bg-light overflow-hidden transition-shadow duration-200 hover:shadow-sm",
        className
      )}
    >
      <div
        onClick={handleProductQuickView}
        className="relative flex items-center justify-center w-auto h-48 sm:h-64"
        role="button"
      >
        <span className="sr-only">{"text-product-image"}</span>
        <img
          src={image?.original ?? productLogo}
          alt={name}
          className="product-image object-contain"
        />
        {true && (
          <div className="absolute top-3 end-3 md:top-4 md:end-4 rounded-full text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-yellow-500 text-light">
            {120}
          </div>
        )}
      </div>
      {/* End of product image */}

      <header className="p-3 md:py-6 md:p-5 relative">
        <h3
          onClick={handleProductQuickView}
          role="button"
          className="text-heading text-sm font-semibold truncate mb-2"
        >
          {name}
        </h3>
        <p className="text-muted text-xs">{unit}</p>
        {/* End of product info */}

        <div className="flex items-center justify-between min-h-6 mt-7 md:mt-8 relative">
          {product_type.toLowerCase() === "variable" ? (
            <>
              <div>
                <span className="text-accent text-sm md:text-[15px] font-semibold">
                  {100}
                </span>
                <span> - </span>
                <span className="text-accent text-sm md:text-[15px] font-semibold">
                  {120}
                </span>
              </div>

              {Number(quantity) > 0 && (
                <button
                  onClick={handleProductQuickView}
                  className="order-5 sm:order-4 py-2 px-3 sm:px-4 border-2 border-border-100 flex items-center justify-center sm:justify-start text-sm font-semibold rounded-full text-accent hover:text-light bg-light hover:bg-accent hover:border-accent transition-colors duration-300 focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
                >
                  <CartIcon className="w-4 h-4 me-2" />
                  <span>{"text-cart"}</span>
                </button>
              )}
            </>
          ) : (
            <>
              <div className="relative">
                {true && (
                  <del className="text-xs text-muted text-opacity-75 absolute -top-4 md:-top-5 italic">
                    {200}
                  </del>
                )}
                <span className="text-accent text-sm md:text-base font-semibold">
                  {5000}
                </span>
              </div>

              {Number(quantity) > 0 && (
                <AddToCart data={product} variant="single" />
              )}
            </>
          )}

          {Number(quantity) <= 0 && (
            <div className="bg-red-500 rounded text-xs text-light px-2 py-1">
              {"text-out-stock"}
            </div>
          )}
          {/* End of product price */}
        </div>
      </header>
    </article>
  );
};

export default Helium;
