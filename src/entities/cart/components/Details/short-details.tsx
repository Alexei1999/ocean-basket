import usePrice from "@entities/cart/lib/use-price";
import { Dish } from "@shared/api/dishes";
import productSvg from "@assets/product.svg";

import cn from "classnames";
import VariationPrice from "./variation-price";
import ModifierGroups from "./variation-groups";
import { AddToCart } from "../Buttons/AddToCart";
import { hostUrl } from "@shared/api/base";

interface ShortDetailsProps {
  product: Dish;
  isSticky: boolean;
  closeModal: () => void;
}
const ShortDetails: React.FC<ShortDetailsProps> = ({
  product,
  isSticky,
  closeModal,
}) => {
  const { name, description, prices, photo, status } = product ?? {};

  const navigate = (path: string) => {
    // router.push(path);
    // closeModal();
  };

  const { price } = usePrice({
    amount: 0,
  });

  const isSelected = true;

  let selectedVariation: any = {};

  const hasVariations = true;
  return (
    <div
      className={cn(
        "max-w-6xl h-auto w-full hidden md:block bg-light fixed top-0 left-1/2 transform -translate-x-1/2 z-50 px-8 py-6 shadow transition-all duration-300",
        {
          "invisible opacity-0 -translate-y-1/2": !isSticky,
          "visible opacity-100 translate-y-0": isSticky,
        }
      )}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "border border-border-200 border-opacity-70 rounded relative flex items-center justify-center overflow-hidden flex-shrink-0",
            {
              "w-28 h-28": !hasVariations,
              "w-40 lg:w-52 h-40 lg:h-52": hasVariations,
            }
          )}
        >
          <img
            src={photo ? `${hostUrl}/${photo}` : productSvg}
            alt={name}
            className="product-image object-contain"
          />
        </div>

        <div className="px-8 flex flex-col justify-center me-auto overflow-hidden">
          <h3
            className="font-semibold text-lg lg:text-xl tracking-tight text-heading truncate cursor-pointer transition-colors hover:text-accent"
            // onClick={() => navigate(`1231231`)}
            title={name}
          >
            {name}
          </h3>

          {true && !hasVariations ? (
            <span className="text-sm font-normal text-body mt-2 block">
              unit
            </span>
          ) : (
            <span className="flex items-center mt-2">
              {/* {hasVariations && <VariationPrice prices={prices} />} */}
            </span>
          )}
        </div>

        <div
          className={cn("w-full flex flex-shrink-0", {
            "max-w-max": !hasVariations,
            "max-w-[40%]": hasVariations,
          })}
        >
          {!hasVariations && (
            <span className="me-8 flex items-center ">
              <ins className="text-xl lg:text-2xl font-semibold text-accent no-underline">
                {price}
              </ins>
              {true && (
                <del className="text-sm lg:text-base font-normal text-muted ms-2">
                  50000
                </del>
              )}
            </span>
          )}

          <div className="w-full">
            <div
              className={cn("flex flex-col overflow-y-auto justify-center", {
                "h-[140px]": hasVariations,
              })}
            >
              {/* <VariationGroups variations={{ piska: 10, siska: 20 }} /> */}
            </div>

            <div className={cn({ "mt-4": hasVariations })}>
              {true ? (
                // <AddToCart data={product} variation={selectedVariation} />
                <></>
              ) : (
                <div className="bg-red-500 rounded text-sm text-light px-3 py-2">
                  Нет в наличии
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortDetails;
