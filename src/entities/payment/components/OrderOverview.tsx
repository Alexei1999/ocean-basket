import { CartSidebarView } from "@entities/cart/components/cart-sidebar-view";
import { SuggestionsBlock } from "@entities/suggestion/components/SuggestionsBlock/SuggestionsBlock";
import { dishes } from "@features/choose-dishes/config/dishes";
import classNames from "classnames";
import style from "./styles.module.scss";

export const OrderOverview = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10">
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
          <SuggestionsBlock
            items={[...dishes.slice(1, 2), ...dishes.slice(4, 5)]}
          />
        </div>
      </div>
    </div>
  );
};
