import { motion, AnimateSharedLayout } from "framer-motion";
import cartLogo from "./icons/cart.svg";
import { CloseIcon } from "./icons/close-icon";
import CartItem from "./cart-item";
import { fadeInOut } from "../lib/fade-in-out";
import usePrice from "../lib/use-price";
import { createGate, useGate, useStore } from "effector-react";
import classNames from "classnames";
import { Scrollbar } from "@shared/components/Scrollbar";
import { $cartSizes, $cartItems } from "@features/choose-dishes/models";
import { getPlurals } from "@shared/lib/functional-utils";
import { useState } from "react";
import Input from "@entities/payment/components/Forms/forms/input";
import { ValidationError } from "@entities/payment/components/Forms/place-order-action";
import { createEffect, createEvent, createStore } from "effector";
import { verifyPromocode } from "@shared/api/dishes";
import Button from "@shared/button";
import { toast } from "react-toastify";

export const EmptyCartPanel = ({
  noGutters = false,
}: {
  noGutters?: boolean;
}) => {
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="w-full flex items-center justify-center"
    >
      <img
        className={classNames(
          "justify-self-start mr-auto",
          !noGutters ? "pl-8" : "pl-4"
        )}
        src={cartLogo}
      />
      <h4 className="text-base mr-auto font-bold pr-8">Корзина пуста</h4>
    </motion.div>
  );
};

const verifyPromocodeFx = createEffect(verifyPromocode);

const onSetPromocode = createEvent<{
  promocode: string;
  promocodeText: string | null;
}>();
export const $promocode = createStore<{
  promocode: string;
  promocodeText: string | null;
} | null>(null).on(onSetPromocode, (_, data) => data);

const cartSidebarViewGate = createGate<{
  onSuccess: (promocodeText: string | null) => void;
  onFail: () => void;
}>();
cartSidebarViewGate.state.on(
  verifyPromocodeFx.doneData,
  ({ onSuccess, onFail }, { result, promocode_text } = {} as any) => {
    if (result === true) {
      onSuccess(promocode_text);
    } else onFail();
  }
);

export const CartSidebarView = ({
  onSubmit,
  onClose,
  isFlat = false,
}: {
  onSubmit: () => void;
  onClose?: () => void;
  isFlat?: boolean;
}) => {
  const cartSizes = useStore($cartSizes);
  const { list } = useStore($cartItems);

  const [isPromocodeInput, setIsPromocodeInput] = useState(false);
  const [promocode, setPromocode] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const isLoading = useStore(verifyPromocodeFx.pending);

  useGate(cartSidebarViewGate, {
    onSuccess: (promocodeText) => {
      onSetPromocode({ promocode, promocodeText });
      setIsSuccessful(true);
    },
    onFail: () => {
      setPromocode("");
      toast.error("Неверный промокод");
    },
  });

  function handleCheckout() {
    if (!cartSizes.size) return;
    onSubmit?.();
  }

  function handlePromocode() {
    if (!promocode) {
      return;
    }

    verifyPromocodeFx({ promocode });
  }

  const { price: totalPrice } = usePrice({
    amount: cartSizes.totalAmount ?? 0,
  });

  return (
    <section className="flex flex-col h-full relative">
      <header
        className={classNames(
          !isFlat ? "fixed py-4" : "py-7",
          "max-w-md w-full top-0 z-10 bg-light px-6 flex items-center justify-between border-b border-border-200 border-opacity-75"
        )}
      >
        <div className="flex text-body text-lg font-bold">
          <span className="flex">
            {isFlat
              ? `Корзина: ${`${cartSizes.size} ${getPlurals(cartSizes.size, [
                  "позиция",
                  "позиции",
                  "позиций",
                ])}`}`
              : "Корзина:"}
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
          {list.length > 0 ? (
            <Scrollbar className="w-full h-full">
              {list.map((item, idx) => (
                <CartItem
                  isCounter={isFlat}
                  item={item}
                  key={`${item.product.id}-${item.product.name}-${idx}`}
                />
              ))}
            </Scrollbar>
          ) : (
            <div className="pt-8 pb-3">
              <EmptyCartPanel />
            </div>
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
        {isFlat &&
          (isSuccessful ? (
            <div className="pb-3 flex justify-center">
              <span className="text-accent font-bold">
                Промокод {promocode} активирован!
              </span>
            </div>
          ) : isPromocodeInput ? (
            <>
              <div
                className={classNames(
                  "mb-3",
                  "flex text-body border overflow-hidden justify-between w-full h-12 md:h-14 p-1 text-sm font-bold rounded-xl shadow-700 transition-colors focus:outline-none"
                )}
              >
                <Input
                  className="flex flex-col flex-1 items-center h-full text-light"
                  name={""}
                  onChange={(e) => {
                    setPromocode(e.target.value);
                  }}
                  value={promocode}
                  placeholder="Введите код"
                  inputClassName="!bg-light !border-0"
                ></Input>
                <Button
                  loading={isLoading}
                  onClick={handlePromocode}
                  disabled={!promocode}
                  className="flex items-center flex-shrink-0 h-full bg-current text-body rounded-xl px-5 hover:text-accent focus:text-accent"
                >
                  <span className="text-light">Применить</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="pb-3 flex justify-center">
              <div
                role="button"
                onClick={() => setIsPromocodeInput(true)}
                className="hover:text-accent font-bold button"
              >
                У тебя есть промокод?
              </div>
            </div>
          ))}
        <button
          className={classNames(
            "flex text-body justify-between w-full h-12 md:h-14 p-1 text-sm font-bold bg-current rounded-full shadow-700 transition-colors focus:outline-none hover:bg-accent-hover focus:bg-accent-hover",
            !cartSizes.size
              ? "bg-gray-300 text-accent hover:bg-gray-300 border-border-400 cursor-not-allowed"
              : ""
          )}
          onClick={handleCheckout}
        >
          <span className="flex flex-1 items-center h-full px-5 text-light">
            Заказать
          </span>
          <span className="flex items-center flex-shrink-0 h-full bg-light text-body rounded-full px-5">
            {totalPrice}
          </span>
        </button>
      </footer>
      {/* End of footer */}
    </section>
  );
};
