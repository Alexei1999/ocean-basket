import usePrice from "@entities/cart/lib/use-price";
import { postPaymentStatus } from "@shared/api/dishes";
import Button from "@shared/button";
import { RoutesConfig } from "@shared/lib/routes-config";
import dayjs from "dayjs";
import { createEffect, createStore, restore } from "effector";
import { useStore } from "effector-react";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MerchantLogin } from "../Forms/PaymentProccessing";
import { OrderDescription } from "./OrderDescription";

const postPaymentStatusFx = createEffect(postPaymentStatus);

const paymentStatusData = restore(postPaymentStatusFx.doneData, null);

postPaymentStatusFx.fail.watch(() => {
  toast("Ошибка при получении статуса, попробуйте еще раз", {
    type: "error",
    autoClose: false,
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

  const [isNoInvId, setIsNoInvId] = useState(false);

  const isLoading = useStore(postPaymentStatusFx.pending);
  const isError = useStore($fetchFail);

  const data = useStore(paymentStatusData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;

    if (data.result && status === "failrue") {
      navigate(`${RoutesConfig.Checkout}/true${window.location.search}`);
    }
    if (!data.result && status === "success") {
      navigate(`${RoutesConfig.Checkout}/false${window.location.search}`);
    }
  }, [data?.result, status]);

  useEffect(() => {
    if (!invId || isNaN(parseInt(invId))) {
      setIsNoInvId(true);
      return;
    }

    postPaymentStatusFx({
      InvID: parseInt(invId),
    });
  }, [invId]);

  const { price: total } = usePrice({
    amount: parseInt(data?.outSum as string) ?? 0,
  });

  return (
    <OrderDescription
      savedPromocode={null}
      status={status}
      isLoading={isLoading || isError}
      isNotFound={isNoInvId}
      positionsNumber={data?.goodsNum}
      orderNumber={data?.orderNumber}
      address={data?.deliveryPlace}
      orderDate={dayjs(data?.requestDate)}
      schedule={data?.deliveryTime}
      total={total}
      retryButton={
        <Button
          className="text-body rounded-xl hover:bg-accent w-full max-w-[200px] mt-6"
          onClick={() => {
            if (isNoInvId || !data?.SignatureValue) {
              toast.error("Ошибка при совершении оплаты, попробуйте еще раз");
              return;
            }

            window.location.replace(
              `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${MerchantLogin}&InvoiceID=${invId}&Culture=ru&Encoding=utf-8&DefaultSum=${
                data?.outSum ?? 0
              }&SignatureValue=${data?.SignatureValue}`
            );
          }}
        >
          Оплатить
        </Button>
      }
    />
  );
}
