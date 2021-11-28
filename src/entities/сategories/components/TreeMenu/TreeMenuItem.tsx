import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import * as CategoryIcons from "../../lib/category-icons";
import { useState } from "react";
import { getIcon } from "../../lib/get-icon";
import { Category } from "@entities/dishes/components/DishesContainer/DishesContainer";

interface TreeMenuItemProps {
  item: Category;
  className?: string;
  depth?: number;
  onClick?: (item: string) => void;
}
export function TreeMenuItem({
  className,
  item,
  onClick,
  depth = 0,
}: TreeMenuItemProps) {
  // const router = useRouter();
  // const active = category;
  // const isActive =
  //   active === item.slug ||
  //   item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(false);
  // useEffect(() => {
  //   setOpen(isActive);
  // }, [isActive]);

  const {
    name,
    category,
    icon,
    expandIcon,
    children: items,
  } = item as Category & Record<string, any>;
  // const [{ display }, setDrawerState] = useState({ display: true, view: "" });

  // function toggleCollapse() {
  //   setOpen((prevValue) => !prevValue);
  // }

  // const { pathname } = useLocation();

  // let expandIcon;
  // if (Array.isArray(items) && items.length) {
  //   expandIcon = !isOpen ? (
  //     <ExpandLessIcon className="w-3 h-3" />
  //   ) : (
  //     <ExpandMoreIcon className="w-3 h-3" />
  //   );
  // }

  return (
    <>
      <motion.li
        initial={false}
        animate={{ backgroundColor: "#ffffff" }}
        onClick={() => onClick?.(category)}
        className="py-1 rounded-md"
      >
        <button
          className={cn(
            "flex items-center w-full py-2 text-start outline-none font-semibold  focus:outline-none focus:ring-0 hover:text-accent focus:text-accent transition-all ease-in-expo",
            isOpen ? "text-accent text-xl" : "text-heading",
            className
          )}
        >
          {icon && (
            <span className="flex w-5 h-5 me-4 items-center justify-center">
              {getIcon({
                iconList: CategoryIcons,
                iconName: icon,
                className: "h-full w-full",
              })}
            </span>
          )}
          <span>{name}</span>
          <span className="ms-auto">{expandIcon}</span>
        </button>
      </motion.li>
      <AnimatePresence initial={false}>
        {Array.isArray(items) && isOpen ? (
          <li>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="ms-4 text-xs"
            >
              {items.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <TreeMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn("text-sm text-body ms-5")}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
      </AnimatePresence>
    </>
  );
}
interface TreeMenuProps {
  items: any[];
  className?: string;
  onClick?: (item: string) => void;
}

export function TreeMenu({ items, className, onClick }: TreeMenuProps) {
  return (
    <ul className={cn("text-base", className)}>
      {items?.map((item: Category) => (
        <TreeMenuItem
          onClick={onClick}
          key={`${item.name}${item.slug}`}
          item={item}
        />
      ))}
    </ul>
  );
}
