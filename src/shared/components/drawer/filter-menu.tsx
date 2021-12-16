import { CartSidebarView } from "@entities/cart/components/cart-sidebar-view";
import { MobileCategoryMenu } from "@entities/сategories/components/Categories/MobileCategoryMenu";
import { RoutesConfig } from "@shared/lib/routes-config";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "./drawer";

export const onSetFilterMenuOpen = createEvent<boolean>();
export const $isFilterMenuOpen = createStore<boolean>(false).on(
  onSetFilterMenuOpen,
  (_, isOpen) => isOpen
);

export function FilterMenu() {
  const isOpen = useStore($isFilterMenuOpen);

  return (
    <Drawer
      open={isOpen}
      onClose={() => onSetFilterMenuOpen(false)}
      variant="left"
    >
      <MobileCategoryMenu />
    </Drawer>
  );
}
