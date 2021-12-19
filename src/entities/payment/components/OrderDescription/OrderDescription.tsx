import {
  $promocode,
  onResetPomocode,
} from "@entities/cart/components/cart-sidebar-view";
import usePrice from "@entities/cart/lib/use-price";
import { $cartSizes, dropCart } from "@features/choose-dishes/models";
import { getPlurals } from "@shared/lib/functional-utils";
import { RoutesConfig } from "@shared/lib/routes-config";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import { useStore } from "effector-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "../Forms/address-card";
import { $form } from "../Forms/address-form";
import { $schedule } from "../Forms/schedule-grid";

import styles from "./styles.module.scss";

dayjs.locale("ru");

const Details = ({
  className,
  valueClassName,
  label,
  items,
}: {
  className?: string;
  valueClassName?: string;
  label: string;
  items: ([string | number, string | number] | undefined | null | false)[];
}) => {
  const filteredItems = useMemo(
    () =>
      items.filter((item) => Array.isArray(item)) as [
        string | number,
        string | number
      ][],
    [items]
  );

  return (
    <div className={classNames(className)}>
      <div className="font-bold text-2xl">{label}</div>
      <div className="pt-9 flex flex-col">
        {filteredItems.map(([key, value]) => (
          <div className="max-w-full flex items-start pb-3">
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

export function OrderDescription({
  orderNumber,
  orderDate,
}: {
  orderNumber?: number;
  orderDate: Dayjs | null;
}) {
  const navigate = useNavigate();

  const cartSizes = useStore($cartSizes);
  const form = useStore($form);
  const schedule = useStore($schedule);
  const promocodeObj = useStore($promocode);

  const [savedCartSiezes, setSavedCartSiezes] = useState<{
    size: number;
    totalAmount: number | null;
  } | null>(null);
  const [savedPromocode, setSavedPromocode] = useState<{
    promocode: string;
    promocodeText: string | null;
  } | null>(null);

  useEffect(() => {
    setSavedCartSiezes(cartSizes);
    setSavedPromocode(promocodeObj);
    dropCart();
    onResetPomocode();
  }, []);

  const { price: total } = usePrice({
    amount: savedCartSiezes?.totalAmount ?? 0,
  });

  return (
    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-24 2xl:px-64 bg-gray-100 rounded-2xl text-body text-sm">
      <div className="shadow-700 bg-light px-16 py-14">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="pt-4 sm:pt-0 order-1 sm:order-0">
            <div className="font-bold text-2xl">Заказ получен</div>
            <div className="mt-1">Спасибо. Ваш заказ получен</div>
          </div>
          <div className="ml-auto order-0 sm:order-1 sm:-mt-8 sm:-mr-9">
            <button
              onClick={() => navigate(RoutesConfig.Dashboard)}
              className="text-body text-sm py-3 px-8 border border-current rounded-xl hover:bg-accent hover:text-light"
            >
              Вернуться на главную
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-between pt-8">
          {[
            { label: "Номер заказа", text: orderNumber || "" },
            { label: "Дата", text: orderDate?.format("DD MMMM YYYY г.") || "" },
            { label: "Итого", text: total },
            { label: "Метод оплаты", text: "Картой онлайн" },
          ].map(({ label, text }, idx) => (
            <div
              className={classNames(
                "mt-3",
                idx && "border-l border-border-200 min-w-150 pl-3"
              )}
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
            [
              "Всего товаров",
              `${savedCartSiezes?.size} ${getPlurals(
                savedCartSiezes?.size ?? 0,
                ["позиция", "позиции", "позиций"]
              )}`,
            ],
            ["Время заказа", orderDate?.format("HH:mm DD MMMM YYYY г.") ?? ""],
            ["Срок доставки", schedule?.description ?? ""],
            ["Место доставки", form ? formatAddress(form) ?? "" : ""],
            Boolean(savedPromocode) && [
              "Промокод",
              `${savedPromocode!.promocode}${
                savedPromocode!.promocodeText
                  ? ", " + savedPromocode!.promocodeText
                  : ""
              }`,
            ],
          ]}
        />

        <Details
          className="max-w-xl mt-16"
          label="Общая сумма"
          items={[
            ["Итого", total],
            ["Метод оплаты", "Картой онлайн"],
            // ["Доставка", total],
          ]}
        />
      </div>
    </div>
  );
}
