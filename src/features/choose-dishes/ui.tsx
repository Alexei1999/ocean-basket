import { DishesContainer } from "../../entities/dishes/components/DishesContainer/DishesContainer";
import { Categories } from "../../entities/сategories/components/Categories/Categories";
import { Element } from "react-scroll";
import { useGate, useStore } from "effector-react";
import { $category, gateChooseDishes } from "./models";
import { useEffect, useRef } from "react";

export function ChooseDishes() {
  useGate(gateChooseDishes);

  const caetgory = useStore($category);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [caetgory]);

  return (
    <div ref={ref}>
      <Element
        name="grid"
        className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
      >
        <Categories />
        <DishesContainer />
      </Element>
    </div>
  );
}
