import AddToCartBtn from "./add-to-cart-btn";
import Counter from "./counter";

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
  data,
  variant = "helium",
  counterVariant,
  counterClass,
  variation,
  disabled,
}: Props) => {
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
    <div className="flex h-4 w-full">
      <AddToCartBtn
        // disabled={disabled || outOfStock}
        disabled={disabled || false}
        variant={variant}
        onClick={handleAddClick}
      />
    </div>
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
