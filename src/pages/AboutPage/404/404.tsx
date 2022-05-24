import { NotFound } from "@entities/dishes/components/NotFound";
import classNames from "classnames";
import styles from "./styles.module.scss";

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <NotFound
        text="Страница не найдена"
        className={classNames(styles.image, "w-auto h-full")}
      />
    </div>
  );
}
