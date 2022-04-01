import cn from "classnames";

type Props = {
  className?: string;
  onClick(event: React.MouseEvent<HTMLButtonElement | MouseEvent>): void;
  disabled?: boolean;
};

export const AddToCartBtnBig: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "add_to_cart py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover",
        {
          "border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed":
            disabled,
        }
      )}
    >
      <span className="add_to_cart">В корзину</span>
    </button>
  );
};
