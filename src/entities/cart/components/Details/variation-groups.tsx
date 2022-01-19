import { formatPrice } from "@entities/cart/lib/use-price";
import { ModifierType, PickedModifier } from "@features/choose-dishes/models";
import Attribute from "./attribute";

export const formatRub = (price: number) => {
  return formatPrice({
    amount: price,
    currencyCode: "RUB",
    locale: "ru",
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
  if (!modifiers) {
    return null;
  }

  return (
    <>
      {modifiers.map((modifier, idx) => {
        const { option1, option2, option3, option4, option5 } = modifier;
        const {
          option1_price,
          option2_price,
          option3_price,
          option4_price,
          option5_price,
        } = modifier;

        const optionsObject = [
          [option1, option1_price],
          [option2, option2_price],
          [option3, option3_price],
          [option4, option4_price],
          [option5, option5_price],
        ].filter(([option]) => option);

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
                    : createPickedModifier(modifier, option, nextPrice);

                return (
                  <Attribute
                    className="mt-3 mr-3"
                    active={activeModifier[modifier.id]?.option === option}
                    value={`${option}${
                      nextPrice && nextPrice > 0
                        ? " - " + formatRub(nextPrice)
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
