import { motion } from "framer-motion";

import cn from "classnames";
import { HomeIcon } from "./home-icon";
import { NavbarIcon } from "./navbar-icon";
import {
  $isCartSidebarOpen,
  setCartSidebarOpen,
} from "@shared/components/drawer/cart-sidebar";
import { CartHeaderIcon } from "@entities/cart/components/icons/CartHeaderIcon";
import { onSetPagesSidebarOpen } from "@shared/components/drawer/mobile-main-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutesConfig } from "@shared/lib/routes-config";
import { $cartSizes } from "@features/choose-dishes/models";
import { useStore } from "effector-react";
import classNames from "classnames";
import { SushiIcon } from "./sushi-icon";
import { useEffect, useRef, useState } from "react";

const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    containerRef.current?.blur();
  }, [pathname]);

  const { size } = useStore($cartSizes);
  const isOpen = useStore($isCartSidebarOpen);

  return (
    <div className="visible lg:hidden h-12 md:h-14">
      <nav className="h-14 w-full py-1.5 px-2 flex justify-between fixed start-0 bottom-0 z-10 bg-light shadow-400">
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
          }}
          className={classNames(
            "flex p-2 h-full items-center justify-center focus:outline-none",
            "text-heading focus:text-accent"
          )}
          ref={containerRef}
        >
          {pathname === RoutesConfig.Dashboard ? (
            <>
              <span className="sr-only">Меню</span>
              <SushiIcon />
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
            setCartSidebarOpen(true);
          }}
          className="flex product-cart h-full relative items-center justify-center focus:outline-none focus:text-accent"
        >
          <span className="sr-only">Корзина</span>
          <CartHeaderIcon
            iconClassName={cn(
              "fill-current",
              "hover:text-accent focus:text-accent cursor-pointer",
              isOpen && "text-accent"
            )}
            counter={size}
          />
        </motion.button>
      </nav>
    </div>
  );
};

export default MobileNavigation;
