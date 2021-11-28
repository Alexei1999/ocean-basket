import { Header } from "../widgets/header/components/Header";
import { Routing } from "../pages/Routing";
import { withProviders } from "./providers";

function App() {
  return (
    <div className="flex flex-col max-h-screen">
      <Header />
      <Routing />
    </div>   
  );
}

export default withProviders(App);
