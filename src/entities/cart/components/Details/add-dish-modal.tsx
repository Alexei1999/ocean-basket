import Modal from "@entities/payment/components/Forms/modal";
import { Dish, getDish } from "@shared/api/dishes";
import { setLoadingAnimation } from "@shared/components/LoadingContainer/FishAnimationContainer";
import { RoutesConfig } from "@shared/lib/routes-config";
import { createEffect, createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from "./popup";

export const saveChoosenDish = createEvent<Dish>();
export const clearChoosenDish = createEvent();

const $currentDish = createStore<Dish | null>(null)
  .on(saveChoosenDish, (_, dish) => dish)
  .on(clearChoosenDish, () => null);

export const getDishFx = createEffect(getDish);

export const AddDishModal = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const currentDish = useStore($currentDish);

  const onClose = () => {
    clearChoosenDish();
    if (window.location.pathname.startsWith(RoutesConfig.Payment)) {
      navigate(RoutesConfig.Payment, { replace: true });
      return;
    }
    if (window.location.pathname.startsWith(RoutesConfig.Menu)) {
      navigate(RoutesConfig.Menu, { replace: true });
      return;
    }
    navigate(-1);
  };

  useEffect(() => {
    const dishDoneWatcher = getDishFx.doneData.watch((data) => {
      saveChoosenDish(data);
    });
    const dishFailWatcher = getDishFx.fail.watch(() => {
      setLoadingAnimation(false);
      toast.error("Ошибка при получении блюда");
      onClose();
    });

    return () => {
      dishDoneWatcher();
      dishFailWatcher();
    };
  }, []);

  useEffect(() => {
    if (!currentDish && id) {
      getDishFx(id);
    }
  }, [id, currentDish]);

  if (!currentDish) return null;

  return (
    <Modal showClose open={Boolean(currentDish && id)} onClose={onClose}>
      <Popup product={currentDish} />
    </Modal>
  );
};
