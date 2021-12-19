import { onSetCategoriesSidebarOpen } from "@shared/components/drawer/filter-menu";
import { FilterIcon } from "./filter-icon";

export default function FilterBar() {
  return (
    <div className="sticky top-0 h-14 md:h-16 z-10 flex xl:hidden items-center justify-between py-3 px-5 lg:px-7 bg-light border-t border-b border-border-200 -top-[1px]">
      <button
        onClick={() => onSetCategoriesSidebarOpen(true)}
        className="flex items-center h-8 md:h-10 py-1 md:py-1.5 px-3 md:px-4 text-sm md:text-base bg-gray-100 bg-opacity-90 rounded border border-border-200 font-semibold text-heading transition-colors duration-200 focus:outline-none hover:border-accent-hover focus:border-accent-hover hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
      >
        <FilterIcon width="18" height="14" className="me-2" />
        Категории
      </button>
    </div>
  );
}
