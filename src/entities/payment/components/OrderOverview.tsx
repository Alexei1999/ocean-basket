import { CartSidebarView } from "@entities/cart/components/cart-sidebar-view";
import { SuggestionsBlock } from "@entities/suggestion/components/SuggestionsBlock/SuggestionsBlock";
import classNames from "classnames";
import React from "react";
import style from "./styles.module.scss";

export const OrderOverview = React.forwardRef<
  HTMLDivElement,
  { onSubmit: () => void }
>(({ onSubmit }, ref) => {
  return (
    <div ref={ref} className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 min-h-140">
        <div
          className={classNames(
            "w-full relative md:w-[45%] lg:w-96 flex-shrink-0 order-1 md:order-2 h-[400px] md:h-auto mb-8 md:mb-0 md:ms-7 lg:ms-9 bg-light max-h-140",
            style.shadow
          )}
        >
          <CartSidebarView isFlat onSubmit={onSubmit} />
        </div>

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
