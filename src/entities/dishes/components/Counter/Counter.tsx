import cn from "classnames";
import { MinusIcon } from "./MinusIcon";
import { PlusIcon } from "./PlusIcon";

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value: number;
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

export const Counter: React.FC<CounterProps> = ({
  value,
  onDecrement,
  onIncrement,
  className,
  disabled,
}) => {
  return (
    <div
      className={cn(
        "flex overflow-hidden",
        "w-full h-14 rounded text-light bg-accent inline-flex justify-between",
        className
      )}
    >
      <button
        onClick={onDecrement}
        className={cn(
          "cursor-pointer p-2 transition-colors duration-200 focus:outline-none hover:bg-accent-hover",
          "px-5"
        )}
      >
        <span className="sr-only">Отнять</span>
        <MinusIcon className="h-3 w-3 stroke-2.5" />
      </button>
      <div
        className={cn(
          "flex-1 flex items-center justify-center text-xs font-semibold"
        )}
      >
        {value}
      </div>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          "cursor-pointer p-2 transition-colors duration-200 focus:outline-none hover:bg-accent-hover",
          "px-5"
        )}
        title={disabled ? "text-out-stock" : ""}
      >
        <span className="sr-only">Добавить</span>
        <PlusIcon className="h-3.5 w-3.5 md:h-4.5 md:w-4.5 stroke-2.5" />
      </button>
    </div>
  );
};

export default Counter;
