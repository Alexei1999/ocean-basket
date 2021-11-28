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
        "bg-gray-100 flex justify-center flex-shrink-0",
        styles.circle,
        styles.circleRounded,
        className
      )}
    >
      <div
        className={classNames(
          "text-heading inline-block text-base font-medium bg-gray-100 px-1",
          styles.circleRounded
        )}
      >
        {number}
      </div>
    </div>
  );
}
