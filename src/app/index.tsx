import { Header } from "../widgets/header/components/Header";
import { Routing } from "../pages/Routing";
import { withProviders } from "./providers";
import { ManagedDrawer } from "@shared/components/drawer/managed-drawer";

function App() {
  return (
    <div className="flex flex-col max-h-screen">
      <Header />
      <ManagedDrawer />
      <Routing />
    </div>
  );
}

export default withProviders(App);
