import classNames from "classnames";
import { WavesIcon } from "./WavesIcon";

export function PageWaveHeader({
  text,
  className,
  textClassName = "text-[66px]",
  isHidden = true,
}: {
  text?: string;
  className?: string;
  textClassName?: string;
  isHidden?: boolean;
}) {
  return (
    <div className={classNames(className, "flex items-center")}>
      <WavesIcon className={classNames(isHidden && "hidden md:block")} />
      {text && (
        <span
          className={classNames(
            "pl-4 font-friends text-body leading-none",
            textClassName
          )}
        >
          {text}
        </span>
      )}
    </div>
  );
}
