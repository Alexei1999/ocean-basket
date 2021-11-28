import { motion, AnimateSharedLayout } from "framer-motion";
import cartLogo from "./icons/cart.svg";
import { CloseIcon } from "./icons/close-icon";
import CartItem from "./cart-item";
import { fadeInOut } from "../lib/fade-in-out";
import usePrice from "../lib/use-price";
import { useStore } from "effector-react";
import { $cart, $cartSizes } from "@features/choose-dishes/ui";
import { setIsDrawerOpen } from "@shared/components/drawer/managed-drawer";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames";

export const CartSidebarView = ({
  onSubmit,
  onClose,
  isFlat = false,
}: {
  onSubmit: () => void;
  onClose?: () => void;
  isFlat?: boolean;
}) => {
  const cart = useStore($cart);
  const cartSizes = useStore($cartSizes);

  const cartItems = useMemo(() => Object.values(cart), [cart]);

  function handleCheckout() {
    if (!cartSizes.size) return;
    onSubmit?.();
  }

  const { price: totalPrice } = usePrice({
    amount: cartSizes.totalAmount ?? 0,
  });
  return (
    <section className="flex flex-col h-full relative">
      <header
        className={classNames(
          !isFlat && "fixed",
          "max-w-md w-full top-0 z-10 bg-light py-4 px-6 flex items-center justify-between border-b border-border-200 border-opacity-75"
        )}
      >
        <div className="flex text-heading text-lg font-bold">
          <span className="flex">
            {isFlat ? `${cartSizes.size} позиций` : "Корзина:"}
          </span>
        </div>
        {!isFlat && (
          <button
            onClick={() => onClose?.()}
            className="w-7 h-7 ms-3 -me-2 flex items-center justify-center rounded-full text-muted bg-gray-100 transition-all duration-200 focus:outline-none hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
          >
            <span className="sr-only">Закрыть</span>
            <CloseIcon className="w-3 h-3" />
          </button>
        )}
      </header>
      {/* End of cart header */}

      <AnimateSharedLayout>
        <motion.div
          layout
          className={classNames("flex-grow", !isFlat && "pt-16")}
        >
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem isCounter={isFlat} item={item} key={item.product.id} />
            ))
          ) : (
            <motion.div
              layout
              initial="from"
              animate="to"
              exit="from"
              variants={fadeInOut(0.25)}
              className="w-full flex items-center justify-center pt-8 pb-3"
            >
              <img className="justify-self-start mr-auto pl-8" src={cartLogo} />
              <h4 className="text-base mr-auto font-bold pr-8">
                Корзина пуста
              </h4>
            </motion.div>
          )}
        </motion.div>
      </AnimateSharedLayout>
      {/* End of cart items */}

      <footer
        className={classNames(
          !isFlat && "sticky",
          "start-0 bottom-0 w-full py-5 px-6 z-10 bg-light"
        )}
      >
        <button
          className={classNames(
            "flex justify-between w-full h-12 md:h-14 p-1 text-sm font-bold bg-blue-900 rounded-full shadow-700 transition-colors ",
            cartSizes.size &&
              "focus:outline-none hover:bg-accent-hover focus:bg-accent-hover"
          )}
          onClick={handleCheckout}
        >
          <span className="flex flex-1 items-center  h-full px-5 text-light">
            Заказать
          </span>
          <span className="flex items-center flex-shrink-0 h-full bg-light text-heading rounded-full px-5">
            {totalPrice}
          </span>
        </button>
      </footer>
      {/* End of footer */}
    </section>
  );
};
