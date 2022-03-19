import { Header } from "../widgets/header/components/Header";
import { Routing } from "../pages/Routing";
import { withProviders } from "./providers";
import { CartSidebar } from "@shared/components/drawer/cart-sidebar";
import { Footer } from "@widgets/footer/components/Footer";

import styles from "./styles/global.module.scss";

import MobileNavigation from "@widgets/mobile-navigation/mobile-navigation";
import { MobileMainMenu } from "@shared/components/drawer/mobile-main-menu";
import { GDRPPolicy } from "@entities/GDRPPolicy";
import { ScrollContainer } from "@shared/components/ScrollContainer";
import { FishAnimationContainer } from "@shared/components/LoadingContainer/FishAnimationContainer";

declare global {
  interface Window {
    __REACT_DEVELOPERS: Record<string, unknown>;
  }
}

function App() {
  return (
    <FishAnimationContainer>
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
    </FishAnimationContainer>
  );
}

export default withProviders(App);
