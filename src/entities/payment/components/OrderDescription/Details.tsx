import classNames from "classnames";
import { useMemo } from "react";

import styles from "./styles.module.scss";

export const Details = ({
  className,
  valueClassName,
  label,
  items,
}: {
  className?: string;
  valueClassName?: string;
  label: string;
  items: ([string | number, string | number] | undefined | null | false)[];
}) => {
  const filteredItems = useMemo(
    () =>
      items.filter((item) => Array.isArray(item)) as [
        string | number,
        string | number
      ][],
    [items]
  );

  return (
    <div className={classNames(className)}>
      <div className="font-bold text-2xl">{label}</div>
      <div className="pt-9 flex flex-col">
        {filteredItems.map(([key, value]) => (
          <div className="max-w-full flex items-start pb-3" key={key}>
            <div className="text-base font-bold flex justify-between w-1/2">
              <div>{key}</div>
              <span className={styles.semicolon}>:</span>
            </div>
            <div className={classNames("w-1/2", valueClassName)}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
