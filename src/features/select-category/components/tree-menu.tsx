import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import { ExpandLessIcon } from "./expand-less-icon";
import { ExpandMoreIcon } from "./expand-more-icon";
import * as CategoryIcons from "../lib/category-icons";
import { useEffect, useState } from "react";
import { getIcon } from "../lib/get-icon";
import { useLocation, useParams } from "react-router";

interface TreeMenuItemProps {
  item: any;
  className?: string;
  depth?: number;
}
const TreeMenuItem: React.FC<TreeMenuItemProps> = ({
  className,
  item,
  depth = 0,
}) => {
  // const router = useRouter();
  const { category } = useParams();
  const active = category;
  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { slug, name, children: items, icon } = item;
  const [{ display }, setDrawerState] = useState({ display: true, view: "" });

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  const { pathname } = useLocation();
  function onClick() {
    // const navigate = () =>
    //   router.push(
    //     {
    //       pathname,
    //       query: { ...query, category: slug },
    //     },
    //     undefined,
    //     {
    //       scroll: false,
    //     }
    //   );
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
      // navigate();
    } else {
      // navigate();
      display && setDrawerState({ display: false, view: "" });
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <ExpandLessIcon className="w-3 h-3" />
    ) : (
      <ExpandMoreIcon className="w-3 h-3" />
    );
  }

  return (
    <>
      <motion.li
        initial={false}
        animate={{ backgroundColor: "#ffffff" }}
        onClick={onClick}
        className="py-1 rounded-md"
      >
        <button
          className={cn(
            "flex items-center w-full py-2 text-start outline-none font-semibold  focus:outline-none focus:ring-0 focus:text-accent transition-all ease-in-expo",
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
};
interface TreeMenuProps {
  items: any[];
  className?: string;
}

function TreeMenu({ items, className }: TreeMenuProps) {
  return (
    <ul className={cn("text-base", className)}>
      {items?.map((item: any) => (
        <TreeMenuItem key={`${item.name}${item.slug}`} item={item} />
      ))}
    </ul>
  );
}

export default TreeMenu;
