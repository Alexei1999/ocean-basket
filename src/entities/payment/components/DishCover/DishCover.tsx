import styles from "./styles.module.scss";
import cover from "./cover.png";
import classNames from "classnames";
import { forwardRef } from "react";

export const DishCover = forwardRef<HTMLDivElement>(() => {
  return (
    <div
      className={classNames(
        "h-full max-h-[50vh] lg:max-h-[450px]",
        styles.container
      )}
    >
      <img
        alt="dish cover"
        src={cover}
        className={classNames(styles.image, "w-full object-cover")}
      />
    </div>
  );
});
