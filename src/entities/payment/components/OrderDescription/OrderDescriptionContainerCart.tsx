import {
  $promocode,
  onResetPomocode,
} from "@entities/cart/components/cart-sidebar-view";
import { formatRub } from "@entities/cart/components/Details/variation-groups";
import usePrice from "@entities/cart/lib/use-price";
import { $cartSizes, dropCart } from "@features/choose-dishes/models";
import { Dayjs } from "dayjs";
import { useStore } from "effector-react";
import { useState, useEffect } from "react";
import { formatAddress } from "../Forms/address-card";
import { $form, FormValues } from "../Forms/address-form";
import { $grandTotal, $location } from "../Forms/PaymentProccessing";
import { $schedule } from "../Forms/schedule-grid";
import { OrderDescription } from "./OrderDescription";

export function OrderDescriptionContainerCart({
  orderNumber,
  orderDate,
}: {
  orderNumber?: number;
  orderDate?: Dayjs | null;
}) {
  const [savedCartSiezes, setSavedCartSiezes] = useState<{
    size: number;
    totalAmount: number | null;
  } | null>(null);
  const [savedPromocode, setSavedPromocode] = useState<{
    promocode: string;
    promocodeText: string | null;
  } | null>(null);
  const [savedGrandTotal, setSavedGrandTotal] = useState<number>(0);
  const [savedLocation, setSavedLocation] = useState<boolean | null>(null);

  const cartSizes = useStore($cartSizes);
  const grandTotal = useStore($grandTotal);
  const location = useStore($location);
  const form = useStore($form);
  const schedule = useStore($schedule);
  const promocodeObj = useStore($promocode);

  useEffect(() => {
    setSavedCartSiezes(cartSizes);
    setSavedPromocode(promocodeObj);
    setSavedGrandTotal(grandTotal);
    setSavedLocation(location);
    dropCart();
    onResetPomocode();
  }, []);

  return (
    <OrderDescription
      schedule={schedule?.description}
      orderNumber={orderNumber}
      positionsNumber={savedCartSiezes?.size}
      total={savedGrandTotal}
      address={form ? formatAddress(form as FormValues) ?? "" : ""}
      savedPromocode={savedPromocode}
      orderDate={orderDate}
      location={savedLocation}
    />
  );
}
