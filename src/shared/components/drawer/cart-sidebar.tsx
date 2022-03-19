import { onScrollPage } from "@shared/components/ScrollContainer";
import { CartSidebarView } from "@entities/cart/components/cart-sidebar-view";
import { RoutesConfig } from "@shared/lib/routes-config";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "./drawer";

export const onSetCartSidebarOpen = createEvent<boolean>();
export const $isCartSidebarOpen = createStore<boolean>(false).on(
  onSetCartSidebarOpen,
  (_, isOpen) => isOpen
);

export function CartSidebar() {
  const isOpen = useStore($isCartSidebarOpen);
  const navigate = useNavigate();

  return (
    <Drawer
      open={isOpen}
      onClose={() => onSetCartSidebarOpen(false)}
      variant="right"
    >
      <CartSidebarView
        onSubmit={function () {
          onSetCartSidebarOpen(false);
          navigate(RoutesConfig.Payment);
          onScrollPage();
        }}
        onClose={() => onSetCartSidebarOpen(false)}
      />
      {/* TODO: Add another menu to drawer */}
      {/* {view === "FILTER_VIEW" && <MobileCategoryMenu />} */}
    </Drawer>
  );
}
