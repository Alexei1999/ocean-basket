import Modal from "@entities/payment/components/Forms/modal";
import {
  $isRestaurantOpen,
  fetchTimeValidateFx,
} from "@features/choose-dishes/models";
import { $rus } from "@features/choose-dishes/models";
import { useStore } from "effector-react";
import { useState, useEffect } from "react";
import { $isAdressModalOpen } from "./address-modal";

export function ShopClosedModal() {
  const isAddressOpen = useStore($isAdressModalOpen);

  const isRus = useStore($rus);
  const isOpen = useStore($isRestaurantOpen);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  useEffect(() => {
    fetchTimeValidateFx();
  }, []);

  useEffect(() => {
    if (isOpen === false) {
      setIsWarningModalOpen(true);
    }
  }, [isOpen]);

  return (
    <Modal
      showClose
      open={!isAddressOpen && isWarningModalOpen}
      onClose={() => setIsWarningModalOpen(false)}
    >
      <article className="flex flex-col justify-items-start items-start p-5 sm:p-8 bg-light min-h-screen md:min-h-0 max-w-3xl md:rounded-2xl">
        <div>
          <div className="text-body font-bold text-xl mb-4 sm:mb-6 pr-10">
            Ресторан закрыт
          </div>
          <p>Заказ можно оформить только во время работы ресторана</p>
          <div className="pt-4 font-semibold text-body">Время работы:</div>
          {isRus ? (
            <>
              <div>Пн-Вт-Ср-Чт: 10:00 - 22:30</div>
              <div>Пт-Сб: 10:00 - 23:30</div>
              <div>Вс: 10:00 - 22:30</div>
            </>
          ) : (
            <>
              <div>10:00 - 22:00</div>
            </>
          )}
        </div>
      </article>
    </Modal>
  );
}
