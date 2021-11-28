import { CartSidebarView } from "@entities/cart/components/cart-sidebar-view";
import { RoutesConfig } from "@shared/lib/routes-config";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "./drawer";

export const setIsDrawerOpen = createEvent<boolean>();
export const $isDrawerOpen = createStore<boolean>(false).on(
  setIsDrawerOpen,
  (_, isOpen) => isOpen
);

export function ManagedDrawer() {
  const isOpen = useStore($isDrawerOpen);
  const navigate = useNavigate();

  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsDrawerOpen(false)}
      variant="right"
    >
      <CartSidebarView
        onSubmit={function () {
          setIsDrawerOpen(false);
          navigate(RoutesConfig.Payment);
        }}
        onClose={() => setIsDrawerOpen(false)}
      />
      {/* TODO: Add another menu to drawer */}
      {/* {view === "FILTER_VIEW" && <MobileCategoryMenu />} */}
    </Drawer>
  );
}
