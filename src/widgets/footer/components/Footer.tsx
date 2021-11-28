import cn from "classnames";
import styles from "./styles.module.scss";

import logoMini from "@assets/logo-mini.svg";
import logoFooter from "@assets/logo-footer.svg";

//TODO: Split to the components
export function Footer() {
  return (
    <footer className={cn(styles.container, "bg-local bg-black")}>
      <div className="flex h-full items-center md:px-4 lg:px-8 xl:px-32 flex-col text-white text-sm">
        <div className="flex justify-between lg:pr-16 xl:pr-36 flex-grow w-full pt-16">
          <div className="flex flex-col">
            <div className="flex flex-col items-center">
              <img width="65px" height="65px" src={logoMini} />
              <img className="pt-4" src={logoFooter} />
            </div>

            <div className="flex flex-col mt-16">
              <span className="text-base font-bold mb-4">Контакты</span>
              <span className="mb-1">+7 999 999-99-99</span>
              <span>mail@gmail.com</span>
            </div>

            <div className="flex flex-col mt-16">
              <span>Юр информация</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold uppercase">
              Наши рестораны
            </span>

            <div className="flex flex-col font-light mt-10">
              <span className="text-base font-bold">Москва</span>
              {["Адрес #1", "Адрес #2"].map((item, index) => (
                <a
                  key={`link-${index}`}
                  href="#"
                  className="mt-4 hover:underline"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex flex-col mt-10 font-light">
              <span className="text-base font-bold">Казахстан</span>
              {["Адрес #1", "Адрес #2", "Адрес #3"].map((item, index) => (
                <a
                  key={`link-${index}`}
                  href="#"
                  className="mt-4 hover:underline"
                >
                  {item}
                </a>
              ))}
            </div>
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
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold uppercase">Страницы</span>

            <div className="mt-10 flex">
              <div className="flex flex-col">
                {["Меню", "О ресторане", "Оплата и доставка", "Контакты"].map(
                  (item, index) => (
                    <span className="mb-4 cursor-pointer" key={index}>
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="border bg-white w-full" />
        <div className="py-7 font-light text-xs">
          © Copyright 2021 All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
