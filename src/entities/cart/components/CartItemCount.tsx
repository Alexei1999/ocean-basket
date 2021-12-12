import classNames from "classnames";
import styles from "./styles.module.scss";

export function CartItemCount({
  number,
  className,
}: {
  number: number;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "bg-gray-100 flex justify-center flex-shrink-0 rounded-full",
        styles.circle,
        styles.circleRounded,
        className
      )}
    >
      <div
        className={classNames(
          "text-body inline-block text-base font-medium bg-gray-100 px-1 rounded-full leading-none pt-[7px]"
        )}
      >
        {number}
      </div>
    </div>
  );
}
