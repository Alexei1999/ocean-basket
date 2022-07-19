import classNames from "classnames";
import { ReactNode } from "react";
import { PageWaveHeader } from "@entities/promotions/components/PageWaveHeader";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";
import fishesFull from "./fishes-full.svg";
import { useStore } from "effector-react";
import {
  FREE_DELIVERY_KZ_SUM,
  FREE_DELIVERY_RUS_SUM,
  LOCATION_FALSE_RUS_SUM,
  LOCATION_KZ_SUM,
  LOCATION_TRUE_RUS_SUM,
} from "@entities/payment/components/Forms/PaymentProccessing";
import { $rus } from "@features/choose-dishes/models";
import { Card } from "./Card";
import {
  deliveryAreaConfig,
  deliveryCostConfig,
  freeDeliveryConfig,
  gettingOrderConfig,
  legalAddressConfig,
  minOrderPriceConfig,
  returnConditionsConfig,
  takingOrdersConfig,
} from "./configs";
import { propsGetter } from "./lib";
import { $hostUrl } from "@shared/api/switchable";

export function DetailsPage() {
  const isRus = useStore($rus);
  const prefix = useStore($hostUrl);

  return (
    <>
      <div className="relative">
        <PageWaveHeader
          isHidden={false}
          className="absolute xl:top-12 left-0"
        />
        <img
          alt="fishes"
          src={fishesFull}
          className="absolute hidden lg:block right-0 top-20"
        />
        <div className="pt-16 pb-16 gap-y-7 px-4 md:px-8 xl:px-32 flex flex-col">
          <div className="gap-x-14 3xl:gap-x-20 gap-y-7 flex flex-wrap flex-col md:flex-row relative md:max-w-[70%] justify-start">
            <Card
              text="Прием заказов"
              description={propsGetter(takingOrdersConfig, isRus, prefix)}
              className="flex-grow md:basis-80 md:max-w-xl"
            />
            <Card
              text="Территория доставки"
              className="flex-grow md:basis-80 md:max-w-2xl"
              description={propsGetter(deliveryAreaConfig, isRus, prefix)}
            />
          </div>
          <div className="flex flex-wrap md:items-start flex-col md:flex-row gap-y-7 gap-x-14 3xl:gap-x-20">
            <Card
              text="Минимальная сумма заказа"
              label={propsGetter(minOrderPriceConfig, isRus, prefix)}
              description="*С учетом всех специальных предложений."
              className="md:max-w-[34rem]"
            />
            <Card
              className="md:max-w-2xl"
              text="Стоимость доставки"
              description={propsGetter(deliveryCostConfig, isRus, prefix)}
            />
          </div>
          <div className="flex flex-wrap md:items-start flex-col md:flex-row gap-y-7 md:max-w-[70%] gap-x-14 3xl:gap-x-20">
            <Card
              text="Бесплатная доставка"
              description={propsGetter(freeDeliveryConfig, isRus, prefix)}
              className="md:max-w-[34rem]"
            />
            <Card
              text="Способ оплаты"
              description="Сейчас мы работаем по системе предоплаты на сайте."
              className="flex-grow md:basis-80 md:max-w-lg"
            />
            <Card
              text="Как получить заказ"
              description={propsGetter(gettingOrderConfig, isRus, prefix)}
              className="basis-[25rem] md:max-w-lg"
            />
          </div>
          <div className="flex flex-wrap lg:items-start flex-col lg:flex-row gap-y-7 gap-x-14 3xl:gap-x-20">
            <Card
              text="Условия возврата"
              description={propsGetter(returnConditionsConfig, isRus, prefix)}
              className="flex-grow lg:basis-80 max-w-xl"
            />
            <Card
              text="Юридический адрес"
              description={propsGetter(legalAddressConfig, isRus, prefix)}
              className="flex-grow lg:basis-80 max-w-xl"
            />
          </div>
        </div>
      </div>
      <SubscriptionSection />
    </>
  );
}
