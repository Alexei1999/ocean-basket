import styles from "./styles.module.scss";
import classNames from "classnames";

import { ReactComponent as LogoMini } from "@assets/logo-mini.svg";
import logoMWriting from "@assets/logo-writing.svg";
import deliveryLogo from "@assets/delivery-logo.svg";

import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";
import Button from "@shared/button";

import { ReactComponent as Arrows } from "./arrows.svg";

export function MainPageCover() {
  const navigate = useNavigate();

  return (
    <div className={classNames("flex relative", styles.container)}>
      <div className={classNames(styles.containerLeft, "flex-grow relative")}>
        <div
          className={classNames(
            styles.containerLeftWrapper,
            "flex flex-col h-full justify-between"
          )}
        >
          <LogoMini className={classNames(styles.logoMini, "w-full h-full")} />
          <img className="w-full" src={logoMWriting} />
          <img className="w-full" src={deliveryLogo} />
          <Button
            className={classNames(
              styles.button,
              "w-full text-accent hover:text-accent-hover"
            )}
            onClick={() => navigate(RoutesConfig.Menu)}
          >
            Меню
          </Button>
        </div>
        <Arrows className="hidden lg:block absolute right-12 bottom-14" />
      </div>
      <div className={classNames(styles.containerRight, "flex-grow")} />
    </div>
  );
}

// right-12 bottom-14
