import classNames from "classnames";
import { ReactNode } from "react";
import cost from "./config/cost.svg";
import delivery from "./config/delivery.svg";
import method from "./config/method.svg";
import howGet from "./config/how-get.svg";
import minSum from "./config/min-sum.svg";
import territory from "./config/territory.svg";
import { PageWaveHeader } from "@entities/promotions/components/PageWaveHeader";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";
import fishesFull from "./fishes-full.svg";
import { hostUrl } from "@shared/api/base";

function Card({
  src,
  label,
  description,
  className,
}: {
  src: string;
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
      <div>
        <img src={src} />
      </div>
      {label && <div className="pt-3 text-2xl text-body">{label}</div>}
      {description && <div className="pt-3 text-body">{description}</div>}
    </div>
  );
}

export function DetailsPage() {
  return (
    <>
      <div className="relative">
        <PageWaveHeader className="absolute xl:top-12 left-0" />
        <img src={fishesFull} className="absolute right-0 top-20" />
        <div className="pt-16 pb-24 md:px-4 lg:px-8 xl:px-32 flex flex-col">
          <div className="flex flex-wrap relative">
            <Card
              src={delivery}
              description="Прием заказов осуществляется во время работы ресторанов."
              className="w-80 mr-14 mb-7"
            />
            <Card
              src={territory}
              description="Мы доставляем по всей Москве."
              className="w-96 mb-7"
            />
          </div>
          <div className="flex flex-wrap">
            <Card
              src={minSum}
              label="2000 РУБ*"
              description="*С учетом всех специальных предложений."
              className="max-w-lg mr-14 mb-7"
            />
            <Card
              className="max-w-2xl mb-7"
              src={cost}
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
          <div className="flex flex-wrap">
            <Card
              src={method}
              description="Сейчас мы работаем по системе предоплаты на сайте."
              className="w-80 mr-14 mb-7"
            />
            <Card
              src={howGet}
              description="Доставка осуществляется курьерскими службами."
              className="w-96 mb-7"
            />
          </div>
        </div>
      </div>
      <SubscriptionSection />
    </>
  );
}
