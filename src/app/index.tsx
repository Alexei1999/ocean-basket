import { Header } from "../widgets/header/components/Header";
import { Routing } from "../pages/Routing";
import { withProviders } from "./providers";

function App() {
  return (
    <>
      <Header />
      <Routing />
    </>
  );
}

export default withProviders(App);
