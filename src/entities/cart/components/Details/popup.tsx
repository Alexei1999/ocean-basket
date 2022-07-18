import { ModifierType } from "@features/choose-dishes/models";
import { Dish } from "@shared/api/common";
import { getModifiers } from "@shared/api/switchable";
import Spinner from "@shared/components/spinner/spinner";
import { createEffect, createStore } from "effector";
import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import { getDishFx } from "./add-dish-modal";
import Details from "./details";

const getModifiersFx = createEffect(getModifiers);
export const $modifiers = createStore<ModifierType[]>([]).on(
  getModifiersFx.doneData,
  (_, modifiers) => modifiers
);

interface ProductPopupProps {
  product: Dish | null;
}
const Popup: React.FC<ProductPopupProps> = ({ product }) => {
  const [, setShowStickyShortDetails] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);

  const isModifiersLoading = useStore(getModifiersFx.pending);
  const isDishLoading = useStore(getDishFx.pending);

  const isLoading = isModifiersLoading || isDishLoading;

  const modifiers = useStore($modifiers);

  useEffect(() => {
    if (!product?.id) return;

    getModifiersFx(product.id);
  }, [product?.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(true);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isDelayed || isLoading || !product)
    return (
      <div className="w-96 flex justify-center items-center h-96 bg-light relative md:rounded-xl">
        <Spinner text="Загрузка" />
      </div>
    );

  return (
    <article className="bg-light flex w-full max-w-6xl xl:min-w-[1152px] relative z-[51] md:rounded-xl">
      {/* <ShortDetails
        closeModal={() => {}}
        product={product}
        isSticky={showStickyShortDetails}
      /> */}
      <Details
        modifiers={modifiers}
        product={product}
        backBtn={false}
        isModal={true}
        setShowStickyShortDetails={setShowStickyShortDetails}
      />
    </article>
  );
};

export default Popup;
