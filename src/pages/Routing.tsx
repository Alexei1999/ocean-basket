import { Route, Routes, Navigate } from "react-router-dom";
import { NotFoundPage } from "./404";
import { AboutPage } from "./AboutPage";
import { CertificatePage } from "./CertificatePage";
import { PaymentPage } from "./PaymentPage";
import { ContactsPage } from "./ContactsPage";
import { DashboardPage } from "./DashboardPage";
import { MenuPage } from "./MenuPage";
import { OrderPage } from "./OrderPage";
import { PromotionsPage } from "./PromotionsPage";
import { RoutesConfig } from "../shared/lib/routes-config";

import styles from "./styles.module.scss";

export const Routing = () => {
  return (
    <Routes>
      <Route path={RoutesConfig.Menu} element={<MenuPage />} />
      <Route path={RoutesConfig.Order} element={<OrderPage />} />
      <Route path={RoutesConfig.Payment} element={<PaymentPage />} />
      <Route path={RoutesConfig.About} element={<AboutPage />} />
      <Route path={RoutesConfig.Promotions} element={<PromotionsPage />} />
      <Route path={RoutesConfig.Certificates} element={<CertificatePage />} />
      <Route path={RoutesConfig.Contacts} element={<ContactsPage />} />
      <Route path="/" element={<Navigate to={RoutesConfig.Menu} />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
