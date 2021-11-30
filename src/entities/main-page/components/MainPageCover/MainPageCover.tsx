import styles from "./styles.module.scss";
import coverRight from "./cover-right.png";
import coverLeft from "@widgets/footer/config/footer.png";
import classNames from "classnames";

import logoMini from "@assets/logo-mini.svg";
import logoMWriting from "@assets/logo-writing.svg";
import deliveryLogo from "@assets/delivery-logo.svg";

import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";
import Button from "@shared/button";

export function MainPageCover() {
  const navigate = useNavigate();

  return (
    <div className={classNames("flex relative", styles.container)}>
      <div className={classNames(styles.containerLeft, "flex-grow")}>
        <div
          className={classNames(
            styles.containerLeftWrapper,
            "flex flex-col h-full justify-between"
          )}
        >
          <img
            className={classNames(styles.logoMini, "w-full h-full")}
            src={logoMini}
          />
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
      </div>
      <div className={classNames(styles.containerRight, "flex-grow")}></div>
    </div>
  );
}
