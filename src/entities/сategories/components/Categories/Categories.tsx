import { $categories } from "@features/choose-dishes/models";
import { getCategories } from "@shared/api/dishes";
import { createEffect, forward } from "effector";
import { createGate, useStore } from "effector-react";
import { useGate } from "effector-react/effector-react.cjs";
import { useEffect, useState } from "react";
import { StickySidebarListCategories } from "./StickySidebarListCategories";

type CategoriesProps = {
  className?: string;
};

const categoriesGate = createGate();

export const fetchCategoriesFx = createEffect(getCategories);

forward({
  from: categoriesGate.open,
  to: [fetchCategoriesFx],
});

export function Categories({ className }: CategoriesProps) {
  useGate(categoriesGate);

  const categories = useStore($categories);
  const isCategoriesLoading = useStore(fetchCategoriesFx.pending);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const categories = fetchCategoriesFx.fail.watch((error) => {
      console.error(error);
      setIsError(true);
    });
    return () => {
      categories();
    };
  }, []);

  if (isError) {
    return null;
  }

  return (
    <StickySidebarListCategories
      notFound={categories.length === 0}
      categories={categories!}
      loading={isCategoriesLoading}
      className={className}
    />
  );
}
