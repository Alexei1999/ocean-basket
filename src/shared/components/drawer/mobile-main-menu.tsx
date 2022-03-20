import MainMenu from "@widgets/mobile-navigation/main-menu";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { $isLoadingAnimation } from "../LoadingContainer/FishAnimationContainer";
import { Drawer } from "./drawer";

export const onSetPagesSidebarOpen = createEvent<boolean>();
export const $isPagesMenuOpen = createStore<boolean>(false).on(
  onSetPagesSidebarOpen,
  (_, isOpen) => isOpen
);

export function MobileMainMenu() {
  const isOpen = useStore($isPagesMenuOpen);
  const isLoading = useStore($isLoadingAnimation);

  return (
    <Drawer
      open={!isLoading && isOpen}
      onClose={() => onSetPagesSidebarOpen(false)}
      variant="left"
    >
      <MainMenu />
    </Drawer>
  );
}
