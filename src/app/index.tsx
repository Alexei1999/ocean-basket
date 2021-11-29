import { Header } from "../widgets/header/components/Header";
import { Routing } from "../pages/Routing";
import { withProviders } from "./providers";
import { ManagedDrawer } from "@shared/components/drawer/managed-drawer";
import { Footer } from "@widgets/footer/components/Footer";

import styles from "./styles/global.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollContainer = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div ref={ref} className="overflow-auto">
      {children}
    </div>
  );
};

function App() {
  return (
    <div className="flex flex-col max-h-screen">
      <Header />
      <ManagedDrawer />
      <ScrollContainer>
        <div className={styles.content}>
          <Routing />
        </div>
        <Footer />
      </ScrollContainer>
    </div>
  );
}

export default withProviders(App);
