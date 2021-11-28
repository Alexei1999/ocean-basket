import styles from "./styles.module.scss";
import cover from "./cover.png";
import classNames from "classnames";

export function DishCover() {
  return (
    <div className={styles.container}>
      <img
        src={cover}
        className={classNames(styles.image, "w-full object-cover")}
      />
    </div>
  );
}
