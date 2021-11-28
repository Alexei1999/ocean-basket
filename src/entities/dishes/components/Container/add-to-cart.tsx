import cn from "classnames";
import AddToCartBtn from "./add-to-cart-btn";
import Counter from "./counter";
import styles from "./styles.module.scss";

interface Props {
  data: any;
  variant?: "helium" | "neon" | "argon" | "oganesson" | "single" | "big";
  counterVariant?:
    | "helium"
    | "neon"
    | "argon"
    | "oganesson"
    | "single"
    | "details";
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
}

export const AddToCart = ({
  variant = "neon",
  counterVariant,
  counterClass,
  disabled,
}: Props) => {
  console.log("styles", styles);

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
      variant={variant}
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
        onIncrement={handleAddClick}
        variant={counterVariant || variant}
        className={counterClass}
        disabled={false}
      />
    </>
  );
};
