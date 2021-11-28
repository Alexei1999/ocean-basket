import { motion } from "framer-motion";
import usePrice from "../lib/use-price";
import { fadeInOut } from "../lib/fade-in-out";
import { CloseIcon } from "./icons/close-icon";
import {
  CartItemType,
  removeProductFromCart,
} from "@features/choose-dishes/ui";
import { CartItemCount } from "./CartItemCount";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { count, product } = item;

  const { price } = usePrice({
    amount: product.price * count,
  });

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="flex items-center py-4 px-4 sm:px-6 text-sm border-b border-solid border-border-200 border-opacity-75"
    >
      <CartItemCount number={count} />
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
