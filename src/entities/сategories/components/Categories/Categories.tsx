import { $categories, fetchCategoriesFx } from "@features/choose-dishes/models";
import { ErrorMessage } from "@shared/components/ErrorMessage";
import { useStore } from "effector-react";
import { StickySidebarListCategories } from "./StickySidebarListCategories";

type CategoriesProps = {
  className?: string;
};

export function Categories({ className }: CategoriesProps) {
  const categories = useStore($categories);
  const isCategoriesLoading = useStore(fetchCategoriesFx.pending);

  // if (error) return <ErrorMessage message={error.message} />;

  return (
    <StickySidebarListCategories
      notFound={categories.length === 0}
      categories={categories!}
      loading={isCategoriesLoading}
      className={className}
    />
  );
}
