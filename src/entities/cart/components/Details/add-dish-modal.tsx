import Modal from "@entities/payment/components/Forms/modal";
import { Dish, getDish } from "@shared/api/dishes";
import { RoutesConfig } from "@shared/lib/routes-config";
import { createEffect, createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  useEffect(() => {
    const dishDoneWatcher = getDishFx.doneData.watch((data) => {
      saveChoosenDish(data);
    });

    return () => {
      dishDoneWatcher();
    };
  }, []);

  useEffect(() => {
    if (!currentDish && id) {
      getDishFx(id);
    }
  }, [currentDish]);

  if (!currentDish) return null;

  return (
    <Modal
      showClose
      open={Boolean(currentDish || id)}
      onClose={() => {
        clearChoosenDish();
        if (window.location.pathname.startsWith(RoutesConfig.Payment)) {
          navigate(RoutesConfig.Payment);
          return;
        }
        if (window.location.pathname.startsWith(RoutesConfig.Menu)) {
          navigate(RoutesConfig.Menu);
          return;
        }
        navigate(-1);
      }}
    >
      <Popup product={currentDish} />
    </Modal>
  );
};
