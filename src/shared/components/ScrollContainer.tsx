import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { ReactNode, useRef, useEffect } from "react";

export const onScrollPage = createEvent();
const $updateStore = createStore<{}>({}).on(onScrollPage, () => ({}));

export const ScrollContainer = ({ children }: { children: ReactNode }) => {
  const updateDependency = useStore($updateStore);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const name = "alexei1999";
      Object.defineProperty(window, "__REACT_DEVELOPERS", {
        value: {},
      });
      Object.defineProperty(window?.__REACT_DEVELOPERS, "getName", {
        value: () => name,
      });
    } catch {}
  }, []);

  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [updateDependency]);

  return (
    <div ref={ref} className="overflow-auto">
      {children}
    </div>
  );
};
