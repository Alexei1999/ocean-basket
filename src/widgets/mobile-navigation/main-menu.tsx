import { onScrollPage } from "@shared/components/ScrollContainer";
import { DrawerWrapper } from "@shared/components/drawer/drawer-wrapper";
import { onSetPagesSidebarOpen } from "@shared/components/drawer/mobile-main-menu";
import { extendedLinks, headerLinks } from "@widgets/header/config/links";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-use";

const links = [...extendedLinks, ...headerLinks];

export default function MainMenu() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <DrawerWrapper onClose={() => onSetPagesSidebarOpen(false)}>
      <ul className="flex-grow">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <button
              onClick={() => {
                onSetPagesSidebarOpen(false);

                if (pathname === href) return;
                navigate(href);
                onScrollPage();
              }}
              className={classNames(
                "flex items-center py-3 px-5 md:px-8 text-sm font-semibold transition duration-200 hover:text-accent cursor-pointer",
                pathname === href ? "text-accent" : "text-heading"
              )}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </DrawerWrapper>
  );
}
