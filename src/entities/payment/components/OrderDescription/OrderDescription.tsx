import {
  $promocode,
  onResetPomocode,
} from "@entities/cart/components/cart-sidebar-view";
import usePrice from "@entities/cart/lib/use-price";
import { NotFound } from "@entities/dishes/components/NotFound";
import { $cartSizes, dropCart } from "@features/choose-dishes/models";
import { postPaymentStatus } from "@shared/api/dishes";
import Button from "@shared/button";
import Spinner from "@shared/components/spinner/spinner";
import { getPlurals } from "@shared/lib/functional-utils";
import { RoutesConfig } from "@shared/lib/routes-config";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import { createGate, useGate, useStore } from "effector-react";
import { createEffect, createStore, restore } from "effector";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatAddress } from "../Forms/address-card";
import { $form, FormValues } from "../Forms/address-form";
import { $schedule } from "../Forms/schedule-grid";
import { Details } from "./Details";
import { OrderDescriptionContainer } from "./OrderDescriptionContainer";
import { toast } from "react-toastify";

dayjs.locale("ru");

const postPaymentFx = createEffect(postPaymentStatus);

postPaymentFx.fail.watch(() => {
  toast("Ошибк при получении статуса, попробуйте еще раз", {
    type: "error",
    autoClose: false,
  });
});

const orderDescriptionGate = createGate();

const $fetchFail = createStore(false).on(postPaymentFx.fail, () => true);

export function OrderDescriptionContainerFetch({
  isFailure,
  isSuccess,
}: {
  isFailure: boolean;
  isSuccess: boolean;
}) {
  useGate(orderDescriptionGate);

  const invId = useMemo(() => {
    const url = new URLSearchParams(window.location.search);
    return url.get("InvId");
  }, []);

  const [isNoInvId, setIsNoInvId] = useState(false);

  const isLoading = useStore(postPaymentFx.pending);
  const isError = useStore($fetchFail);

  useEffect(() => {
    if (!invId || isNaN(parseInt(invId))) {
      setIsNoInvId(true);
      return;
    }

    postPaymentFx({
      InvID: parseInt(invId),
    });
  }, [invId]);

  return (
    <OrderDescription
      savedPromocode={null}
      isSuccess={isSuccess}
      isFailure={isFailure}
      isLoading={isLoading || isError}
      isNotFound={isNoInvId}
      retryButton={
        <Button
          className="text-body rounded-xl hover:bg-accent w-full max-w-[200px] mt-6"
          onClick={() => {}}
        >
          Оплатить
        </Button>
      }
    />
  );
}

export function OrderDescription({
  orderNumber,
  orderDate,
  isFailure,
  isSuccess,
  positionsNumber,
  isLoading,
  isNotFound,
  retryButton,
  total = "0",
  schedule,
  form,
  savedPromocode = null,
}: {
  orderNumber?: number;
  orderDate?: Dayjs | null;
  isFailure?: boolean;
  isSuccess?: boolean;
  positionsNumber?: number;
  isLoading?: boolean;
  isNotFound?: boolean;
  retryButton?: ReactNode;
  total?: string;
  schedule?: string;
  form?: FormValues | null;
  savedPromocode?: {
    promocode: string;
    promocodeText: string | null;
  } | null;
}) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <OrderDescriptionContainer>
        <div className="flex justify-center items-center h-96 bg-light relative md:rounded-xl mx-auto">
          <Spinner text="Загрузка" />
        </div>
      </OrderDescriptionContainer>
    );
  }

  if (isNotFound) {
    return (
      <OrderDescriptionContainer>
        <NotFound text={"Страница не найдена"} className="w-7/12 mx-auto" />
      </OrderDescriptionContainer>
    );
  }

  return (
    <OrderDescriptionContainer>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="pt-4 sm:pt-0 order-1 sm:order-0">
          {isSuccess === true ? (
            <>
              <div className="font-bold text-green-400 text-2xl">
                Заказ оплачен
              </div>
              <div className="mt-1">Спасибо. Ваш заказ готовится</div>
            </>
          ) : isFailure === true ? (
            <>
              <div className="font-bold text-2xl text-red-600">
                Оплата не прошла
              </div>
              <div className="mt-1">
                Попробуйте ещё раз, или обратесь в{" "}
                <span
                  className="underline cursor-pointer hover:text-accent"
                  onClick={() => navigate(RoutesConfig.Contacts)}
                >
                  поддержку
                </span>
              </div>
              {retryButton}
            </>
          ) : (
            <>
              <div className="font-bold text-2xl">Заказ получен</div>
              <div className="mt-1">Спасибо. Ваш заказ получен</div>
            </>
          )}
        </div>
        <div className="w-full sm:w-auto ml-auto order-0 sm:order-1 sm:-mt-8 md:-mr-9">
          <button
            onClick={() => navigate(RoutesConfig.Dashboard)}
            className="w-full sm:w-auto text-body text-sm py-3 px-8 border border-current rounded-xl hover:bg-accent hover:text-light"
          >
            Вернуться на главную
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between pt-8">
        {[
          { label: "Номер заказа", text: orderNumber || "" },
          {
            label: "Дата",
            text: orderDate?.format("DD MMMM YYYY г.") || "",
          },
          { label: "Итого", text: total },
          { label: "Метод оплаты", text: "Картой онлайн" },
        ].map(({ label, text }, idx) => (
          <div
            className={classNames(
              "mt-3",
              idx && "border-l border-border-200 min-w-150 pl-3 ml-3.5"
            )}
            key={idx}
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
            `${positionsNumber} ${getPlurals(positionsNumber ?? 0, [
              "позиция",
              "позиции",
              "позиций",
            ])}`,
          ],
          ["Время заказа", orderDate?.format("HH:mm DD MMMM YYYY г.") ?? ""],
          ["Срок доставки", schedule ?? ""],
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
    </OrderDescriptionContainer>
  );
}
