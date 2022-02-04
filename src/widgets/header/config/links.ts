import { RoutesConfig } from "../../../shared/lib/routes-config";
import { PresentIcon } from "./PresentIcon";

export const extendedLinks = [
  { href: RoutesConfig.Dashboard, label: "Главная" },
];

export const headerLinks = [
  { href: RoutesConfig.Menu, label: "Меню" },
  {
    href: RoutesConfig.Promotions,
    icon: PresentIcon,
    label: "Акции",
  },
  { href: RoutesConfig.Certificates, label: "Сертификаты" },
  {
    href: RoutesConfig.Details,
    matchingRoutes: [
      RoutesConfig.Details,
      RoutesConfig.Payment,
      RoutesConfig.Checkout,
    ],
    label: "Оплата и доставка",
  },
  { href: RoutesConfig.About, label: "О компании" },
  { href: RoutesConfig.Contacts, label: "Контакты" },
];
