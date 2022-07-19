import cn from "classnames";
import styles from "./styles.module.scss";

import logoMini from "@assets/logo-mini.svg";
import logoFooter from "@assets/logo-footer.svg";
import classNames from "classnames";
import { addresses, Country } from "@pages/ContactsPage/config";
import React, { useEffect, useMemo } from "react";

import footer from "@assets/footer.png";
import { $categories, $rus } from "@features/choose-dishes/models";
import { useStore } from "effector-react";
import { RoutesConfig } from "@shared/lib/routes-config";
import { useNavigate } from "react-router-dom";
import { onCategorySelect } from "@entities/сategories/components/TreeMenu/TreeMenuItem";
import { fetchCategoriesFx } from "@entities/сategories/components/Categories/Categories";
import { extendedLinks, headerLinks } from "@widgets/header/config/links";
import { restore } from "effector";
import { onScrollPage } from "@shared/components/ScrollContainer";
import { $hostUrl } from "@shared/api/switchable";

const links = [...extendedLinks, ...headerLinks];

const mixIndexes = (length: number) => {
  const indexes = Array(length).fill(0);
  const median =
    indexes.length % 2 === 0
      ? indexes.length / 2 - 1
      : Math.floor(indexes.length / 2);

  let incAcc = median;
  let decAcc = 0;

  for (let i = 0; i < indexes.length; i++) {
    if (i % 2 === 0) {
      indexes[i] = i - decAcc;
      decAcc++;
    } else {
      indexes[i] = i + incAcc;
      incAcc--;
    }
  }

  return indexes;
};

function FooterContactsBlock({
  item,
  className,
}: {
  item: Country;
  className?: string;
}) {
  const prefix = useStore($hostUrl);

  const targetRestaurant = useMemo(
    () =>
      item.regions
        .flatMap((item) => item.addresses)
        .find((address) => address.prefix === prefix),
    [item, prefix]
  );

  const targetEmail = targetRestaurant?.email || item.defaultEmail;

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
                  <a href={"tel:" + number} className="pt-1 sm:pt-0 sm:w-4/12">
                    {number}
                  </a>
                </div>
              ))}
            </React.Fragment>
          );
        })}

        {targetEmail && (
          <div className="flex pb-4 sm:pb-0 sm:justify-end pt-7 sm:pt-4">
            <a
              href={"mailto:" + targetEmail}
              className="sm:w-4/12 text-base whitespace-pre"
            >
              {targetEmail}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const $done = restore(fetchCategoriesFx.done, null);

//TODO: Split to the components
export function Footer() {
  const isRus = useStore($rus);

  const navigate = useNavigate();

  const categories = useStore($categories);
  const isLoaded = useStore($done);

  const footerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCategoriesFx();
  }, []);

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

  const privacyPolicyBlock = (
    <>
      <a
        target="_blank"
        href={isRus ? "/privacy-polytic-rus.pdf" : "/privacy-polytic-kz.docx"}
      >
        Политика конфиденциальности
      </a>
      <div
        onClick={() => {
          navigate(RoutesConfig.Details);
          onScrollPage();
        }}
        className="pt-3 cursor-pointer"
      >
        Доставка и оплата
      </div>
    </>
  );

  return (
    <footer
      ref={footerRef}
      className={cn(styles.container, "bg-local bg-gray-600")}
    >
      <div className="flex h-full items-center pt-14 px-4 lg:px-8 xl:px-32 flex-col text-white text-sm pb-12 lg:pb-0">
        <div className="flex flex-col items-center">
          <img alt="logo mini" width="65px" height="65px" src={logoMini} />
          <img alt="logo footer" className="pt-4 w-48" src={logoFooter} />
        </div>
        <div className="flex-col gap-x-36 items-center xl:items-start  max-w-4xl xl:max-w-none xl:flex-row flex xl:justify-between flex-grow w-full pt-16 pb-10">
          <div className="pt-10 xl:pt-0 order-1 xl:order-0 gap-x-36 flex flex-col w-full max-w-[1000px]">
            <span className="text-base font-bold uppercase">
              Наши рестораны
            </span>
            {isRus && (
              <FooterContactsBlock
                className="flex-grow pt-12"
                item={addresses[0]}
              />
            )}
            {!isRus && (
              <FooterContactsBlock
                className="flex-grow pt-12"
                item={addresses[1]}
              />
            )}
          </div>

          <div className="order-0 xl:order-1 grid grid-cols-3 w-full max-w-4xl flex-grow">
            {!!isLoaded && (
              <div className="flex flex-col font-medium sm:col-span-2 col-span-3">
                <span className="text-base font-bold uppercase">Блюда</span>

                <div className="mt-10 flex">
                  <div className="grid grid-cols-2 w-full">
                    {categories.length > 0 &&
                      mixIndexes(categories.length).map((index) => {
                        const item = categories[index];
                        return (
                          <span
                            className="mb-4 cursor-pointer col-span-1"
                            key={index}
                            onClick={() => {
                              onCategorySelect(item.category);
                              navigate(RoutesConfig.Menu);
                              onScrollPage();
                            }}
                          >
                            {item.category}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col pt-8 sm:pt-0 sm:col-span-1 col-span-3">
              <span className="text-base font-bold uppercase">Страницы</span>

              <div className="mt-10 flex">
                <div className="flex flex-col">
                  {links.map((item, index) => (
                    <span
                      onClick={() => {
                        navigate(item.href);
                        onScrollPage();
                      }}
                      className="mb-4 cursor-pointer"
                      key={index}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden xl:flex pt-16 flex-col text-sm font-normal col-span-3">
              {privacyPolicyBlock}
            </div>
          </div>
          <div className="flex xl:hidden order-2 mr-auto pt-4 flex-col text-sm font-normal col-span-2">
            {privacyPolicyBlock}
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
