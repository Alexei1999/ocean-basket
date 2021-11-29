import usePrice from "@entities/cart/lib/use-price";
import { dishes } from "@features/choose-dishes/config/dishes";
import { $cartSizes } from "@features/choose-dishes/ui";
import { RoutesConfig } from "@shared/lib/routes-config";
import classNames from "classnames";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

const Details = ({
  className,
  valueClassName,
  label,
  items,
}: {
  className?: string;
  valueClassName?: string;
  label: string;
  items: [string | number, string | number][];
}) => {
  return (
    <div className={classNames(className)}>
      <div className="font-bold text-2xl">{label}</div>
      <div className="pt-9 flex flex-col">
        {items.map(([key, value]) => (
          <div className="max-w-full flex items-center">
            <div className="text-base font-bold flex justify-between w-1/2">
              <div>{key}</div>
              <span className={styles.semicolon}>:</span>
            </div>
            <div className={classNames("w-1/2", valueClassName)}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function OrderDescription() {
  const navigate = useNavigate();

  const cartSizes = useStore($cartSizes);

  const { price } = usePrice({
    amount: cartSizes.totalAmount ?? 0,
  });
  const { price: total } = usePrice({
    amount: cartSizes.totalAmount ?? 0,
  });

  return (
    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-24 2xl:px-64 bg-gray-100 rounded-2xl text-heading text-sm">
      <div className="shadow-700 bg-light px-16 py-14">
        <div className="flex justify-between">
          <div>
            <div className="font-bold text-2xl">Заказ получен</div>
            <span className="mt-1">Спасибо. Ваш заказ получен</span>
          </div>
          <div className="-mt-8 -mr-9">
            <button
              onClick={() => navigate(RoutesConfig.Dashboard)}
              className="text-body text-sm py-3 px-8 border border-current rounded-xl hover:bg-accent hover:text-light"
            >
              Вернуться на главную
            </button>
          </div>
        </div>

        <div className="flex justify-between pt-11">
          {[
            { label: "Номер заказа", text: "1444" },
            { label: "Дата", text: "14 марта 2019 г." },
            { label: "Итого", text: price },
            { label: "Метод оплаты", text: "Картой онлайн" },
          ].map(({ label, text }, idx) => (
            <div
              className={classNames(idx && "border-l border-border-200 pl-3")}
            >
              <div className="text-base font-bold">{label}</div>
              <div className="mt-3">{text}</div>
            </div>
          ))}
        </div>

        <Details
          className="max-w-xl mt-16"
          label="Детали заказа"
          items={[
            ["Всего товаров", `${cartSizes.size} позиций`],
            ["Время заказа", "13:00 12.10.2019"],
            ["Срок доставки", "60-минутная экспресс-доставка"],
            ["Место доставки", "Москва, дом 149, 1-й этаж"],
          ]}
        />

        <Details
          className="max-w-xl mt-16"
          label="Детали заказа"
          items={[
            ["Итого", total],
            ["Метод оплаты", "Картой онлайн"],
            ["Доставка", total],
          ]}
        />
      </div>
    </div>
  );
}
