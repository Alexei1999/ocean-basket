import { Header } from "../widgets/header/components/Header";
import { Routing } from "../pages/Routing";
import { withProviders } from "./providers";
import { CartSidebar } from "@shared/components/drawer/cart-sidebar";
import { Footer } from "@widgets/footer/components/Footer";

import styles from "./styles/global.module.scss";

import { ReactNode, useEffect, useRef } from "react";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import MobileNavigation from "@widgets/mobile-navigation/mobile-navigation";
import { MobileMainMenu } from "@shared/components/drawer/mobile-main-menu";
import { GDRPPolicy } from "@entities/GDRPPolicy";

declare global {
  interface Window {
    __REACT_DEVELOPERS: Record<string, unknown>;
  }
}

export const onScrollPage = createEvent();
const $updateStore = createStore<{}>({}).on(onScrollPage, () => ({}));

const ScrollContainer = ({ children }: { children: ReactNode }) => {
  const updateDependency = useStore($updateStore);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const name = "alexei1999";
      Object.defineProperty(window, "__REACT_DEVELOPERS", {
        value: {},
      });
      Object.defineProperty(window?.__REACT_DEVELOPERS, "getName", {
        value: () => name,
      });
    } catch {}
  }, []);

  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [updateDependency]);

  return (
    <div ref={ref} className="overflow-auto">
      {children}
    </div>
  );
};

function App() {
  return (
    <>
      <GDRPPolicy />
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
