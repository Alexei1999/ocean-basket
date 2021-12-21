import classNames from "classnames";
import { ReactNode } from "react";
import { PageWaveHeader } from "@entities/promotions/components/PageWaveHeader";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";
import fishesFull from "./fishes-full.svg";

function Card({
  text,
  label,
  description,
  className,
}: {
  text: string;
  label?: string;
  description: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        className,
        "text-heading border-current border inline-block rounded-3xl px-9 py-6"
      )}
    >
      <span className="text-body font-friends text-4xl md:text-5xl font-normal">
        {text}
      </span>
      {label && <div className="pt-3 text-2xl text-body">{label}</div>}
      {description && <div className="pt-3 text-body">{description}</div>}
    </div>
  );
}

export function DetailsPage() {
  return (
    <>
      <div className="relative">
        <PageWaveHeader
          isHidden={false}
          className="absolute xl:top-12 left-0"
        />
        <img
          src={fishesFull}
          className="absolute hidden lg:block right-0 top-20"
        />
        <div className="pt-16 pb-16 gap-y-7 px-4 md:px-8 xl:px-32 flex flex-col">
          <div className="gap-x-14 3xl:gap-x-20 gap-y-7 flex flex-wrap flex-col md:flex-row relative md:max-w-[70%] justify-start">
            <Card
              text="Прием заказов"
              description="Прием заказов осуществляется во время работы ресторанов."
              className="flex-grow md:basis-80 md:max-w-xl"
            />
            <Card
              text="Территория доставки"
              description="Мы доставляем по всей Москве."
              className=""
            />
          </div>
          <div className="flex flex-wrap md:items-start flex-col md:flex-row gap-y-7 gap-x-14 3xl:gap-x-20">
            <Card
              text="Минимальная сумма заказа"
              label="2000 РУБ*"
              description="*С учетом всех специальных предложений."
              className="md:max-w-[34rem]"
            />
            <Card
              className="md:max-w-2xl"
              text="Стоимость доставки"
              description={
                <ul>
                  <li>
                    Доставка по городу в пределах МКАД при заказе от 5000 р. —
                    бесплатная.
                  </li>
                  <li> В пределах Третьего транспортного кольца — 250 р. </li>
                  <li> В пределах МКАД — 500 р.</li>
                </ul>
              }
            />
          </div>
          <div className="flex flex-wrap md:items-start flex-col md:flex-row gap-y-7 md:max-w-[70%] gap-x-14 3xl:gap-x-20">
            <Card
              text="Способ оплаты"
              description="Сейчас мы работаем по системе предоплаты на сайте."
              className="flex-grow md:basis-80  max-w-lg"
            />
            <Card
              text="Как получить заказ"
              description="Доставка осуществляется курьерскими службами."
              className="basis-[25rem] md:max-w-lg"
            />
          </div>
        </div>
      </div>
      <SubscriptionSection />
    </>
  );
}
