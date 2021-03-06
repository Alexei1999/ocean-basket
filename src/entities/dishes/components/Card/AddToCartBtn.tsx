import cn from "classnames";

type Props = {
  className?: string;
  onClick(event: React.MouseEvent<HTMLButtonElement | MouseEvent>): void;
  disabled?: boolean;
};

export const AddToCartBtn: React.FC<Props> = ({
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "view_card py-4 px-7 w-full flex items-center justify-center text-xs font-light text-light bg-green-600 hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover",
        className,
        {
          "border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed":
            disabled,
        }
      )}
    >
      <span className="whitespace-nowrap view_card">В корзину</span>
    </button>
  );
};
