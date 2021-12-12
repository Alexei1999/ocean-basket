import { PageWaveHeader } from "@entities/promotions/components/PageWaveHeader";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";
import classNames from "classnames";

import { YMaps, Map, Placemark } from "react-yandex-maps";

import contactsIcon from "./contacts-text.svg";
import hook from "@widgets/subscription/hook.svg";
import styles from "./styles.module.scss";
import { addresses, Country } from "./config";
import { useMemo } from "react";

function ContactsBlock({
  item,
  className,
  children,
}: {
  item: Country;
  className?: string;
  children?: React.ReactNode;
}) {
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
                  className={classNames(idx && "pt-2", "flex justify-between")}
                >
                  <span className="max-w-xs w-8/12">{address}</span>
                  <span className="w-4/12">{number}</span>
                </div>
              ))}
            </>
          );
        })}
      </div>
      {item.email && (
        <div className="flex flex-col pt-14 ">
          <span className="text-base font-medium">Email</span>
          <span className="text-base pt-6">{item.email}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export function ContactsPage() {
  const gps = useMemo(
    () =>
      addresses
        .flatMap(({ regions }) => regions)
        .flatMap(({ addresses }) => addresses.map(({ gps }) => gps)),
    []
  );

  return (
    <YMaps>
      <div>
        <div className="pt-12 pb-2 lg:pb-4 xl:pb-32 bg-light text-body">
          <PageWaveHeader src={contactsIcon} />
          <div className="flex flex-col items-center lg:items-start lg:flex-row pt-20 md:px-4 lg:px-8 xl:px-32 justify-around max-w-7xl box-content mx-auto">
            <ContactsBlock className="flex-grow max-w-lg" item={addresses[0]}>
              <div className="flex justify-center items-center pt-20">
                <img src={hook} className="bottom-16 right-11" />
              </div>
            </ContactsBlock>
            <ContactsBlock className="flex-grow max-w-lg" item={addresses[1]} />
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
              center: [50.7617, 60.632682],
              zoom: 4,
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
