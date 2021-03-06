import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./AboutPage/404/404";
import { AboutPage } from "./AboutPage/AboutPage";
import { PaymentPage } from "./PaymentPage/PaymentPage";
import { ContactsPage } from "./ContactsPage/ContactsPage";
import { DashboardPage } from "./DashboardPage/DashboardPage";
import { MenuPage } from "./MenuPage/MenuPage";
import { PromotionsPage } from "./PromotionsPage/PromotionsPage";
import { RoutesConfig } from "../shared/lib/routes-config";
import { CertificatePage } from "./CertificatesPage/CertificatePage";
import { DetailsPage } from "./DetailsPage/DeatilsPage";
import { OrderDescriptionContainerFetch } from "@entities/payment/components/OrderDescription/OrderDescriptionContainerFetch";
import { CheckoutPage } from "./CheckoutPage/CheckoutPage";
import { useStore } from "effector-react";
import { $rus } from "@features/choose-dishes/models";

const OpenUrl = ({ url }: { url: string }) => {
  window.location.replace(url);

  return <NotFoundPage />;
};

export const Routing = () => {
  const isRus = useStore($rus);
  return (
    <Routes>
      <Route path={`${RoutesConfig.Menu}/:id/:name`} element={<MenuPage />} />
      <Route path={`${RoutesConfig.Menu}/:id`} element={<MenuPage />} />
      <Route path={RoutesConfig.Menu} element={<MenuPage />} />
      <Route
        path={`${RoutesConfig.Payment}/:id/:name`}
        element={<PaymentPage />}
      />
      <Route path={`${RoutesConfig.Payment}/:id`} element={<PaymentPage />} />
      <Route path={RoutesConfig.Payment} element={<PaymentPage />} />
      <Route path={RoutesConfig.Checkout} element={<CheckoutPage />} />
      <Route
        path={`${RoutesConfig.Checkout}/false`}
        element={
          <OrderDescriptionContainerFetch key="failrue" status="failrue" />
        }
      />
      <Route
        path={`${RoutesConfig.Checkout}/true`}
        element={
          <OrderDescriptionContainerFetch key="success" status="success" />
        }
      />
      <Route path={RoutesConfig.About} element={<AboutPage />} />
      <Route path={RoutesConfig.Promotions} element={<PromotionsPage />} />
      <Route path={RoutesConfig.Certificates} element={<CertificatePage />} />
      <Route path={RoutesConfig.Contacts} element={<ContactsPage />} />
      <Route path={RoutesConfig.Details} element={<DetailsPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route
        path="/privacy"
        element={
          <OpenUrl
            url={
              isRus ? "/privacy-polytic-rus.pdf" : "/privacy-polytic-kz.docx"
            }
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
