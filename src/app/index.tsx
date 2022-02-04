import { Header } from "../widgets/header/components/Header";
import { Routing } from "../pages/Routing";
import { withProviders } from "./providers";
import { CartSidebar } from "@shared/components/drawer/cart-sidebar";
import { Footer } from "@widgets/footer/components/Footer";

import styles from "./styles/global.module.scss";

import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { AddDishModal } from "@entities/cart/components/Details/add-dish-modal";
import MobileNavigation from "@widgets/mobile-navigation/mobile-navigation";
import { MobileMainMenu } from "@shared/components/drawer/mobile-main-menu";

export const onScrollPage = createEvent();
const $updateStore = createStore<{}>({}).on(onScrollPage, () => ({}));

const ScrollContainer = ({ children }: { children: ReactNode }) => {
  const updateDependency = useStore($updateStore);
  const ref = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [pathname, updateDependency]);

  return (
    <div ref={ref} className="overflow-auto">
      {children}
    </div>
  );
};

function App() {
  return (
    <>
      <AddDishModal />
      <CartSidebar />
      <MobileMainMenu />
      <div className="flex flex-col max-h-screen">
        <Header />
        <ScrollContainer>
          <div className={styles.content}>
            <Routing />
          </div>
          <MobileNavigation />
          <Footer />
        </ScrollContainer>
      </div>
    </>
  );
}

export default withProviders(App);
