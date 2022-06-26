import classNames from "classnames";
import { ReactNode } from "react";
import { PageWaveHeader } from "@entities/promotions/components/PageWaveHeader";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";
import fishesFull from "./fishes-full.svg";
import { useStore } from "effector-react";
import { $rus } from "@features/choose-dishes/models";
import {
  FREE_DELIVERY_KZ_SUM,
  FREE_DELIVERY_RUS_SUM,
  LOCATION_FALSE_RUS_SUM,
  LOCATION_KZ_SUM,
  LOCATION_TRUE_RUS_SUM,
} from "@entities/payment/components/Forms/PaymentProccessing";

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
  const isRus = useStore($rus);

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
              description={
                isRus
                  ? "Прием заказов осуществляется во время работы ресторанов."
                  : "Прием заказов осуществляется с 10:00 до 22:00"
              }
              className="flex-grow md:basis-80 md:max-w-xl"
            />
            <Card
              text="Территория доставки"
              className="flex-grow md:basis-80 md:max-w-2xl"
              description={
                isRus ? (
                  "Мы доставляем по всей Москве."
                ) : (
                  <ul>
                    <li>Доставка производится в квадрате улиц:</li>
                    <li>
                      пр. Райымбека - ул. Калдаякова - ул. Сатпаева - ул.
                      Ауэзова
                    </li>
                  </ul>
                )
              }
            />
          </div>
          <div className="flex flex-wrap md:items-start flex-col md:flex-row gap-y-7 gap-x-14 3xl:gap-x-20">
            <Card
              text="Минимальная сумма заказа"
              label={isRus ? "2000 РУБ*" : "2000 тенге*"}
              description="*С учетом всех специальных предложений."
              className="md:max-w-[34rem]"
            />
            <Card
              className="md:max-w-2xl"
              text="Стоимость доставки"
              description={
                isRus ? (
                  <ul>
                    <li>
                      Доставка по городу в пределах МКАД при заказе от{" "}
                      {FREE_DELIVERY_RUS_SUM} р. — бесплатная.
                    </li>
                    <li>
                      {" "}
                      В пределах Третьего транспортного кольца —{" "}
                      {LOCATION_TRUE_RUS_SUM} р.{" "}
                    </li>
                    <li> В пределах МКАД — {LOCATION_FALSE_RUS_SUM} р.</li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      Доставка по городу в пределах зоны при заказе от{" "}
                      {FREE_DELIVERY_KZ_SUM} тенге — бесплатная.
                    </li>
                    <li>В пределах зоны доставки — {LOCATION_KZ_SUM} тенге.</li>
                  </ul>
                )
              }
            />
          </div>
          <div className="flex flex-wrap md:items-start flex-col md:flex-row gap-y-7 md:max-w-[70%] gap-x-14 3xl:gap-x-20">
            <Card
              text="Бесплатная доставка"
              description={
                !isRus
                  ? `При заказе выше ${FREE_DELIVERY_KZ_SUM} тенге.`
                  : `При заказе выше ${FREE_DELIVERY_RUS_SUM} руб.`
              }
              className="md:max-w-[34rem]"
            />
            <Card
              text="Способ оплаты"
              description="Сейчас мы работаем по системе предоплаты на сайте."
              className="flex-grow md:basis-80 md:max-w-lg"
            />
            <Card
              text="Как получить заказ"
              description="Доставка осуществляется курьерскими службами."
              className="basis-[25rem] md:max-w-lg"
            />
          </div>
          <div className="flex flex-wrap lg:items-start flex-col lg:flex-row gap-y-7 gap-x-14 3xl:gap-x-20">
            <Card
              text="Условия возврата"
              description={
                isRus
                  ? "Eсли вас не устроила доставка, качество блюд, вы можете напрямую позвонить в ресторан по номеру +7 (977) 456 2221 (цифра 1), а также написать письмо на почту info@oceanbasket.ru. Мы оперативно ответим и решим проблему."
                  : "Условия возврата рассматриваются в индивидуальном порядке. Свяжитесь с нами по электронной почте  info@oceanbasket.kz, если у Вас есть какие-либо жалобы и предложения по поводу качества Продукта."
              }
              className="flex-grow lg:basis-80 max-w-xl"
            />
            <Card
              text="Юридический адрес"
              description={
                isRus ? (
                  <ul>
                    <li>ООО ОБ Мясницкая</li>
                    <li>
                      101000, г. Москва, ул. Мясницкая, д.11, этаж 1, помещение
                      V, комната 6
                    </li>
                    <li>ИНН 7708376250 ОГРН 1207700108219</li>
                  </ul>
                ) : (
                  "Казахстан, город Алматы, Алмалинский район, улица КАЗЫБЕК БИ, дом 50, почтовый индекс 050000"
                )
              }
              className="flex-grow lg:basis-80 max-w-xl"
            />
          </div>
        </div>
      </div>
      <SubscriptionSection />
    </>
  );
}
