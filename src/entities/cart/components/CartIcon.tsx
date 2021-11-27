import { FC, useMemo } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

const WIDTH = 51;
const LARGE_CIRCLE_ADD_WIDTH = 4;
const HEIGHT = 50;

enum CircleSizes {
  Small = "sm",
  Medium = "md",
  Large = "lg",
}

const getCircleSize = (counter?: number): CircleSizes | null => {
  if (!counter) return null;
  switch (true) {
    case counter > 0 && counter < 10:
      return CircleSizes.Small;
    case counter >= 10 && counter < 100:
      return CircleSizes.Medium;
    case counter > -10 && counter < 0:
      return CircleSizes.Medium;
    case counter >= 100:
      return CircleSizes.Large;
    case counter <= -10:
      return CircleSizes.Large;
    default:
      return null;
  }
};

type CartProps = {
  containerClassName?: string;
  iconClassName?: string;
  className?: string;
  counter?: number;
} & React.SVGProps<SVGSVGElement>;

export const CartIcon: FC<CartProps> = ({
  containerClassName,
  iconClassName,
  className,
  counter,
  ...props
}) => {
  const size = useMemo(() => getCircleSize(counter), [counter]);
  const additionalSize = useMemo(
    () => (size === CircleSizes.Large ? LARGE_CIRCLE_ADD_WIDTH : 0),
    [size]
  );

  return (
    <div className={cn(containerClassName, "relative")}>
      <svg
        width={WIDTH + additionalSize}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH + additionalSize} ${HEIGHT}`}
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle
          cx="25"
          cy="25"
          r="25"
          className={iconClassName}
          fill="#11315F"
        />
        <path
          className={styles.cartIconCart}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.2802 19.2199C34.8502 18.7125 34.2251 18.4207 33.5675 18.4207H21.9274C21.4789 18.4207 21.1149 18.7921 21.1149 19.2498C21.1149 19.7075 21.4789 20.0789 21.9274 20.0789H33.5675C33.8221 20.0789 33.9803 20.2204 34.0518 20.3044C34.1233 20.3896 34.2381 20.5698 34.2013 20.8262L33.1732 28.0772C33.092 28.6454 32.6066 29.0744 32.0433 29.0744H20.2234C19.6243 29.0744 19.1357 28.6156 19.0859 28.0076L18.0427 15.3253C18.0123 14.9494 17.7361 14.6409 17.3721 14.5768L15.1177 14.1777C14.6703 14.1048 14.2543 14.4022 14.1785 14.8543C14.1027 15.3054 14.3984 15.7343 14.8404 15.8128L16.4762 16.1013L17.4663 28.1458C17.5877 29.6205 18.7728 30.7326 20.2234 30.7326H32.0433C33.4094 30.7326 34.5858 29.6935 34.7808 28.3149L35.81 21.0639C35.9042 20.3984 35.7103 19.7274 35.2802 19.2199ZM18.4003 34.1597C18.4003 33.2366 19.1369 32.4849 20.0415 32.4849C20.946 32.4849 21.6816 33.2366 21.6816 34.1597C21.6816 35.0828 20.946 35.8334 20.0415 35.8334C19.1369 35.8334 18.4003 35.0828 18.4003 34.1597ZM30.5907 34.1597C30.5907 33.2366 31.3263 32.4849 32.2308 32.4849C33.1354 32.4849 33.872 33.2366 33.872 34.1597C33.872 35.0828 33.1354 35.8334 32.2308 35.8334C31.3263 35.8334 30.5907 35.0828 30.5907 34.1597ZM31.1195 23.3364C31.1195 23.7941 30.7555 24.1655 30.307 24.1655H27.303C26.8534 24.1655 26.4905 23.7941 26.4905 23.3364C26.4905 22.8787 26.8534 22.5073 27.303 22.5073H30.307C30.7555 22.5073 31.1195 22.8787 31.1195 23.3364Z"
          fill="white"
        />
        {size === CircleSizes.Small && (
          <circle cx="40" cy="11" r="8" fill="#F20000" />
        )}
        {size === CircleSizes.Medium && (
          <ellipse cx="40" cy="12" rx="11" ry="8" fill="#F20000" />
        )}
        {size === CircleSizes.Large && (
          <ellipse cx="39" cy="12" rx="15" ry="8" fill="#F20000" />
        )}
      </svg>
      {size && (
        <span
          className={cn(
            "absollute text-white font-normal text-sm",
            styles.cartIconText,
            styles[`cartIconText-${size}`]
          )}
        >
          {size === CircleSizes.Large ? "99+" : counter}
        </span>
      )}
    </div>
  );
};
