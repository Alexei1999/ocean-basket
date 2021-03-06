import { motion } from "framer-motion";

import cn from "classnames";
import { HomeIcon } from "./home-icon";
import { NavbarIcon } from "./navbar-icon";
import {
  $isCartSidebarOpen,
  onSetCartSidebarOpen,
} from "@shared/components/drawer/cart-sidebar";
import { CartHeaderIcon } from "@entities/cart/components/icons/CartHeaderIcon";
import { onSetPagesSidebarOpen } from "@shared/components/drawer/mobile-main-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutesConfig } from "@shared/lib/routes-config";
import { $cartSizes } from "@features/choose-dishes/models";
import { useStore } from "effector-react";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { onScrollPage } from "@shared/components/ScrollContainer";

const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handlers = useSwipeable({
    onSwipedRight: () => {
      onSetPagesSidebarOpen(true);
    },
    onSwipedLeft: () => {
      onSetCartSidebarOpen(true);
    },
  });

  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    containerRef.current?.blur();
  }, [pathname]);

  const { size } = useStore($cartSizes);
  const isOpen = useStore($isCartSidebarOpen);

  return (
    <div className="visible lg:hidden h-12 md:h-14">
      <nav
        {...handlers}
        className="h-14 w-full py-1.5 px-2 flex justify-between fixed start-0 bottom-0 z-10 bg-light shadow-400"
      >
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => onSetPagesSidebarOpen(true)}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">Страницы</span>
          <NavbarIcon className="text-heading" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => {
            pathname === RoutesConfig.Dashboard
              ? navigate(RoutesConfig.Menu)
              : navigate(RoutesConfig.Dashboard);

            onScrollPage();
          }}
          className={classNames(
            "flex p-2 h-full items-center justify-center focus:outline-none",
            "text-heading focus:text-accent hover:text-accent"
          )}
          ref={containerRef}
        >
          {pathname === RoutesConfig.Dashboard ? (
            <>
              <span className="sr-only">Меню</span>
              <span className="text-body hover:text-accent">Меню</span>
              {/* <SushiIcon /> */}
            </>
          ) : (
            <>
              <span className="sr-only">Главная страница</span>
              <HomeIcon />
            </>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => {
            onSetCartSidebarOpen(true);
          }}
          className="flex product-cart h-full relative items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">Корзина</span>
          <CartHeaderIcon
            iconClassName={cn(
              "show_cart fill-current",
              "hover:text-accent focus:text-accent cursor-pointer",
              isOpen && "text-accent"
            )}
            className="show_cart"
            counter={size}
          />
        </motion.button>
      </nav>
    </div>
  );
};

export default MobileNavigation;
