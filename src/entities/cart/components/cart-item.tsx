import { motion } from "framer-motion";
import usePrice from "../lib/use-price";
import { fadeInOut } from "../lib/fade-in-out";
import { CloseIcon } from "./icons/close-icon";
import {
  addProductToCart,
  CartItemType,
  removeProductFromCart,
} from "@features/choose-dishes/ui";
import { CartItemCount } from "./CartItemCount";
import { Counter } from "@entities/dishes/components/Counter/Counter";

interface CartItemProps {
  item: CartItemType;
  isCounter: boolean;
}

const CartItem = ({ item, isCounter = false }: CartItemProps) => {
  const { count, product } = item;

  const { price } = usePrice({
    amount: product.price * count,
  });

  function handleIncrement(e: any) {
    e.stopPropagation();
    addProductToCart(product);
  }
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeProductFromCart(product);
  };

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="flex items-center py-4 px-4 sm:px-6 text-sm border-b border-solid border-border-200 border-opacity-75"
    >
      {!isCounter ? (
        <CartItemCount number={count} />
      ) : (
        <div className="flex-shrink-0">
          <Counter
            value={count}
            onDecrement={handleRemoveClick}
            onIncrement={handleIncrement}
            variant="pillVertical"
          />
        </div>
      )}
      <h3 className="ml-3 font-bold text-heading">
        {Array.isArray(product.setItems) && product.setItems.length
          ? product.setItems.join(", ")
          : product.name}
      </h3>
      <span className="ms-auto font-bold text-heading">{price}</span>
      <button
        className="w-7 h-7 ms-3 -me-2 flex items-center justify-center flex-shrink-0 rounded-full text-muted transition-all duration-200 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 hover:text-red-600 focus:text-red-600"
        onClick={() => removeProductFromCart(product)}
      >
        <span className="sr-only">Закрыть</span>
        <CloseIcon className="w-3 h-3" />
      </button>
    </motion.div>
  );
};

export default CartItem;
