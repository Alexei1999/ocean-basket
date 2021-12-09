import { motion } from "framer-motion";
import usePrice from "../lib/use-price";
import { fadeInOut } from "../lib/fade-in-out";
import { CloseIcon } from "./icons/close-icon";
import { CartItemCount } from "./CartItemCount";
import { Counter } from "@entities/dishes/components/Counter/Counter";
import classNames from "classnames";
import {
  addProductToCart,
  removeProductFromCart,
  dropProductFromCart,
  PickedDish,
} from "@features/choose-dishes/models";

interface CartItemProps {
  item: PickedDish;
  isCounter?: boolean;
  isResult?: boolean;
}

const CartItem = ({
  item,
  isCounter = false,
  isResult = false,
}: CartItemProps) => {
  const { price, count, product } = item;
  const { name } = product;

  const { price: formatedPrice } = usePrice({
    amount: (parseInt(price) ?? 0) * count,
  });

  function handleIncrement(
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) {
    e.stopPropagation();
    addProductToCart(item);
  }
  const handleRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    removeProductFromCart(item);
  };

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className={classNames(
        "flex items-center py-4 text-sm border-b border-solid border-border-200 border-opacity-75",
        !isResult && "px-4 sm:px-6"
      )}
    >
      {!isCounter ? (
        <CartItemCount number={count} />
      ) : (
        <div className="flex-shrink-0 ">
          <Counter
            value={count}
            onDecrement={handleRemoveClick}
            onIncrement={handleIncrement}
            variant="pillVertical"
          />
        </div>
      )}
      <h3
        className={classNames(
          isCounter ? "ml-5" : "ml-3",
          "font-bold text-body"
        )}
      >
        {name}
      </h3>
      <span className="ml-3 ms-auto font-bold text-body">{formatedPrice}</span>
      {!isResult && (
        <button
          className="w-7 h-7 ms-3 -me-2 flex items-center justify-center flex-shrink-0 rounded-full text-muted transition-all duration-200 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 hover:text-red-600 focus:text-red-600"
          onClick={() =>
            isCounter ? dropProductFromCart(item) : removeProductFromCart(item)
          }
        >
          <span className="sr-only">Закрыть</span>
          <CloseIcon className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
};

export default CartItem;
