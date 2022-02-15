import { FC, useCallback, useEffect, useRef } from "react";
import Portal from "@reach/portal";
import { motion, AnimatePresence } from "framer-motion";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import cn from "classnames";
import { fadeInOut } from "@entities/cart/lib/fade-in-out";
import { fadeInLeft } from "@entities/cart/lib/fade-in-left";
import { fadeInRight } from "@entities/cart/lib/fade-in-right";
import { Scrollbar } from "../Scrollbar";
import { useSwipeable } from "react-swipeable";

interface DrawerProps {
  children: any;
  open: boolean;
  variant?: "left" | "right";
  useBlurBackdrop?: boolean;
  onClose: () => void;
}
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

export const Drawer: FC<DrawerProps> = ({
  children,
  open = false,
  variant = "right",
  useBlurBackdrop,
  onClose,
}) => {
  const { ref: swiperRef, onMouseDown } = useSwipeable(
    variant === "right"
      ? {
          onSwipedRight: onClose,
        }
      : {
          onSwipedLeft: onClose,
        }
  );

  const ref = useRef() as DivElementRef;
  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  const updateRefs = useCallback(
    (motRef: HTMLDivElement) => {
      ref.current = motRef;
      swiperRef(motRef);
    },
    [swiperRef]
  );

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={updateRefs}
            key="drawer"
            initial="from"
            animate="to"
            exit="from"
            variants={variant === "right" ? fadeInRight() : fadeInLeft()}
            className="fixed inset-0 overflow-hidden h-full z-50"
            onMouseDown={onMouseDown}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial="from"
                animate="to"
                exit="from"
                variants={fadeInOut(0.35)}
                onClick={onClose}
                className={cn(
                  "absolute inset-0 bg-dark bg-opacity-40",
                  useBlurBackdrop && "use-blur-backdrop"
                )}
              />
              <div
                className={cn(
                  "absolute inset-y-0 max-w-full flex outline-none",
                  variant === "right" ? "end-0" : "start-0"
                )}
              >
                <div className="h-full w-screen max-w-sm">
                  <div className="h-full flex flex-col text-base bg-light shadow-xl">
                    <Scrollbar className="w-full h-full">{children}</Scrollbar>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Portal>
  );
};
