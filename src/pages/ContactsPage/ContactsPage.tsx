import { PageWaveHeader } from "@entities/promotions/components/PageWaveHeader";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";
import classNames from "classnames";

import { YMaps, Map, Placemark } from "react-yandex-maps";

import hook from "@widgets/subscription/hook.svg";
import styles from "./styles.module.scss";
import { addresses, Country } from "./config";
import { useMemo } from "react";
import {
  KAZAHSTAN_COORDS,
  MOSCOW_COORDS,
} from "@shared/components/AddressSuggestionsMap";
import { useStore } from "effector-react";
import { $rus } from "@features/choose-dishes/models";
import { $hostUrl } from "@shared/api/switchable";

function ContactsBlock({
  item,
  className,
  children,
}: {
  item: Country;
  className?: string;
  children?: React.ReactNode;
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
        <div className="text-2xl font-bold">{item.country_label}</div>
      )}
      <div className="flex pt-9 justify-between text-base font-bold pb-6">
        <span className="text-base font-bold w-8/12">Адрес</span>
        <span className="text-base font-bold w-4/12">Телефон</span>
      </div>
      <div className="flex flex-col font-light text-sm">
        {item.regions.map(({ region_label: name, addresses }, idx) => {
          return (
            <>
              {name && (
                <div
                  className={classNames(
                    idx && "pt-6",
                    "pb-4 text-base font-medium"
                  )}
                >
                  {name}
                </div>
              )}
              {addresses.map(({ address, number }, idx) => (
                <div
                  className={classNames(
                    idx && "pt-2",
                    "flex justify-between gap-x-5"
                  )}
                >
                  <span className="max-w-xs w-1/2 lg:w-8/12">{address}</span>
                  <a href={"tel:" + number} className="w-1/2 lg:w-4/12">
                    {number}
                  </a>
                </div>
              ))}
            </>
          );
        })}
      </div>
      {targetEmail && (
        <div className="flex flex-col pt-14 ">
          <span className="text-base font-medium">Email</span>
          <span className="text-base pt-6">
            <a href={"mailto:" + targetEmail}>{targetEmail}</a>
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

export function ContactsPage() {
  const isRus = useStore($rus);

  const gps = useMemo(
    () =>
      addresses
        .filter(({ country_label }) =>
          isRus ? country_label === "Москва" : country_label === "Казахстан"
        )
        .flatMap(({ regions }) => regions)
        .flatMap(({ addresses }) => addresses.map(({ gps }) => gps)),
    [isRus]
  );

  const defaultCoords = isRus ? MOSCOW_COORDS : KAZAHSTAN_COORDS;

  return (
    <YMaps>
      <div>
        <div className="pt-12 pb-8 lg:pb-16 xl:pb-32 bg-light text-body">
          <PageWaveHeader text="Контакты" />
          <div className="flex flex-col items-stretch lg:items-start lg:flex-row pt-20 px-4 lg:px-8 xl:px-32 justify-around max-w-7xl box-content mx-auto gap-x-8">
            <ContactsBlock
              className="flex-grow lg:max-w-lg"
              item={addresses[0]}
            >
              <div className="flex justify-center items-center pt-7 pb-7 lg:pt-20 lg:pb-0">
                <img alt="dish" src={hook} className="bottom-16 right-11" />
              </div>
            </ContactsBlock>
            <ContactsBlock
              className="flex-grow lg:max-w-lg"
              item={addresses[1]}
            />
          </div>
        </div>
        <div
          className={classNames(
            styles.map,
            "w-full px-4 lg:px-8 xl:px-32 pb-4 lg:pb-8 xl:pb-36"
          )}
        >
          <Map
            className={"w-full h-full"}
            defaultState={{
              // center: [50.7617, 60.632682],
              // zoom: 4,
              center: defaultCoords,
              zoom: 12,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
          >
            {gps.map((gps, idx) => (
              <Placemark key={idx} defaultGeometry={gps} />
            ))}
          </Map>
        </div>
        <SubscriptionSection />
      </div>
    </YMaps>
  );
}
