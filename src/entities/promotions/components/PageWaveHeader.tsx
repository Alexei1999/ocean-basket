import classNames from "classnames";
import { WavesIcon } from "./WavesIcon";

export function PageWaveHeader({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={classNames(className, "flex")}>
      <WavesIcon />
      <img className="pl-3" src={src} />
    </div>
  );
}
