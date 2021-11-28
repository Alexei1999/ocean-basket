import cn from "classnames";
import { Category } from "../../../dishes/components/DishesContainer/DishesContainer";
import { NotFound } from "../../../dishes/components/NotFound";
import { Scrollbar } from "../../../../shared/components/Scrollbar";
import { TreeMenu } from "../TreeMenu/TreeMenuItem";
import { CategoriesLoader } from "./CategoriesLoader";

interface StickySidebarListCategoriesProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
  className?: string;
  onClick?: (item: string) => void;
}

export function StickySidebarListCategories({
  notFound,
  categories,
  loading,
  className,
  onClick,
}: StickySidebarListCategoriesProps) {
  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoriesLoader />
        </div>
      </div>
    );
  }
  return (
    <aside
      className={cn(
        `lg:sticky top-0 h-full xl:w-96 hidden xl:block bg-light`,
        className
      )}
    >
      <div className="max-h-full overflow-hidden">
        <Scrollbar
          className="w-full max-h-screen pl-32"
          style={{ height: "calc(100vh - 5.35rem)" }}
        >
          {!notFound ? (
            <div className="pr-5">
              <TreeMenu
                items={categories}
                className="xl:py-8"
                onClick={onClick}
              />
            </div>
          ) : (
            <div className="min-h-full w-full pt-6 pb-8 px-9 lg:p-8">
              <NotFound text="text-no-category" className="h-96" />
            </div>
          )}
        </Scrollbar>
      </div>
    </aside>
  );
}
