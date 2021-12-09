import { ModifierType, PickedModifier } from "@features/choose-dishes/models";
import Attribute from "./attribute";

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
      {modifiers.map((modifier, index) => {
        const { option1, option2, option3, option4, option5, id } = modifier;
        const optionsObject = [
          option1,
          option2,
          option3,
          option4,
          option5,
        ].filter((option) => option);

        if (!optionsObject.length) {
          return null;
        }

        return (
          <div
            className="py-4 border-b border-border-200  border-opacity-70 first:pt-0 flex flex-col"
            key={index}
          >
            <span className="text-sm font-semibold text-body leading-none capitalize min-w-[60px] inline-block">
              {modifier.name}
            </span>
            <div className="pt-3 w-full flex flex-wrap">
              {optionsObject.map((option) => (
                <Attribute
                  className="mt-3 mr-3"
                  active={activeModifier[modifier.id]?.option === option}
                  value={option}
                  key={option}
                  onClick={() => {
                    setActiveModifier({
                      ...activeModifier,
                      [modifier.id]:
                        option === activeModifier[modifier.id]?.option
                          ? undefined
                          : {
                              id: modifier.id,
                              dish_id: modifier.dish_id,
                              name: modifier.name,
                              option: option,
                            },
                    });
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ModifierGroups;
