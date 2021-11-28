import { CartSidebarView } from "@entities/cart/components/cart-sidebar-view";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { Drawer } from "./drawer";

export const setIsDrawerOpen = createEvent<boolean>();
export const $isDrawerOpen = createStore<boolean>(false).on(
  setIsDrawerOpen,
  (_, isOpen) => isOpen
);

export function ManagedDrawer() {
  const isOpen = useStore($isDrawerOpen);

  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsDrawerOpen(false)}
      variant="right"
    >
      <CartSidebarView />
      {/* TODO: Add another menu to drawer */}
      {/* {view === "FILTER_VIEW" && <MobileCategoryMenu />} */}
    </Drawer>
  );
}
