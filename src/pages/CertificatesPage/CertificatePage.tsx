import { PageWaveHeader } from "@entities/promotions/components/PageWaveHeader";

import certificateDishImg from "./certificate-dish.png";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";

import hook from "@widgets/subscription/hook.svg";
import twoWaves from "@pages/AboutPage/AboutPageCover/2-waves.svg";
import { useStore } from "effector-react";
import { $rus } from "@features/choose-dishes/models";

export function CertificatePage() {
  const isRus = useStore($rus);
  return (
    <>
      <PageWaveHeader
        text="Подарочные сертификаты Ocean Basket "
        textClassName="text-5xl"
        className="pt-12 pb-16"
      />
      <div className="md:px-4 lg:px-8 xl:px-32 bg-light text-body">
        <div className="flex flex-col lg:flex-row lg:justify-center gap-8 lg:gap-20">
          <div className={classNames(styles.block, "w-full flex-grow")}>
            <img
              alt="certificate dish"
              src={certificateDishImg}
              className="w-full lg:w-auto ml-auto mr-auto lg:mr-0"
            />
          </div>
          <div className={classNames(styles.block, "flex-grow pb-10 xl:pr-6")}>
            <div className="text-body font-bold text-lg">
              Подари частичку океана своему близкому человеку!
            </div>
            <div className="pt-4 px-4 md:px-0 max-w-2xl">
              <p>
                Подарочный сертификат от Ocean Basket — универсальный подарок
                для всех любителей морепродуктов.
              </p>
              <p className="pt-5">
                {isRus
                  ? "Приобрести подарочный сертификат можно в любом ресторане Ocean Basket в г. Москва. Мы предлагаем подарочные сертификаты разного номинала:"
                  : "Приобрести подарочный сертификат можно в любом ресторане Ocean Basket Казахстан. Мы предлагаем подарочные сертификаты разного номинала:"}
              </p>
              <ul className="pt-5 pb-6">
                <li className="text-base font-bold">
                  {isRus
                    ? " — на 1000р. (одна тысяча рублей)"
                    : " — на 10000 тг (десять тысяч тенге)"}
                </li>
                <li className="text-base font-bold">
                  {isRus
                    ? " — на 3000р. (три тысячи рублей)"
                    : " — на 20000 тг (двадцать тысяч тенге)"}
                </li>
                <li className="text-base font-bold">
                  {isRus
                    ? " — на 5000р. (пять тысяч рублей)"
                    : " — на 30000 тг (тридцать тысяч тенге)"}
                </li>
              </ul>
              <p>
                {isRus
                  ? "Обналичить сертификат можно только в московских ресторанах Ocean Basket, а действие сертификата — 1 год с момента приобретения."
                  : "Использовать сертификат можно только в ресторанах Ocean Basket Казахстан, а действие сертификата — 3 месяца с момента приобретения."}
              </p>
              <p className="pt-5">
                Каждый ваучер может быть использован только единожды при первом
                посещении. Сумма ваучера не может быть разделена на два и более
                посещений. В случае, если счет превышает номинал сертификата,
                разница оплачивается гостем. Разница неиспользованной суммы
                сертификата гостю не возвращается. Не допускается возврат или
                обмен Подарочного сертификата на соответствующую денежную сумму.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:gap-x-16 px-4 flex flex-col lg:flex-row justify-center lg:pt-10 pb-32 text-body relative">
        <img
          alt="two waves"
          src={twoWaves}
          className="absolute right-9 top-20 w-56 hidden lg:block"
        />
        <img
          src={hook}
          className="absolute left-14 bottom-8 xl:bottom-16"
          alt="hook"
        />
        <span className="font-friends text-body text-[66px]">Важно!</span>
        <div className="pt-7 lg:pt-0 lg:pl-16 max-w-xl">
          {isRus ? (
            <>
              <p>
                Обналичить сертификат возможно только в ресторане, на доставку
                он не распространяется.
              </p>
              <p className="pt-4">
                Сертификат не распространяется на алкогольную продукцию.
              </p>
            </>
          ) : (
            <p className="pt-4">
              Действие сертификата не распространяется на доставку и самовывоз
            </p>
          )}
        </div>
      </div>
      <SubscriptionSection />
    </>
  );
}
