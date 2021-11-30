import styles from "./styles.module.scss";
import coverRight from "./cover-right.png";
import coverLeft from "@widgets/footer/config/footer.png";
import classNames from "classnames";

import logoMini from "@assets/logo-mini.svg";
import logoMWriting from "@assets/logo-writing.svg";
import deliveryLogo from "@assets/delivery-logo.svg";
import dishBacground2 from "./dish-background-2.png";

import { useNavigate } from "react-router";
import { RoutesConfig } from "@shared/lib/routes-config";
import Button from "@shared/button";
import Input from "@entities/payment/components/Forms/forms/input";

export function MainPageCover() {
  const navigate = useNavigate();

  return (
    <div className={classNames("flex relative", styles.container)}>
      <div className={styles.containerLeft}>
        <div
          className={classNames(
            styles.containerLeftWrapper,
            "flex flex-col pl-32 pt-32 w-full pr-7 pb-28"
          )}
        >
          <img width="125px" height="125px" src={logoMini} />
          <img
            className="flex-grow mt-11 w-full max-w-md"
            width="40%"
            height="auto"
            src={logoMWriting}
          />
          <img
            className="mt-20 max-w-md w-full"
            width="40%"
            height="auto"
            src={deliveryLogo}
          />
          <Button
            className={classNames(
              "text-accent hover:text-accent-hover w-52 mt-16"
            )}
            onClick={() => navigate(RoutesConfig.Menu)}
          >
            Меню
          </Button>
        </div>
        <img
          alt="dish cover right"
          src={coverLeft}
          className={classNames(
            styles.image,
            styles.imageLeft,
            "object-cover absolute"
          )}
        />
        <img
          alt="dish cover right"
          src={coverRight}
          className={classNames(
            styles.image,
            styles.imageRight,
            "object-cover absolute"
          )}
        />
      </div>
    </div>
  );
}
export function MailSection() {
  return (
    <div>
      <div
        className={classNames(
          "flex max-h-80",
          styles.promotionWrapperBackground
        )}
      >
        <img
          className={classNames("w-full h-full object-fill", styles.promotion)}
          src={dishBacground2}
          alt="dish-background-2"
        />
      </div>
      {/* <div className={classNames("bg-light flex", styles.card)}>
        <div className="flex flex-col">
          <div>
            Подпишись на наши обновления и получи подарок на первый заказ
          </div>
          <div className="flex">
            <Input name="email" placeholder="email" />
            <Button>Подписаться</Button>
          </div>
        </div>
        <div className="w-96">
          <img
            className={classNames("w-full h-full object-fill")}
            src={dishBacground2}
            alt="dish-background-2"
          />
        </div>
      </div> */}
    </div>
  );
}
