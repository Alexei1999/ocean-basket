import { PaymentProccessing } from "@entities/payment/components/Forms/PaymentProccessing";
import { ShopClosedModal } from "@widgets/ShopClosedModal";

export function CheckoutPage() {
  return (
    <>
      <ShopClosedModal />
      <PaymentProccessing />
    </>
  );
}
