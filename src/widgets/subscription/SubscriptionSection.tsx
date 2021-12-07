import styles from "./styles.module.scss";
import classNames from "classnames";

import dishBacground2 from "./config/dish-background-2.png";
import emailDish from "./config/email-dish.png";
import instagram from "./config/instagram.svg";

import Button from "@shared/button";
import Input from "@entities/payment/components/Forms/forms/input";
import { instagramImages } from "./config/images/index";

import { ReactComponent as WhiteWaves } from "@shared/icons/white-waves.svg";
import blueWaves from "@shared/icons/blue-waves.svg";
import hook from "./hook.svg";
import wave from "./wave.svg";
import { createEffect } from "effector";
import { postSubscribe } from "@shared/api/dishes";
import { useStore } from "effector-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { reduce } from "lodash";

const subscribeFx = createEffect(postSubscribe);

const EMAIL_MASK =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function EmailSection({ isWaves = false }) {
  const isLoading = useStore(subscribeFx.pending);

  const [error, setError] = useState<string>("");

  const [email, setEmail] = useState("");

  useEffect(() => {
    const onSuccess = subscribeFx.done.watch(() => {
      toast.success("Вы успешно подписались на рассылку");
      setEmail("");
    });

    const onFail = subscribeFx.fail.watch(() => {
      toast.error("Ошибка подписки");
    });

    return () => {
      onSuccess();
      onFail();
    };
  }, []);

  const onSubscribeHandler = () => {
    if (!EMAIL_MASK.test(email)) {
      setError("Некорректный email");
      return;
    }
    subscribeFx(email);
  };

  return (
    <div className="relative">
      {isWaves && <WhiteWaves className="absolute -mt-10 z-10" />}
      <div
        className={classNames(
          "flex max-h-80 overflow-hidden relative",
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
          <div className="flex flex-col text-3xl font-bold px-12 py-12 justify-between relative">
            <img src={hook} className="absolute -bottom-32" />

            <div className="pt-3 text-body">
              Подпишись на наши обновления и получи подарок на первый заказ
            </div>
            <div className={classNames(error && styles.emailError)}>
              <div className={classNames("flex text-lg")}>
                <Input
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setEmail(e.target.value);
                  }}
                  className={classNames(
                    "flex-grow text-base",
                    styles.emailInput
                  )}
                />
                <Button
                  className={classNames(
                    "text-accent hover:text-accent-hover",
                    styles.button
                  )}
                  onClick={onSubscribeHandler}
                  disabled={isLoading}
                >
                  Подписаться
                </Button>
              </div>
              {error && (
                <p className="pt-2 text-sm text-start justify-self-end text-red-500">
                  {error}
                </p>
              )}
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
      <a
        target="_blank"
        className="text-accent font-bold text-2xl pt-8 hover:underline"
        href="https://www.instagram.com/ocean_basket/"
      >
        @oceanbasket
      </a>
      <img src={wave} className="pt-4" />
    </div>
  );
}

const links = [
  "https://www.instagram.com/p/CV2c5DUM0ZK/embed/",
  "https://www.instagram.com/p/CVmrtbwstS0/embed/",
  "https://www.instagram.com/p/CVe9Q2FsP9E/embed/",
  "https://www.instagram.com/p/CU7PIw0s1ZI/embed/",
  "https://www.instagram.com/p/CSg1LwXCWHk/embed/",
  "https://www.instagram.com/p/CSd9Xz3CUgh/embed/",
];

function InstagramItem({ url }: { url: string }) {
  return (
    <div className={classNames(styles.instagramBlock, "relative")}>
      <div
        className={classNames(
          styles.instagramCover,
          "absolute w-full bg-white"
        )}
      />
      <iframe
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
      />
    </div>
  );
}

function InstagramGalery() {
  return (
    <div className="flex justify-center md:px-4 lg:px-8 xl:px-32">
      <div className="grid grid-cols-3 gap-5">
        {/* {links.map((href, idx) => (
          <InstagramItem url={href} key={idx} />
        ))} */}
        {instagramImages.map(({ img, alt, href }, idx) => (
          <a href={href} key={idx}>
            <img width="376px" height="376px" src={img} alt={alt} />
          </a>
        ))}
      </div>
    </div>
  );
}

export function SubscriptionSection({ isWaves: isWaves = false }) {
  return (
    <div>
      <EmailSection isWaves={isWaves} />
      <div className="flex justify-center pt-36 relative">
        <img src={blueWaves} className="absolute right-0 top-28" />
        <InstagramHeader />
      </div>
      <div className="pt-9 pb-28">
        <InstagramGalery />
      </div>
    </div>
  );
}
