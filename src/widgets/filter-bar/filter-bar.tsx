import { FilterIcon } from "./filter-icon";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { $categories, $category } from "@features/choose-dishes/models";
import { useStore } from "effector-react";
import { fetchCategoriesFx } from "@entities/сategories/components/Categories/Categories";
import ContentLoader from "react-content-loader";
import { Scrollbar } from "@shared/components/Scrollbar";
import classNames from "classnames";
import { onCategoryClick } from "@entities/сategories/components/TreeMenu/TreeMenuItem";

export default function FilterBar() {
  const selectedCategory = useStore($category);
  const categories = useStore($categories);
  const loading = useStore(fetchCategoriesFx.pending);
  return (
    <div className="overflow-hidden sticky top-0 h-14 md:h-16 z-10 flex xl:hidden items-center justify-between px-3 lg:px-5 bg-light border-t border-b border-border-200 -top-[1px]">
      <Scrollbar
        options={{
          className: "h-full w-full os-theme-thin-dark pt-4",
          overflowBehavior: {
            x: "scroll",
            y: "hidden",
          },
        }}
      >
        {false ? (
          Array(10)
            .fill(null)
            .map(() => (
              <span className="px-3 w-36">
                <ContentLoader
                  speed={2}
                  className="px-3"
                  width="100%"
                  height="100%"
                  viewBox="0 0 100% 100%"
                  backgroundColor="#e0e0e0"
                  foregroundColor="#cecece"
                >
                  <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
                </ContentLoader>
              </span>
            ))
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <span className="px-3">
              <span
                className={classNames(
                  "cursor-pointer whitespace-nowrap",
                  selectedCategory === category.category
                    ? "text-accent"
                    : "text-body"
                )}
                onClick={() => {
                  onCategoryClick(category.category);
                }}
              >
                {category.category}
              </span>
            </span>
          ))
        ) : (
          <span>Категории недоступны</span>
        )}
      </Scrollbar>
    </div>
  );
}
