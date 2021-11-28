import { Category } from "../../../../entities/dishes/components/DishesContainer/DishesContainer";
import { categories } from "../../config/categories";
import { StickySidebarListCategories } from "./StickySidebarListCategories";

export const Categories: React.FC<{ className?: string }> = ({ className }) => {
  // const {
  //   data,
  //   isLoading: loading,
  //   error,
  // } = useCategoriesQuery({
  //   type: (query.pages?.[0] as string) ?? homePage?.slug,
  // });

  // if (error) return <ErrorMessage message={error.message} />;

  return (
    <StickySidebarListCategories
      notFound={false}
      categories={categories as Category[]}
      loading={false}
      className={className}
    />
  );
};
