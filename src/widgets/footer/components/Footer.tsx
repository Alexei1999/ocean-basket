import cn from "classnames";
import styles from "./styles.module.scss";

import logoMini from "@assets/logo-mini.svg";
import logoFooter from "@assets/logo-footer.svg";
import classNames from "classnames";
import { addresses, Country } from "@pages/ContactsPage/config";
import React, { useEffect } from "react";

import footer from "@assets/footer.png";

function FooterContactsBlock({
  item,
  className,
}: {
  item: Country;
  className?: string;
}) {
  if (!item) return null;

  return (
    <div className={classNames(className)}>
      {item.country_label && (
        <div className="text-base font-medium">{item.country_label}</div>
      )}
      <div className="flex flex-col font-light text-sm">
        {item.regions.map(({ region_label: name, addresses }, idx) => {
          return (
            <React.Fragment key={idx}>
              {name && (
                <div className={classNames("pt-4 text-sm font-medium")}>
                  {name}
                </div>
              )}
              {addresses.map(({ address, number }, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    "pt-4",
                    "flex flex-col sm:flex-row justify-between"
                  )}
                >
                  <span className="max-w-xs sm:w-8/12">{address}</span>
                  <span className="pt-1 sm:pt-0 sm:w-4/12">{number}</span>
                </div>
              ))}
            </React.Fragment>
          );
        })}

        {item.email && (
          <div className="flex pb-4 sm:pb-0 sm:justify-end pt-7 sm:pt-4">
            <span className="sm:w-4/12 text-base whitespace-pre">
              {item.email}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

//TODO: Split to the components
export function Footer() {
  const footerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      if (!footerRef.current) return;
      footerRef.current.style.backgroundImage = `url(${img.src})`;
    };

    img.src = footer;

    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={cn(styles.container, "bg-local bg-gray-600")}
    >
      <div className="flex h-full items-center pt-14 px-4 lg:px-8 xl:px-32 flex-col text-white text-sm pb-12 lg:pb-0">
        <div className="flex flex-col items-center">
          <img width="65px" height="65px" src={logoMini} />
          <img className="pt-4 w-48" src={logoFooter} />
        </div>
        <div className="flex-col gap-x-36 items-center xl:items-start  max-w-4xl xl:max-w-none xl:flex-row flex xl:justify-between flex-grow w-full pt-16 pb-10">
          <div className="pt-10 xl:pt-0 order-1 xl:order-0 gap-x-36 flex flex-col w-full">
            <span className="text-base font-bold uppercase">
              Наши рестораны
            </span>

            <FooterContactsBlock
              className="flex-grow pt-12"
              item={addresses[0]}
            />
            <FooterContactsBlock className="flex-grow" item={addresses[1]} />
          </div>

          <div className="order-0 xl:order-1 grid grid-cols-3 w-full max-w-4xl flex-grow">
            <div className="flex flex-col font-medium sm:col-span-2 col-span-3">
              <span className="text-base font-bold uppercase">Блюда</span>

              <div className="mt-10 flex">
                <div className="flex flex-col">
                  {[
                    "Популярные",
                    "Стартеры",
                    "Супы",
                    "Салаты",
                    "Рыба",
                    "Креветки",
                    "Топ UPS",
                  ].map((item, index) => (
                    <span className="mb-4 cursor-pointer" key={index}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col ml-11 cursor-pointer">
                  {["Платтеры и комбо", "Суши", "Десерты", "Напитки"].map(
                    (item, index) => (
                      <span className="mb-4" key={index}>
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col pt-8 sm:pt-0 sm:col-span-1 col-span-3">
              <span className="text-base font-bold uppercase">Страницы</span>

              <div className="mt-10 flex">
                <div className="flex flex-col">
                  {[
                    "Меню",
                    "О ресторане",
                    "Акции",
                    "Сертификаты",
                    "Оплата и доставка",
                    "Контакты",
                  ].map((item, index) => (
                    <span className="mb-4 cursor-pointer" key={index}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden xl:flex pt-16 flex-col text-sm font-normal col-span-3">
              <a href="#">Политика конфиденциальности</a>
              <a href="#" className="pt-3">
                Доставка и оплата
              </a>
            </div>
          </div>
          <div className="flex xl:hidden order-2 mr-auto pt-4 flex-col text-sm font-normal col-span-2">
            <a href="#">Политика конфиденциальности</a>
            <a href="#" className="pt-3">
              Доставка и оплата
            </a>
          </div>
        </div>
        <hr className="border bg-light w-full" />
        <div className="py-7 font-light text-xs">
          © Copyright 2021 All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
