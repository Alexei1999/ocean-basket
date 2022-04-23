import { formatPrice as _formatPrice } from "@entities/cart/lib/use-price";
import { ModifierType, PickedModifier } from "@features/choose-dishes/models";
import { $rus } from "@features/choose-dishes/models";
import { useStore } from "effector-react";
import Attribute from "./attribute";

export const formatPrice = (price: number, isRub: boolean) => {
  return _formatPrice({
    amount: price,
    currencyCode: isRub ? "RUB" : "KZT",
    locale: isRub ? "ru" : "kz",
  });
};

export const createPickedModifier = (
  modifier: ModifierType,
  option: string | null,
  price: number | null
): PickedModifier => {
  return {
    id: modifier.id,
    dish_id: modifier.dish_id,
    name: modifier.name,
    option: option ?? undefined,
    price: price ?? undefined,
  };
};

const ModifierGroups = ({
  modifiers,
  setActiveModifier,
  activeModifier,
}: {
  modifiers: ModifierType[];
  setActiveModifier: (modifiers: { [id: string]: PickedModifier }) => void;
  activeModifier: { [id: string]: PickedModifier };
}) => {
  const isRub = useStore($rus);

  if (!modifiers) {
    return null;
  }

  return (
    <>
      {modifiers.map((modifier, idx) => {
        const optionsObject = Object.entries(modifier)
          .filter(([key, value]) => value && key.match(/^option\d+$/))
          .map(([key, value]) => [
            value,
            modifier[(key + "_price") as keyof ModifierType] as string | "0",
          ]);

        if (!optionsObject.length) {
          return null;
        }

        return (
          <div
            className="py-4 border-b border-border-200  border-opacity-70 first:pt-0 flex flex-col"
            key={`${modifier.id}-${idx}`}
          >
            <span className="text-sm font-semibold text-body leading-none capitalize min-w-[60px] inline-block">
              {modifier.name}
            </span>
            <div className="pt-3 w-full flex flex-wrap">
              {optionsObject.map(([option, optionPrice], idx) => {
                const parcedPrice = parseInt(
                  (optionPrice ?? undefined) as string
                );

                const nextPrice = isNaN(parcedPrice) ? null : parcedPrice;

                const nextModifier =
                  option === activeModifier[modifier.id]?.option
                    ? undefined
                    : createPickedModifier(
                        modifier,
                        option as string | null,
                        nextPrice
                      );

                return (
                  <Attribute
                    className="mt-3 mr-3"
                    active={activeModifier[modifier.id]?.option === option}
                    value={`${option}${
                      nextPrice && nextPrice > 0
                        ? " - " + formatPrice(nextPrice, isRub)
                        : ""
                    }`}
                    key={`${option}-${idx}`}
                    onClick={() => {
                      setActiveModifier({
                        ...activeModifier,
                        [modifier.id]: nextModifier,
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ModifierGroups;
