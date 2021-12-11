import {
  fetchPopularDishesFx,
  ModifierType,
} from "@features/choose-dishes/models";
import { Dish, getModifiers } from "@shared/api/dishes";
import Spinner from "@shared/components/spinner/spinner";
import { createEffect, createStore, forward } from "effector";
import { createGate, useGate, useStore } from "effector-react";
import { useEffect, useState } from "react";
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
  const [showStickyShortDetails, setShowStickyShortDetails] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);

  const isLoading = useStore(getModifiersFx.pending);
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
    <article className="bg-light w-full max-w-6xl xl:min-w-[1152px] relative z-[51] md:rounded-xl">
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
