import { PageWaveHeader } from "@entities/promotions/components/PageWaveHeader";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";
import classNames from "classnames";

import { YMaps, Map, Placemark } from "react-yandex-maps";

import contactsIcon from "./contacts-text.svg";
import hook from "@widgets/subscription/hook.svg";
import styles from "./styles.module.scss";

function ContactsBlock({
  country,
  contacts,
  email,
  className,
  children,
}: {
  country: string;
  contacts: ([string, string] | string)[];
  email: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={classNames(className)}>
      <div className="text-2xl font-bold">{country}</div>
      <div className="flex pt-9 justify-between text-base font-bold pb-6">
        <span className="text-base font-bold w-8/12">Адрес</span>
        <span className="text-base font-bold w-4/12">Телефон</span>
      </div>
      <div className="flex flex-col font-light text-sm">
        {contacts.map((item, idx) =>
          Array.isArray(item) ? (
            <div className={classNames(idx && "pt-2", "flex justify-between")}>
              <span className="max-w-xs w-8/12">{item[0]}</span>
              <span className="w-4/12">{item[1]}</span>
            </div>
          ) : (
            <div
              className={classNames(
                idx && "pt-6",
                "pb-4 text-base font-medium"
              )}
            >
              {item}
            </div>
          )
        )}
      </div>
      {email && (
        <div className="flex flex-col pt-14 ">
          <span className="text-base font-medium">Email</span>
          <span className="text-base pt-6">{email}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export const ruContats = [
  ["ул. Мясницкая, д. 11, 1 этаж, м. Лубянка", "+7 (977) 456 2221"],
] as (string | [string, string])[];
export const kzContats = [
  "Алматы",
  ["ул. Панфилова, 100", "+7 (727) 727-27-27"],
  ["ул. Аль-Фараби, 1", "+7 (727) 727-27-27"],
  ["мкр. Самал-2, 111, ТРЦ Dostyk Plaza, 3-й этаж", "+7 (727) 727-27-27"],
  [
    "ул. Розыбакиева 247А, ТРЦ Mega Center, 3-й этаж, Галерея ресторанов",
    "+7 (727) 727-27-27",
  ],
  "Нур-Султан",
  ["мкр. Самал-2, 111, ТРЦ Dostyk Plaza, 3-й этаж", "+7 (727) 727-27-27"],
  [
    "ул. Розыбакиева 247А, ТРЦ Mega Center, 3-й этаж, Галерея ресторанов",
    "+7 (727) 727-27-27",
  ],
] as (string | [string, string])[];

export function ContactsPage() {
  return (
    <YMaps>
      <div>
        <div className="pt-12 pb-2 lg:pb-4 xl:pb-32 bg-light text-body">
          <PageWaveHeader src={contactsIcon} />
          <div className="flex pt-20 md:px-4 lg:px-8 xl:px-32 justify-around">
            <ContactsBlock
              className="flex-grow max-w-lg"
              email="marketing@oceanbasket.ru"
              country={"Москва"}
              contacts={ruContats}
            >
              <div className="flex justify-center items-center pt-20">
                <img src={hook} className="bottom-16 right-11" />
              </div>
            </ContactsBlock>
            <ContactsBlock
              className="flex-grow max-w-lg"
              email="marketing@oceanbasket.kz"
              country={"Казахстан"}
              contacts={kzContats}
            />
          </div>
        </div>
        <div
          className={classNames(
            styles.map,
            "w-full md:px-4 lg:px-8 xl:px-32 pb-36"
          )}
        >
          <Map
            className={"w-full h-full"}
            defaultState={{
              center: [55.75, 37.57],
              zoom: 9,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
          >
            <Placemark defaultGeometry={[55.75, 37.57]} />
          </Map>
        </div>
        <SubscriptionSection />
      </div>
    </YMaps>
  );
}
