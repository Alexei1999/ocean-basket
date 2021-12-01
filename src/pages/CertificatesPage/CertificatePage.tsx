import { PageWaveHeader } from "@entities/promotions/components/PageWaveHeader";
import certificates from "./certificates-text.svg";
import important from "./important.svg";

import certificateDishImg from "./certificate-dish.png";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { SubscriptionSection } from "@widgets/subscription/SubscriptionSection";

export function CertificatePage() {
  return (
    <>
      <PageWaveHeader src={certificates} className="pt-12 pb-16" />
      <div className="md:px-4 lg:px-8 xl:px-32 bg-light">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-20">
          <div className={classNames(styles.block, "w-full flex-grow")}>
            <img
              src={certificateDishImg}
              className="w-full lg:w-auto ml-auto mr-auto lg:mr-0"
            />
          </div>
          <div className={classNames(styles.block, "flex-grow pt-9 pb-10")}>
            <p>
              Подарочный сертификат от Ocean Basket — универсальный подарок для
              всех любителей морепродуктов.
            </p>
            <p className="pt-5">
              Приобрести подарочный сертификат можно в любом ресторане Ocean
              Basket в г. Москва. Мы предлагаем подарочные сертификаты разного
              номинала:
            </p>
            <ul className="pt-5 pb-6">
              <li> — на 1000р. (одна тысяча рублей)</li>
              <li>— на 3000р. (три тысячи рублей)</li>
              <li>— на 5000р. (пять тысяч рублей)</li>
            </ul>
            <p>
              Обналичить сертификат можно только в московских ресторанах Ocean
              Basket, а действие сертификата — 1 год с момента приобретения.
            </p>
            <p className="pt-5">
              Каждый ваучер может быть использован только единожды при первом
              посещении. Сумма ваучера не может быть раздроблена на два и более
              посещений. В случае, если счет превышает номинал сертификата,
              разница оплачивается гостем. Разница неиспользованной суммы
              сертификата гостю не возвращается. Не допускается возврат или
              обмен Подарочного сертификата на соответствующий денежный
              эквивалент.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-10 pb-32">
        <img src={important} />
        <div className="pl-16 max-w-xl">
          <p>
            Обналичить сертификат возможно только в ресторане, на доставку он не
            распространяется.
          </p>
          <p className="pt-4">
            Сертификат не распространяется на алкогольную продукцию.
          </p>
        </div>
      </div>
      <SubscriptionSection />
    </>
  );
}
