import { CartSidebarView } from "@entities/cart/components/cart-sidebar-view";
import { SuggestionsBlock } from "@entities/suggestion/components/SuggestionsBlock/SuggestionsBlock";
import {
  $dishes,
  $popularDishes,
  fetchPopularDishesFx,
} from "@features/choose-dishes/models";
import classNames from "classnames";
import { forward } from "effector";
import { createGate, useGate, useStore } from "effector-react";
import React, { useEffect, useRef } from "react";
import style from "./styles.module.scss";

export const OrderOverview = React.forwardRef<
  HTMLDivElement,
  { onSubmit: () => void }
>(({ onSubmit }, ref) => {
  return (
    <div ref={ref} className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 min-h-140">
        {/* Contact form */}
        <div
          className={classNames(
            "w-full relative md:w-72 flex-shrink-0 lg:w-96 order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 bg-light max-h-140",
            style.shadow
          )}
        >
          <CartSidebarView isFlat onSubmit={onSubmit} />
        </div>

        {/* sidebar */}
        <div
          className={classNames(
            "w-full bg-light order-2 md:order-1",
            style.shadow
          )}
        >
          <SuggestionsBlock />
        </div>
      </div>
    </div>
  );
});
