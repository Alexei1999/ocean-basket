import { CartIcon } from "@entities/cart/config/CartIcon";
import { PlusIcon } from "@entities/dishes/components/Counter/PlusIcon";
import cn from "classnames";

type Props = {
  onClick(event: React.MouseEvent<HTMLButtonElement | MouseEvent>): void;
  disabled?: boolean;
};

export const AddToCartSuggstionBtn: React.FC<Props> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "Out Of Stock" : ""}
      className="w-7 h-7 md:w-9 md:h-9 flex items-center rounded-full justify-center text-sm text-heading bg-light border-2 border-border-200 transition-colors hover:bg-accent hover:border-accent hover:text-light"
    >
      <span className="sr-only">Добавить</span>
      <PlusIcon className="w-5 h-5 stroke-2" />
    </button>
  );
};
