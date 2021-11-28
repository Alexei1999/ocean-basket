import cn from "classnames";
import { AddToCartBtn } from "../../../dishes/components/Card/AddToCartBtn";
import { Counter } from "../../../dishes/components/Counter/Counter";
import styles from "./styles.module.scss";

interface Props {
  data: any;
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
}

export const AddToCart = ({ counterClass, disabled }: Props) => {
  // const {
  //   addItemToCart,
  //   removeItemFromCart,
  //   isInStock,
  //   getItemFromCart,
  //   isInCart,
  // } = useCart();
  // const item = generateCartItem(data, variation);
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    // addItemToCart(item, 1);
    // if (!isInCart(item.id)) {
    //   cartAnimation(e);
    // }
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    // removeItemFromCart(item.id);
  };
  // const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  // return !isInCart(item?.id) ? (
  return true ? (
    <AddToCartBtn
      className={cn(styles.button, "max-h-8")}
      // disabled={disabled || outOfStock}
      disabled={disabled || false}
      onClick={handleAddClick}
    />
  ) : (
    <>
      <Counter
        // value={getItemFromCart(item.id).quantity}
        value={10}
        onDecrement={handleRemoveClick}
        className={cn(styles.counter, "max-h-8", counterClass)}
        onIncrement={handleAddClick}
        disabled={false}
      />
    </>
  );
};
