import { Header } from "../widgets/header/components/Header";
import { Routing } from "../pages/Routing";
import { withProviders } from "./providers";
import { ManagedDrawer } from "@shared/components/drawer/managed-drawer";
import { Footer } from "@widgets/footer/components/Footer";

import styles from "./styles/global.module.scss";

function App() {
  return (
    <div className="flex flex-col max-h-screen">
      <Header />
      <ManagedDrawer />
      <div className="overflow-auto">
        <div className={styles.content}>
          <Routing />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default withProviders(App);
