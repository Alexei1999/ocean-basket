import cn from "classnames";
import styles from "./styles.module.scss";

import logoMini from "@assets/logo-mini.svg";
import logoFooter from "@assets/logo-footer.svg";
import classNames from "classnames";
import { addresses, Country } from "@pages/ContactsPage/config";

function FooterContactsBlock({
  item,
  className,
}: {
  item: Country;
  className?: string;
}) {
  return (
    <div className={classNames(className)}>
      {item.country_label && (
        <div className="text-base font-medium">{item.country_label}</div>
      )}
      <div className="flex flex-col font-light text-sm">
        {item.regions.map(({ region_label: name, addresses }, idx) => {
          return (
            <>
              {name && (
                <div className={classNames("pt-4 text-sm font-medium")}>
                  {name}
                </div>
              )}
              {addresses.map(({ address, number }, idx) => (
                <div className={classNames("pt-4", "flex justify-between")}>
                  <span className="max-w-xs w-8/12">{address}</span>
                  <span className="w-4/12">{number}</span>
                </div>
              ))}
            </>
          );
        })}

        {item.email && (
          <div className="flex justify-end pt-4">
            <span className="w-4/12 text-base">{item.email}</span>
          </div>
        )}
      </div>
    </div>
  );
}

//TODO: Split to the components
export function Footer() {
  return (
    <footer className={cn(styles.container, "bg-local bg-gray-600")}>
      <div className="flex h-full items-center pt-14 md:px-4 lg:px-8 xl:px-32 flex-col text-white text-sm">
        <div className="flex flex-col items-center">
          <img width="65px" height="65px" src={logoMini} />
          <img className="pt-4 w-48" src={logoFooter} />
        </div>
        <div className="flex justify-between flex-grow w-full pt-16 pb-10">
          <div className="flex flex-col w-1/2">
            <span className="text-base font-bold uppercase">
              Наши рестораны
            </span>

            <FooterContactsBlock
              className="flex-grow pt-12"
              item={addresses[0]}
            />
            <FooterContactsBlock className="flex-grow" item={addresses[1]} />
          </div>

          <div className="flex flex-col font-medium">
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

            <div className="pt-16 flex flex-col text-sm font-normal">
              <a href="#">Политика конфиденциальности</a>
              <a href="#" className="pt-3">
                Доставка и оплата
              </a>
            </div>
          </div>
          <div className="flex flex-col">
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
        </div>
        <hr className="border bg-light w-full" />
        <div className="py-7 font-light text-xs">
          © Copyright 2021 All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
