import MainMenu from "@widgets/mobile-navigation/main-menu";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { Drawer } from "./drawer";

export const onSetPagesMenuOpen = createEvent<boolean>();
export const $isPagesMenuOpen = createStore<boolean>(false).on(
  onSetPagesMenuOpen,
  (_, isOpen) => isOpen
);

export function MobileMainMenu() {
  const isOpen = useStore($isPagesMenuOpen);

  return (
    <Drawer
      open={isOpen}
      onClose={() => onSetPagesMenuOpen(false)}
      variant="left"
    >
      <MainMenu />
    </Drawer>
  );
}
