import { postPaymentStatus } from "@shared/api/common";
import Button from "@shared/button";
import { RoutesConfig } from "@shared/lib/routes-config";
import dayjs from "dayjs";
import { createEffect, createStore, restore } from "effector";
import { useStore } from "effector-react";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  $merchantLogin,
  makeTelegrammDescription,
} from "../Forms/PaymentProccessing";
import { OrderDescription } from "./OrderDescription";

export const getPaymentLink = (
  MerchantLogin?: string,
  sum?: string | null,
  invId?: string | null,
  signature?: string | null,
  description?: string | null,
  orderNumber?: number | string | null
) =>
  `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${MerchantLogin}&Culture=ru&Encoding=utf-8&OutSum=${
    sum ?? 0
  }&InvId=${invId}&SignatureValue=${signature}&Title=Оплата заказа${
    orderNumber ? " №" + orderNumber : ""
  }&Description=${description || ""}`;

const postPaymentStatusFx = createEffect(postPaymentStatus);

const paymentStatusData = restore(postPaymentStatusFx.doneData, null);

postPaymentStatusFx.fail.watch((error) => {
  console.error(error);
  toast("Ошибка при получении статуса, попробуйте еще раз", {
    type: "error",
    autoClose: false,
    toastId: "payment-status-error",
    updateId: "payment-status-error",
  });
});

const $fetchFail = createStore(false).on(postPaymentStatusFx.fail, () => true);

export function OrderDescriptionContainerFetch({
  status,
}: {
  status: "success" | "failrue";
}) {
  const invId = useMemo(() => {
    const url = new URLSearchParams(window.location.search);
    return url.get("InvId");
  }, []);

  const outSum = useMemo(() => {
    const url = new URLSearchParams(window.location.search);
    return url.get("OutSum");
  }, []);

  const [isNoInvId, setIsNoInvId] = useState(false);

  const isLoading = useStore(postPaymentStatusFx.pending);
  const isError = useStore($fetchFail);

  const data = useStore(paymentStatusData);
  const merchantLogin = useStore($merchantLogin);

  const navigate = useNavigate();

  useEffect(() => {
    toast.update("payment-status-error", {
      autoClose: false,
    });
    return () => {
      toast.update("payment-status-error", {
        autoClose: 1500,
      });
    };
  }, []);

  useEffect(() => {
    if (!data) return;

    if (data.result && status === "failrue") {
      navigate(`${RoutesConfig.Checkout}/true${window.location.search}`);
    }
    if (!data.result && status === "success") {
      navigate(`${RoutesConfig.Checkout}/false${window.location.search}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.result, status]);

  useEffect(() => {
    if (isNaN(parseInt(invId as string))) {
      setIsNoInvId(true);
      return;
    }

    postPaymentStatusFx({
      InvID: parseInt(invId as string),
      OutSum:
        parseInt(data?.outSum as string) || parseInt(outSum as string) || 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invId]);

  return (
    <OrderDescription
      isResult={true}
      savedPromocode={null}
      status={status}
      isLoading={isLoading || isError}
      isNotFound={isNoInvId}
      positionsNumber={data?.goodsNum}
      orderNumber={data?.orderNumber}
      address={data?.deliveryPlace}
      orderDate={dayjs(data?.requestDate)}
      schedule={data?.deliveryTime}
      total={
        parseInt(data?.outSum as string) || parseInt(outSum as string) || 0
      }
      location={data?.location}
      retryButton={
        <Button
          className="text-body rounded-xl hover:bg-accent w-full max-w-[200px] mt-6"
          disabled={isNoInvId || !data?.SignatureValue}
          onClick={() => {
            if (isNoInvId || !data?.SignatureValue) {
              toast.error("Ошибка при совершении оплаты, попробуйте еще раз");
              return;
            }

            window.location.replace(
              getPaymentLink(
                merchantLogin,
                `${
                  parseInt(data?.outSum as string) ||
                  parseInt(outSum as string) ||
                  0
                }`,
                invId,
                data?.SignatureValue,
                makeTelegrammDescription(),
                data?.orderNumber
              )
            );
          }}
        >
          Оплатить
        </Button>
      }
    />
  );
}
