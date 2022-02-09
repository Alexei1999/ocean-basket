import cn from "classnames";
import { Link } from "react-router-dom";
import { RoutesConfig } from "@shared/lib/routes-config";
import logo from "@assets/logo.svg";
import { onScrollPage } from "@app/";

const LOGO_WIDTH = 128;
const LOGO_HEIGHT = 40;
const LOGO_ALT = "ocean bascet";

export const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const { siteTitle } = { siteTitle: "Ocean Basket" };
  return (
    <Link
      to={RoutesConfig.Dashboard}
      onClick={() => onScrollPage()}
      className={cn("inline-flex", className)}
      {...props}
    >
      <span
        className="overflow-hidden relative"
        style={{
          width: LOGO_WIDTH,
          height: LOGO_HEIGHT,
        }}
      >
        <img
          src={logo}
          alt={siteTitle ?? LOGO_ALT}
          className="object-contain"
          loading="eager"
        />
      </span>
    </Link>
  );
};
