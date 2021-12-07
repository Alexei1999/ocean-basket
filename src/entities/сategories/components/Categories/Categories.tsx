import { $categories, fetchCategoriesFx } from "@features/choose-dishes/models";
import { ErrorMessage } from "@shared/components/ErrorMessage";
import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import { StickySidebarListCategories } from "./StickySidebarListCategories";

type CategoriesProps = {
  className?: string;
};

export function Categories({ className }: CategoriesProps) {
  const categories = useStore($categories);
  const isCategoriesLoading = useStore(fetchCategoriesFx.pending);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const categories = fetchCategoriesFx.failData.watch(() => {
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
