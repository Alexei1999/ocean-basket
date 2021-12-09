import styles from "./styles.module.scss";
import cover from "./cover.png";
import classNames from "classnames";
import { forwardRef, useCallback, useEffect, useRef } from "react";

export const DishCover = forwardRef<HTMLDivElement>(() => {
  return (
    <div className={styles.container}>
      <img
        alt="dish cover"
        src={cover}
        className={classNames(styles.image, "w-full object-cover")}
      />
    </div>
  );
});
