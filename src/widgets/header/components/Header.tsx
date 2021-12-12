import cn from "classnames";

import logo from "../config/logo.svg";
import { headerLinks } from "../config/links";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { CartHeaderIcon } from "../../../entities/cart/components/icons/CartHeaderIcon";
import { RoutesConfig } from "../../../shared/lib/routes-config";
import {
  $isDrawerOpen,
  setIsDrawerOpen,
} from "@shared/components/drawer/managed-drawer";
import { useStore } from "effector-react";
import { $cartSizes } from "@features/choose-dishes/models";

export function Header() {
  const isOpen = useStore($isDrawerOpen);
  const { size } = useStore($cartSizes);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogoClickHandler = useCallback(
    () => navigate(RoutesConfig.Dashboard),
    [navigate]
  );

  return (
    <header
      className={"flex-shrink-0 site-header-with-search h-14 md:h-16 lg:h-22"}
    >
      <div className="flex justify-between items-center w-full h-14 md:h-16 lg:h-22 md:px-4 lg:px-8 xl:px-32 py-5 z-50 fixed bg-light border-b border-border-200 shadow-sm transition-transform duration-300">
        <div className="flex items-center w-full lg:w-auto">
          <img
            src={logo}
            alt="logo"
            className={cn("mx-auto lg:mx-0 -ml-3 cursor-pointer")}
            onClick={onLogoClickHandler}
          />
        </div>
        <div className="flex">
          <ul className="hidden lg:flex items-center flex-shrink-0 space-s-10">
            {headerLinks.map(({ href, matchingRoutes, label, icon: Icon }) => {
              const isCurrent = Array.isArray(matchingRoutes)
                ? matchingRoutes.some((route) => route === pathname)
                : href === pathname;
              return (
                <li key={`${href}-${label}`}>
                  <Link
                    to={href}
                    className={cn(
                      "font-normal text-heading flex items-center transition duration-200 no-underline hover:text-accent",
                      isCurrent && "text-accent"
                    )}
                  >
                    {Icon && (
                      <span className="me-2">
                        <Icon
                          containerClassName="mx-auto lg:mx-0"
                          iconClassName={cn(
                            "fill-current hover:text-accent",
                            isCurrent && "text-accent"
                          )}
                        />
                      </span>
                    )}
                    <span
                      className={cn(
                        isCurrent && "text-accent",
                        "uppercase text-sm"
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
            <li
              key={`cart`}
              className="font-semibold text-heading flex items-center transition duration-200 no-underline"
            >
              <CartHeaderIcon
                iconClassName={cn(
                  "fill-current",
                  "hover:text-accent focus:text-accent cursor-pointer",
                  isOpen && "text-accent"
                )}
                counter={size}
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
