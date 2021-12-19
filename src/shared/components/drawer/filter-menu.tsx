import { CartSidebarView } from "@entities/cart/components/cart-sidebar-view";
import { MobileCategoryMenu } from "@entities/сategories/components/Categories/MobileCategoryMenu";
import { RoutesConfig } from "@shared/lib/routes-config";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "./drawer";

export const onSetCategoriesSidebarOpen = createEvent<boolean>();
export const $isCategoriesSidebarOpen = createStore<boolean>(false).on(
  onSetCategoriesSidebarOpen,
  (_, isOpen) => isOpen
);

export function FilterMenu() {
  const isOpen = useStore($isCategoriesSidebarOpen);

  return (
    <Drawer
      open={isOpen}
      onClose={() => onSetCategoriesSidebarOpen(false)}
      variant="left"
    >
      <MobileCategoryMenu />
    </Drawer>
  );
}
