import { RoutesConfig } from "../../../shared/lib/routes-config";
import { PresentIcon } from "./PresentIcon";

export const headerLinks = [
  { href: RoutesConfig.Menu, label: "Меню" },
  { href: RoutesConfig.About, label: "О компании" },
  {
    href: RoutesConfig.Promotions,
    icon: PresentIcon,
    label: "Акции",
  },
  { href: RoutesConfig.Certificates, label: "Сертификаты" },
  { href: RoutesConfig.Payment, label: "Оплата и доставка" },
  { href: RoutesConfig.Contacts, label: "Контакты" },
];
