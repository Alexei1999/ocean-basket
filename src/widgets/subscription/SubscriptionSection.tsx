import styles from "./styles.module.scss";
import classNames from "classnames";

import dishBacground2 from "./config/dish-background-2.png";
import emailDish from "./config/email-dish.png";
import instagram from "./config/instagram.svg";

import Button from "@shared/button";
import Input from "@entities/payment/components/Forms/forms/input";
import { instagramImages } from "./config/images/index";

function EmailSection() {
  return (
    <div>
      <div
        className={classNames(
          "flex max-h-80 overflow-hidden",
          styles.promotionWrapperBackground
        )}
      >
        <img
          className={classNames("w-full h-full object-fill", styles.promotion)}
          src={dishBacground2}
          alt="dish-background-2"
        />
      </div>
      <div className="flex justify-center drop-shadow-md lg:-mt-56">
        <div
          className={classNames(
            "bg-light flex justify-between rounded-3xl overflow-hidden",
            styles.card
          )}
        >
          <div className="flex flex-col text-3xl font-bold px-12 py-12 justify-between">
            <div className="pt-3">
              Подпишись на наши обновления и получи подарок на первый заказ
            </div>
            <div className={"flex text-lg"}>
              <Input
                name="email"
                placeholder="email"
                className={classNames("flex-grow text-base", styles.emailInput)}
              />
              <Button
                className={classNames(
                  "text-accent hover:text-accent-hover",
                  styles.button
                )}
              >
                Подписаться
              </Button>
            </div>
          </div>
          <div className={classNames("flex-shrink-0", styles.emailImg)}>
            <img
              className={classNames("w-full h-full object-cover")}
              src={emailDish}
              alt="email dish image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InstagramHeader() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={instagram} className={styles.instagram} />
      <span className="text-accent pt-2">Все последние новости о нас там</span>
      <span className="text-accent font-bold text-2xl pt-8">@ocenbasket</span>
    </div>
  );
}

function InstagramGalery() {
  return (
    <div className="flex flex-wrap justify-center md:px-4 lg:px-8 xl:px-32 gap-5">
      {instagramImages.map(({ img, alt, href }, idx) => (
        <a href={href} key={idx}>
          <img src={img} alt={alt} />
        </a>
      ))}
    </div>
  );
}

export function SubscriptionSection() {
  return (
    <div>
      <EmailSection />
      <div className="flex justify-center pt-36">
        <InstagramHeader />
      </div>
      <div className="pt-14 pb-28">
        <InstagramGalery />
      </div>
    </div>
  );
}
