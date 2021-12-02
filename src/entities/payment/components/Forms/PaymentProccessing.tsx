import { onScrollPage } from "@app/";
import { RoutesConfig } from "@shared/lib/routes-config";
import { useState } from "react";
import { OrderDescription } from "../OrderDescription/OrderDescription";
import { AddressGrid } from "./address-grid";
import { CheckAvailabilityAction } from "./check-availability-action";
import { RightSideView } from "./RightSideView";
import ScheduleGrid from "./schedule-grid";

export enum AddressType {
  Billing = "billing",
  Shipping = "shipping",
}

const schedules = [
  {
    id: 0,
    title: "Экспресс доставка",
    description: "60 мин, ближайшая",
  },
  {
    id: 1,
    title: "8:00 - 11:00",
    description: "8:00 - 11:00",
  },
  {
    id: 2,
    title: "12:00 - 13:00",
    description: "12:00 - 13:00",
  },
  {
    id: 3,
    title: "13:00 - 15:00",
    description: "13:00 - 15:00",
  },
  {
    id: 4,
    title: "15:00 - 17:00",
    description: "15:00 - 17:00",
  },
  {
    id: 5,
    title: "17:00 - 20:00",
    description: "17:00 - 20:00",
  },
];

const numbers = [
  {
    id: 0,
    title: "Основной",
    address: {
      street_address: "+7 911 999-99-99",
    },
  },
  // {
  //   id: 1,
  //   title: "Дополнительный",
  //   address: {
  //     street_address: "+7 911 999-99-99",
  //   },
  // },
];

const addresses = [
  {
    title: "Дом",
    address: {
      street_address: "Москва, Ленина, д.1",
      state: "Москва",
      city: "Москва",
      zip: "1234",
      country: "Россия",
    },
  },
  // {
  //   title: "Работа",
  //   address: {
  //     street_address: "Москва, Ленина, д.1",
  //     state: "Москва",
  //     city: "Москва",
  //     zip: "1234",
  //     country: "Россия",
  //   },
  // },
];

export function CheckoutPage() {
  const [isOrdered, setIsOrdered] = useState(false);

  return !isOrdered ? (
    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
      <div className="flex flex-col lg:flex-row items-center lg:items-start m-auto w-full max-w-5xl">
        <div className="lg:max-w-2xl w-full space-y-6">
          <AddressGrid
            userId={"123"}
            addLabel="Добавить адрес"
            className="shadow-700 bg-light p-5 md:p-8"
            label="Адрес доставки"
            count={1}
            addresses={addresses}
          />
          <ScheduleGrid
            className="shadow-700 bg-light p-5 md:p-8"
            label={"Время доставки"}
            schedules={schedules}
            count={2}
          />
          <AddressGrid
            userId={"123"}
            addLabel="Добавить телефон"
            className="shadow-700 bg-light p-5 md:p-8"
            label="Контактный телефон"
            count={3}
            addresses={numbers}
          />
          <CheckAvailabilityAction
            onSubmit={() => {
              // window
              //   .open(
              //     "",
              //     "_blank"
              //   )
              //   ?.focus();
              setIsOrdered(true);
              onScrollPage();
            }}
          >
            Оформить заказ
          </CheckAvailabilityAction>
        </div>
        <div className="w-full lg:w-96 mb-10 sm:mb-12 lg:mb-0 mt-10 lg:ml-16">
          <RightSideView />
        </div>
      </div>
    </div>
  ) : (
    <OrderDescription />
  );
}
